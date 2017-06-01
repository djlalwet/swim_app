import { Swim0601Page } from './app.po';

describe('swim0601 App', () => {
  let page: Swim0601Page;

  beforeEach(() => {
    page = new Swim0601Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
