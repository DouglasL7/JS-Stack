import fs from 'fs';
import fsPromises from 'fs/promises';

import config from './config.js';
import { join, extname } from 'path';

const {
  dir: { publicDirectory },
} = config;

export class Service {
  createFilesStream(filename) {
    return fs.createReadStream(filename);
  }

  async getFileInfo(file) {
    //file = home/index.js
    const fullFilePath = join(publicDirectory, file);
    //Verify if exisit, if not return an erro!!
    await fsPromises.access(fullFilePath);
    const fileType = extreme(fullFilePath);
    return {
      type: fileType,
      name: fullFilePath,
    };
  }
  async getFileStream(file) {
    const { name, type } = await this.getFileInfo(file);
    return {
      stream: this.createFilesStream(name),
      type,
    };
  }
}
