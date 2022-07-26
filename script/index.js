import getGender from "./API/gender.js"
import getAge from "./API/age.js"
import getNationality from "./API/natinality.js"
import getCountries from "./API/countries.js"

renderLogs()

function getLogs() {
    let storage = localStorage;
    const logs = storage.getItem('logs')
    if (!logs) {
        return {};
    }
    return JSON.parse(logs);
}
function renderLogs(){
    const logs = getLogs()
    let save = document.querySelector(".log")
    save.innerHTML = ""
    for (const name in logs) {
        let p = document.createElement("p")
        p.textContent = name
        p.addEventListener("click", ()=>{
            getName(name)
        })
        save.appendChild(p)
        
    }
}

function addNameToLogs(name) {
    const logs = getLogs();
    if (!logs[name]) {
        logs[name] = true;
        localStorage.setItem("logs",JSON.stringify(logs))
    }
    renderLogs()
}



let form = document.querySelector('#formF')
form.addEventListener("submit", async (event) => {
    event.preventDefault()
    const data = new FormData(form)
    const name = data.get("name")
    await getName(name)

})

async function getName(name) {

    const logs = getLogs();
    console.log("logs ", logs)
    const text = document.createElement('h1');
    const text0 = document.createElement('h1');
    const gender = await getGender(name)
    // console.log(gender)
    const age = await getAge(name)
    // console.log(age)
    const natinality = await getNationality(name)
    // console.log(natinality)
    const countries = await getCountries(natinality);
    console.log(countries)

    let ageField = document.querySelector(".testname");
    text.textContent = age;
    ageField.appendChild(text)

    let genderField = document.querySelector('.testgender')
    text0.textContent = gender;
    genderField.appendChild(text0);

    let nationalityField = document.querySelector('.testNatioantly')

    natinality.forEach(element => {
        const text1 = document.createElement('h1');
        text1.textContent = element.country_id
        nationalityField.appendChild(text1)
    });

    let countriesField = document.querySelector('.testFlag')
    countries.forEach(country => {
        const text1 = document.createElement('img');
        text1.src = country;
        countriesField.appendChild(text1)
    })

    addNameToLogs(name)
}

