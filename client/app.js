var uNav = angular.module('uNav', ['ui', 'ui.utils', 'ngRoute', 'ui.bootstrap', 'uiGmapgoogle-maps', 'ngResource']).
config(function($routeProvider, $locationProvider, uiGmapGoogleMapApiProvider) {
  $locationProvider.hashPrefix('');
  $routeProvider.
  when('/', { templateUrl : 'app/partials/home.html', controller  : 'mainController'}).
  when('/search', {templateUrl : 'app/partials/search.html', controller  : 'searchController'}).
  when('/nearyou', { templateUrl : 'app/partials/nearyou.html', controller  : 'nearyouController'}).
  when('/about', { templateUrl : 'app/partials/about.html'}).
  when('/contact', { templateUrl : 'app/partials/contact.html', controller : 'contactController'});


  uiGmapGoogleMapApiProvider.configure({
    key: 'AIzaSyCYtcbfLrd9BGzJ8HPdvsxDEedBdh3F-z4',
    v: '3.24', //defaults to latest 3.X anyhow
    libraries: 'weather,geometry,visualization'
  });
});

$(document).on('click.nav','.navbar-collapse.in',function(e) {
  if( $(e.target).is('a') ) {
    $(this).removeClass('in').addClass('collapse');
  }
});

uNav.controller('mainController', function($scope) {});

