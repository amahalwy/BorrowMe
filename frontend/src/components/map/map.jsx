import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {clearMap} from '../../actions/posting_actions';
import mapboxgl from "mapbox-gl";

const Map = (props) => {
  const token = process.env.REACT_APP_MAP_BOX_TOKEN;
  const mapContainer = useRef(null);
  const [map, setMap] = useState("");
  const currentUser = useSelector((state) => state.session.user);
  const posting = useSelector(state => state.entities.modal);
  const searchTextCurrentUser = `${currentUser.address} ${currentUser.city} ${currentUser.state} ${currentUser.zipCode}`;
  const { address, city, state, zipCode } = posting;
  const postingAddress = `${address} ${city} ${state} ${zipCode}`;
  const postingAddressShow = `${address}`;

  const dispatch = useDispatch();

  useEffect(() => {
    handleMap();
  }, [map]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleMap = () => {

    mapboxgl.accessToken = token;

    const initializeMap = async ({ setMap, mapContainer }) => {

      const map = new mapboxgl.Map({
        // the type of map we want to have
        // the latLong info
        // ref mapContainer, current allows us to access everything in the dom for that specific element
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/light-v10",
        center: ["-122.44", "37.76"],
        zoom: 11,
      });

      setMap(map);


      /**
       This is the First Marker
       */
      // let request = new Request(
      //   `https://api.mapbox.com/geocoding/v5/mapbox.places/${postingAddress}.json?country=US&access_token=${token}`
      // );
      let request = new Request(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${postingAddress}.json?country=US&access_token=${token}`
      );

      const res = await fetch(request);
      const json = await res.json();
      const coordinates = json.features[0].geometry.coordinates;

      new mapboxgl.Marker({ color: "#cc0000" })
        .setLngLat([coordinates[0], coordinates[1]])
        .addTo(map);

      /**
       * This is the Second Marker
       */
      // find currentUser's information
      // let requestCurrentUser = new Request(
      //   `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchTextCurrentUser}.json?country=US&access_token=${token}`
      // );
      let requestCurrentUser = new Request(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchTextCurrentUser}.json?country=US&access_token=${token}`
      );
      const resCurrentUser = await fetch(requestCurrentUser);
      const jsonCurrentUser = await resCurrentUser.json();
      const coordinatesCurrentUser =
        jsonCurrentUser.features[0].geometry.coordinates;

      new mapboxgl.Marker()
        .setLngLat([coordinatesCurrentUser[0], coordinatesCurrentUser[1]])
        .addTo(map)

      /**
       * asychronous call to receiver the routes data between 2 points
       */

      const getRoute = () => {
        const start = [coordinatesCurrentUser[0], coordinatesCurrentUser[1]];
        let url =
          "https://api.mapbox.com/directions/v5/mapbox/cycling/" +
          `${start[0]}` +
          "," +
          `${start[1]}` +
          ";" +
          `${coordinates[0]}` +
          "," +
          `${coordinates[1]}` +
          "?steps=true&geometries=geojson&access_token=" +
          `${token}`;


        let req = new XMLHttpRequest();
        req.open("GET", url, true);
        req.onload = function () {
          let jsonRoute = JSON.parse(req.response);
          let data = jsonRoute.routes[0];
          let route = data.geometry.coordinates;
          let geojson = {
            type: "Feature",
            properties: {
              icon: {
                iconUrl: posting.image,
                iconSize: [50, 50], // size of the icon
                iconAnchor: [25, 25], // point of the icon which will correspond to marker's location
                popupAnchor: [0, -25], // point from which the popup should open relative to the iconAnchor
                className: 'dot'
              }
            },
            geometry: {
              type: "LineString",
              coordinates: route,
            },
          };
          if (map.getSource("route")) {
            map.getSource("route").setData(geojson);
          } else {
            map.addLayer({
              id: "route",
              type: "line",
              source: {
                type: "geojson",
                data: {
                  type: "Feature",
                  properties: {},
                  geometry: {
                    type: "LineString",
                    coordinates: geojson,
                  },
                },
              },
              layout: {
                "line-join": "round",
                "line-cap": "round",
              },
              paint: {
                "line-color": "#3887be",
                "line-width": 5,
                "line-opacity": 0.75,
              },
            });
          }
        };
        req.send();
      };
      getRoute();

      map.on('load', () => {
        const defaultCoords = {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: [],
          },
        };

        map.addSource("routes", {
          type: "geojson",
          data: defaultCoords,
        });
        getRoute();
      })
    };
    // if no map, update dom
    if (!map) initializeMap({ setMap, mapContainer });
  };

  const handleClick = () => {
    dispatch(clearMap());
    props.hideModal();
  }

  return (
    <div>
      <button className="close-map-x" onClick={handleClick}>X</button>
      <div className="maps-info-header">
          <h1 className="posting-title-map">{posting.title}</h1>
        <div className="posting-description-map">
        <div>Your address: {currentUser.address}</div>
        <div>Item address: {postingAddressShow}</div>
      </div>
        <div ref={(el) => (mapContainer.current = el)} className="container-for-map"></div>
      </div>
    </div>
  );
}

export default Map;
