import { join, parse } from 'path';
import { mkdirSync, existsSync } from 'fs';

const ensureDirectoryExistence = (filePath: string) => {
  if (existsSync(filePath)) {
    return true;
  }
  mkdirSync(filePath);
};

export { ensureDirectoryExistence };
