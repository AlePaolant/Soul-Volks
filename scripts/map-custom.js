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
            center: [14.39055192342659, 41.461584010402674], // Punto di arrivo
            zoom: 16.4, // Puoi cambiare lo zoom finale qui
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

    const pings = [
        { id: 1, coordinates: [14.390004420801807, 41.46247297109987], title: "Toilette", description: "Servizi igienici NON muniti di docce", icon: "fa-solid fa-restroom" },
        { id: 2, coordinates: [14.389679455057014, 41.462916030900615], title: "Piscina", description: "Piscina attrezzata per bambini e adulti presso BOOOH", icon: "fa-solid fa-person-swimming" },
        { id: 3, coordinates: [14.393274383606018, 41.46180476423195], title: "Docce", description: "Servizi igienici E docce presso BOOOH", icon:"fa-solid fa-shower" },
        { id: 4, coordinates: [14.391840693421498, 41.46197495076244], title: "Cassa", description: "Acquista qui il braccialetto e approfitta dei pacchetti scontati", icon: "fa-regular fa-money-bill-1" },
        { id: 5, coordinates: [14.3916456139858, 41.46129409711963], title: "Quad", description: "Escursione in enduro con i quad? Si, puoi fare anche quello!", icon: "fa-solid fa-truck-monster" },
        { id: 6, coordinates: [14.390649697898679, 41.46205830679195], title: "Street Food", description: "Troverai qui stand enogastronomici locali (anche gluten free e vegani)", icon: "fa-solid fa-utensils" },
        { id: 7, coordinates: [14.390841821422201, 41.46202662348957], title: "Drink", description: "Spillatori, drinks, analcolici.. ne abbiamo per tutti i gusti", icon: "fa-solid fa-beer-mug-empty" },
        { id: 8, coordinates: [14.390165377615325, 41.46215748274865], title: "Mercatini Vintage", description: "Antiquariato, Modernariato, Collezionismo, Oggettistica, Vinili, Abbigliamento", icon: "fa-solid fa-store" },
        { id: 9, coordinates: [14.390168449157844, 41.461318264803445], title: "Palco", description: "Qui ci saranno tutti i concerti ed i Dj set", icon: "fa-solid fa-music" },
        { id: 10, coordinates: [14.391504825507427, 41.46064710208042], title: "Gonfiabili", description: "Troverai anche dei gonfiabili per i bambini", icon: "fa-brands fa-fort-awesome" },
        { id: 11, coordinates: [14.391148332569133, 41.46054503692649], title: "Cavalli", description: "Passeggiata a cavallo... per neofiti e professionisti!", icon: "fa-solid fa-horse" },
        { id: 12, coordinates: [14.392870162986872, 41.46121475229025], title: "Campeggio 1", description: "Postazione campeggio 1, per chi vuole passare una nottata in tranquillità", icon: "fa-solid fa-campground" },
        { id: 13, coordinates: [14.390173777568268, 41.46166052123026], title: "Campeggio 2", description: "Postazione campeggio 2, per chi vuole ballare tutta la notte", icon: "fa-solid fa-campground" },
        { id: 14, coordinates: [14.388164759170397, 41.461589142646844], title: "Campeggio 3", description: "Postazione campeggio 3, per chi ama il fruscio del vento tra gli alberi", icon: "fa-solid fa-campground" },
        { id: 15, coordinates: [14.392155245492626, 41.461456535086356], title: "Posteggio VW 1", description: "Qui troverai una serie di veicoli a marchio Volkswagen", icon: "fa-solid fa-van-shuttle" },
        { id: 16, coordinates: [14.38945565290419, 41.46148975186884], title: "Posteggio VW 2", description: "Qui troverai una serie di veicoli a marchio Volkswagen", icon: "fa-solid fa-van-shuttle" },
        { id: 17, coordinates: [14.390920076803644, 41.46126256734185], title: "Posteggio VW 3", description: "Qui troverai una serie di veicoli a marchio Volkswagen", icon: "fa-solid fa-van-shuttle" },
        { id: 18, coordinates: [14.394193101307708, 41.46103848639108], title: "Parcheggio generale", description: "Non hai un veicolo Volkswagen? C'è parcheggio anche per te!", icon: "fa-solid fa-square-parking" },
        { id: 19, coordinates: [14.389074572422766, 41.45837872202196], title: "Seggiovia", description: "Da qui si sale per la vetta! (Sabato 24)", icon: "fa-solid fa-cable-car" },
        { id: 20, coordinates: [14.392177030697333, 41.46190757208294], title: "Ingresso", description: "Si entra da qui!", icon: "fa-solid fa-map-pin" }
    ];

    pings.forEach(ping => {
        const el = document.createElement('div');
        el.className = 'marker';
        el.innerHTML = `<i class="${ping.icon}"></i>`;

        const marker = new mapboxgl.Marker(el)
            .setLngLat(ping.coordinates)
            .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`
                <div class="map-popup-content">
                    <i class="${ping.icon}" style="font-size: 24px; color: red;"></i>
                    <h3>${ping.title}</h3>
                    <p>${ping.description}</p>
                    <button class="btn btn-primary" onclick="openGoogleMaps(${ping.coordinates[1]}, ${ping.coordinates[0]})">Portami qui</button>
                </div>
            `))
            .addTo(map);

        const pingItem = document.createElement('div');
        pingItem.className = 'ping-item';
        pingItem.innerHTML = `<i class="${ping.icon}" style="font-size: 20px; margin-right: 10px;"></i>${ping.title}`;
        pingItem.addEventListener('click', () => {
            document.querySelectorAll('.ping-item').forEach(item => item.classList.remove('active'));
            pingItem.classList.add('active');
            marker.togglePopup();
            map.flyTo({ center: ping.coordinates, zoom: 15 });
        });

        document.getElementById('ping-list').appendChild(pingItem);
    });
});

function openGoogleMaps(lat, lng) {
    const url = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(url, '_blank');
}