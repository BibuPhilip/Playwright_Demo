// Import Playwright's built-in "test" and rename it to "base"
import { test as base } from '@playwright/test';
// Import Page Object classes that represent different pages in the app
import { TodoPage } from './todo-page.js';
import { SettingsPage } from './settings-page.js';

// Declare the types of your fixtures so TypeScript knows what they provide.
type MyFixtures = {

  todoPage: TodoPage;           // Fixture will return an instance of TodoPage
  settingsPage: SettingsPage;   // Fixture will return an instance of SettingsPage
};

// Extend base test by providing "todoPage" and "settingsPage".
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const test = base.extend<MyFixtures>({
    // Define the "todoPage" fixture
  todoPage: async ({ page }, use) => {
    // Set up the fixture.
    const todoPage = new TodoPage(page);  // Create a new TodoPage object by calling its constructor, and passing Playwright's "page" as a parameter
    // and call the methods of the class through the todoPage object
    await todoPage.goto();
    await todoPage.addToDo('item1');
    await todoPage.addToDo('item2');

    // Use the fixture value in the test.
    await use(todoPage);    // The test now has access to this initialized TodoPage

    // Clean up/Tear down the fixture.
    // After the test finishes, clean up by removing all todos
    await todoPage.removeAll();
  },
  // Define the "settingsPage" fixture
  settingsPage: async ({ page }, use) => {
    // Pass a new SettingsPage object to the test
    // (No setup or teardown here, just direct usage)
    await use(new SettingsPage(page));
  }
});
// Export Playwright's "expect" so tests importing this fixture file
// can use the same "expect" for assertions
export { expect } from '@playwright/test';