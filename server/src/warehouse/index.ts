import c from 'child_process';
import fs from 'fs';
import path from 'path';
import pgkDir from 'pkg-dir';
import {Warehouse, WarehouseConfig} from './Warehouse';

const appRoot = pgkDir.sync() ?? ''

// Use this function on heroku environments
// It starts the warehouse with backups: this requires a bucketeer instance,
// specified by env vars. Additionnaly the warehouse-compat-list is required
// (it's not created by this function, because on heroku .git folder is missing)
export async function start() {

    // reads warhouse compatible commits
    const compatibleWithCommits = fs
        .readFileSync(path.join(appRoot, '/deployment/warehouse-compat-list.txt'))
        .toString()
        .split('\n');

    // reads latest commit
    if (!compatibleWithCommits.length) throw new Error('Can\'t find the latest commit from compatibleWithCommits')
    const currentCommit = compatibleWithCommits[0]

    const config: WarehouseConfig = {
        backups: {
            currentCommit,
            compatibleWithCommits
        }
    }
    const warehouse = new Warehouse(config)
    await warehouse.start();
}


// Use this function on local environments
// Start on local dev server with backups: this requires a bucketeer instance,
// specified by env vars. The function will create the warehouse-compat-list
// (this requires git CLI and .git folder)
export async function startDev() {

    c.execSync(`cd ${path.join(appRoot, '..')} && sh deployment/create-warehouse-compat-list.sh`);

    // reads warhouse compatible commits
    const compatibleWithCommits = fs
        .readFileSync(path.join(appRoot, '../deployment/warehouse-compat-list.txt'))
        .toString()
        .split('\n');

    // reads current commit
    const currentCommit = c.execSync('git rev-parse --short HEAD').toString().replace('\n', '');

    const config: WarehouseConfig = {
        backups: {
            currentCommit,
            compatibleWithCommits
        }
    }
    const warehouse = new Warehouse(config)
    await warehouse.start();
}


// Use this function on local environments
// Cleans the whDB and starts warehouse without backups
// (No bucketeer instance required, everything related to backups is skipped)
export async function cleanAndStartDev() {
    const config: WarehouseConfig = {}
    const warehouse = new Warehouse(config)
    try {
        await warehouse.hardReset('Warehouse reset')
    } catch (e) {console.log(e)}
    await warehouse.start();
}
