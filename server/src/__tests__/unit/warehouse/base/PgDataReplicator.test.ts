/* eslint-disable @typescript-eslint/no-invalid-this */
import {Pool, PoolClient} from 'pg';
import {createPoolConfig} from '../../../../utils/databaseUrl';
import {expect} from '@loopback/testlab';
import {PgDataReplicator} from '../../../../warehouse/base/classes/PgDataReplicator';
import {sum} from 'ramda';


describe('PgDataReplicator', function () {
    let pool1: PoolClient
    let pool2: PoolClient

    beforeEach(async function () {
        pool1 = await new Pool(createPoolConfig(process.env.DATABASE_URL)).connect()
        pool2 = await new Pool(createPoolConfig(process.env.WH_DATABASE_URL)).connect()

        const beginSql = `BEGIN;`
        await pool1.query(beginSql)
        await pool2.query(beginSql)

        const createTestTable = `CREATE TEMP TABLE test_table (
            id integer,
            name text
        ) ON COMMIT DROP;`
        await pool1.query(createTestTable)
        await pool2.query(createTestTable)


    })

    afterEach(async function () {
        await Promise.all([pool1.release(), pool2.release()])
    })

    it('should have records in first table', async () => {

        const rows = 100
        await createData(pool1, rows);
        const res = await pool1.query<{count: number}>('SELECT count(id)::int FROM test_table;')

        expect(res?.rows?.[0].count).to.equal(rows)
    })

    describe('replicate 100', function () {
        const count = 100
        beforeEach(async function () {
            await createData(pool1, count)
        })
        it('should replicate table from db1 to db2', async () => {

            await new PgDataReplicator(
                {client: pool1, table: 'test_table'},
                {client: pool2, table: 'test_table'}
            ).replicateTable()

            const res = await pool2.query<{count: number}>('SELECT count(id)::int FROM test_table;')
            expect(res?.rows?.[0].count).to.equal(count)
        })
    })


    describe('replicate 100000', function () {
        this.timeout(10000)
        const count = 100000
        beforeEach(async function () {
            await createData(pool1, count)
        })
        it('should replicate table from db1 to db2 in 10 batches', async () => {

            const stats = await new PgDataReplicator(
                {client: pool1, table: 'test_table'},
                {client: pool2, table: 'test_table'}
            ).replicateTable()

            const res = await pool2.query<{count: number}>('SELECT count(id)::int FROM test_table;')
            expect(res?.rows?.[0].count).to.equal(count)
            expect(stats.length).to.equal(10)

        })
        it('should replicate table from db1 to db2 in 1 batch', async () => {

            const stats = await new PgDataReplicator(
                {client: pool1, table: 'test_table'},
                {client: pool2, table: 'test_table'}
            ).replicateTable(100000)

            const res = await pool2.query<{count: number}>('SELECT count(id)::int FROM test_table;')
            expect(res?.rows?.[0].count).to.equal(count)
            expect(stats.length).to.equal(1)

        })
        it('should replicate table from db1 to db2 in 100 batches', async () => {

            const stats = await new PgDataReplicator(
                {client: pool1, table: 'test_table'},
                {client: pool2, table: 'test_table'}
            ).replicateTable(1000)

            const res = await pool2.query<{count: number}>('SELECT count(id)::int FROM test_table;')
            expect(res?.rows?.[0].count).to.equal(count)
            expect(stats.length).to.equal(100)

        })
    })

    describe('replicate 500000', function () {
        const count = 500000
        beforeEach(async function () {
            await createData(pool1, count)
        })
        it('should replicate table from db1 to db2 in 50 batches', async () => {
            this.timeout(10000)

            const stats = await new PgDataReplicator(
                {client: pool1, table: 'test_table'},
                {client: pool2, table: 'test_table'}
            ).replicateTable()

            const res = await pool2.query<{count: number}>('SELECT count(id)::int FROM test_table;')
            expect(res?.rows?.[0].count).to.equal(count)
            expect(stats.length).to.equal(50)
        })
    })

    describe('replicate with upsert statement counting upserts', function () {
        const count1 = 1000
        const count2 = 1200
        beforeEach(async function () {
            await createData(pool1, count1)
            await createData(pool1, count2)
        })
        it('should replicate table from db1 to db2 having correct nr of upserts', async () => {
            await pool2.query(`
                ALTER TABLE test_table ADD UNIQUE (id);
            `)
            const batchSize = 100
            const stats = await new PgDataReplicator<{count: number}>(
                {client: pool1, table: 'test_table'},
                {client: pool2, table: 'test_table'},
                ['id', 'name'],
                (insertStmt) => `
                    WITH tw1 AS (
                        ${insertStmt}
                        ON CONFLICT (id) DO UPDATE
                        SET name = EXCLUDED.name
                        WHERE  test_table.name <> EXCLUDED.name
                        RETURNING *
                    )
                    SELECT count(*)::int FROM tw1
                `
            ).replicateTable(batchSize)

            expect(stats.length).to.equal((count1 + count2) / batchSize)
            expect(sum(stats.map(s => s.rows?.[0].count))).to.equal(count2)
        })
    })



})




async function createData(pool1: PoolClient, rows = 100) {
    const column1: number[] = [];
    const column2: string[] = [];
    for (let i = 0; i < rows; i++) {
        column1.push(i);
        column2.push('test string');
    }
    await pool1.query(`INSERT INTO test_table (id, name)
        SELECT * FROM UNNEST ($1::int[], $2::text[]) AS t`, [column1, column2]);

    await pool1.query(`ANALYZE  test_table`);
}

