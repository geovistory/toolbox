import type { Tree } from '@nx/devkit';
import { findNodes, getSourceNodes } from '@nx/js';
import { ensureTypescript } from '@nx/js/src/utils/typescript/ensure-typescript';
import type { PropertyDeclaration, SourceFile } from 'typescript';

let tsModule: typeof import('typescript');

export type ArgType = 'text' | 'boolean' | 'number' | 'select';

export interface InputDescriptor {
  name: string;
  type: ArgType;
  defaultValue?: string;
}
export function getTsSourceFile(host: Tree, path: string): SourceFile {
  if (!tsModule) {
    tsModule = ensureTypescript();
  }
  const buffer = host.read(path);
  if (!buffer) {
    throw new Error(`Could not read TS file (${path}).`);
  }
  const content = buffer.toString();
  const source = tsModule.createSourceFile(
    path,
    content,
    tsModule.ScriptTarget.Latest,
    true
  );

  return source;
}

export function getInputPropertyDeclarations(
  tree: Tree,
  path: string
): PropertyDeclaration[] {
  if (!tsModule) {
    tsModule = ensureTypescript();
  }
  const file = getTsSourceFile(tree, path);

  const decorators = getSourceNodes(file).filter(
    (node) => node.kind === tsModule.SyntaxKind.Decorator
  );

  return decorators
    .filter((decorator) =>
      findNodes(decorator, tsModule.SyntaxKind.Identifier).some(
        (node) => node.getText() === 'Input'
      )
    )
    .map((node) => node.parent as PropertyDeclaration);
}

export function getComponentProps(
  tree: Tree,
  componentPath: string,
  getArgsDefaultValueFn: (
    property: PropertyDeclaration
  ) => string | undefined = getArgsDefaultValue,
  useDecoratorName = true
): InputDescriptor[] {
  if (!tsModule) {
    tsModule = ensureTypescript();
  }
  const props = getInputPropertyDeclarations(tree, componentPath).map(
    (node) => {
      const decoratorContent = findNodes(
        findNodes(node, tsModule.SyntaxKind.Decorator).find((n) =>
          n.getText().startsWith('@Input')
        ),
        tsModule.SyntaxKind.StringLiteral
      );
      const name =
        useDecoratorName && decoratorContent.length
          ? !decoratorContent[0].getText().includes('.')
            ? decoratorContent[0].getText().slice(1, -1)
            : node.name.getText()
          : node.name.getText();

      const type = getArgType(node);
      const defaultValue = getArgsDefaultValueFn(node);

      return {
        name,
        type,
        defaultValue,
      };
    }
  );

  return props;
}

export function getArgType(property: PropertyDeclaration): ArgType {
  if (!tsModule) {
    tsModule = ensureTypescript();
  }
  if (property.type) {
    const typeName = property.type.getText();
    const typeNameToArgType: Record<string, ArgType> = {
      string: 'text',
      number: 'number',
      boolean: 'boolean',
    };
    return typeNameToArgType[typeName] || 'text';
  }
  if (property.initializer) {
    const initializerKindToArgType: Record<number, ArgType> = {
      [tsModule.SyntaxKind.StringLiteral]: 'text',
      [tsModule.SyntaxKind.NumericLiteral]: 'number',
      [tsModule.SyntaxKind.TrueKeyword]: 'boolean',
      [tsModule.SyntaxKind.FalseKeyword]: 'boolean',
    };
    return initializerKindToArgType[property.initializer.kind] || 'text';
  }
  return 'text';
}

export function getArgsDefaultValue(property: PropertyDeclaration): string {
  const typeNameToDefault = {
    string: "''",
    number: '0',
    boolean: 'false',
  };
  return property.initializer
    ? property.initializer.getText()
    : property.type
      ? typeNameToDefault[property.type.getText()]
      : "''";
}
