import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const rootDir = path.resolve(import.meta.dirname, '..');
const inputFile = path.join(rootDir, 'public', 'background-landing.jpeg');
const outputDir = path.join(rootDir, 'public', 'optimized');
const portfolioInputDir = path.join(rootDir, 'public', 'images', 'portfolio');
const portfolioOutputDir = path.join(rootDir, 'public', 'optimized', 'portfolio');

const widths = [640, 1024, 1600, 2200];
const portfolioWidths = [640, 960, 1280];

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

const run = async () => {
  await buildVariants();
  await buildPortfolioVariants();
};

run().catch((error) => {
  console.error('Erro ao otimizar imagens:', error);
  process.exitCode = 1;
});