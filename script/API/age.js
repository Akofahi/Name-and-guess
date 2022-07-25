import client from './client.js'
const URL = "https://api.agify.io"

async function age(name){
 const response = await client(URL,name)
 return response.age
}

export default age;