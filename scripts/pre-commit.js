#!/usr/bin/env node

const fs = require('fs');
const { execSync } = require('child_process');

// Function to increment the version
function incrementVersion(version, keyword) {
  const parts = version.split('.');
  const major = parseInt(parts[0]);
  const minor = parseInt(parts[1]);
  const patch = parseInt(parts[2]);

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
const versionMatch = commitMessage.match(/(major|minor|patch)(\d+)/i);
if (versionMatch) {
  const keyword = versionMatch[1].toLowerCase();
  const value = parseInt(versionMatch[2]);

  // Read the current version from .env
  const env = fs.readFileSync('.env').toString();
  const currentVersionMatch = env.match(/NEXT_PUBLIC_APP_VERSION=(.*)/);
  if (currentVersionMatch) {
    const currentVersion = currentVersionMatch[1];
    const newVersion = incrementVersion(currentVersion, keyword);

    // Update the version in .env
    const updatedEnv = env.replace(
      /NEXT_PUBLIC_APP_VERSION=.*/,
      `NEXT_PUBLIC_APP_VERSION=${newVersion}`
    );
    fs.writeFileSync('.env', updatedEnv);

    console.log(`Updated version: ${newVersion}`);
  }
}
