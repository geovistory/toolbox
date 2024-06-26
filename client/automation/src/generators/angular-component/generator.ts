import { componentGenerator } from '@nx/angular/generators';
import {
  Tree,
  formatFiles,
  names
} from '@nx/devkit';
import angularComponentStoryGenerator from '../angular-component-story/generator';
import { AngularComponentGeneratorSchema } from './schema';

export async function angularComponentGenerator(
  tree: Tree,
  options: AngularComponentGeneratorSchema
) {

  const componentPath = options.componentPath
    .replace(/\/+$/, '') // remove trailing '/'
    .replace(/^\.\//, ''); // remove starting './'
  const pathSegments = componentPath.split('/');
  const componentFolder = pathSegments[pathSegments.length - 1];
  const componentName = names(componentFolder).className;

  await componentGenerator(tree, {
    name: componentName,
    directory: './' + pathSegments.slice(0, -1).join('/'),
    export: false,
    standalone: true,
    changeDetection: 'OnPush',
    displayBlock: true,
    prefix: 'gv',
    style: 'scss',
    skipTests: true,
  })

  await angularComponentStoryGenerator(tree, options)

  await formatFiles(tree);
}

export default angularComponentGenerator;
