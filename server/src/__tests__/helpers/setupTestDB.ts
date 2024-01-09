import {MaintenanceDbFactory} from './MaintenanceDbFactory';
import {TestDbFactory} from './TestDbFactory';

export async function setupTestDB() {
  await MaintenanceDbFactory.connect();
  await TestDbFactory.disconnect();
  await MaintenanceDbFactory.dropTestDB();
  await MaintenanceDbFactory.createTestDB();
  await TestDbFactory.connect();
  await TestDbFactory.createSchemas();
}
