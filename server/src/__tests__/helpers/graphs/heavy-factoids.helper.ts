/* eslint-disable @typescript-eslint/camelcase */
import {createSysSystemConfig} from '../atomic/sys-system-config.helper';
import {createRowTable} from '../atomic/tab-row.helper';
import {SysConfigValueMock} from '../data/gvDB/SysConfigValueMock';
import {createDigital} from '../generic/digital.helper';
import {createFactoid, createFactoidMapping} from '../generic/factoid.helper';
import {createPerson} from '../generic/person.helper';
import {createSource} from '../generic/source.helper';
import {createCell, createColumn, createColumnMapping, createRow, createTable, mapCell} from '../generic/table.helper';
import {initDBWithGaetan} from './init.helper';
import readline = require('readline');

const personNb = 100;
const colsNb = 5;
const rowsNb = 100;

export async function createHeavyFactoids() {
    console.log('=== Preparing DB to have Heavy factoids ===');

    const ids = await initDBWithGaetan();
    await createSysSystemConfig(SysConfigValueMock.SYS_CONFIC_VALID)

    //create persons
    const persons: Array<number> = [];
    for (let i = 0; i < personNb; i++) {
        persons.push(await createPerson(ids.projectID, 'Person ' + i));
        readline.cursorTo(process.stdout, 0);
        process.stdout.write('Creating persons... (' + (i + 1) + '/' + personNb + ')');
    }
    readline.cursorTo(process.stdout, 0);
    readline.clearLine(process.stdout, 0);
    console.log('Persons created');


    const source = await createSource(ids.projectID, "Random source");
    console.log('Source created: ' + source);

    const digital = await createDigital(ids.projectID, ids.namespaceID, source);
    console.log('Digital created: ' + digital);

    const cols = [];
    for (let i = 0; i < colsNb; i++) {
        cols.push(await createColumn(ids.namespaceID, digital, 'Column ' + (i + 1)));
        readline.cursorTo(process.stdout, 0);
        process.stdout.write('Creating columns... (' + (i + 1) + '/' + colsNb + ')');
    }
    readline.cursorTo(process.stdout, 0);
    readline.clearLine(process.stdout, 0);
    console.log('Columns created');

    const rows = [];
    await createRowTable(digital)
    for (let i = 0; i < rowsNb; i++) {
        rows.push(await createRow(digital));
        readline.cursorTo(process.stdout, 0);
        process.stdout.write('Creating rows... (' + (i + 1) + '/' + rowsNb + ')');
    }
    readline.cursorTo(process.stdout, 0);
    readline.clearLine(process.stdout, 0);
    console.log('Rows created');

    await createTable(digital);
    console.log('Table cell created')

    const cells: Array<Array<number>> = [];
    for (let i = 0; i < rows.length; i++) {
        cells[i] = [];
        for (let j = 0; j < cols.length; j++) {
            cells[i][j] = await createCell(digital, rows[i], cols[j], 'Cell [' + i + ', ' + j + ']');
            readline.cursorTo(process.stdout, 0);
            process.stdout.write('Creating cells... (' + (i * cols.length + (j + 1)) + '/' + (cols.length * rows.length) + ')');
        }
    }
    readline.cursorTo(process.stdout, 0);
    readline.clearLine(process.stdout, 0);
    console.log('Cells created');

    //create column mappings
    process.stdout.write('Creating column mapping... ')
    await createColumnMapping(cols[0], 21); //the first column is a person: the target of the line
    await createColumnMapping(cols[1], 335); //the first column is a time primitive
    await createColumnMapping(cols[2], 21); //the third column is a person: the mother of the target
    await createColumnMapping(cols[3], 21); //the 4th column is a person: the father of the target
    readline.cursorTo(process.stdout, 0);
    readline.clearLine(process.stdout, 0);
    console.log('Column mapping done');

    //map entities
    const pickPerson = () => persons[Math.round(Math.random() * persons.length)];
    for (let i = 0; i < rowsNb; i++) {
        await mapCell(ids.projectID, cells[i][0], pickPerson());
        await mapCell(ids.projectID, cells[i][2], pickPerson());
        await mapCell(ids.projectID, cells[i][3], pickPerson());
        readline.cursorTo(process.stdout, 0);
        process.stdout.write('Mapping rows... (' + (i + 1) + '/' + rows.length + ')');
    }
    readline.cursorTo(process.stdout, 0);
    readline.clearLine(process.stdout, 0);
    console.log('Cell mapped');

    // await linkDigitalToSource(ids.projectID, source, digital);
    // console.log('Digital is part of the source');






    //create factoids
    process.stdout.write('Creating factoids... ')
    const birth = await createFactoidMapping(digital, 61); // a birth on each row
    await createFactoid(birth, cols[0], 86); //brought into life col1
    await createFactoid(birth, cols[1], 152); //begin of the begin col1
    // await createFactoid(birth, cols[2], 84); //by mother col3
    // await createFactoid(birth, cols[3], 85); //from father col4
    const union = await createFactoidMapping(digital, 633); //a union on each row
    await createFactoid(union, cols[2], 1436);// the union involves the mother
    await createFactoid(union, cols[3], 1436);// the union involves the father
    readline.cursorTo(process.stdout, 0);
    readline.clearLine(process.stdout, 0);
    console.log('Factoids Created');

    console.log('=== DB ready with heavy factoids ===')
}
