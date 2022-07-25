import getGender from "./API/gender.js"
import getAge from "./API/age.js"
import getNationality from "./API/natinality.js"
import getCountries from "./API/countries.js"

document.addEventListener("click",async ()=>
{
    let name = "ahmad";
    // const gender = await getGender(name)
    // console.log(gender)
    // const age = await getAge(name)
    // console.log(age)
    const natinality = await getNationality(name)
    // console.log(natinality)
    const countries = await  getCountries(natinality);
    console.log(countries)
    
})
