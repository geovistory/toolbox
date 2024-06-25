import { ProviderToken } from '@angular/core';
interface HTMLElementInjector extends Element {
  inject: <S>(injectionToken: ProviderToken<S>) => Promise<S>
}
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
  const injectorElement = canvasElement.getElementsByTagName('gv-injector')[0] as HTMLElementInjector;
  return injectorElement.inject(s);
}
