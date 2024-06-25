import { within } from '@storybook/testing-library';

export function getCdkOverlayCanvas(canvasElement: HTMLElement) {
    const cdkOverlayElement = (canvasElement.parentNode as HTMLElement).getElementsByClassName('cdk-overlay-container')[0] as HTMLElement;
    const cdkOverlay = within(cdkOverlayElement);
    return cdkOverlay;
}
