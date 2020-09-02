import React, { useEffect, useState, useRef } from "react";
import mapboxgl from "mapbox-gl";
const mapBoxToken = require('../../config/keys');
// import { withRouter, link } from "react-router-dom";
// import Typical from "react-typical";

const Map = (props) => {
  const lng = -122.44;
  const lat = 37.76;
  const zoom = 11;

  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);


  useEffect(() => {
    mapboxgl.accessToken = mapBoxToken;
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







