// interfaces.ts
export interface BoqItem {
  sheetname: string;
  [key: string]: any; // fallback for dynamic keys like flattened `unmapped`
}