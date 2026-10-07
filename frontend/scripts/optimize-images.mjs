import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const rootDir = path.resolve(import.meta.dirname, '..');
const inputFile = path.join(rootDir, 'public', 'background-landing.jpeg');
const outputDir = path.join(rootDir, 'public', 'optimized');
const portfolioInputDir = path.join(rootDir, 'public', 'images', 'portfolio');
const portfolioOutputDir = path.join(rootDir, 'public', 'optimized', 'portfolio');
const imagesDir = path.join(rootDir, 'public', 'images');
const homeImagesDir = path.join(imagesDir, 'home');

const widths = [640, 1024, 1600, 2200];
const portfolioWidths = [640, 960, 1280];
const casePortraitSize = { width: 771, height: 1028 };

const isImageFile = (fileName) => /\.(jpe?g|png|webp|avif|tiff?)$/i.test(fileName);

const slugifyName = (value) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[’']/g, '')
    .replace(/&/g, ' e ')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-')
    .toLowerCase();

const stripEmbeddedImageExtension = (value) => value.replace(/\.(jpe?g|png|webp|avif|tiff?)$/i, '');

const removeDigitsFromName = (value) => value.replace(/\d+/g, ' ');

const toAlphabeticSuffix = (index) => {
  let currentIndex = index;
  let suffix = '';

  while (currentIndex > 0) {
    currentIndex -= 1;
    suffix = String.fromCharCode(97 + (currentIndex % 26)) + suffix;
    currentIndex = Math.floor(currentIndex / 26);
  }

  return suffix;
};

const ensureUniqueFilePath = async (directory, fileName) => {
  const extension = path.extname(fileName);
  const baseName = path.basename(fileName, extension);
  let candidateName = fileName;
  let counter = 2;

  while (true) {
    try {
      await fs.access(path.join(directory, candidateName));
      candidateName = `${baseName}-${counter}${extension}`;
      counter += 1;
    } catch {
      return path.join(directory, candidateName);
    }
  }
};

const ensureUniqueAlphabeticFilePath = async (directory, fileName, sourcePath) => {
  const extension = path.extname(fileName);
  const baseName = path.basename(fileName, extension);
  let candidateName = fileName;
  let counter = 2;

  while (true) {
    const candidatePath = path.join(directory, candidateName);

    if (isSamePathIgnoringCase(candidatePath, sourcePath)) {
      return candidatePath;
    }

    try {
      await fs.access(candidatePath);
      candidateName = `${baseName}-${toAlphabeticSuffix(counter)}${extension}`;
      counter += 1;
    } catch {
      return candidatePath;
    }
  }
};

const isSamePathIgnoringCase = (leftPath, rightPath) =>
  path.normalize(leftPath).toLowerCase() === path.normalize(rightPath).toLowerCase();

const findExistingDir = async (parentDir, candidates) => {
  for (const candidate of candidates) {
    const candidatePath = path.join(parentDir, candidate);
    try {
      const stat = await fs.stat(candidatePath);
      if (stat.isDirectory()) {
        return candidatePath;
      }
    } catch {
      // Candidate does not exist.
    }
  }

  return null;
};

const findCasesDir = async () => {
  return findExistingDir(imagesDir, ['cases', 'Cases']);
};

const findHomeClientsDir = async () => findExistingDir(homeImagesDir, ['clientes', 'Clientes', 'clients', 'Clients']);

const collectImagesRecursively = async (dirPath) => {
  const dirEntries = await fs.readdir(dirPath, { withFileTypes: true });
  const files = [];

  for (const entry of dirEntries) {
    const entryPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      const nestedFiles = await collectImagesRecursively(entryPath);
      files.push(...nestedFiles);
      continue;
    }

    if (entry.isFile() && isImageFile(entry.name)) {
      files.push(entryPath);
    }
  }

  return files;
};

