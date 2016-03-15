'use strict'

// Graph will always be undirected, as per our requirements.

var GraphNode = require('./graphnode_definition.js');

function Graph() {
  this._nodes = {};       // each item in the list will be a Graphnode
  this._nodeCount = 0;
  this._edgeCount = 0;
  this._adjacency = {};
}

Graph.prototype = {

  // Return adjacent nodes.
  adjacent: function(node){
    return this._adjacency[node._id];
  },

  // Cleanse the parentnode value as it can remain after pathfinding and cause problems.
  clearParents: function(graph){
    for (var key in graph._nodes) {
      if(graph._nodes[key]._parentNode != undefined){
        graph._nodes[key]._parentNode = null;
      }
    }
  },

  // Addnode by adding the name as the key to the dictionary. Associated Array.
  addNode: function(graph, node) {
    var newName = node.properties.building_code + node.properties.id;
    var obj = graph._nodes[newName];
    if (obj != undefined){
    }
    else {
      this._nodes[newName] = new GraphNode(node);
      ++this._nodeCount;
    }
  },

  // Drop node, included only in the chance that it is required in the future.
  // Also deletes any edges associated with the same node.
  dropNode: function(graph, id) {
    var target = graph._nodes[id];

    if(target){
      // Removing connected edges.
      var removeArray = this._adjacency[target._id];
      if(removeArray == undefined) {
        console.log("Node does not have defined edges.");
      }
      else{
        for (var i = 0; i < removeArray.length; i++)
        {
          graph.dropEdge(graph, target._id, removeArray[i].id);
        }
        delete this._adjacency[target._id];
      }
      // for actually removing the node.
      delete graph._nodes[id];
      --this._nodeCount;
    }
    else {
      console.log("This node doesn't exist");
    }
  },

  // Add edge between two nodes. Had to remove duplicate checking as the extra for loop was hitting the performance very hard.
  addEdge: function(graph, id1, id2) {
    //check if node exists
    var node1 = graph._nodes[id1];
    var node2 = graph._nodes[id2];
    if (node1 == undefined || node2 == undefined) {
      console.log(id1 + " and " + id2);
      console.log("undefined node");
    }
    else {
      // calculate and store distance
      if(this._adjacency[id1] == undefined){
        this._adjacency[id1] = [id2];
      }
      else {
        //check if that id already exists
        // var index;
        // for (var i = 0; i < this._adjacency[id1].length; i++){
        //   if(id2 == this._adjacency[id1][i]) {
        //     index = i;
        //     insert = true;
        //   }
        // }
        this._adjacency[id1].push(id2);
      }

      if(this._adjacency[id2] == undefined){
        this._adjacency[id2] = [id1];
      }
      else {
        //check if that id already exists
        // for (var i = 0; i < this._adjacency[id2].length; i) {
        //   if(id1 == this._adjacency[id2][i]) {
        //     index = i;
        //     insert = true;
        //   }
        // }
        this._adjacency[id2].push(id1);
      }
      ++this._edgeCount;
    }
  },

  // Included dropedge functionality on the off-chance that the graph needs to be used in more robust areas.
  dropEdge: function(graph, id1, id2) {
    var node1 = graph._nodes[id1];
    var node2 = graph._nodes[id2];
    if (node1 == undefined || node2 == undefined) {
      console.log("undefined node");
    }
    else{
      var index;
      var edgeDrop = false;
      for (var i = 0; this._adjacency[id1].length; i++){
        if(id2 == this._adjacency[id1][i].id) {
          index = i;
        }
      }

      if(index > -1){
        this._adjacency[id1].splice(index, 1);
        edgeDrop = true;
      }
      //reseting vars, although redundant for edgeDrop.
      index = -1;
      edgeDrop = false;

      for (var i = 0; this._adjacency[id2].length; i++){
        if(id1 == this._adjacency[id2][i].id) {
          index = i;
        }
      }

      if(index > -1){
        this._adjacency[id2].splice(index, 1);
        edgeDrop = true;
      }
      if(edgeDrop){--this._edgeCount;}
    }
  },
}

module.exports = Graph;
