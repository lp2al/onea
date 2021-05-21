let GoogleMapsLoader = require('google-maps');
GoogleMapsLoader.KEY = 'AIzaSyCdMhhON6f0D6kgLstRWBwHCOUFnwq0Jok';
GoogleMapsLoader.REGION = 'GB';

let map;
let office_location = { lat: 51.5156238, lng: -0.0861432 };

GoogleMapsLoader.load(function(google) {
  map = new google.maps.Map(document.getElementById('map'), {
    center: office_location,
    zoom: 16,
    scrollwheel: false,
    mapTypeControl: false,
    styles: [
      {
        featureType: 'all',
        elementType: 'labels.text.fill',
        stylers: [
          {
            saturation: 36
          },
          {
            color: '#333333'
          },
          {
            lightness: 40
          }
        ]
      },
      {
        featureType: 'all',
        elementType: 'labels.text.stroke',
        stylers: [
          {
            visibility: 'on'
          },
          {
            color: '#ffffff'
          },
          {
            lightness: 16
          }
        ]
      },
      {
        featureType: 'all',
        elementType: 'labels.icon',
        stylers: [
          {
            visibility: 'off'
          }
        ]
      },
      {
        featureType: 'administrative',
        elementType: 'geometry.fill',
        stylers: [
          {
            color: '#fcfcfc'
          },
          {
            lightness: 20
          }
        ]
      },
      {
        featureType: 'administrative',
        elementType: 'geometry.stroke',
        stylers: [
          {
            color: '#fcfcfc'
          },
          {
            lightness: 17
          },
          {
            weight: 1.2
          }
        ]
      },
      {
        featureType: 'landscape',
        elementType: 'geometry',
        stylers: [
          {
            color: '#eeeeee'
          },
          {
            lightness: 1
          }
        ]
      },
      {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [
          {
            color: '#f5f5f5'
          },
          {
            lightness: 21
          }
        ]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [
          {
            color: '#dedede'
          },
          {
            lightness: 21
          }
        ]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.fill',
        stylers: [
          {
            color: '#ffffff'
          },
          {
            lightness: 17
          }
        ]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [
          {
            color: '#ffffff'
          },
          {
            lightness: 29
          },
          {
            weight: 0.2
          }
        ]
      },
      {
        featureType: 'road.arterial',
        elementType: 'geometry',
        stylers: [
          {
            color: '#ffffff'
          },
          {
            lightness: 18
          }
        ]
      },
      {
        featureType: 'road.local',
        elementType: 'geometry',
        stylers: [
          {
            color: '#ffffff'
          },
          {
            lightness: 16
          }
        ]
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [
          {
            color: '#f2f2f2'
          },
          {
            lightness: 19
          }
        ]
      },
      {
        featureType: 'transit.station.rail',
        elementType: 'labels.icon',
        stylers: [
          {
            visibility: 'on'
          }
        ]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [
          {
            color: '#e9e9e9'
          },
          {
            lightness: 17
          }
        ]
      }
    ]
  });

  var icon = {
    path:
      'M32.2 15.9C32 7.1 24.9 0 16.1 0c0 0 0 0 0 0 0 0 0 0 0 0C7.2 0 0.1 7.1 0 15.9c0 3.3 0.9 6.3 2.6 8.9 1.3 2.1 3.7 5.2 6.8 9.7 4.5 6.5 6.4 11.7 6.7 12.5v0.1c0 0 0 0 0-0.1 0 0 0 0.1 0 0.1V47c0.3-0.8 2.2-6 6.7-12.5 3.1-4.5 5.4-7.6 6.8-9.7C31.2 22.2 32.2 19.2 32.2 15.9zM16.1 21.9c-3.4 0-6.1-2.7-6.1-6.1s2.7-6.1 6.1-6.1c3.4 0 6.1 2.7 6.1 6.1S19.4 21.9 16.1 21.9z',
    fillColor: '#184774',
    fillOpacity: 1,
    size: new google.maps.Size(34, 47),
    anchor: new google.maps.Point(17, 47),
    strokeWeight: 0,
    scale: 1
  };

  var marker = new google.maps.Marker({
    map: map,
    // title: location.title,
    url: '',
    position: office_location,
    icon: icon
  });
});
