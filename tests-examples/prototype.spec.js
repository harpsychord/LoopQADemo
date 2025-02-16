// @ts-check
import { test, expect } from '@playwright/test';

const testObject = {
  application: "Mobile Application",
  columns: [
    {
      columnName: "To Do",
      cards: [
        {
          cardName: "Push notification system",
          tags: [
            {
              tagName: "Feature" 
            }
          ]
        }
      ]
    }
  ]
};

test('Login Test', async ({ page }) => {

  await page.goto('https://animated-gingersnap-8cf7f2.netlify.app/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle('Vite + React + TS');

  // Username input.
  const usernameInput = page.getByLabel('Username');
  await usernameInput.fill('admin');

  // Password input
  const passwordInput = page.getByLabel('Password');
  await passwordInput.fill('password123');

  // Click login
  const loginButton = page.getByRole('button', {'name': 'Sign in'});
  await loginButton.click();

  // Need to wait for new page after logging in.
  await page.locator('.overflow-y-auto').isVisible();

  // For class 'overflow-y-auto'
  // Class 'font-medium' defines the projects - will need to click on this.
  const projectList = page.locator('.overflow-y-auto').locator('.font-medium');
  
  //console.log(await projectList.count());
  //await expect(projectList).toHaveCount(3);

  await projectList.filter({hasText: testObject.application}).click();

  // Wait for application to swap over to the relevant project. 
  await page.locator('.text-x1', {hasText: testObject.application}).isVisible();

  // Class 'mb-4' defines the status columns
  // Class 'mb-2' defines the cards under each column
  // Class 'mb-3' defines the tags under each card

  // TODO: Grab the user and date of the card.  Will not implement for this MVP.
  // Class 'lucide-user' defines the author but it is a sibling of the actual author text label
  // Class 'lucide-calendar' defines the date but it is a sibling of the actual datetime label

  // Let's scrape the screen once and then we can validate.
  const columnList = page.locator('.p-4', {has: page.locator('.mb-4')});
  const columnCount = await columnList.count();

  //console.log(columnCount);

  // Iterate over each column.
  var columns = [];
  for (let i = 0; i < columnCount; i++){
    const columnName = ((await columnList.nth(i).locator('.mb-4').innerText()).split(' (')[0]);
    //console.log(columnName);
    
    const cardList = columnList.nth(i).locator('.flex-col', {has: page.locator('.mb-2')});
    const cardCount = await cardList.count();
    //console.log('card count = ' +  cardCount);

    var cards = [];
    for (let j = 0; j < cardCount; j++){

      const cardElement = cardList.nth(j).locator('.mb-2');
      const cardName = await cardElement.innerText();
      //console.log(await cardElement.innerText());

      // Now we need to grab the tags
      const cardTags = cardList.nth(j).locator('.mb-3').locator('//span');
      const cardTagCount = await cardTags.count();
      //console.log(cardTagCount);

      var tags = [];
      for (let k = 0; k < cardTagCount; k++){
        const tag = await cardTags.nth(k).innerText();
        tags.push({tagName: tag});
        //console.log(tag);
      }

      cards.push({cardName: cardName, tags});
    }
      columns.push({columnName: columnName, cards});
  }

  var fullData = {application: testObject.application, columns};

  //console.log(JSON.stringify(fullData, null, "\t"));
  
  /*
  testObject.columns.forEach(currentColumn => {
      var columnToFilter = fullData.columns.find(function(column){
        return column.columnName === currentColumn.columnName;
      });
  });
  */

  
  // We use this to select the column.
  var columnToFilter = fullData.columns.find(function(column) {
    return column.columnName === testObject.columns[0].columnName;
  });

  // This can confirm whether or not the correct card is under the correct column.
  var cardToFind = columnToFilter?.cards.find(function(card) {
    return card.cardName === testObject.columns[0].cards[0].cardName;
  });

  var tagsToFind = cardToFind?.tags.filter(function(tag) {
    return tag.tagName;
  });

  //await expect(cardToFind?.cardName).toContain(testObject.columns[0].cards[0].cardName)
 
  //console.log(cardToFind?.tags)

  //console.log(testObject.columns[0].cards[0].tags)

  //testObject.columns[0].cards[0].tags.forEach((tag) => expect(cardToFind?.tags).toContain([tag]))

  await expect(tagsToFind).toEqual(testObject.columns[0].cards[0].tags);

  


  /* 
      Grab each status column 
        Grab each item card under it and for each item card
          Grab all tags, author, and date

    Save this as a JSON object.

    Use a JSON object for driving our tests.  
    Have it navigate to the project.
    Then scrape the screen as above.
    And finally, for each item card:
      Validate the name
      Validate each tag
      Validate author and dateza
  */
});