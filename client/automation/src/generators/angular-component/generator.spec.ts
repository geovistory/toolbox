import { Tree, addProjectConfiguration } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';

import { angularComponentGenerator } from './generator';
import { AngularComponentGeneratorSchema } from './schema';

describe('angular-component generator', () => {
  let tree: Tree;
  const componentFolder = `libs/lib1/src/lib/example`;
  const options: AngularComponentGeneratorSchema = { componentPath: componentFolder };

  beforeEach(async () => {
    // ARRANGE
    tree = createTreeWithEmptyWorkspace({ layout: 'apps-libs' });
    addProjectConfiguration(tree, 'lib1', {
      projectType: 'library',
      sourceRoot: 'libs/lib1/src',
      root: 'libs/lib1',
    });
  });

  it('should run successfully', async () => {
    await angularComponentGenerator(tree, options);
    // ASSERT
    expect(
      tree.read('libs/lib1/src/lib/example/example.component.ts', 'utf-8')
    ).toMatchSnapshot('component');
    expect(
      tree.read('libs/lib1/src/lib/example/example.component.html', 'utf-8')
    ).toMatchSnapshot('template');
    expect(
      tree.read('libs/lib1/src/lib/example/example.component.scss', 'utf-8')
    ).toMatchSnapshot('stylesheet');
    expect(
      tree.read('libs/lib1/src/lib/example/example.component.stories.ts', 'utf-8')
    ).toMatchSnapshot('stories');
  });
});
