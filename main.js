var request = require('superagent')

$(document).ready(function() {

  $('#button').click(searchActor)
    $('#searchInput').on('keydown', function(e){
        if(e.which ===13){
          searchActor()
        }
    })

function searchActor() {
  var input = $('#searchInput').val().toString();
  getMovieByActor(input, function(err,data){
    if (data.body.results.lenght> 0){
      var movies = data.body.results[0].known_for
        renderMovieResults(movies)
        renderActor(data,body.results[0])
        if(data.body.results[1].adult== true){
          alert('Warning! adult content found!')
        }
    }
        else {
          $('#face').html('')
          $('#results').html('<br> Sorry we could not find the actor or actress that you searched for')
        }
  })
}


function renderMovieResults(movies) {
  document.getElementById('results').innerHTML=''
  //create an outer div with animation-duration
  for (var i=0; i<movies.length; i++){
    var movieResult = document.createElement('div')
    movieResult.className = 'posters animated fadeInDown'
    movieResult.innerHTML = "<h3>" + movies[i].title + "</h3><br>" + "<img src='https://image.tmdb.org/t/p/w185/" + movies[i].poster_path +"'><br>"
    document.getElementsById('results').appendChild(movieResult)
  }
}

function renderActor(actor) {
  document.getElementById('face').className = 'animated fadeIn'
  document.getElementById('face').innerHTML = "<h3>" + actor.name + "</h3><br>" + "<img src='https://image.tmdb.org/t/p/w185/" + actor.profile_path +"'><br>"
}



function getMovieByActor(name, callback) {
  name = escape(name)
  request.get("http://api.themoviedb.org/3/search/person?api_key=da40aaeca884d8c9a9a4c088917c474c&query=", + name)
    .set('Accept', 'application/json')
    .end(function(err, res){
      if (err) {
        callback(err)
        return
      }
      callback(null, res)
    })

}

})
