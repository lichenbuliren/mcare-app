import { McareAppPage } from './app.po';

describe('mcare-app App', function() {
  let page: McareAppPage;

  beforeEach(() => {
    page = new McareAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
