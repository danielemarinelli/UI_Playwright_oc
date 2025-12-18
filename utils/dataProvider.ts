import fs from 'fs'
import { parse } from 'csv-parse/sync'

export class DataProvider {

    // method that returns data from JSON file
    static getTestFromJSON(filePath:string):string{
    let JsonData:string = JSON.parse(fs.readFileSync(filePath,'utf-8'))
    return JsonData
}


    // method that returns data from CSV file
    static getTestFromCSV(filePath:string):string{
    let CSVData:any = parse(fs.readFileSync(filePath),{columns:true,skip_empty_lines:true})
    return CSVData
}


}