uNav.controller('searchController', function($scope, $q, $timeout, $resource, $location, RoomService, uiGmapGoogleMapApi, uiGmapIsReady) {
  $scope.showSelect = true;
  $scope.IsHidden = true;
  var overlay;

  $.get('/api/buildings', function(obj){
    $scope.masterBuildings = JSON.parse(obj);
    $.each($scope.masterBuildings, function (idx, val) {
      $("#buildingsInUW").append('<option value="' + idx + '">' + idx + ' - ' + val.name + '</option>');
    });
    $("#buildingsInUW").chosen({ width: "95%" });
  });

  //This will hide the DIV by default.
  $scope.ShowHide = function (force) {
    //If DIV is hidden it will be visible and vice versa.
    var inputValue=$("#searchButton").attr('value');
    if(force){
      inputValue = "Reduce";
    }

    if(inputValue=="Expand")
    {
      $("#searchWrapper").animate({width:"1700px"});
      $("#searchButton").attr('value','Reduce');
    }
    else if(inputValue=="Reduce")
    {
      $("#searchWrapper").animate({width:"100%"});
      $("#searchButton").attr('value','Expand');
    }
    $scope.IsHidden = $scope.IsHidden ? false : true;
  };

  $( "#buildingsInUW" ).change(function() {
    $scope.build = $("#buildingsInUW option:selected").val();
    $scope.map.center = {latitude: $scope.masterBuildings[$scope.build].coordinates[1], longitude: $scope.masterBuildings[$scope.build].coordinates[0]};
    $scope.map.zoom = 19;
    $scope.showSelect = false;

    if($scope.build == "RCH"){
      $scope.map.zoom = 20;
      // 2nd floor
      var swBound = new google.maps.LatLng(43.469956511113, -80.54128386508188);
      var neBound = new google.maps.LatLng(43.47063996900324, -80.5402374146804);

      var bounds = new google.maps.LatLngBounds(swBound, neBound);
      var srcImage = 'images/Waterloo Floor Plans/RCH2_CAD.png';

      DebugOverlay.prototype = new google.maps.OverlayView();
      $scope.overlay = new DebugOverlay(bounds, srcImage, $scope.map);
    }

    function DebugOverlay(bounds, image, map) {

      this.bounds_ = bounds;
      this.image_ = image;
      this.map_ = map;
      this.div_ = null;
      this.setMap(map.control.getGMap());
    }

    DebugOverlay.prototype.onAdd = function() {

      var div = document.createElement('div');
      div.style.borderStyle = 'none';
      div.style.borderWidth = '0px';
      div.style.position = 'absolute';
      var img = document.createElement('img');
      img.src = this.image_;
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.opacity = '0.95';
      img.style.position = 'absolute';
      div.appendChild(img);
      this.div_ = div;
      var panes = this.getPanes();
      panes.overlayLayer.appendChild(div);
    };

    DebugOverlay.prototype.draw = function() {
      var overlayProjection = this.getProjection();
      var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
      var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());
      var div = this.div_;
      div.style.left = sw.x + 'px';
      div.style.top = ne.y + 'px';
      div.style.width = (ne.x - sw.x) + 'px';
      div.style.height = (sw.y - ne.y) + 'px';
    };

    DebugOverlay.prototype.updateBounds = function(bounds){
      this.bounds_ = bounds;
      this.draw();
    };

    DebugOverlay.prototype.onRemove = function() {
      this.div_.parentNode.removeChild(this.div_);
      this.div_ = null;
    };

    $.get('/api/graph/rooms/select/' + $scope.build, function(obj){
      var count = 0;
      var appendage;
      if(obj != ''){
        $scope.showSelect = true;
        $.each(JSON.parse(obj), function (idx, val) {
          var countOG = count;
          count = parseInt(val.charAt(val.indexOf(" ") + 1));
          if (count > countOG) {
            if(countOG != 0){
              appendage+='</optgroup>';
              $("#roomSrc").append(appendage);
              $("#roomDest").append(appendage);
            }
            appendage = '<optgroup label="' + $scope.build + ' Floor ' + count + '">';
          }
          appendage+='<option value="' + val + '">' + val + '</option>';
        });
        //The last one.
        appendage+='</optgroup>';
        $("#roomSrc").append(appendage);
        $("#roomDest").append(appendage);

        $("#roomSrc").chosen({ width: "10%" });
        $("#roomDest").chosen({ width: "10%" });
      };
      $timeout(function() {
        $scope.$apply();
      },0);
    });
  });

  $scope.restart = function(){
    if($scope.flightPath != undefined){
      $.each($scope.flightPath, function(i){
        $scope.flightPath[i].setMap(null);
      });
      $scope.distance = null;
    }
    $scope.build = undefined;
    $scope.IsHidden = false;
    $scope.ShowHide(true);
    $("#l1Details").empty();
    $("#l2Details").empty();
    $scope.src = null;
    $scope.dest = null;
    $scope.floor = null;
    $scope.overlay.setMap(null);
    $scope.map.center = {latitude: 43.4722854, longitude: -80.5448576};
    $scope.map.zoom = 16;
    $scope.map.markers = [];
    $(".chosen-select").val('').trigger("chosen:updated");
  }

  $( "#roomSrc" ).change(function() {
    // $("#searchButton").attr('value','Expand');
    // $scope.ShowHide(false);
    $scope.src = $("#roomSrc option:selected").val();
    plot("src").then(function(resp){
      if(resp._data.utility.length <= 0){$("#l1Details").text("Room");}
      else {$("#l1Details").text(resp._data.utility.toString().replace(/,/g, ', '));}
    });
    // if(typeof $scope.src !== 'undefined' && typeof $scope.dest !== 'undefined'){
    //   getPath($scope.src, $scope.dest).then(function(floorNum){
    //     console.log($scope.waypts);
    //     listDirections(floorNum).then(function(lineFloor){
    //       console.log(lineFloor);
    //     });
    //   });
    // }
  });

  $( "#roomDest" ).change(function() {
    // $("#searchButton").attr('value','Expand');
    // $scope.ShowHide(false);
    $scope.dest = $("#roomDest option:selected").val();
    plot("dest").then(function(resp){
      if(resp._data.utility.length <= 0){$("#l2Details").text("Room");}
      else {$("#l2Details").text(resp._data.utility.toString().replace(/,/g, ', '));}
    });
    if(typeof $scope.src !== 'undefined' && typeof $scope.dest !== 'undefined'){
      getPath($scope.src, $scope.dest).then(function(floorNum){
        drawDirections(floorNum);
      });
    }
    })

uiGmapGoogleMapApi.then(function (maps) {
  $scope.map = {
    center: {
      latitude: 43.4722854,
      longitude: -80.5448576
    },
    zoom: 16,
    pan: 1,
    options: $scope.mapOptions,
    markers: [],
    events: {},
    control: {}
  }
});

$scope.windowOptions = {
  visible: false,
};

var plot = function(node) {
  return $q(function(resolve){
    var map = $scope.map;
    var mark = $scope.map.markers;
    if (node == "src"){
      RoomService.getID($scope.src.replace(/\s+/g, '')).then(function(result){
        $scope.srcNode = result;
        for(var i = 0; i < mark.length; i++) {
          if (mark[i].id == 0) {
            mark.splice(i, 1);
            break;
          }
        }
        mark.push({
          id: 0,
          coords: {
            latitude: $scope.srcNode._y,
            longitude: $scope.srcNode._x
          },
          name: $scope.src,
          icon: {url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png', scaledSize: new google.maps.Size(40,40)}
        });
        var swBound; var neBound; var srcImage;
        if($scope.srcNode._z == 1 && $scope.build == "RCH"){
          // 1st floor
          swBound = new google.maps.LatLng(43.469979383347734, -80.5412503374692);
          neBound = new google.maps.LatLng(43.47064580865753, -80.540254849039);
          srcImage = 'images/Waterloo Floor Plans/RCH1_CAD.png';
        }
        else if($scope.srcNode._z == 2 && $scope.build == "RCH"){
          // 2nd floor
          swBound = new google.maps.LatLng(43.469956511113, -80.54128386508188);
          neBound = new google.maps.LatLng(43.47063996900324, -80.5402374146804);
          srcImage = 'images/Waterloo Floor Plans/RCH2_CAD.png';
        }
        else if($scope.srcNode._z == 3 && $scope.build == "RCH"){
          // 3rd floor
          swBound = new google.maps.LatLng(43.46993704537453, -80.54133616815767);
          neBound = new google.maps.LatLng(43.47064191555471, -80.5402374146804);
          srcImage = 'images/Waterloo Floor Plans/RCH3_CAD.png';
        }

        var bounds = new google.maps.LatLngBounds(swBound, neBound);

        DebugOverlay.prototype = new google.maps.OverlayView();
        $scope.overlay.setMap(null);
        $scope.overlay = new DebugOverlay(bounds, srcImage, $scope.map);

        //OPTIMIZATION: Clean this up when you can make DebugOverlay global.
        function DebugOverlay(bounds, image, map) {
          this.bounds_ = bounds;
          this.image_ = image;
          this.map_ = map;
          this.div_ = null;
          this.setMap(map.control.getGMap());
        }

        DebugOverlay.prototype.onAdd = function() {

          var div = document.createElement('div');
          div.style.borderStyle = 'none';
          div.style.borderWidth = '0px';
          div.style.position = 'absolute';
          var img = document.createElement('img');
          img.src = this.image_;
          img.style.width = '100%';
          img.style.height = '100%';
          img.style.opacity = '0.95';
          img.style.position = 'absolute';
          div.appendChild(img);
          this.div_ = div;
          var panes = this.getPanes();
          panes.overlayLayer.appendChild(div);
        };

        DebugOverlay.prototype.draw = function() {
          var overlayProjection = this.getProjection();
          var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
          var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());
          var div = this.div_;
          div.style.left = sw.x + 'px';
          div.style.top = ne.y + 'px';
          div.style.width = (ne.x - sw.x) + 'px';
          div.style.height = (sw.y - ne.y) + 'px';
        };

        DebugOverlay.prototype.updateBounds = function(bounds){
          this.bounds_ = bounds;
          this.draw();
        };

        DebugOverlay.prototype.onRemove = function() {
          this.div_.parentNode.removeChild(this.div_);
          this.div_ = null;
        };
        resolve($scope.srcNode);
      })
    }
    else if (node == "dest") {
      RoomService.getID($scope.dest.replace(/\s+/g, '')).then(function(result){
        $scope.destNode = result;
        for(var i = 0; i < mark.length; i++) {
          if (mark[i].id == 1) {
            mark.splice(i, 1);
            break;
          }
        }
        // http://uxrepo.com/static/icon-sets/font-awesome/svg/circle-empty.svg
        mark.push({
          id: 1,
          coords: {
            latitude: $scope.destNode._y,
            longitude: $scope.destNode._x
          },
          name: $scope.dest
        });
        resolve($scope.destNode);
      })
    }
  })
};

var getPath = function(src, sink) {
  return $q(function(resolve){
    // instantiate google map objects for directions
    var waypts = {};
    $.get('/api/astar/' + src.replace(/\s+/g, '') +'/'+ sink.replace(/\s+/g, ''), function(obj){
      var leng = obj.length;
      var start; var pathTemp; var pathNum; var tempNum;
      var waypts = [];
      $.each(obj, function (idx, val) {
        if(idx == (leng-1)) {
          // https://en.wikipedia.org/wiki/Preferred_walking_speed to convert to time.
          $scope.distance = (val.dist / 1.4).toFixed(2);
          waypts.push({alt: pathNum, path: pathTemp});
          $scope.waypts = waypts;
          resolve(start);
        }
        else{
          if(val.id.substr(0,3) == "RCH"){
            tempNum = parseInt(val.id[3]);
            if(pathNum == undefined){
              start = val.id[3];
              pathTemp = [];
              pathNum = tempNum;
            }
            if(tempNum != pathNum){
              waypts.push({alt: pathNum, path: pathTemp});
              // restart for next iteration
              pathTemp = [];
            }
            else{
              pathTemp.push({lat: val.latitude, lng: val.longitude});
            }
            pathNum = tempNum;
          }
          else{pathTemp.push({lat: val.latitude, lng: val.longitude});}
        }
      })
    })
  })
};

var drawDirections = function(floor){
  if($scope.flightPath != undefined){
    $.each($scope.flightPath, function(i){
      $scope.flightPath[i].setMap(null);
    });
  }
  $scope.flightPath = [];
  for (var i in $scope.waypts) {
    // only for RCH
    if($scope.waypts[i].alt == floor){
      var lineSymbol = {
        path: google.maps.SymbolPath.FORWARD_OPEN_ARROW,
        strokeOpacity: 1,
        scale: 1.5
      };
    }
    else{
      var lineSymbol = {
        path: google.maps.SymbolPath.FORWARD_OPEN_ARROW,
        strokeOpacity: 0.3,
        scale: 1.5
      };
    }
    $scope.flightPath.push(new google.maps.Polyline({
      map: $scope.map.control.getGMap(),
      icons: [{
        icon: lineSymbol,
        offset: '50%',
        repeat: '10px'
      }],
      path: $scope.waypts[i].path,
      strokeOpacity: 0,
      strokeColor: '#FF0000',
    }));
    var count = 0;
    window.setInterval(function() {
      count = (count + 1) % 200;

      var icons = $scope.flightPath[i].get('icons');
      icons[0].offset = (count * 2) + '%';
      $scope.flightPath[i].set('icons', icons);
    }, 80);
  }
}

uiGmapIsReady.promise() // if no value is put in promise() it defaults to promise(1)
.then(function (instances) {
})

$scope.floor = function(num){
  var swBound; var neBound; var srcImage;
  $("#floor1").removeClass("btn-primary disabled");
  $("#floor2").removeClass("btn-primary disabled");
  $("#floor3").removeClass("btn-primary disabled");
  $("#floor" + num).addClass("btn-primary disabled");
  if(num == 1 && $scope.build == "RCH"){
    // 1st floor
    swBound = new google.maps.LatLng(43.469979383347734, -80.5412503374692);
    neBound = new google.maps.LatLng(43.47064580865753, -80.540254849039);
    srcImage = 'images/Waterloo Floor Plans/RCH1_CAD.png';
  }
  else if(num == 2 && $scope.build == "RCH"){
    // 2nd floor
    swBound = new google.maps.LatLng(43.469956511113, -80.54128386508188);
    neBound = new google.maps.LatLng(43.47063996900324, -80.5402374146804);
    srcImage = 'images/Waterloo Floor Plans/RCH2_CAD.png';
  }
  else if(num == 3 && $scope.build == "RCH"){
    // 3rd floor
    swBound = new google.maps.LatLng(43.46993704537453, -80.54133616815767);
    neBound = new google.maps.LatLng(43.47064191555471, -80.5402374146804);
    srcImage = 'images/Waterloo Floor Plans/RCH3_CAD.png';
  }

  var bounds = new google.maps.LatLngBounds(swBound, neBound);

  DebugOverlay.prototype = new google.maps.OverlayView();
  $scope.overlay.setMap(null);
  $scope.overlay = new DebugOverlay(bounds, srcImage, $scope.map);

  //OPTIMIZATION: Clean this up when you can make DebugOverlay global.
  function DebugOverlay(bounds, image, map) {
    this.bounds_ = bounds;
    this.image_ = image;
    this.map_ = map;
    this.div_ = null;
    this.setMap(map.control.getGMap());
  }

  DebugOverlay.prototype.onAdd = function() {

    var div = document.createElement('div');
    div.style.borderStyle = 'none';
    div.style.borderWidth = '0px';
    div.style.position = 'absolute';
    var img = document.createElement('img');
    img.src = this.image_;
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.opacity = '0.95';
    img.style.position = 'absolute';
    div.appendChild(img);
    this.div_ = div;
    var panes = this.getPanes();
    panes.overlayLayer.appendChild(div);
  };

  DebugOverlay.prototype.draw = function() {
    var overlayProjection = this.getProjection();
    var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
    var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());
    var div = this.div_;
    div.style.left = sw.x + 'px';
    div.style.top = ne.y + 'px';
    div.style.width = (ne.x - sw.x) + 'px';
    div.style.height = (sw.y - ne.y) + 'px';
  };

  DebugOverlay.prototype.updateBounds = function(bounds){
    this.bounds_ = bounds;
    this.draw();
  };

  DebugOverlay.prototype.onRemove = function() {
    this.div_.parentNode.removeChild(this.div_);
    this.div_ = null;
  };
};

