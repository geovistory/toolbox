import * as archiver from 'archiver';
import async from 'async';
import {S3} from 'aws-sdk';
import {createReadStream, createWriteStream, existsSync, mkdirSync} from 'fs';
import path from 'path';
import readdir from 'recursive-readdir';
import {Extract} from 'unzipper';
import {Logger} from '../classes/Logger';

export class Bucketeer {

  private s3: S3
  private bucket: string;
  constructor() {
    this.verifyEnvVars();

    this.s3 = new S3({
      accessKeyId: process.env.BUCKETEER_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.BUCKETEER_AWS_SECRET_ACCESS_KEY,
      region: process.env.BUCKETEER_AWS_REGION,
      // signatureVersion: 'v4'
    });
    if (process.env.BUCKETEER_BUCKET_NAME) {
      this.bucket = process.env.BUCKETEER_BUCKET_NAME
    }
  }

  /**
   * Upload a folder to S3
   * @param rootPath the path to parent directory of folder to upload
   * @param folderName the name of the directory to upload
   * @param s3Key the name of the directory on S3
   */
  async uploadFolder(rootPath: string, folderName: string, s3Key: string) {
    const inputFolderPath = path.resolve(rootPath, folderName)
    const filesToUpload = await this.getFiles(inputFolderPath);

    return new Promise((resolve, reject) => {
      async.eachOfLimit(filesToUpload, 10, async.asyncify(async (filePath: string) => {
        const key = filePath.replace(`${inputFolderPath}/`, `${s3Key}/`);
        return this.uploadFile(filePath, key)
      }), (err) => {
        if (err) {
          return reject(err);
        }
        resolve({result: true});
      });
    });
  }

  async getFiles(dirPath: string) {
    let files: string[] = []
    if (existsSync(dirPath)) files = await readdir(dirPath)
    return files;
  }


  /**
   * Upload a file to bucketeer
   * @param filePath the path to the file to upload
   * @param s3Key the key under which the file is stored in S3
   */
  public uploadFile(filePath: string, s3Key: string): Promise<S3.PutObjectOutput> {
    Logger.msg(this.constructor.name, `uploading: [${filePath}]`)

    return new Promise<S3.PutObjectOutput>((res, rej) => {
      // Configure the file stream and obtain the upload parameters
      const fileStream = createReadStream(filePath);
      fileStream.on('error', function (err) {
        rej({msg: 'File Error', err});
      });
      const params: S3.PutObjectRequest = {
        Key: s3Key,
        Bucket: this.bucket,
        Body: fileStream
      };
      this.s3.putObject(params, function put(err, data) {
        if (err) {
          rej({msg: 'Upload Error', err});
        } else {
          res(data);
        }
      });
    })
  }

  /**
 * Upload a string to a file to bucketeer
 * @param string the string to put in the file to upload
 * @param s3Key the key under which the file is stored in S3
 */
  public uploadStringToFile(string: string, s3Key: string): Promise<S3.PutObjectOutput> {
    Logger.msg(this.constructor.name, `uploading string: [${string}] to file [${s3Key}]`)

    return new Promise<S3.PutObjectOutput>((res, rej) => {
      const params: S3.PutObjectRequest = {
        Key: s3Key,
        Bucket: this.bucket,
        Body: new Buffer(string),
      };
      this.s3.putObject(params, function put(err, data) {
        if (err) {
          rej({msg: 'Upload Error', err});
        } else {
          res(data);
        }
      });
    })
  }

  /**
   * Download a file from bucketeer and save it to the filesystem
   */
  public downloadFile(filePath: string, s3Key: string): Promise<S3.PutObjectOutput> {
    Logger.msg(this.constructor.name, `downloading: [${s3Key}]`)

    return new Promise<S3.GetObjectOutput>((res, rej) => {
      // Configure the file stream
      const file = createWriteStream(filePath);

      const params: S3.GetObjectRequest = {
        Key: s3Key,
        Bucket: this.bucket,

      };

      this.s3.getObject(params).createReadStream()
        .on('end', () => {
          return res();
        })
        .on('error', (err) => {
          return rej(err);
        })
        .pipe(file)

    })
  }


  /**
   * Read a file from bucketeer and return array of strings
   */
  public readFile(s3Key: string): Promise<string[] | undefined> {
    Logger.msg(this.constructor.name, `reading file: [${s3Key}]`)

    return new Promise<string[] | undefined>((res, rej) => {
      // Configure the file stream
      const params: S3.GetObjectRequest = {
        Key: s3Key,
        Bucket: this.bucket,

      };
      const lines: string[] = []
      this.s3.getObject(params).createReadStream()
        .on('data', (line) => {
          lines.push(line.toString())
        })
        .on('end', () => {
          return res(lines);
        })
        .on('error', (err) => {
          return rej(err);
        })

    })
  }


