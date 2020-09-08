import React, { useEffect, useState, useRef } from "react";
import { useSelector } from 'react-redux';
import mapboxgl from "mapbox-gl";
const token = require('../../config/keys').mapBoxToken;

const Map = (props) => {
  const lng = -122.44;
  const lat = 37.76;
  const zoom = 11;
  
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);
  const currentUser = useSelector((state) => state.session.user);

  const searchTextCurrentUser = `${currentUser.address} ${currentUser.city} ${currentUser.state} ${currentUser.zipCode}`;
  const { address, city, state, zipCode } = props.posting;
  const searchText = `${address} ${city} ${state} ${zipCode}`;

  useEffect(() => {
    mapboxgl.accessToken = token;
    const bounds = [
      [-122.54, 37.6], // [west, south]
      [-122.34, 37.9], // [east, north]
    ];

    const initializeMap = async ({ setMap }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current, // container id
        style: "mapbox://styles/mapbox/streets-v11",
        center: [lng, lat], // starting position
        zoom: zoom, // starting zoom
      });
      map.addControl(new mapboxgl.NavigationControl());
      map.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
        })
      );
      map.setMaxBounds(bounds);
      setMap(map);
      

      let request = new Request(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchText}.json?country=US&access_token=${token}`);
      const res = await fetch(request);
      const json = await res.json();
      const coordinates = json.features[0].geometry.coordinates;
      
      let markerPlace = new mapboxgl.Marker()
        .setLngLat([coordinates[0], coordinates[1]])
        .addTo(map);

      // find currentUser's information
      let requestCurrentUser = new Request(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchTextCurrentUser}.json?country=US&access_token=${token}`);
      const resCurrentUser = await fetch(requestCurrentUser);
      const jsonCurrentUser = await resCurrentUser.json();
      const coordinatesCurrentUser = jsonCurrentUser.features[0].geometry.coordinates;

      let markerPlaceCurrentUser = new mapboxgl.Marker()
        .setLngLat([coordinatesCurrentUser[0], coordinatesCurrentUser[1]])
        .addTo(map);

      function getRoute(coordinates) {
        // make a directions request using cycling profile
        // an arbitrary start will always be the same
        // only the end or destination will change
        let start = [coordinatesCurrentUser[0], coordinatesCurrentUser[1]];
        let url = 'https://api.mapbox.com/directions/v5/mapbox/cycling/' + start[0] + ',' + start[1] + ';' + coordinates[0] + ',' + coordinates[1] + '?steps=true&geometries=geojson&access_token=' + `${token}`;

        // make an XHR request https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
        let req = new XMLHttpRequest();
        req.open('GET', url, true);
        req.onload = function () {
          let jsonRoute = JSON.parse(req.response);
          let data = jsonRoute.routes[0];
          let route = data.geometry.coordinates;
          let geojson = {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: route
            }
          };
          // if the route already exists on the map, reset it using setData
          if (map.getSource('route')) {
            map.getSource('route').setData(geojson);
          } else { // otherwise, make a new request
            map.addLayer({
              id: 'route',
              type: 'line',
              source: {
                type: 'geojson',
                data: {
                  type: 'Feature',
                  properties: {},
                  geometry: {
                    type: 'LineString',
                    coordinates: geojson
                  }
                }
              },
              layout: {
                'line-join': 'round',
                'line-cap': 'round'
              },
              paint: {
                'line-color': '#3887be',
                'line-width': 5,
                'line-opacity': 0.75
              }
            });
          }
          // add turn instructions here at the end
        };
        req.send();
      }


    };
    if (!map) initializeMap({ setMap, mapContainer });
  }, [map]);

  return (
    <div>
      <div
        ref={(el) => (mapContainer.current = el)}
        className="map_container"
      />
    </div>
  );
};


export default Map;






























// import React, { useState } from "react";
// import MapGL, { GeolocateControl } from "react-map-gl";
// import   from "";
// import "mapbox-gl/dist/mapbox-gl.css";

// const TOKEN = accessToken;

// const geolocateStyle = {
//   float: "left",
//   margin: "50px",
//   padding: "10px",
// };

// const Map = () => {
//   const [viewport, setViewPort] = useState({
//     width: "100%",
//     height: 900,
//     latitude: 0,
//     longitude: 0,
//     zoom: 2,
//   });

//   const _onViewportChange = (viewport) =>
//     setViewPort({ ...viewport, transitionDuration: 3000 });

//   return (
//     <div style={{ margin: "0 auto" }}>
//       <h1
//         style={{ textAlign: "center", fontSize: "25px", fontWeight: "bolder" }}
//       >
//         GeoLocator: Click To Find Your Location or click{" "}
//         <a href="/search">here</a> to search for a location
//       </h1>
//       <MapGL
//         {...viewport}
//         mapboxApiAccessToken={TOKEN}
//         mapStyle="mapbox://styles/mapbox/dark-v8"
//         onViewportChange={_onViewportChange}
//       >
//         <GeolocateControl
//           style={geolocateStyle}
//           positionOptions={{ enableHighAccuracy: true }}
//           trackUserLocation={true}
//         />
//       </MapGL>
//     </div>
//   );
// };

// export default Map;







