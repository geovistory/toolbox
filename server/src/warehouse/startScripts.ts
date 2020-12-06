import c from 'child_process';
import fs from 'fs';
import path from 'path';
import pgkDir from 'pkg-dir';
import {createWarehouse} from './createWarehouse';
import {WarehouseConfig, Warehouse} from './Warehouse';
import {PEntityService} from './primary-ds/entity/PEntityService';
import {PEdgeService} from './primary-ds/edge/PEdgeService';
import {REdgeService} from './primary-ds/edge/REdgeService';
import {REntityService} from './primary-ds/entity/REntityService';
import {ProClassFieldsConfigService} from './primary-ds/ProClassFieldsConfigService';
import {PPropertyService} from './primary-ds/property/PPropertyService';
import {ProProjectService} from './primary-ds/ProProjectService';
import {DfhPropertyLabelService} from './primary-ds/DfhPropertyLabelService';
import {ProPropertyLabelService} from './primary-ds/ProPropertyLabelService';
import {ProEntityLabelConfigService} from './primary-ds/ProEntityLabelConfigService';
import {DfhOutgoingPropertyService} from './primary-ds/DfhOutgoingPropertyService';
import {PClassService} from './primary-ds/class/PClassService';
import {DfhClassLabelService} from './primary-ds/DfhClassLabelService';
import {ProClassLabelService} from './primary-ds/ProClassLabelService';
import {IdentifyingPropertyService} from './aggregator-ds/identifying-property/IdentifyingPropertyService';
import {PClassFieldLabelService} from './aggregator-ds/class-field-label/p-class-field-label/PClassFieldLabelService';
import {PEntityLabelService} from './aggregator-ds/entity-label/p-entity-label/PEntityLabelService';
import {REntityLabelService} from './aggregator-ds/entity-label/r-entity-label/REntityLabelService';
import {PClassLabelService} from './aggregator-ds/class-label/p-class-label/PClassLabelService';
import {PEntityFullTextService} from './aggregator-ds/entity-full-text/p-entity-full-text/PEntityFullTextService';

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
    const warehouse = createWarehouse(config).get(Warehouse)
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
    const warehouse = createWarehouse(config).get(Warehouse)
    await warehouse.start();
}


// Use this function on local environments
// Cleans the whDB and starts warehouse without backups
// (No bucketeer instance required, everything related to backups is skipped)
export async function cleanAndStartDev() {
    const config: WarehouseConfig = {}
    const warehouse = createWarehouse(config, {
        primaryDataServices: [
            PEntityService,
            PEdgeService,
            REdgeService,
            REntityService,
            ProClassFieldsConfigService,
            PPropertyService,
            ProProjectService,
            DfhPropertyLabelService,
            ProPropertyLabelService,
            ProEntityLabelConfigService,
            DfhOutgoingPropertyService,
            PClassService,
            DfhClassLabelService,
            ProClassLabelService
        ],
        aggDataServices: [
            IdentifyingPropertyService,
            PClassFieldLabelService,
            PEntityLabelService,
            REntityLabelService,
            PClassLabelService,
            PEntityFullTextService
        ],
    }).get(Warehouse)
    const client = await warehouse.pgPool.connect()
    await client.query(`drop schema if exists ${warehouse.schemaName} cascade;`)
    client.release()
    await warehouse.start();
}


