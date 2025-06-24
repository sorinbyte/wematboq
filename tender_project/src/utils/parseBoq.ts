import * as XLSX from 'xlsx';

export interface BoqSheet {
  sheetName: string;
  headers: string[];
  rows: Record<string, any>[];
}

export function parseBoq(fileBuffer: ArrayBuffer): BoqSheet[] {
  const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
  const parsedSheets: BoqSheet[] = [];

  workbook.SheetNames.forEach((sheetName) => {
    const sheet = workbook.Sheets[sheetName];
    const rawJson = XLSX.utils.sheet_to_json<Record<string, any>>(sheet, {
      header: 1, // raw row arrays
      defval: null,
    });

    if (rawJson.length === 0) return;

    // First row = headers
    let headers: string[] = (rawJson[0] as string[]).map((h, i) =>
      h && typeof h === 'string' ? h.trim() : `column_${i}`
    );

    // Remove unnamed headers
    const validIndexes = headers
      .map((h, idx) => ({ h, idx }))
      .filter(({ h }) => h && !h.toLowerCase().startsWith('unnamed') && h !== '');

    headers = validIndexes.map(({ h }) => h);
    const dataRows = rawJson.slice(1);

    const cleanedRows = dataRows
      .map((rowArr) => {
        const obj: Record<string, any> = {};
        validIndexes.forEach(({ idx, h }) => {
          obj[h] = rowArr[idx];
        });
        return obj;
      })
      .filter((row) => row['um']); // Only keep rows that have a value in "um"

    if (cleanedRows.length > 0) {
      parsedSheets.push({
        sheetName,
        headers,
        rows: cleanedRows,
      });
    }
  });

  return parsedSheets;
}