export async function loadIssues() {
  // 1. Get list of issue folder names
  const indexRes = await fetch("/issues/index.json");
  const issueFolders = await indexRes.json();

  const issues = [];

  for (const folder of issueFolders) {
    // 2. Load metadata.json for the issue
    const metaRes = await fetch(`/issues/${folder}/metadata.json`);
    const metadata = await metaRes.json();

    // 3. Convert page paths into fully-qualified public URLs
    const pages = metadata.pages.map(p => `/issues/${folder}/${p}`);

    issues.push({
      id: folder,
      metadata,
      pages
    });
  }

  return issues;
}

