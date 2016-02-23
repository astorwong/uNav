var express = require('express');
var app = express();
var server = require('http').Server(app);
var request = require('request');
var fs = require("fs");

// For navigation
var algo = require('./astar.js');
var graphDef = require('./graph_definition.js');

var g = new graphDef();
fs.readFile('data/coordinates/RCH1_nodes_geo.json', 'utf8', function (err,data) {
  var geo_nodes = JSON.parse(data);
  for (var ind in geo_nodes.features) {
    g.addNode(g, geo_nodes.features[ind]);
  }
  fs.readFile('data/coordinates/edges_RCH01.json', 'utf8', function (err,data2) {
    var edges = JSON.parse(data2);
    for (var ind in edges.vals) {
      g.addEdge(g, edges.vals[ind].id1, edges.vals[ind].id2);
    }
  });
});


var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
});

router.route('/buildings')

// get example
.get(function(req, res) {
  if (!fs.existsSync("./uwapi_results.json")) {
    request('https://api.uwaterloo.ca/v2/buildings/list.geojson?key=2a7eb4185520ceff7b74992e7df4f55e', function (error, response, body) {
      var BuildingResults = [];
      if (!error && response.statusCode == 200) {
        var inBuildings = JSON.parse(body);

        for (var ind in inBuildings.features) {
          if (ind != 0) {
            BuildingResults.push([inBuildings.features[ind].properties.building_code, inBuildings.features[ind].properties.building_name, inBuildings.features[ind].geometry.coordinates]);
          }
        }
      }
      //sort!
      BuildingResults.sort(function(a,b){
        return a[0].localeCompare(b[0]);
      });
      fs.writeFile( "uwapi_results.json", JSON.stringify(BuildingResults), "utf8");
      res.send(JSON.stringify(BuildingResults));
    })
  }
  else {
    fs.readFile('./uwapi_results.json', 'utf8', function (err,data) {
      if (err) {
        res.send(err);
      }
      res.send(data);
    })
  }
});

router.route('/demo1')

.get(function(req, res){
  fs.readFile('data/coordinates/room_nodes.json', 'utf8', function (err,data) {
    if (err) {
      res.send(err);
    }
    res.send(data);
  })
});

router.route('/demo3')

.get(function(req, res){
  fs.readFile('data/coordinates/RCH1_nodes_geo.json', 'utf8', function (err,data) {
    if (err) {
      res.send(err);
    }
    // sorting alphabetically
    // var life = JSON.parse(data);
    // life.features.sort(function(a,b){
    //   return (a.properties.id).localeCompare(b.properties.id);
    // });
    // res.send(JSON.stringify(life));
    res.send(data);
  })
});

router.route('/graph')

.get(function(req,res){
  res.send(JSON.stringify(g));
})

router.route('/graph/rooms')

.get (function(req,res){
  var rooms = [];
  var hold;
  function asyncFind(_callback){
    for (var key in g._nodes) {
      hold = g._nodes[key]._data.utility
      if(hold != "Hallway" && hold != "Entrance"){
        rooms.push(key.substr(0,3) + " " + key.substr(3));
      }
    }
    _callback();
  }

  // call first function and pass in a callback function which
  // first function runs when it has completed
  asyncFind(function() {
    res.send(JSON.stringify(rooms));
  });
})

router.route('/graph/rooms/:id')

.get(function(req,res){
  res.send(JSON.stringify(g._nodes[req.params.id]));
})


router.route('/astar/:src/:sink')
//
// // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
.get(function(req, res) {
  res.send(JSON.stringify(algo.aStar(g, req.params.src, req.params.sink)));
});


// post example
// // create a bear (accessed at POST http://localhost:8080/api/bears)
// .POST(function(req, res) {
//
//     var bear = new Bear();      // create a new instance of the Bear model
//     bear.name = req.body.name;  // set the bears name (comes from the request)
//
//     // save the bear and check for errors
//     bear.save(function(err) {
//         if (err)
//             res.send(err);
//
//         res.json({ message: 'Bear created!' });
//     });
//
// });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

app.use(express.static('client'));

app.get('/*', function(req, res, next){
  var url = req.url;
  console.log('/GET', req.url);
  //Checking for urls like ../../passwd etc
  if(!url.match(/\.\.+?\//)){
    res.sendFile(req.url, {root:'./client'});
  } else if(url === '/'){
    next();
  } else {
    res.status(405).send('Did you try something naughty?');
  }
});

app.get('/', function(req, res){
  res.sendFile('index.html', {root:'./client'});
});

//Config checks process.env, otherwise sets to 9000
var port = process.env.PORT || 9000;

module.exports.listen = function(){
  server.listen(port, function(){
    console.log('Server listening on port', port);
  })
};