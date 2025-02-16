const testCase1 = {
  application: "Web Application",
  columns: [
    {
      columnName: "To Do",
      cards: [
        {
          cardName: "Implement user authentication",
          tags: [
            {
              tagName: "Feature" 
            },
            {
              tagName: "High Priority"
            }
          ]
        }
      ]
    }
  ]
};

const testCase2 = {
  application: "Web Application",
  columns: [
    {
      columnName: "To Do",
      cards: [
        {
          cardName: "Fix navigation bug",
          tags: [
            {
              tagName: "Bug" 
            }
          ]
        }
      ]
    }
  ]
};

const testCase3 = {
  application: "Web Application",
  columns: [
    {
      columnName: "In Progress",
      cards: [
        {
          cardName: "Design system updates",
          tags: [
            {
              tagName: "Design" 
            }
          ]
        }
      ]
    }
  ]
};

const testCase4 = {
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

const testCase5 = {
  application: "Mobile Application",
  columns: [
    {
      columnName: "In Progress",
      cards: [
        {
          cardName: "Offline mode",
          tags: [
            {
              tagName: "Feature" 
            },
            {
              tagName: "High Priority"
            }
          ]
        }
      ]
    }
  ]
};

const testCase6 = {
  application: "Mobile Application",
  columns: [
    {
      columnName: "Done",
      cards: [
        {
          cardName: "App icon design",
          tags: [
            {
              tagName: "Design" 
            }
          ]
        }
      ]
    }
  ]
};

const testCaseList = [];
testCaseList.push({name: "Test Case 1", testData: testCase1});
testCaseList.push({name: "Test Case 2", testData: testCase2});
testCaseList.push({name: "Test Case 3", testData: testCase3});
testCaseList.push({name: "Test Case 4", testData: testCase4});
testCaseList.push({name: "Test Case 5", testData: testCase5});
testCaseList.push({name: "Test Case 6", testData: testCase6});

export const testCases = testCaseList;