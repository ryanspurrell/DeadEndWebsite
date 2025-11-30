import { promises as fs } from "fs";
import path from "path";

const issuesDir = path.resolve("public/issues");
const indexFile = path.resolve("public/issues/index.json");

async function updateIndex() {
  try {
    // Get all entries inside /public/issues
    const entries = await fs.readdir(issuesDir, { withFileTypes: true });

    // Keep only folders
    const issueFolders = entries
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    // Write index.json
    await fs.writeFile(indexFile, JSON.stringify(issueFolders, null, 2));

    console.log(`✔ Updated index.json with ${issueFolders.length} issues`);
    issueFolders.forEach(f => console.log(" -", f));

  } catch (err) {
    console.error("Error generating index.json:", err);
  }
}

updateIndex();

