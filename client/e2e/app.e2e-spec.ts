import { GeovistoryClientPage } from './app.po';

describe('geovistory-client App', () => {
  let page: GeovistoryClientPage;

  beforeEach(() => {
    page = new GeovistoryClientPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to gv!!');
  });
});
