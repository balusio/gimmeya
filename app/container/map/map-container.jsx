/* eslint-disable react/prop-types */
import React, { Component } from 'react';
// eslint-disable-next-line import/no-unresolved
import { GetUrlParams } from 'utils';
import L from 'leaflet';

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.mapContainer = null;
    this.centralMark = null;
    this.handleClicks = this.handleClicks.bind(this);
    this.paramsUrl = '';
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
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    // eslint-disable-next-line
    this.paramsUrl = GetUrlParams(this.props.history.location.search);
    console.log(this.paramsUrl);
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
    this.centralMark = L.marker([-34.8903263, -56.1847601]).addTo(this.MapContainer);
    this.MapContainer.on('click', this.handleClicks);
  }

  handleClicks(e) {
    L.marker([e.latlng.lat, e.latlng.lng]).addTo(this.MapContainer);
  }


  render() {
    return (
      <div>
        <div id="mapContainer" />
      </div>
    );
  }
}
export default MapContainer;
