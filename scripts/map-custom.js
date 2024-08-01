document.addEventListener('DOMContentLoaded', (event) => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWxlY2l2aWNvMzIiLCJhIjoiY2x6YmZ2MXRrMDBkcTJqcXNreXJsa3NqZyJ9.OZ0YGhjdgEexo6Og0f2OaA';
  
    const map = new mapboxgl.Map({
      container: 'map', // ID del contenitore in cui visualizzare la mappa
      style: 'mapbox://styles/mapbox/satellite-v9',
      //style: 'mapbox://styles/mapbox/standard', //Stile Mappa standard
      //style: 'mapbox://styles/mapbox/outdoors-v11', // Stile Mapbox con supporto per il terreno 3D
      center: [14.391798639299449, 41.46166423606479], // Coordinate del centro della mappa [lng, lat]
      zoom: 13, // Livello di zoom iniziale
      projection: 'globe'
    });
  
    // Aggiungi controlli di navigazione (zoom e rotazione)
    map.addControl(new mapboxgl.NavigationControl());
  
    // Aggiungi il controllo della bussola
    map.addControl(new mapboxgl.FullscreenControl());
  
    // Carica il rilievo del terreno e abilita il rendering 3D
    map.on('load', () => {
      map.addSource('mapbox-dem', {
        'type': 'raster-dem',
        'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
        'tileSize': 512,
        'maxzoom': 14
      });
      map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
  
      // Aggiungi layer ombre del terreno per migliorare la percezione della profondità e delle variazioni di elevazione
      map.addLayer({
        'id': 'hillshading',
        'source': 'mapbox-dem',
        'type': 'hillshade'
      });
    });
  });
  