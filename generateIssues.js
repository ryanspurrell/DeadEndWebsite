import { promises as fs } from "fs";
import path from "path";
import sharp from "sharp";

const issuesDir = path.resolve("public/issues");
const indexFile = path.resolve("public/issues/index.json");

const songsDir = path.resolve("public/songs");
const songsIndex = path.resolve("public/issues/index.json");

// Sorting
function naturalSort(a, b) {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
}

// Generate a thumbnail for a page
async function generateThumbnail(srcPath, destPath) {
  try {
    // Check if thumbnail folder exists
    const folder = path.dirname(destPath);
    await fs.mkdir(folder, { recursive: true });

    // Convert to 400px JPEG
    await sharp(srcPath)
      .resize({ width: 400 })
      .jpeg({ quality: 80 })
      .toFile(destPath);

    console.log("   ✔ Thumbnail created:", destPath);
  } catch (err) {
    console.error("   ❌ Failed to create thumbnail:", err);
  }
}

async function processIssue(issueFolder) {
  const issuePath = path.join(issuesDir, issueFolder);
  const pagesPath = path.join(issuePath, "pages");
  const thumbsPath = path.join(issuePath, "thumbnails");
  const metadataPath = path.join(issuePath, "metadata.json");

  // List pages
  let pages = [];
  try {
    const entries = await fs.readdir(pagesPath, { withFileTypes: true });
    pages = entries
      .filter((e) => e.isFile())
      .map((e) => e.name)
      .sort(naturalSort);
  } catch {
    console.warn(`⚠ ${issueFolder} has no pages — skipping.`);
    return null;
  }

  if (pages.length === 0) {
    console.warn(`⚠ ${issueFolder} has zero page images — skipping.`);
    return null;
  }

  // Generate thumbnails
  const thumbFiles = [];
  for (const pageFile of pages) {
    const pageFullPath = path.join(pagesPath, pageFile);

    const thumbName = pageFile.replace(/\.(png|jpg|jpeg|webp)$/i, ".jpg");
    const thumbFullPath = path.join(thumbsPath, thumbName);

    await generateThumbnail(pageFullPath, thumbFullPath);

    thumbFiles.push(`thumbnails/${thumbName}`);
  }

  // Load existing metadata if it's there
  let metadata = {};
  try {
    metadata = JSON.parse(await fs.readFile(metadataPath, "utf-8"));
  } catch {
    metadata = {};
  }

  // Make metadata
  const finalMetadata = {
    title: metadata.title || issueFolder.replace(/-/g, " "),
    pages: pages.map((file) => `pages/${file}`),
    thumbnails: thumbFiles
  };

  // Write metadata.json
  await fs.writeFile(metadataPath, JSON.stringify(finalMetadata, null, 2));
  console.log(`✔ Updated metadata.json for ${issueFolder}`);

  return issueFolder;
}

async function generateAll() {
  try {
    const entries = await fs.readdir(issuesDir, { withFileTypes: true });

    const folders = entries.filter((e) => e.isDirectory()).map((e) => e.name);

    const validIssues = [];

    for (const folder of folders) {
      console.log(`\nProcessing issue: ${folder}`);
      const name = await processIssue(folder);
      if (name) validIssues.push(name);
    }

    // Update index.json
    await fs.writeFile(indexFile, JSON.stringify(validIssues, null, 2));
    console.log(`\n✔ Updated index.json with ${validIssues.length} issues.`);

  } catch (err) {
    console.error("❌ Error:", err);
  }
}

generateAll();

