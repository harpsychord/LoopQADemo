// @ts-check
import { test, expect } from '@playwright/test';
import { loginPage } from './testPages/loginPage.js'
import { projectPage } from './testPages/projectPage.js'

import { testCases } from './testData/testData.js'
import { logins } from './testData/loginData.js'

logins.forEach(({environment, loginData}) => {
  testCases.forEach(({name, testData}) => {
    test(`${name} on ${environment}`, async ({ page }) => {
  
      const login = new loginPage(page, loginData);
  
      // Navigate to login page.
      await login.goto();
    
      // Authenticate and access application.
      await login.login();
  
      // Navigate to the necessary project.
      const project = new projectPage(page);
      await project.navigateToProject(testData.application);
  
      // Get all of the relevant data.
      const fullData = await project.getColumnData(testData.application);
  
      // We use this to select the column we are expecting to find our card under.
      var columnToFilter = fullData.columns.find(function(column) {
        return column.columnName === testData.columns[0].columnName;
      });
    
      // This can confirm whether or not the correct card is under the correct column.
      var cardToFind = columnToFilter?.cards.find(function(card) {
        return card.cardName === testData.columns[0].cards[0].cardName;
      });

      // Check to see if the card name we found matches what we expect.
      await expect(cardToFind?.cardName, "Card '" + testData.columns[0].cards[0].cardName + "' found under column '" + testData.columns[0].columnName + "'").toContain(testData.columns[0].cards[0].cardName)
    
      var tagsToFind = cardToFind?.tags.filter(function(tag) {
        return tag.tagName;
      });
    
      // Check to see if the card's tag(s) match what we expect.
      await expect(tagsToFind, "Tags: " + JSON.stringify(tagsToFind) + " equals our test tags: " + JSON.stringify(testData.columns[0].cards[0].tags)).toEqual(testData.columns[0].cards[0].tags);
  
    });
  });
})




