import { expect, test } from '@playwright/test';

test.describe('ChessBoard', () => {
  test('renders the initial pieces in expected squares', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByTestId('cell-0-0')).toContainText('♜');
    await expect(page.getByTestId('cell-0-4')).toContainText('♚');
    await expect(page.getByTestId('cell-7-4')).toContainText('♔');
    await expect(page.getByTestId('cell-6-3')).toContainText('♙');
  });

  test('moves a piece by selecting then clicking a target square', async ({ page }) => {
    await page.goto('/');

    await page.getByTestId('cell-6-0').click();
    await page.getByTestId('cell-4-0').click();

    await expect(page.getByTestId('cell-6-0')).not.toContainText('♙');
    await expect(page.getByTestId('cell-4-0')).toContainText('♙');
  });

  test('replaces a piece when the destination is occupied', async ({ page }) => {
    await page.goto('/');

    await page.getByTestId('cell-7-3').click();
    await page.getByTestId('cell-0-3').click();

    await expect(page.getByTestId('cell-0-3')).toContainText('♕');
    await expect(page.getByTestId('cell-7-3')).not.toContainText('♕');
  });
});
