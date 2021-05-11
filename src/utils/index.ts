import { mkdirSync, existsSync } from 'fs';
import AppError from './AppError';
import APIPagination from './pagination';

const ensureDirectoryExistence = (filePath: string) => {
  if (existsSync(filePath)) {
    return true;
  }
  mkdirSync(filePath);
};

export { ensureDirectoryExistence, AppError, APIPagination };
