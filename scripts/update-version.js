#!/usr/bin/env node

const fs = require('fs');
const { execSync } = require('child_process');

// Function to increment the version
function incrementVersion(version, keyword) {
  const parts = version.split('.');
  const major = parseInt(parts[0].replace(/[^0-9]+/g, ''));
  const minor = parseInt(parts[1].replace(/[^0-9]+/g, ''));
  const patch = parseInt(parts[2].replace(/[^0-9]+/g, ''));

  switch (keyword) {
    case 'major':
      return `${major + 1}.0.0`;
    case 'minor':
      return `${major}.${minor + 1}.0`;
    case 'patch':
      return `${major}.${minor}.${patch + 1}`;
    default:
      console.error(`Invalid keyword: ${keyword}`);
      process.exit(1);
  }
}

// Read the commit message
const commitMessage = execSync('git log --format=%B -n 1 HEAD')
  .toString()
  .trim();

// Extract the version keyword and value from the commit message
const versionMatch = commitMessage.match(/(major|minor|patch)=(\d+)/i);
if (versionMatch) {
  const keyword = versionMatch[1].toLowerCase();
  const value = parseInt(versionMatch[2]);

  // Read the current version from .env
  const env = fs.readFileSync('.env').toString();
  const currentVersionMatch = env.match(/NEXT_PUBLIC_APP_VERSION=(.*)/);
  if (currentVersionMatch) {
    const currentVersion = currentVersionMatch[1];

    // Extract the prefix from the current version
    const prefixMatch = currentVersion.match(/^(.*)-v(\d+\.\d+\.\d+)$/);
    if (prefixMatch) {
      const prefix = prefixMatch[1];
      const version = prefixMatch[2];
      const newVersion = incrementVersion(version, keyword);

      // Update the version in .env
      const lines = env.split('\n');
      const updatedLines = lines.map(line => {
        if (line.startsWith('NEXT_PUBLIC_APP_VERSION=')) {
          return `NEXT_PUBLIC_APP_VERSION=${prefix}-v${newVersion}`;
        }
        return line;
      });
      const updatedEnv = updatedLines.join('\n');
      fs.writeFileSync('.env', updatedEnv);

      console.log(`Updated version: ${prefix}-v${newVersion}`);
    }
  }
}
