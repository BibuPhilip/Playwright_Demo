import type { Page } from '@playwright/test';

export class SettingsPage {
  constructor(public readonly page: Page) {
    console.log('Inside Settings Page constructor');
  }

  async switchToDarkMode() {
    console.log('Switching to dark mode');
  }
}