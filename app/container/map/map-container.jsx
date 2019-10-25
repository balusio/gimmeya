import React, { Component } from 'react';
import L from 'leaflet';

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.mapContainer = null;
    this.centralMark = null;
    this.handleClicks = this.handleClicks.bind(this);
  }


  componentDidMount() {
    this.setMapHandlers('mapContainer');
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.MapContainer);
    this.centralMark.bindPopup('<b>Hello world!</b><br>I am a popup.').openPopup();
  }

  setMapHandlers(mapId) {
    this.MapContainer = L.map(mapId).setView([-34.8903263, -56.1847601], 13);
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
