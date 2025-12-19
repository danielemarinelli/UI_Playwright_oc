import fs from 'fs'
import { parse } from 'csv-parse/sync'

export class DataProvider {

    // method that returns data from JSON file 
    static getDataFromJSON(filePath:string){
    let JsonData:any = JSON.parse(fs.readFileSync(filePath,'utf8'))
    return JsonData;
    }

    /*
static getDataFromJSON<T>(filePath: string): T {
    if (!filePath) {
        throw new Error('File path is required for reading JSON data');
    }
    
    try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(fileContent) as T;
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Failed to read or parse JSON file: ${error.message}`);
        }
        throw error;
    }
}  */


    // method that returns data from CSV file
    static getDataFromCSV(filePath:string):string{
    let CSVData:any = parse(fs.readFileSync(filePath),{columns:true,skip_empty_lines:true})
    return CSVData
    }


}