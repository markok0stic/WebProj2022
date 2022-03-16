import { Shelter } from "./Shelter.js";
import { WebShop } from "./webShop.js";
import { Employee } from "./Employee.js";

//fetch("https://localhost:5001/Shelter/CheckForEmployeeUserPass/{shelterID}/{user}/{pass}")
//.then(value=> {
   // value.json().then(
    //sheltersList = new Boolean(value))
   let petShopList = [];
   
    let ws = new WebShop();
    ws.paintLoginForm(document.body);
    //});

