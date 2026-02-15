import {test} from '@playwright/test'
import XLSX from 'xlsx'
import path from 'path'
import { fileURLToPath } from 'url'
const userDataFile = path.join(path.dirname(fileURLToPath(import.meta.url)), '../Mytests/MyData/UserData.xlsx');

test('Read Excel Data',async({})=>{
    const workBook = XLSX.readFile(userDataFile);
    const workSheet = workBook.Sheets["Sheet1"];
    if (!workSheet) throw new Error('Sheet "Sheet1" not found in workbook');
    const xslxToJson = XLSX.utils.sheet_to_json(workSheet);
    console.log(xslxToJson);
})