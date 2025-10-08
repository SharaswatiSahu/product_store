import * as XLSX from 'xlsx';
import { existsSync, readFileSync } from 'fs';

export interface CredentialEntry {
  'Sl. No': number;
  Email: string;
  Password: string;
}

export const saveCredentialToExcel = (email: string, password: string, filePath: string = 'credentials.xlsx') => {
  let data: CredentialEntry[] = [];

  if (existsSync(filePath)) {
    const workbook = XLSX.read(readFileSync(filePath), { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    data = XLSX.utils.sheet_to_json(sheet);
  }

  const nextSlNo = data.length + 1;

  data.push({
    'Sl. No': nextSlNo,
    Email: email,
    Password: password,
  });

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Credentials');
  XLSX.writeFile(workbook, filePath);
};
