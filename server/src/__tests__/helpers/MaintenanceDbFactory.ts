import {MaintenanceDbDataSource} from '../../datasources/maintenance.datasource';


export class MaintenanceDbFactory {
  static datasource: MaintenanceDbDataSource;

  static async connect() {
    MaintenanceDbFactory.datasource = new MaintenanceDbDataSource();
    return this.datasource.connect()
  }

  static async disconnect() {
    await this.ensureConnected()
    return MaintenanceDbFactory?.datasource.disconnect();
  }

  static async dropTestDB() {
    await this.ensureConnected()
    await MaintenanceDbFactory.datasource.execute('DROP DATABASE IF EXISTS gv_test_db;');
  }

  static async createTestDB() {
    await this.ensureConnected()
    await MaintenanceDbFactory.datasource.execute('CREATE DATABASE gv_test_db;');
  }

  static async ensureConnected() {
    if (this.datasource?.connected) return;
    if (this.datasource) return this.datasource.connect()
    return this.connect()
  }

}
