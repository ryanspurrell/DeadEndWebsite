// loadEntries.js

export async function loadEntries(entryFolder) {
  
  const indexRes = await fetch(`${entryFolder}/index.json`);
  const issueFolders = await indexRes.json();

  const issues = [];
  try {
    const indexRes = await fetch(`${entryFolder}/index.json`);

    if (!indexRes.ok) {
      console.error(`Couldn't get ${entryFolder}/index.json. Status: ${indexRes.status}`);
      return [];
    }

    for (const folder of issueFolders) {
    
      const metaRes = await fetch(`${entryFolder}/${folder}/metadata.json`);
      const metadata = await metaRes.json();

      const pages = metadata.entries.map(p => `${entryFolder}/${folder}/${p}`);

      issues.push({
        id: folder,
        metadata,
        pages
      });
    }
  } catch (error) {
    console.error("File loading error:", error);
    return [];
  }

  return issues;
}

