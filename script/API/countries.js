import nationality from "./natinality.js";

const URL = "https://restcountries.com/v3.1/alpha?codes="

async function countries(array) {
    let params = [array[0].country_id,array[1].country_id,array[2].country_id]
    const response = await fetch(URL+params[0]+","+params[1]+','+params[2])
    const data = await response.json();
    let flagsUrl = [data[0].flags.png,data[1].flags.png,data[2].flags.png]
return flagsUrl
}

export default countries