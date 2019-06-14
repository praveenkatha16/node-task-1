import printPlanetNames from "./planets";
import { csvToJson } from "./csv-to-json";
import { jsonToCsv } from "./json-to-csv";

//Task 1

printPlanetNames(1, 10);

//Task 2

const csv = `Device Name,Platform,OS Version,Portrait Width,Landscape Width,Release Date
Acer Iconia Tab A1-810,Android,4.2.2,768,1024,2013-05
Acer Iconia Tab A100,Android,4.0.3,800,2013-05
Acer Iconia Tab A101,Android,3.2.1,600,1024,2011-05
Acer Iconia Tab A200,Android,4.0.3,800,1280,2012-01
Acer Iconia Tab A500,Android,4.0.3,648,1280,2011-04
Acer Iconia Tab A501,Android,3.2,800,1280,2011-04
ACER Liquid E2,Android,4.2.1,360,640,2013-05`;

const json = csvToJson(csv);
console.log(csvToJson(csv));

//Task 3
console.log(csv === jsonToCsv(json));