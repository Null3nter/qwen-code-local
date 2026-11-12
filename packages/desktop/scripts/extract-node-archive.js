/**
 * Extract a Node.js distribution archive.
 * Git-for-Windows tar treats C:\ paths as remote hosts ("Cannot connect to C").
 */
import { execFileSync } from 'node:child_process';

export function extractNodeArchive(archivePath, destination) {
  if (process.platform === 'win32' && archivePath.toLowerCase().endsWith('.zip')) {
    const psArchive = archivePath.replace(/'/g, "''");
    const psDest = destination.replace(/'/g, "''");
    execFileSync(
      'powershell.exe',
      [
        '-NoProfile',
        '-NonInteractive',
        '-Command',
        `Expand-Archive -LiteralPath '${psArchive}' -DestinationPath '${psDest}' -Force`,
      ],
      { stdio: 'inherit' },
    );
    return;
  }

  const tarArgs = ['-xf', archivePath, '-C', destination];
  if (process.platform === 'win32') {
    tarArgs.unshift('--force-local');
  }
  try {
    execFileSync('tar', tarArgs, { stdio: 'inherit' });
  } catch (error) {
    if (process.platform !== 'win32') throw error;
    execFileSync(
      'tar',
      [
        '-xf',
        archivePath.replace(/\\/g, '/'),
        '-C',
        destination.replace(/\\/g, '/'),
      ],
      { stdio: 'inherit' },
    );
  }
}
