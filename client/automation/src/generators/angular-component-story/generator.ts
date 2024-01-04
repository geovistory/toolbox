import { componentStoryGenerator } from '@nx/angular/generators';
import {
  Tree,
  formatFiles,
  names
} from '@nx/devkit';
import { AngularComponentStoryGeneratorSchema } from './schema';

export async function angularComponentStoryGenerator(
  tree: Tree,
  options: AngularComponentStoryGeneratorSchema
) {

  const componentPath = options.componentPath
    .replace(/\/+$/, '') // remove trailing '/'
    .replace(/^\.\//, ''); // remove starting './'
  const pathSegments = componentPath.split('/');
  const componentFolder = pathSegments[pathSegments.length - 1];
  const componentName = names(componentFolder).className;
  const projectPath = './' + pathSegments.slice(0, 2).join('/');

  await componentStoryGenerator(tree, {
    componentFileName: componentFolder + '.component',
    componentName: componentName + 'Component',
    componentPath: pathSegments.slice(2).join('/'),
    projectPath: projectPath,
    interactionTests: true,
    skipFormat: false
  })
  await formatFiles(tree);
}

export default angularComponentStoryGenerator;
