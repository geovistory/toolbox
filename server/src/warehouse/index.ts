import {Warehouse, WarehouseConfig} from './Warehouse';
import fs from 'fs'
import c from 'child_process';
import path from 'path';

// Start on remote server (including backups)
export async function start(rootDir: string) {
    // reads warhouse compatible commits
    const compatibleWithCommits = fs
        .readFileSync(path.join(__dirname, '../../deployment/warehouse-compat-list.txt'))
        .toString()
        .split('\n');
    // reads current commit
    if (!process.env.HEROKU_SLUG_DESCRIPTION) throw new Error('Can\'t find env var HEROKU_SLUG_DESCRIPTION before starting warehouse.')
    const currentCommit = process.env.HEROKU_SLUG_DESCRIPTION.replace('Deploy ', '')

    const config: WarehouseConfig = {
        leveldbFolder: 'leveldb',
        rootDir: __dirname,
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

    /**
     * TODO IMPLEMENT CREATEION OF COMPAT LIST
     *  sh ../deployment/create-warehouse-compat-list.sh
     * AND READ IT INTO STRING
     */
    c.execSync(`cd ../ && sh deployment/create-warehouse-compat-list.sh`);

    // reads warhouse compatible commits
    const compatibleWithCommits = fs
        .readFileSync('../deployment/warehouse-compat-list.txt')
        .toString()
        .split('\n');

    // reads current commit
    const currentCommit = c.execSync('git rev-parse --short HEAD').toString().replace('\n', '');

    const config: WarehouseConfig = {
        leveldbFolder: 'leveldb',
        rootDir: __dirname,
        backups: {
            currentCommit,
            compatibleWithCommits
        }
    }
    const warehouse = new Warehouse(config)
    await warehouse.start();
}

