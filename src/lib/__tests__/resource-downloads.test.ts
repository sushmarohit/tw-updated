import { extractGoogleSpreadsheetId, googleSheetXlsxExportUrl } from '@/lib/resource-downloads';

describe('resource-downloads', () => {
  it('extractGoogleSpreadsheetId parses standard Sheet URLs', () => {
    expect(
      extractGoogleSpreadsheetId('https://docs.google.com/spreadsheets/d/abc123_XYZ/edit')
    ).toBe('abc123_XYZ');
    expect(extractGoogleSpreadsheetId('https://docs.google.com/spreadsheets/d/abc123_XYZ/copy')).toBe(
      'abc123_XYZ'
    );
  });

  it('extractGoogleSpreadsheetId returns null for non-sheet URLs', () => {
    expect(extractGoogleSpreadsheetId('https://example.com/file')).toBeNull();
    expect(extractGoogleSpreadsheetId('')).toBeNull();
  });

  it('googleSheetXlsxExportUrl builds export endpoint', () => {
    expect(googleSheetXlsxExportUrl('abc123')).toBe(
      'https://docs.google.com/spreadsheets/d/abc123/export?format=xlsx'
    );
  });
});
