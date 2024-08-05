document.addEventListener('DOMContentLoaded', function () {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWxlY2l2aWNvMzIiLCJhIjoiY2x6YmZ2MXRrMDBkcTJqcXNreXJsa3NqZyJ9.OZ0YGhjdgEexo6Og0f2OaA';
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/satellite-v9',
        center: [14.430722141876714, 41.40461170387765], // Punto di partenza
        zoom: 8, // Puoi cambiare lo zoom iniziale qui
        pitch: 50, // Inizio pitch -> angolo rispetto l'orizzonte
        bearing: 0, // Inizio bearing -> la direzione, misurata in gradi dal nord in senso orario
        projection: 'globe', //da zoom <6 diventa palla
    });

    // Aggiungere i controlli personalizzati
    map.addControl(new mapboxgl.NavigationControl({
        visualizePitch: true
    }));

    //nuvole e ombre sul terreno per aumentare realtà
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

    // Funzione di easing in-out
    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    //animazione apertura
    function startAnimation() {
        map.flyTo({
            center: [14.394228171124604, 41.45935576517148], // Punto di arrivo
            zoom: 15, // Puoi cambiare lo zoom finale qui
            pitch: 0, // Fine pitch
            bearing: 30, // Fine bearing
            speed: 0.5, // Velocità dell'animazione
            curve: 2, // Curva dell'animazione (1 è lineare, valori più alti producono animazioni più curve)
            easing: easeInOutQuad
        });
    }

    // Rileva quando la sezione della mappa entra nella visualizzazione
    document.addEventListener('scroll', function () {
        var mapContainer = document.querySelector('.map-container');
        var bounding = mapContainer.getBoundingClientRect();
        var inView = (
            bounding.top >= 0 &&
            bounding.left >= 0 &&
            bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
        if (inView) {
            startAnimation();
        }
    });

    // Abilitare lo scroll zoom quando l'utente interagisce con la mappa
    map.on('mouseenter', function () {
        map.scrollZoom.enable();
    });

    // Disabilitare lo scroll zoom quando il cursore lascia la mappa
    map.on('mouseleave', function () {
        map.scrollZoom.disable();
    });
});