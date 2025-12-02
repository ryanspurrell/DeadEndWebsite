import { promises as fs } from "fs";
import path from "path";
import sharp from "sharp";

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

    console.log("   ✔ Image created / found:", destPath);
  } catch (err) {
    console.error("   ❌ Failed to create or find image:", err);
  }
}

async function processIssue(issueFolder, issuesDir, entries="pages", images="thumbnails", generateThumbs) {
  const issuePath = path.join(issuesDir, issueFolder);
  const pagesPath = path.join(issuePath, entries);
  const thumbsPath = path.join(issuePath, images);
  const metadataPath = path.join(issuePath, "metadata.json");

  // List pages
  let pages = [];
  try {
    const x = await fs.readdir(pagesPath, { withFileTypes: true });
    pages = x
      .filter((e) => e.isFile())
      .map((e) => e.name)
      .sort(naturalSort);
  } catch {
    console.warn(`⚠ ${issueFolder} has no entries — skipping.`);
    return null;
  }

  if (pages.length === 0) {
    console.warn(`⚠ ${issueFolder} has zero images — skipping.`);
    return null;
  }

  // Generate thumbnails
  const thumbFiles = [];
  for (const pageFile of pages) {
    const pageFullPath = path.join(pagesPath, pageFile);

    const thumbName = pageFile.replace(/\.(png|jpg|jpeg|webp)$/i, ".jpg");
    const thumbFullPath = path.join(thumbsPath, thumbName);
    if (generateThumbs === true) {
      await generateThumbnail(pageFullPath, thumbFullPath);
      thumbFiles.push(`${images}/${thumbName}`);
    } else {
      const y = await fs.readdir(thumbsPath, {withFileTypes: true});
      if (y.length > 0) {
        for (const thumb of y) {
          thumbFiles.push(`${images}/${thumb.name}`);
        }
      }
    }
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
    entries: pages.map((file) => `${entries}/${file}`),
    images: thumbFiles,
    other: metadata.other || {}
  };


  // Write metadata.json
  await fs.writeFile(metadataPath, JSON.stringify(finalMetadata, null, 2));
  console.log(`✔ Updated metadata.json for ${issueFolder}`);

  return issueFolder;
}

async function generateAll(issuesDir, indexFile, names, images, generateThumbs=true) {
  try {
    const entries = await fs.readdir(issuesDir, { withFileTypes: true });

    const folders = entries.filter((e) => e.isDirectory()).map((e) => e.name);

    const validIssues = [];

    console.log(`${names}:`);
    for (const folder of folders) {
      console.log(`Processing entry: ${folder}\n`);
      const name = await processIssue(folder, issuesDir, names, images, generateThumbs);
      if (name) validIssues.push(name);
    }

    // Update index.json
    await fs.writeFile(indexFile, JSON.stringify(validIssues, null, 2));
    console.log(`\n✔ Updated index.json with ${validIssues.length} issues.`);

  } catch (err) {
    console.error("❌ Error:", err);
  }
}

const issuesDirectory = path.resolve("public/issues");
const issuesIndex = path.resolve("public/issues/index.json");

const songsDir = path.resolve("public/songs");
const songsIndex = path.resolve("public/songs/index.json");

const membersDir = path.resolve("public/members");
const membersIndex = path.resolve("public/members/index.json");


generateAll(issuesDirectory, issuesIndex, "pages", "thumbnails", true);
generateAll(songsDir, songsIndex, "tracks", "artwork", false);
generateAll(membersDir, membersIndex, "bio", "images", false);

