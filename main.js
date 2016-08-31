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
