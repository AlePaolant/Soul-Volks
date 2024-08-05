document.addEventListener('DOMContentLoaded', () => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWxlY2l2aWNvMzIiLCJhIjoiY2x6YmZ2MXRrMDBkcTJqcXNreXJsa3NqZyJ9.OZ0YGhjdgEexo6Og0f2OaA';

    const map = new mapboxgl.Map({
        container: 'map', // ID del contenitore in cui visualizzare la mappa
        //style: 'mapbox://styles/mapbox/dark-v10', // Stile Mapbox di base
        //style: 'mapbox://styles/mapbox/navigation-night-v1', 
        //style: 'mapbox://styles/mapbox/satellite-streets-v12',
        //style: 'mapbox://styles/mapbox/outdoors-v12', //outdoors non supporta edifici 3d
        style: 'mapbox://styles/mapbox/satellite-v9', //stile satellite
        //style: 'mapbox://styles/mapbox/standard', //Stile Mappa standard
        //style: 'mapbox://styles/mapbox/outdoors-v11', // Stile Mapbox con supporto per il terreno 3D
        center: [14.391798639299449, 41.46166423606479], // Coordinate del centro della mappa [lng, lat]
        zoom: 16, // Livello di zoom iniziale
        pitch: 60, // Inclinazione della mappa
        bearing: -17.6, // Angolo di rotazione della mappa
        projection: 'globe',
        interactive: false, //rimuove interazione client
        attributionControl: false // Rimuove le scritte di attributo
    });

    // Carica il rilievo del terreno e abilita il rendering 3D
    map.on('style.load', () => {
        map.setFog({}); //default atmosphere style

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

        // Aggiungi una sorgente per gli edifici
        /*
        map.addSource('composite', {
            'type': 'vector',
            'url': 'mapbox://mapbox.mapbox-streets-v8'
        });

        // Aggiungi layer per gli edifici in 3D
        map.addLayer({
            'id': '3d-buildings',
            'source': 'composite',
            'source-layer': 'building',
            'filter': ['==', 'extrude', 'true'],
            'type': 'fill-extrusion',
            'minzoom': 15,
            'paint': {
                'fill-extrusion-color': '#aaa',
                'fill-extrusion-height': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    15, 0,
                    15.05, ['get', 'height']
                ],
                'fill-extrusion-base': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    15, 0,
                    15.05, ['get', 'min_height']
                ],
                'fill-extrusion-opacity': 0.6
            }
        });
        */
        // Configura l'illuminazione solare
        /*map.setLights({
          type: 'flat',
          lights: [
              {
                  anchor: 'viewport',
                  position: [0.3, 180, 30], // Regola gli angoli e la distanza per l'effetto tramonto
                  color: 'rgb(255, 153, 51)',
                  intensity: 1.0
              }
          ]
        });*/


        // Aggiungi controlli di navigazione (zoom e rotazione)
        //map.addControl(new mapboxgl.NavigationControl());

        // Aggiungi il controllo della bussola
        //map.addControl(new mapboxgl.FullscreenControl());


        // Custom Navigation Control
        /*class CustomNavigationControl {
            onAdd(map) {
                this.map = map;
                this.container = document.createElement('div');
                this.container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group';

                // Add buttons for zoom in, zoom out, and compass
                const zoomInButton = document.createElement('button');
                zoomInButton.innerHTML = '+';
                zoomInButton.onclick = () => map.zoomIn();
                this.container.appendChild(zoomInButton);

                const zoomOutButton = document.createElement('button');
                zoomOutButton.innerHTML = '-';
                zoomOutButton.onclick = () => map.zoomOut();
                this.container.appendChild(zoomOutButton);

                const compassButton = document.createElement('button');
                compassButton.innerHTML = 'N';
                compassButton.onclick = () => map.resetNorth();
                this.container.appendChild(compassButton);

                return this.container;
            }

            onRemove() {
                this.container.parentNode.removeChild(this.container);
                this.map = undefined;
            }
        }

        map.addControl(new CustomNavigationControl(), 'top-right');
        */

        // Camera Animation
        



    });
}); //domcontentloaded






document.addEventListener('DOMContentLoaded', () => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWxlY2l2aWNvMzIiLCJhIjoiY2x6YmZ2MXRrMDBkcTJqcXNreXJsa3NqZyJ9.OZ0YGhjdgEexo6Og0f2OaA';
    const map = new mapboxgl.Map({
        container: 'map',
        center: [14.391798, 41.461664],
        zoom: 11.53, 
        pitch: 76,      //tilt -> angolo rispetto l'orizzonte
        bearing: -177.2, //la direzione, misurata in gradi dal nord in senso orario
        style: 'mapbox://styles/mapbox/satellite-v9',
        projection: 'globe', //da zoom <6 diventa palla
    });

    map.on('style.load', () => {
        map.setFog({});
        map.addSource('mapbox-dem', {
            'type': 'raster-dem',
            'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
            'tileSize': 512,
            'maxzoom': 14
        });
        map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
    });

    function updateCameraPosition(position, altitude, target, pitch, bearing, zoom) {
        const camera = map.getFreeCameraOptions();
        camera.position = mapboxgl.MercatorCoordinate.fromLngLat(position, altitude);
        camera.lookAtPoint(target);
        camera.pitch = pitch;
        camera.bearing = bearing;
        map.setFreeCameraOptions(camera);
        map.setZoom(zoom);
    }

    map.once('idle', () => {
        const lerp = (a, b, t) => {
            if (Array.isArray(a) && Array.isArray(b)) {
                return a.map((v, i) => v * (1.0 - t) + b[i] * t);
            } else {
                return a * (1.0 - t) + b * t;
            }
        };

        const easeInOutQuad = (t) => {
            return t < 0.5 ? 2.0 * t * t : (4.0 - 2.0 * t) * t - 1.0;
        };

        const animations = [
            {   
                //ANIMAZIONE 
                duration: 10000.0,
                animate: (phase) => {
                    const start = [14.429391105241809, 41.448246747369375];
                    const end = [14.376211471300968, 41.45195319783663];
                    const alt = [5000.0, 3000.0];
                    const target1 = [14.372012255725457, 41.45260166179216];
                    const target2 = [14.372012255725457, 41.45260166179216];
                    const pitchValues = [70, 70];
                    const bearingValues = [-170, -180];
                    const zoomValues = [11.53, 11.53];

                    const position = lerp(start, end, phase);
                    const altitude = lerp(alt[0], alt[1], phase);
                    const target = lerp(target1, target2, phase);
                    const pitch = lerp(pitchValues[0], pitchValues[1], phase);
                    const bearing = lerp(bearingValues[0], bearingValues[1], phase);
                    const zoom = lerp(zoomValues[0], zoomValues[1], phase)
                    updateCameraPosition(position, altitude, target, pitch, bearing, zoom);
                }
            },
        ];

        let animationIndex = 0;
        let animationTime = 0.0;
        let lastTime = 0.0;

        function frame(time) {
            animationIndex %= animations.length;
            const current = animations[animationIndex];

            if (animationTime < current.duration) {
                const phase = animationTime / current.duration;
                current.animate(phase);
            }

            const elapsed = time - lastTime;
            animationTime += elapsed;
            lastTime = time;

            if (animationTime > current.duration) {
                animationIndex++;
                animationTime = 0.0;
                if (animationIndex === animations.length) {
                    map.interactive = true;
                    return;
                }
            }

            window.requestAnimationFrame(frame);
        }

        window.requestAnimationFrame(frame);
    });

});
