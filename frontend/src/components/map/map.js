import React, { useEffect, useState, useRef } from "react";
import mapboxgl from "mapbox-gl";
const token = require('../../config/keys').mapBoxToken;

const Map = (props) => {
  const lng = -122.44;
  const lat = 37.76;
  const zoom = 11;

  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = token;
    const bounds = [
      [-122.54, 37.6], // [west, south]
      [-122.34, 37.9], // [east, north]
    ];

    const initializeMap = ({ setMap, mapContainer }) => {
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
    };
    if (!map) initializeMap({ setMap, mapContainer });
  }, [map]);

  // Add zoom and rotation controls to the map.

  // const marker = new mapboxgl.Marker()
  //   .setLngLat([103.811279, 1.345399])
  //   .addTo(map);

  // const geolocate = new mapboxgl.GeolocateControl({
  //   positionOptions: {
  //     enableHighAccuracy: true,
  //   },
  //   trackUserLocation: true,
  // });

  // map.addControl(geolocate, "top-right");
  // hello

  // 2nd try

  // const nav = new mapboxgl.NavigationControl();
  // map.addControl(nav, "top-right");

  // const marker = new mapboxgl.Marker()
  //   .setLngLat([103.811279, 1.345399])
  //   .addTo(map);

  // var marker = new mapboxgl.Marker()
  //   .setLngLat([12.550343, 55.665957])
  //   .addTo(map);

  // const mapBoxMarker = new mapboxgl.Marker(el)
  //   .setLngLat(marker.geometry.coordinates)
  //   .setPopup(popup);

  // 3rd try
  var geojson = {
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







