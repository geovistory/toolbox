import { componentGenerator, componentStoryGenerator, libraryGenerator } from '@nx/angular/generators';
import { Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';

describe('angular-component-story generator', () => {
  let tree: Tree;
  const libName = 'ng-lib1';
  const storyFile = `${libName}/src/lib/test-button/test-button.component.stories.ts`;

  beforeEach(async () => {
    tree = createTreeWithEmptyWorkspace({ layout: 'apps-libs' });

    await libraryGenerator(tree, { name: libName, skipFormat: true });
    await componentGenerator(tree, {
      name: 'test-button',
      project: libName,
      skipFormat: true,
    });

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

    await componentStoryGenerator(tree, {
      componentFileName: 'test-button.component',
      componentName: 'TestButtonComponent',
      componentPath: `src/lib/test-button`,
      projectPath: `${libName}`,
      skipFormat: true,
    });

    expect(tree.read(storyFile, 'utf-8')).toBe('');
  });

  it('should generate the component stories file', async () => {
    await componentStoryGenerator(tree, {
      componentFileName: 'test-button.component',
      componentName: 'TestButtonComponent',
      componentPath: `src/lib/test-button`,
      projectPath: `${libName}`,
      skipFormat: true,
    });

    expect(tree.exists(storyFile)).toBe(true);
  });

  it('should generate the right props', async () => {
    await componentStoryGenerator(tree, {
      componentFileName: 'test-button.component',
      componentName: 'TestButtonComponent',
      componentPath: `src/lib/test-button`,
      projectPath: `${libName}`,
    });

    expect(tree.read(storyFile)?.toString()).toMatchSnapshot();
  });
});
