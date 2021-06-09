import { AppPage } from './app.po';

describe('App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  //it('should display welcome message', () => {
  //  page.navigateTo();
  //  expect(page.getMainHeading()).toEqual('Hello, world!');
  //});

  it('should display log in heading', () => {
    page.navigateToLogIn();
    expect(page.getLogInHeading()).toEqual('Log In');
  });
});
