// loadEntries.js (FINAL FIX: Error Handling and Stability)

export async function loadEntries(entryFolder) {
  const issues = [];

  console.log(entryFolder);

  try {
    // 1. Get list of issue folder names
    const indexRes = await fetch(`${entryFolder}/index.json`);
    
    // CRITICAL: If fetch is successful (200 OK) but content is wrong, this prevents the crash.
    const contentType = indexRes.headers.get('content-type');
    
    if (!indexRes.ok) {
        console.error(`Fetch failed for index.json. Status: ${indexRes.status}`);
        return []; 
    }
    
    if (!contentType || !contentType.includes('application/json')) {
        // This handles the server returning HTML/Text instead of JSON
        console.error(`Received non-JSON content for ${entryFolder}/index.json.`);
        return []; 
    }

    const issueFolders = await indexRes.json();


    for (const folder of issueFolders) {
      // 2. Load metadata.json for the issue
      const metaRes = await fetch(`${entryFolder}/${folder}/metadata.json`);
      
      if (!metaRes.ok) {
          console.warn(`Skipping issue ${folder}: metadata.json not found.`);
          continue;
      }
      
      const metadata = await metaRes.json();

      // 3. Convert page paths into fully-qualified public URLs
      const pages = metadata.entries.map(p => `${entryFolder}/${folder}/${p}`);

      issues.push({
        id: folder,
        metadata,
        pages
      });
    }

  } catch (error) {
    // Catch any remaining parsing or processing error
    console.error("Critical error during loadEntries execution:", error);
    return []; 
  }

  return issues;
}
