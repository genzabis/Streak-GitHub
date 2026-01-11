
import fs from 'fs';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
// Fix: Explicitly import 'process' from Node.js built-in module to resolve typing conflicts 
// and ensure methods like exit() are correctly recognized by the environment.
import process from 'node:process';

// Get current directory in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Constants
const TRACKER_FILE = 'streak-tracker.txt';
const JSON_FILE = path.join(__dirname, '../confessions.json');
const MODE = (process.env.STREAK_MODE || 'HONEST').toLowerCase();

/**
 * Checks if there are any commits made today in the local timezone/repository.
 */
function hasCommitToday() {
  try {
    // Get last commit date in ISO format (YYYY-MM-DD)
    const lastCommitDate = execSync('git log -1 --format=%ad --date=short').toString().trim();
    const today = new Date().toISOString().split('T')[0];
    return lastCommitDate === today;
  } catch (error) {
    console.error('Failed to check git log. Is this a git repository?');
    return false;
  }
}

/**
 * Main execution logic
 */
async function run() {
  console.log(`--- GitHub Streak Saver Starting (Mode: ${MODE.toUpperCase()}) ---`);

  if (hasCommitToday()) {
    console.log('✅ Status: Already green today. No action needed.');
    // Fix: Access exit() from the explicitly imported process module
    process.exit(0);
  }

  console.log('⚠️ Status: No commits found for today. Initiating confession protocol...');

  // Read confessions
  let confessions;
  try {
    const rawData = fs.readFileSync(JSON_FILE, 'utf-8');
    confessions = JSON.parse(rawData);
  } catch (error) {
    console.error('Error reading confessions.json:', error.message);
    // Fix: Access exit() from the explicitly imported process module
    process.exit(1);
  }

  // Pick random message
  const pool = confessions[MODE] || confessions['honest'];
  const message = pool[Math.floor(Math.random() * pool.length)];

  // Create/Update tracker file
  const timestamp = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });
  const logEntry = `Streak maintained on ${timestamp} | Message: ${message}\n`;
  
  try {
    fs.appendFileSync(path.join(__dirname, '..', TRACKER_FILE), logEntry);
    
    // Git Ops
    console.log('🚀 Executing Git Commands...');
    execSync('git add .');
    execSync(`git commit -m "${message}"`);
    
    console.log(`✨ Success! Committed with message: "${message}"`);
  } catch (error) {
    console.error('Git operation failed:', error.message);
    // Fix: Access exit() from the explicitly imported process module
    process.exit(1);
  }
}

run();
