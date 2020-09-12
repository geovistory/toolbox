import c from 'child_process';
import fs from 'fs';
import path from 'path';
import pgkDir from 'pkg-dir';
import {Warehouse, WarehouseConfig} from './Warehouse';

const appRoot = pgkDir.sync() ?? ''

// Start on remote server (including backups)
export async function start() {
    console.log('joined path', path.join(appRoot, '/deployment/warehouse-compat-list.txt'))

    // reads warhouse compatible commits
    const compatibleWithCommits = fs
        .readFileSync(path.join(appRoot, '/deployment/warehouse-compat-list.txt'))
        .toString()
        .split('\n');
    // reads current commit
    if (!process.env.HEROKU_SLUG_DESCRIPTION) throw new Error('Can\'t find env var HEROKU_SLUG_DESCRIPTION before starting warehouse.')
    const currentCommit = process.env.HEROKU_SLUG_DESCRIPTION.replace('Deploy ', '')

    const config: WarehouseConfig = {
        leveldbFolder: 'leveldb',
        rootDir: path.join(appRoot),
        backups: {
            currentCommit,
            compatibleWithCommits
        }
    }
    const warehouse = new Warehouse(config)
    await warehouse.start();
}


// Start on local dev server (no backups)
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
        leveldbFolder: 'leveldb',
        rootDir: path.join(appRoot),
        backups: {
            currentCommit,
            compatibleWithCommits
        }
    }
    const warehouse = new Warehouse(config)
    await warehouse.start();
}

