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

// $('#sort button').on('click', '#sort-title', function () {

//     // $.map($('li').get(), function(val, idx) {
//     //     val > 
//     // })

//     // $('#list').map(function (val, idx) {

//     // })
//     //use after() and before() in a ternary opperation
// })