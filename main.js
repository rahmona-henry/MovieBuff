var request = require('superagent')


$(document).ready(function() {

  //Tells jquery to wait until dom has loaded before loading jquery
  $("#button").click(searchActor)
  $("#searchInput").on("keydown",function(e) {
    if (e.which === 13){
      searchActor()
    }
  })
function searchActor() {
    var rawInput = $("#searchInput").val().toString();
    getMovieByActor(rawInput, function(err, data){
      if (data.body.results.length > 0) {
          var movies = data.body.results[0].known_for
          renderMovieResults(movies)
          renderActor(data.body.results[0])
        if(data.body.results[1].adult == true){
          alert("Warning, adult content found!")
        }

      }
       else {
        $("#face").html("")
        $("#results").html("<br>Sorry, we could not find the actor you search for!")
      }

    })
  }


  function renderMovieResults(movies) {

    document.getElementById('results').innerHTML = ""
    //create outer div with an animation
    for (var i = 0; i < movies.length; i++) {
      var movieResult = document.createElement('div')
      movieResult.className = 'posters animated fadeInDown'
      movieResult.innerHTML = "<h3>" + movies[i].title + "</h3><br>" + "<img src='https://image.tmdb.org/t/p/w185/" + movies[i].poster_path +"'><br>"
      document.getElementById('results').appendChild(movieResult)
    }
  }

  function renderActor(actor) {
    document.getElementById('face').className = "animated fadeIn"
    document.getElementById('face').innerHTML = "<h3>" + actor.name + "</h3><br>" + "<img src='https://image.tmdb.org/t/p/w185/" + actor.profile_path +"'><br>"
  }

  function getMovieByActor(name, callback){
    name = escape(name)
    request.get("http://api.themoviedb.org/3/search/person?api_key=842be4c1d7d5635d612fb7ae73bc734e&query=" + name)
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
