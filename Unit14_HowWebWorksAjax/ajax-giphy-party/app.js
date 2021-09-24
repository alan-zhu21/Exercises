// console.log("Let's get this party started!");

const url = 'http://api.giphy.com/v1/gifs/search';

const api_key='BwBNEOtE7br4AZDbwCydxez71Kr2mwKr';

async function handleSearch(e){
    e.preventDefault();
    let q = $('#searchBox')[0].value;
    let api_response = await axios.get(`${url}`, {params: {q, api_key}});
    const numberOfResponses = api_response.data.pagination.count;
    const randomIndex = Math.floor(Math.random()*numberOfResponses);
    const sourceURL = api_response.data.data[+randomIndex].images.original.url
    $('#searchBox')[0].value = '';
    appendGif(sourceURL);
}

function appendGif(url) {
    $('#placeGifsHere').append($(`<img src=${url}>`));
}

function clearGifs() {
    $('#placeGifsHere').empty();
}

$('#gifForm').on('submit', handleSearch);

$('#remove').on('click', clearGifs);