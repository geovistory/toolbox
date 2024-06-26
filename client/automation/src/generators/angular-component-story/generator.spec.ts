import { Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import angularComponentStoryGenerator from './generator';

describe('angular-component-story generator', () => {
  let tree: Tree;
  const libName = 'ng-lib1';
  const storyFile = `${libName}/src/lib/test-button/test-button.component.stories.ts`;
  const componentFolder = `${libName}/src/lib/test-button`
  beforeEach(async () => {
    tree = createTreeWithEmptyWorkspace({ layout: 'apps-libs' });

    tree.write(
      `${libName}/src/lib/test-button/test-button.component.ts`,
      `import { Component, Input } from '@angular/core';

        export type ButtonStyle = 'default' | 'primary' | 'accent';

        @Component({
          selector: 'proj-test-button',
          templateUrl: './test-button.component.html',
          styleUrls: ['./test-button.component.css']
        })
        export class TestButtonComponent {
          @Input('buttonType') type = 'button';
          @Input() style: ButtonStyle = 'default';
          @Input() age?: number;
          @Input() isOn = false;
          @Input() message: string | undefined;
          @Input() anotherProp: any;
          @Input() anotherNeverProp: never;
        }`
    );
  });

  it('should not generate the component stories file when it already exists', async () => {
    tree.write(storyFile, '');
    await angularComponentStoryGenerator(tree, { componentPath: componentFolder });
    expect(tree.read(storyFile, 'utf-8')).toBe('');
  });

  it('should generate the component stories file', async () => {
    await angularComponentStoryGenerator(tree, { componentPath: componentFolder });
    expect(tree.exists(storyFile)).toBe(true);
  });

  it('should generate the right stories file', async () => {
    await angularComponentStoryGenerator(tree, { componentPath: componentFolder });
    expect(tree.read(storyFile)?.toString()).toMatchSnapshot();
  });
});
