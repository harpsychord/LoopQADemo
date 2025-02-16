const { expect } = require('@playwright/test');

exports.loginPage = class loginPage {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page, loginData) {
      this.page = page;
      this.loginData = loginData;
      this.usernameInput = page.getByLabel('Username');
      this.passwordInput = page.getByLabel('Password');
      this.loginButton = page.getByRole('button', {'name': 'Sign in'});
    }
  
    async goto() {
      await this.page.goto(this.loginData.loginPageURI);

      // Wait for our page to load.
      await expect(this.page).toHaveTitle('Vite + React + TS');
    }

    async login() {

        // Fill in the login information.
        await this.usernameInput.fill(this.loginData.username);
        await this.passwordInput.fill(this.loginData.password);
        await this.loginButton.click();

        // Wait for the main application to load after login.
        await this.page.locator('.overflow-y-auto').isVisible();
    }
  };