import{test} from "@playwright/test";
import fs from "fs";
import {parse} from "csv-parse/sync";

const records = parse(fs.readFileSync("testdata/testdata.csv"),{
    columns:true,
    skip_empty_lines:true
})

test("Get Data from CSV", async({page})) => {
    console.log(records);
    
 await page.goto("https://demoblaze.com/index.html");
 await page.getByPlaceholder
}

