import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const casesDir = path.join(projectRoot, 'public', 'images', 'Cases');
const manifestPath = path.join(casesDir, 'manifest.json');
const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);

const caseFolders = fs
  .readdirSync(casesDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort((left, right) => left.localeCompare(right, 'pt-BR'));

const cases = caseFolders
  .map((folderName) => {
    const folderPath = path.join(casesDir, folderName);
    const files = fs
      .readdirSync(folderPath, { withFileTypes: true })
      .filter((entry) => entry.isFile() && entry.name[0] !== '.')
      .map((entry) => entry.name)
      .filter((fileName) => imageExtensions.has(path.extname(fileName).toLowerCase()))
      .sort((left, right) => left.localeCompare(right, 'pt-BR'));

    return { folderName, files };
  })
  .filter((entry) => entry.files.length > 0);

const manifest = {
  generatedAt: new Date().toISOString(),
  cases,
};

fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Manifest atualizado: ${cases.length} cases em ${manifestPath}`);
