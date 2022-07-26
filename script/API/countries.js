import nationality from "./natinality.js";

const URL = "https://restcountries.com/v3.1/alpha?codes="

async function countries(array) {

    const c1 = array[0].country_id;
    const c2 = array[1].country_id;
    const c3 = array[2].country_id;
    let sortedCountries = [c1,c2,c3]
    const response = await fetch(URL+ sortedCountries.join(','))
    const data = await response.json();
    const result  = [];
    sortedCountries.forEach(country => {
       const matchedCountry = data.find(c => c.cca2== country)
        result.push(matchedCountry.flags.png);
    })
    
    return result;
}

export default countries