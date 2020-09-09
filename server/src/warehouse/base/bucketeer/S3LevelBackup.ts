import {Bucketeer} from './Bucketeer';

export class S3LevelBackup {
  bucketeer: Bucketeer

  backupPrefix: string
  delemiter = '_'
  constructor(
    private rootFolder = __dirname,
    private leveldbFolder = 'leveldb'
  ) {
    this.bucketeer = new Bucketeer
    this.backupPrefix = this.leveldbFolder;
  }

  async createBackup(tmsp: Date) {
    // create s3 folder name
    const backupname = this.backupPrefix + this.delemiter + tmsp.toISOString();
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
    const isoTime = name.replace(this.backupPrefix + this.delemiter, '').replace('/', '');
    return new Date(isoTime);
  }

  async downloadLatestBackup(destinationFolder: string = this.leveldbFolder) {
    const backupnames = await this.listBackupsNewestFirst()
    if (backupnames?.length) {
      const backupname = backupnames[0]
      await this.bucketeer.downloadFolder(this.rootFolder, destinationFolder, backupname)
      return this.backupNameToDate(backupname);
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



}
