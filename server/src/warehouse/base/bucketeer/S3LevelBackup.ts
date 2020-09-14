import {Logger} from '../classes/Logger';
import {Bucketeer} from './Bucketeer';

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
  constructor(
    private rootFolder: string,
    private leveldbFolder = 'leveldb'
  ) {
    this.bucketeer = new Bucketeer
    this.backupPrefix = this.leveldbFolder;
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

    // upload folder
    await this.bucketeer.uploadFolder(this.rootFolder, this.leveldbFolder, backupname)

    // set this backup as current backup
    await this.bucketeer.uploadStringToFile(backupname, CURRENT);

    Logger.msg(`Backup created! Current backup: ${backupname}`)
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

}
