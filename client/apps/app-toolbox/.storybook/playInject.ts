import { ProviderToken, inject, runInInjectionContext } from '@angular/core';
export declare const ng;

/**
 * Get a Provider by its token in the context of the given canvasElement.
 *
 * This function is typically used in storybook play functions.
 *
 * Example:
  ` play: async ({ canvasElement }) => {
    const facade = await playInject(canvasElement, StateFacade);
    // ... use facade
  }`
 * @param canvasElement
 * @param s
 * @returns
 */
export async function playInject<S>(canvasElement: HTMLElement, s: ProviderToken<S>) {
  const storybookRootElement = canvasElement.getElementsByTagName('storybook-root')[0];
  const injector = ng.getInjector(storybookRootElement);
  return new Promise<S>((res) => {
    runInInjectionContext(injector, () => {
      const injectedInstance = inject(s);
      res(injectedInstance);
    });
  });
}
