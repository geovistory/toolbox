
import leveldown from 'leveldown'
import levelup from 'levelup'

/**
 * This creates the level database that can be imported
 * throughout the app in order to use the database
 */
// export const leveldbpath = './leveldb';
// export const leveldb = levelup(leveldown('./leveldb'))

/**
 * Other db implementations
 */

// import sqlite3 from 'sqlite3'
// import r from 'rethinkdb'
// import { LevelUp } from 'levelup'
// const levelRocksdb = require('level-rocksdb')


// export const rocksdb: LevelUp = levelRocksdb('./rocksdb')


// const v = sqlite3.verbose()
// export const sqlite3db = new v.Database('sqlite')
// sqlite3db.serialize()


// export let rethinkdbConn: r.Connection | null = null
// export async function createRethinkdbConnection() {
//     const conn = await r.connect({ host: 'localhost', port: 28015 })
//     await r.dbCreate('war').run(conn)
//     rethinkdbConn = conn;
//     return conn;
// }
