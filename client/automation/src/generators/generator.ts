import { componentGenerator } from '@nx/angular/generators';
import {
  formatFiles,
  names,
  Tree
} from '@nx/devkit';
import { AngularComponentGeneratorSchema } from './schema';

export async function angularComponentGenerator(
  tree: Tree,
  options: AngularComponentGeneratorSchema
) {

  const componentPath = options.componentFolder.replace(/\/+$/, '');
  const componentFolder = componentPath.split('/').pop();


  await componentGenerator(tree, {
    name: names(componentFolder).className,
    directory: componentPath,
    changeDetection: 'OnPush',
    displayBlock: true,
    prefix: 'gv',
    style: 'scss',
    skipTests: true
  })

  await formatFiles(tree);
}

export default angularComponentGenerator;