  /**
  * Download a folder from S3
  */
  async downloadFolder(rootPath: string, localFolder: string, s3folder: string) {
    const t = Logger.start(this.constructor.name, `download backup ${s3folder}`)
    const outputFolderPath = path.resolve(rootPath, localFolder)

    const data = await this.listObjects(s3folder)

    if (data.Contents) {
      const fileList = data.Contents
      const dirCheckCache: {[dir: string]: true} = {}
      return new Promise((resolve, reject) => {
        async.eachOfLimit(fileList, 10, async.asyncify(async (file: S3.Object) => {
          const key = file.Key
          if (key) {
            const destination = path.join(outputFolderPath, key.replace(s3folder, ''));
            const dir = path.dirname(destination)
            if (!dirCheckCache[dir] && !existsSync(dir)) {
              mkdirSync(dir, {recursive: true});
              dirCheckCache[dir] = true
            }
            await this.downloadFile(destination, key)
          }
        }), (err) => {
          if (err) {
            return reject(err);
          }
          Logger.itTook(this.constructor.name, t, 'to download')
          resolve({result: true});

        });
      });

    }

  }

  /**
* remove a folder from S3 (recursive)
*/
  async emptyS3Directory(dir: string) {


    const listedObjects = await this.listObjects(dir);

    if (listedObjects?.Contents?.length) {

      const deleteParams: S3.DeleteObjectsRequest = {
        Bucket: this.bucket,
        Delete: {Objects: []}
      };

      listedObjects.Contents.forEach((object) => {
        if (object.Key) deleteParams.Delete.Objects.push({Key: object.Key});
      });
      Logger.msg(this.constructor.name, `deleting ${listedObjects.Contents.length} from [${dir}]`)

      await this.s3.deleteObjects(deleteParams).promise();

      if (listedObjects.IsTruncated) await this.emptyS3Directory(dir);
    }
  }


  /**
   * Call S3 to obtain a list of the objects in the bucket
   */
  listObjects(prefix = '', delimiter?: string) {
    return new Promise<S3.ListObjectsOutput>((res, rej) => {

      const params: S3.ListObjectsRequest = {
        Bucket: this.bucket,
        Prefix: prefix,
      };
      if (delimiter) params.Delimiter = delimiter

      this.s3.listObjectsV2(params, function (err, data) {
        if (err) {
          console.log({msg: "Error", err});
        } else {
          res(data);
        }
      });
    })
  }

  /**
   * Verifies availability of all needed env vars to connect to S3
   */
  private verifyEnvVars() {
    if (!process.env.BUCKETEER_AWS_ACCESS_KEY_ID) {
      throw new Error('You must provide a BUCKETEER_AWS_ACCESS_KEY_ID env var.');
    }
    if (!process.env.BUCKETEER_AWS_SECRET_ACCESS_KEY) {
      throw new Error('You must provide a BUCKETEER_AWS_SECRET_ACCESS_KEY env var.');
    }
    if (!process.env.BUCKETEER_BUCKET_NAME) {
      throw new Error('You must provide a BUCKETEER_BUCKET_NAME env var.');
    }
    if (!process.env.BUCKETEER_AWS_REGION) {
      throw new Error('You must provide a BUCKETEER_AWS_REGION env var.');
    }
  }

  zip(inputDirPath: string, outputZipPath: string) {

    // create a file to stream archive data to.
    const output = createWriteStream(outputZipPath);
    const archive = archiver.create('zip', {
      zlib: {level: 9} // Sets the compression level.
    });

    // listen for all archive data to be written
    // 'close' event is fired only when a file descriptor is involved
    output.on('close', function () {
      console.log(archive.pointer() + ' total bytes');
      console.log('archiver has been finalized and the output file descriptor has closed.');
    });

    // This event is fired when the data source is drained no matter what was the data source.
    // It is not part of this library but rather from the NodeJS Stream API.
    // @see: https://nodejs.org/api/stream.html#stream_event_end
    output.on('end', function () {
      console.log('Data has been drained');
    });

    // good practice to catch warnings (ie stat failures and other non-blocking errors)
    archive.on('warning', function (err) {
      if (err.code === 'ENOENT') {
        // log warning
      } else {
        // throw error
        throw err;
      }
    });

    // good practice to catch this error explicitly
    archive.on('error', function (err) {
      throw err;
    });

    // pipe archive data to the file
    archive.pipe(output);

    // append files from a sub-directory, putting its contents at the root of archive
    archive.directory(inputDirPath, false);

    // finalize the archive (ie we are done appending files but streams have to finish yet)
    // 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
    return archive.finalize();

  };

  async unzip(inputZipPath: string, outputPath: string) {

    // const d = await Open.file(inputZipPath)

    // return d.extract({path: outputPath})
    return new Promise((res, rej) => {

      createReadStream(inputZipPath)
        .pipe(Extract({path: outputPath}))

        .on('entry', entry => {entry.autodrain()})
        .promise()
        .then(() => {
          res(`unzipped:
           ${inputZipPath} --> ${outputPath}`)
        })
        .catch((e) => {
          if (e?.message === 'FILE_ENDED') res(`unzipped:
          ${inputZipPath} --> ${outputPath}`)
          else rej(e)
        });
    })

  }
}

