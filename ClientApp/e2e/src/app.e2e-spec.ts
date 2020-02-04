import { AppPage } from './app.po';

describe('App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome user', () => {
    page.navigateTo();
    expect(page.getMainHeading()).toEqual('Hello, world!');
  });
});
