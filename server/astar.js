var BinaryHeap = require('./binary_heap.js');
module.exports = {

  aStar: function (graph, src, sink){
    //finished result to return.
    var fin;
    if(graph.retr(src) && graph.retr(sink)){
      // initializing all the variables.
      var openNodes = new BinaryHeap(function(x){return x;});
      var closedNodes = [];
      var startNode; var currentNode; var destNode; var testNode;

      $.each(graph._nodes, function(ind, val) {
        if(val._id == src){
          currentNode = graph._nodes[ind];
          currentNode._g = 0;
          //set heuristic choice here.
          currentNode._h = manhattan(currentNode, destNode);
          currentNode._f = currentNode._g + currentNode._h;
        }
        if(val._id == sink){
          destNode = graph._nodes[ind];
        }
      });

      //get starting node
      startNode = currentNode;

      var connectedNodes;
      var g; var h; var f;
      var l = graph._nodes.length;

      while (currentNode != destNode && currentNode != undefined) {
        connectedNodes = findConnectedNodes(graph, currentNode._id);
        l = connectedNodes.length;
        for (var i = 0; i < l; ++i) {
          $.each(graph._nodes, function(ind, val) {
            if(val._id == connectedNodes[i].id){
              testNode = graph._nodes[ind];
            }
          });
          // technically any node you connect to will be greater than 0, as there has to be one edge to connect to there.
          // However, your destination node may only have one edge connecting to it too. >_<
          if (graph._adjacency[testNode._id].length > 0) {
            g = currentNode._g + manhattan(currentNode, testNode);
            h = manhattan(testNode, destNode);
            f = g + h;
            if ( $.inArray(testNode, openNodes) > -1 || $.inArray(testNode, closedNodes) > -1)	{
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
      var path = buildPath(startNode, destNode);
      if (path.length == 0){
        return fin;
      }
      else{
        var resultArray = [];
        $.each(path, function (ind, val){
          resultArray.push(val._id);
          dist = val._f;
        });
        fin = {
          "path": resultArray,
          "dist": dist
        };
        return fin;
      }
    }
    else {
      return fin;
      console.log("your nodes don't exist");
    }
  },

  findConnectedNodes: function (graph, nodeID) {
    return graph._adjacency[nodeID];
  },

  buildPath: function (source, dest) {
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
    return path;
  },

  //Heurisitic Definitions
  manhattan: function (source, dest) {
    return (Math.abs(source._x - dest._x) + Math.abs(source._y - dest._y));
  },

  euclidean: function (source, dest) {
    return Math.sqrt(Math.pow(source._x - dest._x, 2) + Math.pow(source._y - dest._y, 2));
  },

  //Chebyshev's algorithm, D2=D=1
  diagonal: function (source, dest) {
    var dx = Math.abs(source._x - dest._x);
    var dy = Math.abs(source._y - dest._y);
    return ((dx + dy) - Math.min(dx,dy));
  }
}