$scope.mapOptions = {
  minZoom: 3,
  zoomControl: false,
  draggable: true,
  navigationControl: false,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  disableDoubleClickZoom: false,
  keyboardShortcuts: true,
  markers: {
    selected: {}
  },
  styles: [{
    stylers: [
      { hue: "#00ffe6" },
      { saturation: -20 }
    ]
  },{
    featureType: "road",
    elementType: "geometry",
    stylers: [
      { lightness: 100 },
      { visibility: "simplified" }
    ]
  },{
    featureType: "road",
    elementType: "labels",
    stylers: [
      { visibility: "off" }
    ]
  },{
    featureType: "buildings",
    elementType: "labels.text",
    stylers: [
      { visibility: "off" }
    ]
  }]
};
});


uNav.controller('nearyouController', function($scope, $timeout, $anchorScroll, $location, uiGmapGoogleMapApi, uiGmapIsReady) {
  $scope.geolocationAvailable = navigator.geolocation ? true : false;

  $scope.scrollTo=function(id){
    $location.hash(id);
    $anchorScroll();
  }

  // uiGmapGoogleMapApi is a promise.
  // The "then" callback function provides the google.maps object.
  uiGmapGoogleMapApi.then(function (maps) {
    $scope.map = {
      center: {
        latitude: 43.4722854,
        longitude: -80.5448576
      },
      zoom: 16,
      pan: 1,
      options: $scope.mapOptions,
      markers: [],
      events: {},
      control: {}
    }
  });

  uiGmapIsReady.promise() // if no value is put in promise() it defaults to promise(1)
  .then(function () {})

  $scope.chose = function(util){
    var temp = {};
    var mark = $scope.map.markers;
    if(this.naviOn == undefined){
      if ($scope.geolocationAvailable) {
        navigator.geolocation.getCurrentPosition(function (position) {
          $scope.map.center = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          $scope.map.zoom = 22;

          mark.push({
            id: 9000,
            coords: {latitude: position.coords.latitude, longitude: position.coords.longitude}
          });

          console.log(mark[0]);
          temp = {id: mark[0].id, coords: mark[0].coords};
          console.log (temp);
        });
      }
    }

    // api call to get all graph nodes that have that utility and display them.
    $.get('/api/graph/amenities/' + util, function(result){
      result = JSON.parse(result);
      mark = [];
      // if(util == "WC")
      //   if(util == "Food")
      //     if(util == "Access")
      //     if(util == "Fountain")
      //     if(util == "Stairs")
      //     if(util == "Elevator")
      $.each(result, function(idx, val){
        mark.push({
          id: idx,
          coords: {
            latitude: val._y,
            longitude: val._x
          },
          name: val._id,
          // icon: {url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png', scaledSize: new google.maps.Size(40,40)}
        });
      });
      console.log(mark);

      console.log(util);
      $scope.naviOn = true;
      $scope.collapsed = false;
      $timeout(function() {
        $scope.$apply();
      },0);
    });
  };

  $scope.mapOptions = {
    minZoom: 3,
    zoomControl: false,
    draggable: true,
    navigationControl: false,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    disableDoubleClickZoom: false,
    keyboardShortcuts: true,
    markers: {
      selected: {}
    },
    styles: [{
      stylers: [
        { hue: "#00ffe6" },
        { saturation: -20 }
      ]
    },{
      featureType: "road",
      elementType: "geometry",
      stylers: [
        { lightness: 100 },
        { visibility: "simplified" }
      ]
    },{
      featureType: "road",
      elementType: "labels",
      stylers: [
        { visibility: "off" }
      ]
    },{
      featureType: "buildings",
      elementType: "labels.text",
      stylers: [
        { visibility: "off" }
      ]
    }]
  };

  $("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("wrapper").toggleClass("active");
  });

  /*Scroll Spy*/
  $('body').scrollspy({ target: '#spy', offset:80});
});

uNav.factory('RoomService', function($q, $timeout, $http) {
  return {
    getID: function(id){
      return $http.get('/api/graph/rooms/' + id)
      .then(function(response) {
        if (typeof response.data === 'object') {
          return response.data;
        } else {
          // invalid response
          return $q.reject(response.data);
        }
      }, function(response){
        return $q.reject(response.data);
      });
    }
  }
});

uNav.controller('contactController', function ($scope, $http){

  $scope.sendMail = function () {
    var data = ({
      contactName : $scope.contactName,
      contactEmail : $scope.contactEmail,
      contactReason : $scope.contactReason,
      contactMsg : $scope.contactMsg
    });
    // Simple POST request example (passing data) :
    $http.post('/api/contact-form', data).
    success(function(data, status, headers, config) {
      // this callback will be called asynchronously
      // when the response is available
      $scope.message = "Huzzah";
      alert('Thanks for your message, ' + data.contactName + '. You Rock!');
    });
  }
})
