import {statSync} from 'fs';
import {Logger} from '../classes/Logger';
import {Bucketeer} from './Bucketeer';
import * as path from 'path';
import {equals} from 'ramda';

interface BackupId {
  prefix: string
  isoDate: string
  gitCommit: string
}
const CURRENT = 'CURRENT'

export class S3LevelBackup {
  bucketeer: Bucketeer

  backupPrefix: string
  delemiter = '___'
  leveldbPath: string
  constructor(
    private rootFolder: string,
    private leveldbFolder = 'leveldb'
  ) {
    this.bucketeer = new Bucketeer
    this.backupPrefix = this.leveldbFolder;
    this.leveldbPath = path.join(rootFolder, leveldbFolder)
  }

  async createBackup(tmsp: Date, currentCommit: string) {
    const backupId: BackupId = {
      prefix: this.backupPrefix,
      isoDate: tmsp.toISOString(),
      gitCommit: currentCommit
    }
    // create s3 folder name
    const backupname = this.backupIdToString(backupId)

    Logger.msg(`Creating backupId ${backupname}`)

    // get file names with sizes of folder
    const folderBefore = await this.getFilesWithSizes(this.leveldbPath)

    // upload folder
    await this.bucketeer.uploadFolder(this.rootFolder, this.leveldbFolder, backupname)

    // get file names with size of folder
    const folderAfter = await this.getFilesWithSizes(this.leveldbPath)

    // Q: did file names and/or size change?
    if (equals(folderBefore, folderAfter)) {
      // A: Now -> backup successfull

      // set this backup as current backup
      await this.bucketeer.uploadStringToFile(backupname, CURRENT);

      Logger.msg(`Backup created! Current backup: ${backupname}`)

    }
    else {
      // A: Yes -> backup potentially corrupt, we don't set it as current backup
      Logger.msg(`WARN: Backup potentially corrupt, not marked as current: ${backupname}`)

    }

  }


  /**
   * returns array of backup-folder names ordered by latest first
   */
  async listBackupsNewestFirst() {
    let names: string[] = []
    // get backup folder names
    const list = await this.bucketeer.listObjects(this.backupPrefix + this.delemiter, '/')
    if (list?.CommonPrefixes?.length) {
      names = list.CommonPrefixes.filter(o => !!o.Prefix).map(o => o.Prefix ?? '')
      names.sort((a, b) => {
        let aDate: Date, bDate: Date;
        if (a) {
          aDate = this.backupNameToDate(a);
        } else return 0
        if (b) {
          bDate = this.backupNameToDate(b);
        } else return 0
        return aDate === bDate ? 0 : aDate > bDate ? -1 : 1;
      })
    }
    return names.map(name => name.replace('/', ''))
  }

  private backupNameToDate(name: string) {
    const backupId = this.stringToBackupId(name)
    return new Date(backupId.isoDate);
  }

  async downloadCurrentBackup(destinationFolder: string = this.leveldbFolder) {
    const backupname = await this.getCurrentBackupName()
    if (backupname) {
      await this.bucketeer.downloadFolder(this.rootFolder, destinationFolder, backupname)
      return this.stringToBackupId(backupname);
    }
  }
  async getCurrentBackupName(): Promise<string | undefined> {
    try {
      const currents = await this.bucketeer.readFile(CURRENT)
      if (currents?.length === 1) {
        return currents[0]
      }

    } catch (error) {
      Logger.err(error)
    }
  }

  async getCurrentBackupId(): Promise<BackupId | undefined> {
    const backupname = await this.getCurrentBackupName()
    if (backupname) return this.stringToBackupId(backupname)
  }


  async deleteUnusedBackups() {
    const backupnames = await this.listBackupsNewestFirst()
    const current = await this.getCurrentBackupName()

    if (backupnames?.length > 1) {
      for (const backupname of backupnames) {
        if (backupname !== current) {
          await this.bucketeer.emptyS3Directory(backupname)
        }
      }
    }
  }


  async deleteLinkToCurrent() {
    await this.bucketeer.uploadStringToFile('', CURRENT);
  }

  backupIdToString(id: BackupId): string {
    return [id.prefix, id.isoDate, id.gitCommit].join(this.delemiter)
  }

  stringToBackupId(str: string): BackupId {
    const [prefix, isoDate, gitCommit] = str.replace('/', '').split(this.delemiter)
    return {prefix, isoDate, gitCommit}
  }

  async getFilesWithSizes(dirPath: string) {
    const arrayOfFiles = await this.bucketeer.getFiles(dirPath)
    const filesWithSizes: {[fileName: string]: number} = {}
    arrayOfFiles.forEach(function (filePath) {
      filesWithSizes[filePath] = statSync(filePath).size
    })
    return filesWithSizes
  }

}
