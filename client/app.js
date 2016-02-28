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


uNav.controller('mainController', function($scope) {});

uNav.controller('searchController', function($scope, $q, $timeout, $resource, $location, RoomService, uiGmapGoogleMapApi, uiGmapIsReady) {
  $scope.showSelect = true;
  var overlay;

  $.get('/api/buildings', function(obj){
    $scope.masterBuildings = JSON.parse(obj);
    $.each($scope.masterBuildings, function (idx, val) {
      $("#buildingsInUW").append('<option value="' + idx + '">' + idx + ' - ' + val.name + '</option>');
    });
    $("#buildingsInUW").chosen({ width: "95%" });
  });

  // Anuja: divs that should be added to the search partial
  $("#searchButton").click(function(){
    var inputValue=$("#searchButton").attr('value');

    if(inputValue=="Expand")
    {
      $("#div1").animate({width:"1000px"});
      $("#searchButton").attr('value','Reduce');
    }
    else if(inputValue=="Reduce")
    {
      $("#div1").animate({width:"100%"});
      $("#searchButton").attr('value','Expand');
    }
  });

  $( "#buildingsInUW" ).change(function() {
    $scope.build = $("#buildingsInUW option:selected").val();
    $scope.map.center = {latitude: $scope.masterBuildings[$scope.build].coordinates[1], longitude: $scope.masterBuildings[$scope.build].coordinates[0]};
    $scope.map.zoom = 19;
    $scope.showSelect = false;

    var swBound = new google.maps.LatLng(43.469979383347734, -80.5412503374692);
    var neBound = new google.maps.LatLng(43.47064580865753, -80.540254849039);
    var bounds = new google.maps.LatLngBounds(swBound, neBound);
    var srcImage = 'images/Waterloo Floor Plans/RCH1_CAD.png';

    DebugOverlay.prototype = new google.maps.OverlayView();
    $scope.overlay = new DebugOverlay(bounds, srcImage, $scope.map);

    //RCH 1st floor: sw(43.469979383347734, -80.5412503374692) ne(43.47064580865753, -80.540254849039)
    //RCH 2nd floor: sw(43.469956511113, -80.54128386508188) ne(43.47063996900324, -80.5402374146804)
    //RCH 3rd floor: sw(43.4698708618167, -80.54143540989122) ne(43.470660407790774, -80.54018645270912)

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
      img.style.opacity = '0.5';
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
      $scope.flightPath.setMap(null);
      $scope.distance = null;
    }
    $scope.build = undefined;
    $scope.src = null;
    $scope.dest = null;
    $scope.map.center = {latitude: 43.4722854, longitude: -80.5448576};
    $scope.map.zoom = 16;
    $scope.map.markers = [];
    $(".chosen-select").val('').trigger("chosen:updated");
  }

  $( "#roomSrc" ).change(function() {
    $scope.src = $("#roomSrc option:selected").val()
    $scope.plot("src");
    $scope.drawDirections();
  });

  $( "#roomDest" ).change(function() {
    $scope.dest = $("#roomDest option:selected").val()
    $scope.plot("dest");
    $scope.drawDirections();
  });

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

  $scope.plot = function (node) {
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
          name: $scope.src
        });
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
        mark.push({
          id: 1,
          coords: {
            latitude: $scope.destNode._y,
            longitude: $scope.destNode._x
          },
          name: $scope.dest,
          icon: {url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png', scaledSize: new google.maps.Size(40,40)}
        });
      })
    }
  }

  //Not currently used at the moment.
  // $scope.getDirections = function() {
  //   if($scope.src != undefined && $scope.dest != undefined){
  //     // instantiate google map objects for directions
  //     $.get('/api/astar/' + $scope.src.replace(/\s+/g, '') +'/'+ $scope.dest.replace(/\s+/g, ''), function(obj){
  //       var leng = JSON.parse(obj).length;
  //       var waypts = [];
  //       $.each(JSON.parse(obj), function (idx, val) {
  //         if (idx == 0 || idx == (leng - 1)){
  //         }
  //         else if(idx == leng) {
  //           alert(val.dist);
  //         }
  //         else{
  //           waypts.push({location: new google.maps.LatLng(val._y, val._x)});
  //         }
  //       })
  //
  //       var directionsDisplay = new google.maps.DirectionsRenderer();
  //       var directionsService = new google.maps.DirectionsService();
  //       var geocoder = new google.maps.Geocoder();
  //
  //       console.log(waypts);
  //       // directions object -- with defaults
  //       $scope.directions = {
  //         origin: new google.maps.LatLng($scope.srcNode._y, $scope.srcNode._x),
  //         destination: new google.maps.LatLng($scope.destNode._y, $scope.destNode._x),
  //         waypoints: waypts,
  //         showList: false
  //       }
  //
  //       var request = {
  //         origin: $scope.directions.origin,
  //         destination: $scope.directions.destination,
  //         travelMode: google.maps.DirectionsTravelMode.WALKING
  //       };
  //       directionsService.route(request, function (response, status) {
  //         if (status === google.maps.DirectionsStatus.OK) {
  //           directionsDisplay.setDirections(response);
  //           directionsDisplay.setMap($scope.map.control.getGMap());
  //           directionsDisplay.setPanel(document.getElementById('directionsList'));
  //           $scope.directions.showList = true;
  //         } else {
  //           alert('Google route unsuccesfull!');
  //         }
  //       });
  //     });
  //   }
  //   else{
  //     alert("You are missing input.");
  //   }
  // }

  $scope.animateCircle = function(line) {
    var count = 0;
    window.setInterval(function() {
      count = (count + 1) % 200;

      var icons = line.get('icons');
      icons[0].offset = (count * 2) + '%';
      line.set('icons', icons);
    }, 80);
  }

  $scope.drawDirections = function() {
    if($scope.src != undefined && $scope.dest != undefined){
      if($scope.flightPath != undefined){
        $scope.flightPath.setMap(null);
      }
      // instantiate google map objects for directions
      $.get('/api/astar/' + $scope.src.replace(/\s+/g, '') +'/'+ $scope.dest.replace(/\s+/g, ''), function(obj){
        var leng = obj.length;
        var waypts = [];
        $.each(obj, function (idx, val) {
          if(idx == (leng-1)) {
            $scope.distance = (val.dist.toFixed(2));
          }
          else{
            waypts.push({lat: val.latitude, lng: val.longitude});
          }
        })
        var lineSymbol = {
          path: google.maps.SymbolPath.FORWARD_OPEN_ARROW,
          // path: 'M 0,-1 0,1',
          strokeOpacity: 1,
          scale: 1.5
        };

        $scope.flightPath = new google.maps.Polyline({
          map: $scope.map.control.getGMap(),
          icons: [{
            icon: lineSymbol,
            offset: '50%',
            // offset: '0',
            repeat: '10px'
          }],
          path: waypts,
          strokeOpacity: 0,
          strokeColor: '#FF0000',
        });

        $scope.animateCircle($scope.flightPath);
      })
    }
  }

  uiGmapIsReady.promise() // if no value is put in promise() it defaults to promise(1)
  .then(function (instances) {
  })

  // $scope.findMe = function () {
  //   if ($scope.geolocationAvailable) {
  //     navigator.geolocation.getCurrentPosition(function (position) {
  //       $scope.map.center = {
  //         latitude: position.coords.latitude,
  //         longitude: position.coords.longitude
  //       };
  //       $scope.$apply();
  //       console.log('Found You: ' + position.coords.latitude + ' || ' + position.coords.longitude + position.coords.altitude);
  //       $scope.markerLat = position.coords.latitude;
  //       $scope.markerLng = position.coords.longitude;
  //     });
  //   }
  // };

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
  .then(function (instances) {
  })

  $scope.chose = function(util){
    if(this.naviOn == undefined){
      alert("First timedu");
      this.findMe();
    }
    console.log(util);
    $scope.naviOn = true;
    console.log("naviOn is: " + $scope.naviOn);
    $scope.collapsed = false;
    $timeout(function() {
      $scope.$apply();
    },0);
  }

  $scope.findMe = function () {
    if ($scope.geolocationAvailable) {
      navigator.geolocation.getCurrentPosition(function (position) {
        $scope.map.center = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        $scope.$apply();
        console.log('Found You: ' + position.coords.latitude + ' || ' + position.coords.longitude);
        $scope.markerLat = position.coords.latitude;
        $scope.markerLng = position.coords.longitude;
      });
    }
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

  // $("#menu-toggle").click(function(e) {
  //       e.preventDefault();
  //       $("wrapper").toggleClass("active");
  //   });

  // /*Scroll Spy*/
  // $('body').scrollspy({ target: '#spy', offset:80});

  // /*Smooth link animation*/
  // $('a[href*=#]:not([href=#])').click(function() {
  //     if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {

  //         var target = $(this.hash);
  //         target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
  //         if (target.length) {
  //             $('html,body').animate({
  //                 scrollTop: target.offset().top
  //             }, 1000);
  //             return false;
  //         }
  //     }
  // });
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
