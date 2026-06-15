const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

// Paths
const repoUrl = 'https://github.com/arunbhardwaj-shine/OneSource.git';
const buildPath = path.resolve(__dirname, '..', 'OneosourceBuild');
const distPath = path.resolve(__dirname, 'dist');

console.log(buildPath, "  buildPath");

// If buildPath does not exist, clone and checkout build branch
if (!fs.existsSync(buildPath)) {
  console.log('OneosourceBuild folder not found. Creating and initializing git...');
  fs.mkdirSync(buildPath); // Create folder
  execSync('git init', { cwd: buildPath, stdio: 'inherit' });
  execSync(`git remote add origin ${repoUrl}`, { cwd: buildPath, stdio: 'inherit' });
  execSync('git fetch origin', { cwd: buildPath, stdio: 'inherit' });
  execSync('git checkout deploy origin/deploy', { cwd: buildPath, stdio: 'inherit' });
}

// Delete all files in buildPath except .git
fs.readdirSync(buildPath).forEach(file => {
  if (file !== '.git') {
    const fullPath = path.join(buildPath, file);
    fs.removeSync(fullPath);
    console.log(`Deleted: ${fullPath}`);
  }
});

// Copy dist → buildPath
fs.copySync(distPath, buildPath);
console.log('Copied dist → OneosourceBuild');

// Git commands
execSync('git add .', { cwd: buildPath, stdio: 'inherit' });
execSync('git gui', { cwd: buildPath, stdio: 'inherit' });

console.log('✅ Post-build tasks completed.');
