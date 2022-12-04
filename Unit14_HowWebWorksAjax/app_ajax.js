async function getMyData() {
    const response = await axios.get("https://swapi.dev/api/planets/");
    console.log(response);
    console.log('Finished!');
}

