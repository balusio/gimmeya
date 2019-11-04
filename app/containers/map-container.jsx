/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { GetUrlParams } from 'utils';
import L from 'leaflet';
import Container from '@material-ui/core/Container';
import iconMap from 'assets/images/icon-map.jpg';

export default class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.mapContainer = null;
    this.centralMark = null;
    this.handleClicks = this.handleClicks.bind(this);
    this.paramsUrl = '';
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
    this.setMapHandlers('mapContainer');
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.MapContainer);
    this.centralMark.bindPopup('<b>Hello world!</b><br>I am a popup.').openPopup();
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
      [-34.8903263, -56.1847601],
      { icon: MapIcon },
    ).addTo(this.MapContainer);
    this.MapContainer.on('click', this.handleClicks);
  }

  handleClicks(e) {
    const MapIcon = new this.PYicon({ iconUrl: iconMap });
    const mark = L.marker(
      [e.latlng.lat, e.latlng.lng],
      { icon: MapIcon },
    ).addTo(this.MapContainer);
    mark.bindPopup(`<b>Hello world!</b><br>${e.latlng.lat}`).openPopup();
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
