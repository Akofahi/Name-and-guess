import getUrlData from "./client.js";

const URL = "https://api.genderize.io";
async function gender(name){
const response = await getUrlData(URL,name)
return response.gender
}

export default gender;