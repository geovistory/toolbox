import { browser, by, element } from 'protractor';

export class GeovistoryClientPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('gv-root h1')).getText();
  }
}
