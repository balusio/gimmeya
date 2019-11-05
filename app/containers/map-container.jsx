/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { GetUrlParams } from 'utils';
import L from 'leaflet';
import Container from '@material-ui/core/Container';
import iconMap from 'assets/images/icon-map.jpg';
import axios from 'axios';
import AuthContext from 'services/context-handler';

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.mapContainer = null;
    this.centralMark = null;
    this.handleClicks = this.handleClicks.bind(this);
    this.paramsUrl = '';
    this.defaultCoords = [-34.8903263, -56.1847601];
    this.currentSearch = [];
    this.PYicon = L.Icon.extend({
      options: {
        iconSize: [30, 30],
        iconAnchor: [30, 30],
        popupAnchor: [-15, -30],
      },
    });
  }

  componentDidMount() {
    this.onRouteChanged();
    this.getRestaurants(this.defaultCoords).then((response) => {
      console.log(response.data.data);
      this.setRestaurants(response.data.data);
    }).catch((err) => {
      console.log(err);
    });
    this.setMapHandlers('mapContainer');
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.MapContainer);
    this.centralMark.bindPopup('<b>You are here</b>').openPopup();
  }

  componentDidUpdate(prevProps) {
    // eslint-disable-next-line react/destructuring-assignment
    if (this.this.props.location && this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    // eslint-disable-next-line
    this.paramsUrl = this.props.history ? GetUrlParams(this.props.history.location.search) : [-34.8903263, -56.1847601];
  }

  getRestaurants(coordinates) {
    const sessionStatus = this.context;
    // eslint-disable-next-line react/destructuring-assignment
    const optionsReq = {
      method: 'post',
      url: 'http://localhost:3000/maps',
      // eslint-disable-next-line no-unneeded-ternary
      data: {
        coord: coordinates,
      },
    };
    if (sessionStatus.get('session_hash')) {
      console.log(' INSIDE HASH');
      optionsReq.headers = {
        Authorization: sessionStatus.get('session_hash'),
      };
    }
    return axios(optionsReq);
  }

  // eslint-disable-next-line class-methods-use-this
  getParams(url) {
    return url.substring(1).split('&').reduce((obj, queryParam) => {
      const paramKeyVal = queryParam.split('=');
      // eslint-disable-next-line no-param-reassign
      obj[paramKeyVal[0]] = decodeURIComponent(paramKeyVal[1]);
      return obj;
    }, {});
  }

  setMapHandlers(mapId) {
    this.MapContainer = L.map(mapId).setView(this.paramsUrl, 13);
    const MapIcon = new this.PYicon({ iconUrl: iconMap });
    this.centralMark = L.marker(
      this.defaultCoords,
      { icon: MapIcon },
    ).addTo(this.MapContainer);
    this.MapContainer.on('click', this.handleClicks);
  }

  setRestaurants(arrayRest) {
    const MapIcon = new this.PYicon({ iconUrl: iconMap });
    const currentRests = arrayRest.map((element) => {
      const restCoordinates = element.coordinates.split(',');
      const mark = L.marker(
        [restCoordinates[0], restCoordinates[1]],
        { icon: MapIcon },
      );
      mark.bindPopup(`<b>${element.name}</b><br> <b> Score : ${element.ratingScore}</b>`).openPopup();
      return mark;
    });
    this.currentSearch = L.layerGroup(currentRests);
    this.currentSearch.addTo(this.MapContainer);
  }

  // eslint-disable-next-line class-methods-use-this
  handleClicks(e) {
    this.MapContainer.removeLayer(this.currentSearch);
    this.getRestaurants([e.latlng.lat, e.latlng.lng]).then((response) => {
      this.setRestaurants(response.data.data);
    });
    // const MapIcon = new this.PYicon({ iconUrl: iconMap });
    // const mark = L.marker(
    //   [e.latlng.lat, e.latlng.lng],
    //   { icon: MapIcon },
    // ).addTo(this.MapContainer);
    // mark.bindPopup(`<b>Hello world!</b><br>${e.latlng.lat}`).openPopup();
  }


  render() {
    const customStyles = {
      width: window.innerWidth,
      height: window.innerHeight,
      padding: 0,
      margin: 0,
    };

    return (
      <>
        <Container maxWidth="xl">
          <div id="mapContainer" style={customStyles} />
        </Container>
      </>
    );
  }
}

MapContainer.contextType = AuthContext;

export default MapContainer;
