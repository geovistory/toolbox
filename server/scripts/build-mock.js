const fs = require('fs');

const pathMappings = [
  {
    fromPathMock: __dirname + '/../src/__tests__/helpers/data/gvDB/',
    toPathMock:
      __dirname + '/../../client/projects/__test__/data/auto-gen/gvDB',
  },
  {
    fromPathMock: __dirname + '/../src/__tests__/helpers/data/api-requests/',
    toPathMock:
      __dirname + '/../../client/projects/__test__/data/auto-gen/api-requests',
  },
  {
    fromPathMock: __dirname + '/../src/__tests__/helpers/data/api-responses/',
    toPathMock:
      __dirname + '/../../client/projects/__test__/data/auto-gen/api-responses',
  },
  {
    fromPathMock: __dirname + '/../src/__tests__/helpers/data/ontome-profiles/',
    toPathMock:
      __dirname +
      '/../../client/projects/__test__/data/auto-gen/ontome-profiles',
  },
  /** COPY ENUM FILES */
  {
    fromPathMock: __dirname + '/../src/models/enums',
    toPathMock:
      __dirname + '/../../client/projects/__test__/data/auto-gen/enums',
  },
];

// if I am correct, these MOCK are usefull only for the backend
// (not exhaustive, they are the ones that had errors in it in the client because an import was not in the SDK)
// because there are from lb4, and they are required in no endpoint
const blacklist = [
  'DfhApiProfileMock',
  'PubCredentialMock',
  //   'TabRowMock',
  'WarStatementMock',
  //   'TabCellXMock',
];

/** pb in:
 * ProAnalysisMock > enum ColDefDefaultType
 * WarEntityPreviewMock > enum CalendarType and Granularity
 */
for (const pathMap of pathMappings) {
  initializePath(pathMap.fromPathMock, pathMap.toPathMock, 'mock');
  autoGenFiles(pathMap.fromPathMock, pathMap.toPathMock, 'mock');
}

///////////////////////////////////////////////////////////////////////////////

function initializePath(from, to, type) {
  console.log('> copy from: ' + from);
  console.log('         to: ' + to);
  if (!fs.existsSync(from)) {
    console.log(
      '> Script was not able to run: the origin path (' +
        type +
        ') does not exists <' +
        from +
        '>',
    );
    process.exit();
  }
  if (!fs.existsSync(to)) {
    fs.mkdirSync(to, {recursive: true});
    console.log(
      '> Target path (' + type + ') did not exists, it has been created.',
    );
  } else {
    readDir(to).forEach(f => fs.unlinkSync(f));
    fs.rmdirSync(to, {recursive: true});
    fs.mkdirSync(to, {recursive: true});
    console.log('> Target path (' + type + ') existed, it has been cleaned.');
  }
}

function readDir(path) {
  if (path.slice(-1) !== '/') path += '/';
  const files = fs.readdirSync(path);
  let toReturn = [];
  files.forEach(file => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    if (fs.lstatSync(path + file).isDirectory())
      toReturn = toReturn.concat(readDir(path + file));
    else toReturn.push(path + file);
  });
  return toReturn;
}

function autoGenFiles(from, to, type) {
  const allFiles = readDir(from);
  process.stdout.write(
    '> Auto generation of ' + type + ' (' + allFiles.length + ' files) ... ',
  );

  allFiles.forEach(path => {
    const fileName = path.replace(from, ''); //can be nasted, it will keep the shape

    if (blacklist.some(avoid => fileName.indexOf(avoid) !== -1)) return;

    let content = fs.readFileSync(path, 'utf8').split('\n');
    content = changeImportEnumsToSdk(content);
    content = changeImportModelToSdk(content);
    // content = treatEnum(
    //   content,
    //   'ColDef',
    //   'ColDefDefaultType',
    //   "'${param}' as ColDef.DefaultTypeEnum",
    // );
    // content = treatEnum(
    //   content,
    //   'TimePrimitiveWithCal',
    //   'CalendarType',
    //   "'${param}' as TimePrimitiveWithCal.CalendarEnum",
    // );

    // content = treatEnum(
    //   content,
    //   'SysConfigValueObjectType',
    //   'TrueEnum',
    //   "'${param}'",
    // );

    // content = treatEnumSpecial(
    //   content,
    //   '',
    //   'Granularity',
    //   '${param} as TimePrimitiveWithCal.DurationEnum',
    // );
    fs.writeFileSync(to + '/' + fileName, content.join('\n'));
  });
  console.log('Done.');
}
function changeImportEnumsToSdk(content) {
  return content.map(line => {
    if (
      line.trim().replace(/"/g, "'").indexOf('import') === 0 &&
      line.indexOf('/models/enums') !== -1
    ) {
      const enumName = line.match(/(?<=\{)(.*?)(?=\})/)[0];
      line = line.replace(
        line.substring(line.indexOf('from ') + 5),
        `'../enums/${enumName}';`,
      );
    }
    return line;
  });
}

function changeImportModelToSdk(content) {
  return content.map(line => {
    if (
      line.trim().replace(/"/g, "'").indexOf('import') === 0 &&
      line.indexOf('/models') !== -1
    ) {
      line = line.replace(
        line.substring(line.indexOf('from ') + 5),
        "'@kleiolab/lib-sdk-lb4';",
      );
    }
    return line;
  });
}

//////////////////////////
// Be carefull: to treat theses specail cases, enums have to be correctly formatted:
//          the import has to be in the same line as <<import {...}  from '../../../../models';>>
//          when using it, has to end with a ',' like: <<            defaultType: ColDefDefaultType.entity_label,>>
//////////////////////////

//for 'normal Enum' such as <ColDefDefaultType.entity_label>
function treatEnum(content, importName, toRemove, toReplace) {
  return content.map(line => {
    if (line.trim().indexOf('import') === 0 && line.indexOf(toRemove) !== -1)
      return line.replace(toRemove, importName);
    else if (line.indexOf(toRemove + '.') !== -1) {
      const beginParam = line.indexOf(toRemove + '.') + toRemove.length + 1;
      let endParam = line.indexOf(',', beginParam);
      if (endParam === -1) endParam = line.length;
      const param = line.substring(beginParam, endParam);
      const newStr = toReplace.replace('${param}', param);
      const oldStr = line.substring(line.indexOf(toRemove + '.'), endParam);
      return line.replace(oldStr, newStr);
    } else return line;
  });
}

//for special enums such as <Granularity['1 year']>
function treatEnumSpecial(content, importName, toRemove, toReplace) {
  return content.map(line => {
    if (line.trim().indexOf('import') === 0 && line.indexOf(toRemove) !== -1)
      return line.replace(toRemove, importName);
    else if (line.indexOf(toRemove + '[') !== -1) {
      const beginParam = line.indexOf(toRemove + '[') + toRemove.length + 1;
      let endParam = line.indexOf(']', beginParam);
      if (endParam === -1) endParam = line.length;
      const param = line.substring(beginParam, endParam);
      const newStr = toReplace.replace('${param}', param);
      const oldStr = line.substring(line.indexOf(toRemove + '['), endParam + 1);
      return line.replace(oldStr, newStr);
    } else return line;
  });
}
