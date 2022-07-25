import client from "./client.js"
const URL = "https://api.nationalize.io"

async function nationality(name){
    const response = await client(URL,name);
    return response.country
    
}
export default nationality;