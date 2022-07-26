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
    let isnum = /\d/.test(name)
    let isspace = /\s/.test(name)
    console.log(isnum && isspace)
    if(isnum){
        return alert('No numbers or spaces allowed in name field')
    }
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
    const [gender, age, natinality] = res

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
    nameField.innerHTML = "<p>Name: </p>"
    nameField.appendChild(text1)

    let ageField = document.querySelector(".age");
    text.textContent = age;
    ageField.innerHTML = '<p>Age: </p>'
    ageField.appendChild(text)

    let genderField = document.querySelector('.gender')
    let genderImage = document.querySelector(".genderImg")
    text0.textContent = gender;
    switch (gender) {
        case "male":
            genderImage.innerHTML ="";
            genderImg.src = "https://media.istockphoto.com/vectors/male-thin-line-vector-icon-vector-id868651322?k=20&m=868651322&s=612x612&w=0&h=oSeMfkJ15dYpsnGyqHHCYRa-5nd36vgcvE6vchwAOos="
            genderImage.appendChild(genderImg)
            break;
        case "female":
            genderImage.innerHTML ="";
            genderImg.src = "https://media.istockphoto.com/vectors/female-symbol-on-transparent-background-vector-id1284444739?k=20&m=1284444739&s=612x612&w=0&h=U2PKO427nJQ65SLH4XSKWAWj01BRs_2ULQ0yMphO7iE="
            genderImage.appendChild(genderImg)
            break;
    }
    genderField.innerHTML = "<p>Gender: </p>"
    genderField.appendChild(text0);

    let country = document.querySelector('.countries')
    country.innerHTML = ''
    const array = [];

    for (let i = 0;  natinality.length > i; i++) {
        let div = document.createElement('div')
        div.className='gallery'
        let img = document.createElement('img')
        let p = document.createElement('p')
        array.push([ natinality[i].country_id,  countries[i]])
        p.textContent = array[i][0]
        img.src = array[i][1]
        console.log(p.textContent)
        div.appendChild(img)
        div.appendChild(p)
        country.appendChild(div)

    }
    console.log(countries)



    // natinality.forEach(element => {
    //     const text1 = document.createElement('p');
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

