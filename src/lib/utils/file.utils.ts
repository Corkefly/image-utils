import { globSync } from 'glob';
import { posix, win32 } from 'path';

const winSeparatorRegex = new RegExp(`\\${win32.sep}`, 'g');

export function getFilePaths(folderName: string): string[] {
  let filePaths: string[] = [];

  try {
    filePaths = globSync(`${folderName}/**/*`.replace(winSeparatorRegex, posix.sep));
  } catch (e) {
    console.error(e);
    process.exit(0);
  }

  return filePaths;
}

export function getImagePaths(folderName: string, format: string[] = ['jpg', 'jpeg', 'png']): string[] {
  let imagePaths: string[] = [];

  try {
    imagePaths = globSync(`${folderName}/**/*.{${format.join()}}`.replace(winSeparatorRegex, posix.sep));
  } catch (e) {
    console.error(e);
    process.exit(0);
  }

  return imagePaths;
}
