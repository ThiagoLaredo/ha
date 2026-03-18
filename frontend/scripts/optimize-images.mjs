import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const rootDir = path.resolve(import.meta.dirname, '..');
const inputFile = path.join(rootDir, 'public', 'background-landing.jpeg');
const outputDir = path.join(rootDir, 'public', 'optimized');

const widths = [640, 1024, 1600, 2200];

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

buildVariants().catch((error) => {
  console.error('Erro ao otimizar imagens:', error);
  process.exitCode = 1;
});