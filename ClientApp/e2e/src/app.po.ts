import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  navigateToLogIn() {
    return browser.get('/login-page');
  };

  getLogInHeading() {
    return element(by.css('h1')).getText();
  };

  getMainHeading() {
    return element(by.css('app-root h1')).getText();
  }
}
