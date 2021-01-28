const fs = require('fs');

const fromPathMock = __dirname + '/../src/__tests__/helpers/data/gvDB/';
const toPathMock = __dirname + '/../../client/src/__tests__/helpers/data/auto-gen';

// if I am correct, these MOCK are usefull only for the backend 
// (not exhaustive, they are the ones that had errors in it in the client because an import was not in the SDK)
// because there are from lb4, and they are required in no endpoint
const blacklist = ['DfhApiProfileMock', 'PubCredentialMock', 'TabRowMock', 'WarStatementMock'];

/** pb in:
 * ProAnalysisMock > enum ColDefDefaultType
 * WarEntityPreviewMock > enum CalendarType and Granularity 
 */


initializePath(fromPathMock, toPathMock, 'mock');
autoGenFiles(fromPathMock, toPathMock, 'mock');

///////////////////////////////////////////////////////////////////////////////

function initializePath(from, to, type) {
    if (!fs.existsSync(from)) {
        console.log('> Script was not able to run: the origin path (' + type + ') does not exists <' + from + '>');
        process.exit();
    }
    if (!fs.existsSync(to)) {
        fs.mkdirSync(to, { recursive: true });
        console.log('> Target path (' + type + ') did not exists, it has been created.');
    } else {
        readDir(to).forEach(f => fs.unlinkSync(f));
        fs.rmdirSync(to, { recursive: true });
        fs.mkdirSync(to, { recursive: true });
        console.log('> Target path (' + type + ') existed, it has been cleaned.');
    }
}

function readDir(path) {
    if (path.slice(-1) !== '/') path += '/';
    const files = fs.readdirSync(path);
    let toReturn = [];
    files.forEach(file => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        if (fs.lstatSync(path + file).isDirectory()) toReturn = toReturn.concat(readDir(path + file));
        else toReturn.push(path + file);
    })
    return toReturn;
}

function autoGenFiles(from, to, type) {
    const allFiles = readDir(from);
    process.stdout.write('> Auto generation of ' + type + ' (' + allFiles.length + ' files) ... ');

    allFiles.forEach(path => {
        const fileName = path.replace(from, ''); //can be nasted, it will keep the shape

        if (blacklist.some(avoid => fileName.indexOf(avoid) !== -1)) return;

        let content = fs.readFileSync(path, 'utf8').split('\n');
        content = changeImportModelToSdk(content);
        fs.writeFileSync(to + '/' + fileName, content.join('\n'));
    })
    console.log('Done.');
}

function changeImportModelToSdk(content) {
    const index = content.findIndex(line => line.trim().replace(/"/g, '\'').indexOf('import') === 0 && line.indexOf('/models\'') !== -1);
    if (index !== -1) content[index] = content[index].replace(content[index].substring(content[index].indexOf("'")), "'app/core/sdk-lb4';");
    return content;

}

// ColDefDefaultType >> ColDef
// ColDefDefaultType.entity_label >> 'entity_label' as ColDef.DefaultTypeEnum


// CalendarType >> TimePrimitiveWithCal (import)
// CalendarType.gregorian >> 'gregorian' as TimePrimitiveWithCal.CalendarEnum,


// Granularity >> 
// Granularity['1 year']