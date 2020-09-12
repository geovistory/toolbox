import {Logger} from '../classes/Logger';
import {Bucketeer} from './Bucketeer';

interface BackupId {
  prefix: string
  isoDate: string
  gitCommit: string
}

export class S3LevelBackup {
  bucketeer: Bucketeer

  backupPrefix: string
  delemiter = '___'
  constructor(
    private rootFolder: string,
    private leveldbFolder = 'leveldb'
  ) {
    this.bucketeer = new Bucketeer
    this.backupPrefix = this.leveldbFolder;
  }

  async createBackup(tmsp: Date, currentCommit: string) {
    Logger.msg(`Getting current git commit`)

    const backupId: BackupId = {
      prefix: this.backupPrefix,
      isoDate: tmsp.toISOString(),
      gitCommit: currentCommit
    }
    Logger.msg(`Created backupId – prefix:${backupId.prefix} isoDate:${backupId.isoDate} gitCommit:${backupId.gitCommit}`)

    // create s3 folder name
    const backupname = this.backupIdToString(backupId)
    Logger.msg(`Created name ${backupname}`)

    // upload folder
    await this.bucketeer.uploadFolder(this.rootFolder, this.leveldbFolder, backupname)
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
    return names
  }

  private backupNameToDate(name: string) {
    const backupId = this.stringToBackupId(name)
    return new Date(backupId.isoDate);
  }

  async downloadLatestBackup(destinationFolder: string = this.leveldbFolder) {
    const backupnames = await this.listBackupsNewestFirst()
    if (backupnames?.length) {
      const backupname = backupnames[0]
      await this.bucketeer.downloadFolder(this.rootFolder, destinationFolder, backupname)
      return this.stringToBackupId(backupname);
    }
  }


  async getLatestBackupId() {
    const backupnames = await this.listBackupsNewestFirst()
    if (backupnames?.length) {
      const backupname = backupnames[0]
      return this.stringToBackupId(backupname);
    }
  }


  async deleteOldBackups() {
    const backupnames = await this.listBackupsNewestFirst()
    if (backupnames?.length > 1) {
      for (let i = 1; i < backupnames.length; i++) {
        const backupname = backupnames[i];
        await this.bucketeer.emptyS3Directory(backupname)
      }
    }
  }

  backupIdToString(id: BackupId): string {
    return [id.prefix, id.isoDate, id.gitCommit].join(this.delemiter)
  }

  stringToBackupId(str: string): BackupId {
    const [prefix, isoDate, gitCommit] = str.replace('/', '').split(this.delemiter)
    return {prefix, isoDate, gitCommit}
  }

}
