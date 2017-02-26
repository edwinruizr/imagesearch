var express = require('express');
var http = require('http');
var fs = require('fs');
var app = express();
var recentSearchesArray = [];

// function to read in our API for later use
fs.readFile('api_key.txt', 'utf8', function(err, contents) {
            if(err)throw err;
            // let's load up our API KEY!
            process.env.API_KEY = contents;
});

// use our static pages which are in public folder 
// our index file is in there
app.use('/',express.static(__dirname + '/public'));

app.get('/api/imagesearch/:query', function(req, res){
    
    //prepping our search options 
    var URL = prepSearchOptions(req);
    
    

    http.get(URL, function(response){
    var data;
    var statusCode = response.statusCode;
    
    if (statusCode !== 200) {
        
        var error = {"error" : 'Request Failed' ,
                     "Status Code": statusCode
        };
        console.log(error);
        res.send(error);
        res.end();
    }else{
    response.on('data', function(chunk){
        data += chunk;
    });

    response.on('end', function(){
        data = data.replace("\\", "");
        data = data.replace("undefined", "");
        data = JSON.parse(data);
        
        var jsonArray = data.hits;
        
        // searchResults is what we are going to send our client
        var searchResults = jsonArray.map(parseResults); 
        res.json(searchResults);
        res.end();
        
    });
    }
    }).on('error', function(e){
      console.log("Got an error: ", e);
      res.send("Sorry an error occurred while processing your request");
      res.end();
    });

   
});

app.get('/api/latest/imagesearch', function(req, res){
    res.json(recentSearchesArray);
    res.end();
});

// Starts a UNIX socket and listens for connections on the given path.
app.listen(process.env.PORT, process.env.IP,function () {
  console.log('Go to Window > Share > open Application!');
});

  /////////////////////////////////////////////////////////////////////////////
 //                              HELPER FUNCTIONS                           //
/////////////////////////////////////////////////////////////////////////////

// helper function that preps our search url for API call
function prepSearchOptions(req){
    var query = req.params.query;
    var page = parseInt(req.query.offset,10) || 5; //offset by what user inputs or 5 by default
    
    pushRecentSearch(query);
    //returns prepped url
    return "http://pixabay.com/api/?key=4658328-8b002c5b9ca055f32688cf078&per_page=10&q="+encodeURIComponent(query)+"&per_page=10&page="+page;
}

function pushRecentSearch(query){
    recentSearchesArray.unshift(
        {
            "term": query,
            "when": Date()
        }
        );

}

function parseResults(result) {
    //return only keys we want from results
    return {"url": result.url,
          "imageURL": result.webformatURL,
          "altText": result.tags,
          "pageURL": result.pageURL
          };
}