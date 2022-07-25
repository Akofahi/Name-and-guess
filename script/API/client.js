const getUrlData = async (url, name)=>{

    // console.log('url', url);
    // console.log('params', name);
    const response = await fetch(`${url}/?name=${name}`);
    const data = await response.json();
    return data;
    }
    
    export default getUrlData;