const normalizeHomeClientFileNames = async () => {
  const sourceDir = await findHomeClientsDir();
  if (!sourceDir) {
    console.log('! Pasta public/images/home/clientes não encontrada. Pulando normalização de clientes.');
    return;
  }

  const targetDir = path.join(homeImagesDir, 'clientes');
  const sameDirectoryIgnoringCase = isSamePathIgnoringCase(sourceDir, targetDir);
  await fs.mkdir(targetDir, { recursive: true });

  const dirEntries = await fs.readdir(sourceDir, { withFileTypes: true });
  const fileEntries = dirEntries.filter((entry) => entry.isFile() && isImageFile(entry.name));

  if (!fileEntries.length) {
    console.log('! Nenhuma imagem encontrada em public/images/home/clientes.');
    return;
  }

  for (const entry of fileEntries) {
    const sourcePath = path.join(sourceDir, entry.name);
    const extension = path.extname(entry.name).toLowerCase();
    const baseName = path.basename(entry.name, path.extname(entry.name));
    const normalizedFileName = `${slugifyName(baseName)}${extension}`;
    const preferredTargetPath = path.join(targetDir, normalizedFileName);

    if (sameDirectoryIgnoringCase) {
      if (entry.name === normalizedFileName) {
        continue;
      }

      const tempPath = path.join(targetDir, `.__rename_tmp__${Date.now()}-${Math.random().toString(36).slice(2)}${extension}`);
      await fs.rename(sourcePath, tempPath);
      await fs.rename(tempPath, preferredTargetPath);
      continue;
    }

    const targetPath = await ensureUniqueFilePath(targetDir, normalizedFileName);

    if (path.normalize(sourcePath) === path.normalize(targetPath)) {
      continue;
    }

    await fs.rename(sourcePath, targetPath);
  }

  console.log(`✓ ${fileEntries.length} imagens de clientes normalizadas em ${path.relative(rootDir, targetDir)}`);
};

const normalizeCaseFileNames = async () => {
  const casesDir = await findCasesDir();
  if (!casesDir) {
    console.log('! Pasta public/images/cases (ou Cases) não encontrada. Pulando normalização de cases.');
    return;
  }

  const imageFiles = (await collectImagesRecursively(casesDir)).sort((leftPath, rightPath) => leftPath.localeCompare(rightPath));
  if (!imageFiles.length) {
    console.log('! Nenhuma imagem encontrada na pasta de cases para renomear.');
    return;
  }

  let renamedCount = 0;

  for (const filePath of imageFiles) {
    const directory = path.dirname(filePath);
    const extension = path.extname(filePath).toLowerCase();
    const rawBaseName = path.basename(filePath, path.extname(filePath));
    const baseNameWithoutEmbeddedExtension = stripEmbeddedImageExtension(rawBaseName);
    const normalizedBaseName = slugifyName(removeDigitsFromName(baseNameWithoutEmbeddedExtension)) || 'imagem';
    const preferredTargetPath = path.join(directory, `${normalizedBaseName}${extension}`);
    const targetPath = await ensureUniqueAlphabeticFilePath(directory, path.basename(preferredTargetPath), filePath);

    if (path.normalize(filePath) === path.normalize(targetPath)) {
      continue;
    }

    const tempPath = path.join(directory, `.__rename_tmp__${Date.now()}-${Math.random().toString(36).slice(2)}${extension}`);
    await fs.rename(filePath, tempPath);
    await fs.rename(tempPath, targetPath);
    renamedCount += 1;
  }

  console.log(`✓ ${renamedCount} imagens de cases normalizadas em ${path.relative(rootDir, casesDir)}`);
};

const ensureDir = async () => {
  await fs.mkdir(outputDir, { recursive: true });
};

const buildVariants = async () => {
  await ensureDir();

  const image = sharp(inputFile);
  const metadata = await image.metadata();

  if (!metadata.width) {
    throw new Error('Não foi possível identificar a largura da imagem original.');
  }

  const validWidths = widths.filter((width) => width <= metadata.width);
  const finalWidths = validWidths.includes(metadata.width)
    ? validWidths
    : [...validWidths, metadata.width];

  await Promise.all(
    finalWidths.flatMap((width) => {
      const resized = sharp(inputFile).resize({
        width,
        withoutEnlargement: true,
      });

      return [
        resized
          .clone()
          .jpeg({ quality: 76, mozjpeg: true, progressive: true })
          .toFile(path.join(outputDir, `background-landing-${width}.jpg`)),
        resized
          .clone()
          .webp({ quality: 74, effort: 6 })
          .toFile(path.join(outputDir, `background-landing-${width}.webp`)),
      ];
    }),
  );

  console.log(`✓ ${finalWidths.length * 2} arquivos otimizados em ${path.relative(rootDir, outputDir)}`);
};

