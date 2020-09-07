import React, { useEffect, useState, useRef } from "react";
import mapboxgl from "mapbox-gl";
const token = require('../../config/keys').mapBoxToken;

const Map = (props) => {
  const lng = -122.44;
  const lat = 37.76;
  const zoom = 11;

  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);
  
  const { address, city, state, zipCode } = props

  const searchText = `${address} ${city} ${state} ${zipCode}`

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

      let marker = new mapboxgl.Marker()
        .setLngLat([-122.414, 37.776])
        .addTo(map);

      // let searchText = "123 kissling street san francisco CA 94103"
      let request = new Request(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchText}.json?country=US&access_token=${token}`);
      const res = await fetch(request);
      const json = await res.json();
      const coordinates = json.features[0].geometry.coordinates;
      console.log(coordinates);
      // .then(function (response.json()) {
      //   // debugger
      //   console.log(response.json());
      //   return response.json();
      // }).then( json => {
      //   const data = json.features[0].geometry.coordinates;
      //   console.log(data);
      // })
      
      let markerPlace = new mapboxgl.Marker()
        .setLngLat([coordinates[0], coordinates[1]])
        .addTo(map);


    };
    if (!map) initializeMap({ setMap, mapContainer });
  }, [map]);


  // // 3rd try
  let geojson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-77.032, 38.913],
        },
        properties: {
          title: "Mapbox",
          description: "Washington, D.C.",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-122.414, 37.776],
        },
        properties: {
          title: "Mapbox",
          description: "San Francisco, California",
        },
      },
    ],
  };

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







