// getting places from APIs
function loadPlacesAPI(position) {
    const params = {
        radius: 300,    // search places not farther than this value (in meters)
        clientId: '<YOUR-CLIENT-ID>',
        clientSecret: 'YOUR-CLIENT-SECRET',
        version: '20300101',    // foursquare versioning, required but unuseful for this demo
    };

    // CORS Proxy to avoid CORS problems
    const corsProxy = 'https://cors-anywhere.herokuapp.com/';

    // Foursquare API (limit param: number of maximum places to fetch)
    const endpoint = `${corsProxy}https://api.foursquare.com/v2/venues/search?intent=checkin
        &ll=${position.latitude},${position.longitude}
        &radius=${params.radius}
        &client_id=${params.clientId}
        &client_secret=${params.clientSecret}
        &limit=30
        &v=${params.version}`;
    return fetch(endpoint)
        .then((res) => {
            return res.json()
                .then((resp) => {
                    return resp.response.venues;
                })
        })
        .catch((err) => {
            console.error('Error with places API', err);
        })
};

function loadPlaces(position) {
  return [
    {
      name: 'Intendencia de Montevideo',
      location: {
        lat: -34.905680,
        lng: -56.183540,
      },
    },
  ];
}

window.onload = () => {
    const scene = document.querySelector('a-scene');

    let placeText = document.createElement('a-link');
    placeText.setAttribute('gps-entity-place', 'latitude: -34.905680; longitude: -56.183540;');
    placeText.setAttribute('title', 'lugar');
    placeText.setAttribute('scale', "15 15 15");
    placeText.scale = '15 15 15';
    scene.appendChild(placeText);

    // first get current user location
    /*
    return navigator.geolocation.getCurrentPosition(function (position) {

        // than use it to load from remote APIs some places nearby
        places = loadPlaces(position.coords);
        places.forEach((place) => {
            let latitude = place.location.lat;
            let longitude = place.location.lng;

            // add place name
            let placeText = document.createElement('a-link');
            placeText.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
            placeText.setAttribute('title', place.name);
            placeText.setAttribute('scale', '15 15 15');

            placeText.addEventListener('loaded', () => {
                window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
            });

            scene.appendChild(placeText);
        });
    },
        (err) => console.error('Error in retrieving position', err),
        {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 27000,
        }
    );
    */
};