const optimizePortfolioImage = async (fileName) => {
  const sourceFile = path.join(portfolioInputDir, fileName);
  const baseName = fileName.replace(/\.[^/.]+$/, '');
  const image = sharp(sourceFile);
  const metadata = await image.metadata();

  if (!metadata.width) {
    throw new Error(`Não foi possível identificar a largura da imagem: ${fileName}`);
  }

  const validWidths = portfolioWidths.filter((width) => width <= metadata.width);
  const finalWidths = validWidths.includes(metadata.width)
    ? validWidths
    : [...validWidths, metadata.width].sort((a, b) => a - b);

  await Promise.all(
    finalWidths.flatMap((width) => {
      const resized = sharp(sourceFile).resize({
        width,
        withoutEnlargement: true,
      });

      return [
        resized
          .clone()
          .jpeg({ quality: 76, mozjpeg: true, progressive: true })
          .toFile(path.join(portfolioOutputDir, `${baseName}-${width}.jpg`)),
        resized
          .clone()
          .webp({ quality: 74, effort: 6 })
          .toFile(path.join(portfolioOutputDir, `${baseName}-${width}.webp`)),
      ];
    }),
  );

  return finalWidths.length * 2;
};

const buildPortfolioVariants = async () => {
  await fs.mkdir(portfolioOutputDir, { recursive: true });

  let files = [];
  try {
    files = await fs.readdir(portfolioInputDir);
  } catch {
    console.log('! Pasta public/images/portfolio não encontrada. Pulando otimização de portfólio.');
    return;
  }

  const imageFiles = files.filter((fileName) => /\.(jpe?g|png|webp)$/i.test(fileName));
  if (!imageFiles.length) {
    console.log('! Nenhuma imagem encontrada em public/images/portfolio.');
    return;
  }

  const generatedCounts = await Promise.all(imageFiles.map((fileName) => optimizePortfolioImage(fileName)));
  const totalGenerated = generatedCounts.reduce((total, count) => total + count, 0);

  console.log(`✓ ${totalGenerated} arquivos de portfólio otimizados em ${path.relative(rootDir, portfolioOutputDir)}`);
};

const optimizeCaseImage = async (filePath) => {
  const directory = path.dirname(filePath);
  const originalExtension = path.extname(filePath);
  const baseName = path.basename(filePath, originalExtension);
  const outputFile = path.join(directory, `${baseName}.webp`);
  const tempOutputFile = path.join(directory, `${baseName}.tmp.webp`);
  const writesToSamePath = path.normalize(filePath) === path.normalize(outputFile);
  const destinationFile = writesToSamePath ? tempOutputFile : outputFile;

  await sharp(filePath)
    .rotate()
    .resize({
      width: casePortraitSize.width,
      height: casePortraitSize.height,
      fit: 'cover',
      position: 'attention',
      withoutEnlargement: true,
    })
    .webp({ quality: 82, effort: 6 })
    .toFile(destinationFile);

  if (writesToSamePath) {
    await fs.rename(tempOutputFile, outputFile);
    return;
  }

  await fs.unlink(filePath);
};

const optimizeCasesPortrait = async () => {
  const casesDir = await findCasesDir();

  if (!casesDir) {
    console.log('! Pasta public/images/cases (ou Cases) não encontrada. Pulando otimização de cases.');
    return;
  }

  const imageFiles = await collectImagesRecursively(casesDir);
  if (!imageFiles.length) {
    console.log('! Nenhuma imagem encontrada na pasta de cases.');
    return;
  }

  for (const filePath of imageFiles) {
    await optimizeCaseImage(filePath);
  }

  console.log(
    `✓ ${imageFiles.length} imagens de cases otimizadas em ${path.relative(rootDir, casesDir)} para ${casePortraitSize.width}x${casePortraitSize.height} (webp)`,
  );
};

const run = async () => {
  const onlyCases = process.argv.includes('--cases-only');
  const onlyCasesRename = process.argv.includes('--cases-rename-only');
  const onlyHomeClients = process.argv.includes('--home-clients-only');

  if (onlyCases) {
    await normalizeCaseFileNames();
    await optimizeCasesPortrait();
    return;
  }

  if (onlyCasesRename) {
    await normalizeCaseFileNames();
    return;
  }

  if (onlyHomeClients) {
    await normalizeHomeClientFileNames();
    return;
  }

  await buildVariants();
  await buildPortfolioVariants();
  await normalizeHomeClientFileNames();
  await normalizeCaseFileNames();
  await optimizeCasesPortrait();
};

run().catch((error) => {
  console.error('Erro ao otimizar imagens:', error);
  process.exitCode = 1;
});