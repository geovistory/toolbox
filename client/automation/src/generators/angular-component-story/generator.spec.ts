import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';

import { angularComponentStoryGenerator } from './generator';
import { AngularComponentStoryGeneratorSchema } from './schema';

describe('angular-component-story generator', () => {
  let tree: Tree;
  const options: AngularComponentStoryGeneratorSchema = { name: 'test' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await angularComponentStoryGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    expect(config).toBeDefined();
  });
});
