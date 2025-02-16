const { expect } = require('@playwright/test');

exports.projectPage = class projectPage {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.projectList = page.locator('.overflow-y-auto').locator('.font-medium');
    }

    async navigateToProject(projectName) {

        // Click on the project name.
        await this.projectList.filter({ hasText: projectName }).click();

        // Wait for application to swap over to the relevant project. 
        await this.page.locator('.text-x1', { hasText: projectName }).isVisible();
    }

    async getColumnData(projectName) {

        // Grab our columns.
        const columnList = this.page.locator('.p-4', {has: this.page.locator('.mb-4')});
        const columnCount = await columnList.count();

        var columns = [];
        for (let i = 0; i < columnCount; i++) {
            const columnName = ((await columnList.nth(i).locator('.mb-4').innerText()).split(' (')[0]);

            // This was a tricky one.  While we did find the flex column with mb-2 (the card identifiers)
            // without locating the class 'p-4' we wouldn't be able to iterate over each card.
            const cardList = columnList.nth(i).locator('.flex-col', { has: this.page.locator('.mb-2') }).locator('.p-4');
            const cardCount = await cardList.count();

            var cards = [];
            for (let j = 0; j < cardCount; j++) {

                // Grab the card title/name.
                const cardElement = cardList.nth(j).locator('.mb-2');
                const cardName = await cardElement.innerText();

                // Now we need to grab the tags.
                const cardTags = cardList.nth(j).locator('.mb-3').locator('//span');
                const cardTagCount = await cardTags.count();

                // Iterate over our tags.
                var tags = [];
                for (let k = 0; k < cardTagCount; k++) {
                    const tag = await cardTags.nth(k).innerText();
                    
                    // Add the tags to the array
                    tags.push({ tagName: tag });
                }
                
                // Add the card with their tag(s) to the list of cards.
                cards.push({ cardName: cardName, tags });
            }

            // Add all cards for a given column.
            columns.push({ columnName: columnName, cards });
        }

        // Finally, put all of the column data into our object for the given project/application name.
        var fullData = { application: projectName, columns };
        return fullData;
    }

};