import { expect, test } from '@playwright/test';

test.describe('ChessBoard', () => {
  test('renders the initial pieces in expected squares', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByTestId('cell-0-0')).toContainText('\u265C');
    await expect(page.getByTestId('cell-0-4')).toContainText('\u265A');
    await expect(page.getByTestId('cell-7-4')).toContainText('\u2654');
    await expect(page.getByTestId('cell-6-3')).toContainText('\u2659');
  });

  test('moves a piece by selecting then clicking a target square', async ({ page }) => {
    await page.goto('/');

    await page.getByTestId('cell-6-0').click();
    await page.getByTestId('cell-4-0').click();

    await expect(page.getByTestId('cell-6-0')).not.toContainText('\u2659');
    await expect(page.getByTestId('cell-4-0')).toContainText('\u2659');
  });

  test('replaces a piece when the destination is occupied', async ({ page }) => {
    await page.goto('/');

    await page.getByTestId('cell-7-3').click();
    await page.getByTestId('cell-0-3').click();

    await expect(page.getByTestId('cell-0-3')).toContainText('\u2655');
    await expect(page.getByTestId('cell-7-3')).not.toContainText('\u2655');
  });
});
