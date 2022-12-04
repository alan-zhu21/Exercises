$('#movie-form').on('submit', function (e) {
    e.preventDefault();
    //take in the values of each input
    let movieTitle = $('#movie-title').val();
    let rating = $('#rating').val();
    let removeBtn = $('<button>').text('X').css('background-color', 'lightblue').on('click', function () {
        $(this).parent().remove();
    })
    //append to the div element
    $('#list').append($('<li>').text(`${movieTitle} - ${rating} `).append(removeBtn));
    //clear the input
    $('input').val('');
})

$('#sort-title').on('click', function (event) {
// get list of movies
    let movieList = $('#list').children();
// sort array
    console.log(movieList[0].innerText);
    movieList.sort(sortByMovieTitle);
    console.log(movieList[0].innerText);
// delete list of movies in html and replace with sorted list
    $('#list').children().replace(movieList);
})

function sortByMovieTitle(el1, el2) {
    if (el1.innerText > el2.innerText) {
        return 1;
    }
    if (el1.innerText < el2.innerText) {
        return -1;
    }
    return 0;
}