#!/usr/bin/env node
import { readdir, rename } from 'node:fs/promises';
import { basename, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const UPLOADS_DIR = fileURLToPath(new URL('../public/images/uploads', import.meta.url));
const SUPPORTED_EXTENSIONS = new Set([
  '.avif',
  '.heic',
  '.heif',
  '.jpg',
  '.jpeg',
  '.png',
  '.tif',
  '.tiff',
  '.webp',
]);

/** @param {import('sharp').Metadata} metadata */
function hasEmbeddedMetadata(metadata) {
  return Boolean(metadata.exif || metadata.iptc || metadata.xmp);
}

async function listUploadImages() {
  const entries = await readdir(UPLOADS_DIR, { withFileTypes: true });
  return entries
    .filter(
      (entry) =>
        entry.isFile() && SUPPORTED_EXTENSIONS.has(extname(entry.name).toLowerCase()),
    )
    .map((entry) => join(UPLOADS_DIR, entry.name))
    .sort();
}

/**
 * @param {string} filePath
 * @returns {Promise<{ filePath: string; changed: boolean; status: 'clean' | 'stripped' | 'has-metadata' | 'unknown-format' }>}
 */
async function processUpload(filePath, checkOnly) {
  const metadata = await sharp(filePath).metadata();

  if (!hasEmbeddedMetadata(metadata)) {
    return { filePath, changed: false, status: 'clean' };
  }

  if (checkOnly) {
    return { filePath, changed: false, status: 'has-metadata' };
  }

  const format = metadata.format;
  if (!format) {
    return { filePath, changed: false, status: 'unknown-format' };
  }

  const tempPath = `${filePath}.tmp`;
  const formatOptions =
    format === 'jpeg'
      ? { quality: 92, mozjpeg: true }
      : format === 'webp'
        ? { quality: 92 }
        : format === 'png'
          ? { compressionLevel: 9 }
          : {};

  await sharp(filePath).rotate().toFormat(format, formatOptions).toFile(tempPath);
  await rename(tempPath, filePath);

  const after = await sharp(filePath).metadata();
  if (hasEmbeddedMetadata(after)) {
    throw new Error(`Failed to strip metadata from ${filePath}`);
  }

  return { filePath, changed: true, status: 'stripped' };
}

async function main() {
  const checkOnly = process.argv.includes('--check');
  const images = await listUploadImages();

  if (images.length === 0) {
    console.log('No upload images found.');
    return;
  }

  const results = [];
  for (const filePath of images) {
    results.push(await processUpload(filePath, checkOnly));
  }

  for (const result of results) {
    const label = basename(result.filePath);
    switch (result.status) {
      case 'clean':
        console.log(`OK    ${label}`);
        break;
      case 'stripped':
        console.log(`STRIP ${label}`);
        break;
      case 'has-metadata':
        console.log(`FAIL  ${label} (metadata present)`);
        break;
      case 'unknown-format':
        console.log(`SKIP  ${label} (unsupported or unreadable format)`);
        break;
      default: {
        const unexpected = /** @type {never} */ (result.status);
        throw new Error(`Unexpected status: ${unexpected}`);
      }
    }
  }

  const failed = results.filter((result) => result.status === 'has-metadata');
  if (checkOnly && failed.length > 0) {
    console.error(
      `\n${failed.length} upload(s) still contain metadata. Run: npm run strip-uploads`,
    );
    process.exit(1);
  }

  if (!checkOnly) {
    const stripped = results.filter((result) => result.status === 'stripped');
    console.log(`\nDone. Stripped ${stripped.length} file(s).`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
