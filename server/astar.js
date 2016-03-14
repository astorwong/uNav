var BinaryHeap = require('./binary_heap.js');
module.exports = {

  /*
  Brain child of the project. Requires the binary heap definition.
  */

  // Find all connected nodes given the graph and node ID.
  findConnectedNodes: function (graph, nodeID) {
    return graph._adjacency[nodeID];
  },

  // Build path after the A* algorithm has run. Trim any excess paths caused by the algorithm.
  buildPath: function (graph, source, dest) {
    var path = [];
    var node = dest;
    path.push(node);
    while (node != source) {
      node = node._parentNode;
      if(node == undefined){
        return [];
      }
      path.unshift( node );
    }

    // Do something here that cleans up the path before returning it.
    var NotDone = true;
    while(NotDone){
      for (var i in path){
        if(path[parseInt(i)+2] != undefined){
          if(this.findConnectedNodes(graph, path[i]._id).indexOf(path[parseInt(i)+2]._id) > -1){
            path.splice(parseInt(i)+1, 1);
            break;
          }
        }
        if(path[parseInt(i)+3] != undefined){
          if(this.findConnectedNodes(graph, path[i]._id).indexOf(path[parseInt(i)+3]._id) > -1){
            path.splice(parseInt(i)+1, 2);
            break;
          }
        }
        else{
          NotDone = false;
          break;
        }
      }
    }
    return path;
  },

  //Heurisitic Definitions
  manhattan: function (source, dest) {
    //to get accurate floor mapping
    return(Math.abs(source._x - dest._x) + Math.abs(source._y - dest._y) + Math.abs(source._z - dest._z));
  },

  euclidean: function (source, dest) {
    return Math.sqrt(Math.pow(source._x - dest._x, 2) + Math.pow(source._y - dest._y, 2) + Math.pow(source._z - dest._z, 2));
  },

  //Chebyshev's algorithm, D2=D=1
  diagonal: function (source, dest) {
    var dx = Math.abs(source._x - dest._x);
    var dy = Math.abs(source._y - dest._y);
    var dz = Math.abs(source._z - dest._z);
    return ((dx + dy + dz) - Math.min(dx,dy,dz));
  },

  containsObject: function(obj, list) {
    for (var i = 0; i < list.length; i++) {
      if (list[i] === obj) {
        return true;
      }
    }
    return false;
  },

  // Run for actual path between src and sink on graph, with options for avoidance.
  aStar: function (graph, src, sink, opt){
    //finished result to return.
    var fin;
    // Clear parentNodes after previous runs.
    graph.clearParents(graph);
    if(graph._nodes[src] && graph._nodes[sink]){
      // initializing all the variables.
      // Binary Heap definition is important as it is what determines the priority queue, based on the f variable under the graphnode.
      var openNodes = new BinaryHeap(function(x){return x._f;});
      var closedNodes = [];
      var startNode; var currentNode; var destNode; var testNode;
      currentNode = graph._nodes[src];
      destNode = graph._nodes[sink];

      currentNode._g = 0;
      currentNode._h = this.manhattan(currentNode, destNode);
      currentNode._f = currentNode._g + currentNode._h;

      startNode = currentNode;

      var connectedNodes;
      var g; var h; var f;
      var l;

      // While loop to iterate through each node on the openNodes list to find the desired option.
      while (currentNode != destNode && currentNode != undefined) {
        connectedNodes = this.findConnectedNodes(graph, currentNode._id);
        l = connectedNodes.length;
        for (var i = 0; i < l; ++i) {
          testNode = graph._nodes[connectedNodes[i]];
            // technically any node you connect to will be greater than 0, as there has to be one edge to connect to there.
            // However, your destination node may only have one edge connecting to it too. >_<
            if (graph._adjacency[testNode._id].length > 0) {
              g = currentNode._g + 1;
              h = this.manhattan(testNode, destNode);
              f = g + h;

              // For avoidances, make the elevators and stairs ridiculously high to avoid them.
              if(opt == "stairs" && testNode._data.utility.indexOf("Stairs") > -1){f = 10000}
              if(opt == "elevators" && testNode._data.utility.indexOf("Elevator") > -1){f = 10000}

              // Discourage the use of elevators as they are slow.
              if(testNode._data.utility.indexOf("Elevator") > -1){f = 100}
              if (this.containsObject(testNode, openNodes) || this.containsObject(testNode, closedNodes))	{
                if(testNode._f > f)
                {
                  testNode._f = f;
                  testNode._g = g;
                  testNode._h = h;
                  testNode._parentNode = currentNode;
                }
              }
              else {
                testNode._f = f;
                testNode._g = g;
                testNode._h = h;
                testNode._parentNode = currentNode;
                openNodes.push(testNode);
              }
            }
        }
        closedNodes.push( currentNode );
        if (openNodes.length == 0) {
          return null;
        }
        currentNode = openNodes.pop();
      }
      var dist;
      var path = this.buildPath(graph, startNode, destNode);
      if (path.length == 0){
        return fin;
      }
      else{
        var resultArray = [];
        var dist = 0;
        for (var i = 0; i < path.length; i++){
          resultArray.push({id: path[i]._id, utility: graph._nodes[path[i]._id]._data.utility, latitude: path[i]._y, longitude : path[i]._x});
          // This calculation is required to determine the metres distance given two lat/long points.
          if(i != 0){
            var lat1 = path[i-1]._y;
            var lon1 = path[i-1]._x;
            var lat2 = path[i]._y;
            var lon2 = path[i]._x;
            var R = 6378.137; // Radius of earth in KM
            var dLat = (lat2 - lat1) * Math.PI / 180;
            var dLon = (lon2 - lon1) * Math.PI / 180;
            var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon/2) * Math.sin(dLon/2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            var d = R * c * 1000;
            dist+= d;
          }
        }
        resultArray.push({dist: dist});
        fin = resultArray;
        return fin;
      }
    }
    else {
      return fin;
      console.log("your nodes don't exist");
    }
  }
}
