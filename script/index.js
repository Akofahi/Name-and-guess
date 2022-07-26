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
function renderLogs() {
    const logs = getLogs()
    let save = document.querySelector(".logs")
    save.innerHTML = ""
    for (const name in logs) {
        let p = document.createElement("p")
        p.textContent = name
        p.addEventListener("click", () => {
            getName(name)
        })
        save.appendChild(p)

    }
}

function addNameToLogs(name) {
    const logs = getLogs();
    if (!logs[name]) {
        logs[name] = true;
        localStorage.setItem("logs", JSON.stringify(logs))
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
    // console.log("logs ", logs)
    
    const text = document.createElement('p');
    const text0 = document.createElement('p');
    const text1 = document.createElement('p');
    const genderImg = document.createElement('img')
    const promises = [getGender(name), getAge(name), getNationality(name)]
    const res = await Promise.all(promises)
    const [gender,age,natinality] = res

    // const gender = await getGender(name)
    // // console.log(gender)
    // const age = await getAge(name)
    // // console.log(age)
    // const natinality = await getNationality(name)
    // // console.log(natinality)


    // This depends on natinality so its not in the promise 
    const countries = await getCountries(natinality);
    // console.log(countries)

    let nameField = document.querySelector('.name')
    text1.textContent = name
    nameField.innerHTML = "<h1>Name: </h1>"
    nameField.appendChild(text1)

    let ageField = document.querySelector(".age");
    text.textContent = age;
    ageField.innerHTML = '<h1>Age: </h1>'
    ageField.appendChild(text)

    let genderField = document.querySelector('.gender')
    text0.textContent = gender;
    genderField.innerHTML = "<h1>Gender: </h1>"
    genderField.appendChild(text0);

    let country = document.querySelector('.countries')
    country.innerHTML = ''
    const array = []
    for (let i = 0; await natinality.length > i; i++) {
        let div = document.createElement('div')
        let img = document.createElement('img')
        let p = document.createElement('p')
        array.push([await natinality[i].country_id, await countries[i]])
        p.textContent = array[i][0]
        img.src = array[i][1]
        console.log(p.textContent)
        div.appendChild(img)
        div.appendChild(p)
        country.appendChild(div)

    }
    console.log(array)



    // natinality.forEach(element => {
    //     const text1 = document.createElement('h1');
    //     text1.textContent = element.country_id
    //     nationalityField.appendChild(text1)

    // });

    // let countriesField = document.querySelector('.testFlag')
    // countries.forEach(country => {
    //     const text1 = document.createElement('img');
    //     text1.src = country;
    //     countriesField.appendChild(text1)
    // })

    addNameToLogs(name)
}

