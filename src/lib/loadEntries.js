export async function loadEntries(entryFolder) {
  // 1. Get list of issue folder names
  const indexRes = await fetch(`${entryFolder}/index.json`);
  const issueFolders = await indexRes.json();

  const issues = [];

  for (const folder of issueFolders) {
    // 2. Load metadata.json for the issue
    const metaRes = await fetch(`${entryFolder}/${folder}/metadata.json`);
    const metadata = await metaRes.json();

    // 3. Convert page paths into fully-qualified public URLs
    const pages = metadata.entries.map(p => `${entryFolder}/${folder}/${p}`);

    issues.push({
      id: folder,
      metadata,
      pages
    });
  }

  return issues;
}

