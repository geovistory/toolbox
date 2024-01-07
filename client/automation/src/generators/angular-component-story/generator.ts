import {
  Tree,
  formatFiles,
  generateFiles,
  joinPathFragments,
  names
} from '@nx/devkit';
import { getComponentProps } from '../utils/storybook-inputs';
import { AngularComponentStoryGeneratorSchema } from './schema';

export async function angularComponentStoryGenerator(
  tree: Tree,
  options: AngularComponentStoryGeneratorSchema
) {

  const destinationDir = options.componentPath
    .replace(/\/+$/, '') // remove trailing '/'
    .replace(/^\.\//, ''); // remove starting './'

  const pathSegments = destinationDir.split('/');
  const componentFolder = pathSegments[pathSegments.length - 1];
  const name = names(componentFolder).className;
  const projectPath = './' + pathSegments.slice(0, 2).join('/');

  const resolvedOptions = {
    componentFileName: componentFolder + '.component',
    componentName: name + 'Component',
    componentPath: pathSegments.slice(2).join('/'),
    projectPath: projectPath,
    interactionTests: true,
    skipFormat: false
  };

  const templatesDir = joinPathFragments(__dirname, 'files');
  const storyFile = joinPathFragments(
    destinationDir,
    `${resolvedOptions.componentFileName}.stories.ts`
  );


  if (tree.exists(storyFile)) {
    return;
  }

  const props = getComponentProps(
    tree,
    joinPathFragments(destinationDir, `${resolvedOptions.componentFileName}.ts`)
  );

  generateFiles(tree, templatesDir, destinationDir, {
    componentFileName: resolvedOptions.componentFileName,
    componentName: resolvedOptions.componentName,
    componentNameSimple: resolvedOptions.componentFileName.replace('.component', ''),
    interactionTests: resolvedOptions.interactionTests,
    props: props.filter((p) => typeof p.defaultValue !== 'undefined'),
    tmpl: '',
  });

  if (!resolvedOptions.skipFormat) {
    await formatFiles(tree);
  }
}

export default angularComponentStoryGenerator;
