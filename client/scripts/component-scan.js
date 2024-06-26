/**
 * This helper script prints two lists to the console
 * - components with change detection strategy = OnPush
 * - components with default change detection strategy
 */
const ts = require('typescript');
const fs = require('fs');
const path = require('path');

const projectRoot = './apps/app-toolbox'; // Replace with your project's root directory

function findComponents(directory) {
  const fileNames = getComponentFileNames(directory);
  const onPushComponents = [];
  const defaultComponents = [];

  fileNames.forEach((fileName) => {
    const sourceFile = ts.createSourceFile(
      fileName,
      fs.readFileSync(fileName, 'utf-8'),
      ts.ScriptTarget.Latest
    );

    ts.forEachChild(sourceFile, (node) => {
      if (ts.isClassDeclaration(node) && hasComponentDecorator(node)) {
        const changeDetectionStrategy = getChangeDetectionStrategy(node);
        if (changeDetectionStrategy === 'OnPush') {
          onPushComponents.push({
            name: node.name.text,
            changeDetection: changeDetectionStrategy,
          });
        } else {
          defaultComponents.push({
            name: node.name.text,
            changeDetection: changeDetectionStrategy,
          });
        }
      }
    });
  });
  return { defaultComponents, onPushComponents };
}

function hasComponentDecorator(classNode) {
  return (
    classNode.modifiers &&
    classNode.modifiers.some((decorator) => {
      return (
        decorator.kind === 169 &&
        decorator.expression &&
        decorator.expression.expression &&
        decorator.expression.expression.escapedText === 'Component'
      );
    })
  );
}

function getChangeDetectionStrategy(classNode) {
  const decorator = classNode.modifiers.find(
    (d) =>
      d.kind === 169 &&
      d.expression &&
      d.expression.expression &&
      d.expression.expression.escapedText === 'Component'
  );
  if (decorator) {
    const prop = decorator.expression.arguments[0].properties.find(
      (p) => p.name.escapedText === 'changeDetection'
    );
    if (prop) {
      return prop.initializer.name.escapedText;
    }
  }
  return 'Default';
}

function getComponentFileNames(directory) {
  const result = [];
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const filePath = path.join(directory, file);
    const stat = fs.lstatSync(filePath);
    if (stat.isDirectory()) {
      result.push(...getComponentFileNames(filePath));
    } else if (filePath.endsWith('.ts') && !filePath.endsWith('.spec.ts')) {
      result.push(filePath);
    }
  }
  return result;
}

function main() {
  const { onPushComponents, defaultComponents } = findComponents(projectRoot);
  console.log(
    onPushComponents.length +
      ' Components with Change Detection Strategy OnPush:'
  );
  onPushComponents.forEach((component) => {
    console.log(`${component.name}`);
  });

  console.log(
    defaultComponents.length +
      ' Components with Default Change Detection Strategy:'
  );
  defaultComponents.forEach((component) => {
    console.log(`${component.name}`);
  });
}

main();
