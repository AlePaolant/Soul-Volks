# SOUL-VOLKS

Questo repository contiene il codice sperimentale del sito SOUL VOLKS per una piattaforma e-commerce progettata per vendere diverse categorie di prodotti, principalmente streetwear, con la possibilità di espandere in futuro ad altre categorie come ricambi per auto d'epoca e oggetti da garage. La piattaforma è costruita utilizzando Laravel per il backend e React per il frontend, garantendo scalabilità, performance e una moderna esperienza utente.

## Indice

1. [Struttura del Progetto](#struttura-del-progetto)
   - [Pagine Pubbliche](#pagine-pubbliche)
   - [Gestionale (Backoffice)](#gestionale-backoffice)
2. [Funzionalità](#funzionalità)
   - [Frontend](#frontend)
   - [Backend](#backend)
3. [Tecnologie Utilizzate](#tecnologie-utilizzate)
4. [Installazione](#installazione)
5. [Struttura directory per produzione](#struttura-directory-per-produzione)
6. [Utilizzo](#utilizzo)
7. [Licenza](#licenza)

## Struttura del Progetto

### Pagine Pubbliche

- **Home (index)**
- **Eventi**
- **Contatti**
- **Shop:**
  - **Categorie:**
    - **Categoria 1**
    - **Categoria 2**
    - **Categoria 3**
    - ...
      - **Dettaglio Prodotto**
  - **Ricerca Avanzata** (con filtri per categoria, prezzo, disponibilità, ecc.)
  - **Recensioni e Valutazioni**
  - **Sezione Blog o Notizie** (contenuti su streetwear, tendenze, ecc.)
  - **Wishlist** (con opzione di condivisione)
  - **Sistema di Raccomandazioni** (prodotti suggeriti in base agli acquisti precedenti)
  - **Tracciamento Ordini** (pagina dedicata per monitorare lo stato della spedizione)
  - **Integrazione con Social Media** (condivisione prodotti, login tramite social)
- **Login/Registrati**
- **Area Personale:**
  - **Ordini Passati**
  - **Gestione Account**
  - **Indirizzi di Spedizione**
  - **Metodi di Pagamento Salvati**
- **Carrello**
- **Checkout**
- **Gestione Ordini**
- **Supporto e Assistenza**
- **Errori/Accesso Negato**
- **Ordine Effettuato Correttamente**
- **Cookie, Privacy e Termini** (pagina con le leggi sui cookie, privacy, e termini vari)

### Gestionale (Backoffice)

- **Login**
- **Dashboard Panoramica:**
  - **Dashboard Personalizzata per Ruolo**
  - **KPI Specifici per Settore (streetwear, ricambi, garage)**
- **Gestione Ordini:**
  - **Panoramica Ordini**
  - **Dettaglio Ordine**
  - **Gestione Resi e Rimborsi**
  - **Tracciamento Ordini**
- **Gestione Prodotti:**
  - **Aggiunta/Modifica Prodotti**
  - **Gestione Inventario**
    - **Allarmi per Prodotti in Esaurimento**
    - **Gestione Magazzini Multipli**
  - **Categorie e Sotto-categorie**
- **Gestione Utenti:**
  - **Creazione e Modifica Utenti**
  - **Gestione Ruoli e Permessi:**
    - **Ruoli Differenziati per Settore (streetwear, ricambi, garage)**
    - **Permessi Granulari (gestione promozioni, supporto clienti, ecc.)**
  - **Log Attività** (tracciamento attività utenti)
- **Gestione Spedizione**
- **Gestione Pagamenti**
- **Report e Analisi:**
  - **Report Vendite**
  - **Analisi delle Prestazioni del Prodotto**
  - **Report sul Traffico e Conversioni**
- **Gestione Promozioni:**
  - **Codici Sconto**
  - **Campagne Promozionali**
- **Gestione Supporto e Assistenza:**
  - **Gestione Ticket**
  - **Feedback Clienti**
- **Gestione Contenuti Dinamici:**
  - **Banner Promozionali**
  - **Annunci di Eventi**
  - **Campagne Stagionali**
- **Integrazione con Sistemi Esterni:**
  - **Integrazione con Contabilità**
  - **Integrazione con CRM**
- **Backup e Ripristino**
- **API per Gestione Mobile**
- **Conformità GDPR e Privacy**
  - **Gestione Consensi**
  - **Trattamento dei Dati Personali**

## Funzionalità

### Frontend

- **Design Responsive:** Ottimizzato per desktop, tablet e smartphone.
- **Interfaccia basata su React:** Esperienza utente moderna e dinamica.
- **Ricerca e Filtri Avanzati:** Ricerca e filtro prodotti in modo efficiente.
- **Wishlist e Raccomandazioni:** Coinvolgimento degli utenti con suggerimenti personalizzati e wishlist condivisibili.
- **Supporto Multi-categoria:** Facilmente estendibile per nuove categorie di prodotti.

### Backend

- **Controllo Accessi Basato su Ruoli:** Ruoli diversi per la gestione delle specifiche sezioni della piattaforma.
- **Gestione Completa dei Prodotti:** Strumenti per la gestione dell'inventario, delle categorie e dei dettagli dei prodotti.
- **Gestione Ordini:** Controllo completo sugli ordini, resi e rimborsi.
- **Gestione Utenti:** Controllo granulare sui ruoli degli utenti, permessi e attività.
- **Integrazione con Sistemi Esterni:** Integrazione semplice con sistemi esterni come contabilità, spedizioni e CRM.
- **Sicurezza e Conformità:** Funzionalità integrate per la protezione dei dati, la conformità GDPR e i backup sicuri.

## Tecnologie Utilizzate

- **Laravel:** Framework PHP per lo sviluppo backend.
- **React:** Libreria JavaScript per la creazione di interfacce utente.
- **MySQL:** Database per memorizzare dati relativi a prodotti, utenti e ordini.
- **Bootstrap:** Framework CSS per il design responsivo.
- **Webpack:** Module bundler per compilare e gestire le risorse.

## Installazione

1. **Clona il repository:**
   ```bash
   git clone https://github.com/yourusername/ecommerce-platform.git
   cd ecommerce-platform
2. **Installa le dipendenze:**
- **Backend (Laravel):**
    ```bash
    composer install
    cp .env.example .env
    php artisan key:generate
    php artisan migrate
- **Frontend (React):**
    ```bash
    cd frontend
    npm install
    npm run build
3. **Esegui l'applicazione:**
- **Backend (Laravel):**
    ```bash
    php artisan serve
- **Frontend (React):**
    ```bash
    npm start

## Struttura Directory per Produzione

Ecco la struttura della directory del progetto e-commerce basato su Laravel e React per l'ambiente di produzione.

    ```plaintext
    ecommerce-platform/
    │
    ├── app/                    # Codice backend Laravel
    │   ├── Http/
    │   ├── Models/
    │   ├── Providers/
    │   └── ...
    │
    ├── bootstrap/              # File di bootstrap di Laravel
    │
    ├── config/                 # Configurazioni del progetto Laravel
    │
    ├── database/               # Migrazioni e seeders per il database
    │
    ├── public/                 # Cartella pubblica (file accessibili dal browser)
    │   ├── index.php           # Entry point di Laravel
    │   ├── css/
    │   │   └── app.css         # File CSS compilato (incluso CSS del frontend)
    │   ├── js/
    │   │   └── app.js          # File JS compilato (incluso React)
    │   ├── images/             # Immagini utilizzate nel sito (logo, banner, ecc.)
    │   └── ...
    │
    ├── resources/              # Risorse di Laravel (views, assets)
    │   ├── js/                 # File sorgente di React (frontend)
    │   │   ├── components/     # Componenti React
    │   │   ├── pages/          # Pagine React
    │   │   ├── App.js          # Entry point di React
    │   │   └── index.js        # Punto di ingresso per React (rendering dell'app)
    │   │
    │   ├── views/              # File Blade di Laravel (HTML con logica server-side)
    │   │   ├── layouts/        # Layout base
    │   │   ├── home.blade.php  # Pagina home principale gestita da Laravel
    │   │   ├── shop.blade.php  # Pagina shop
    │   │   └── ...
    │   │
    │   ├── css/                # File sorgente CSS/Sass
    │   │   └── app.scss        # File principale di stile (compilato in app.css)
    │   └── ...
    │
    ├── routes/                 # Definizione delle rotte di Laravel
    │   ├── web.php             # Rotte principali dell'applicazione
    │   └── api.php             # Rotte per le API
    │
    ├── storage/                # File di storage e cache di Laravel
    │
    ├── tests/                  # Test unitari e funzionali
    │
    ├── vendor/                 # Dipendenze del progetto (gestite da Composer)
    │
    ├── webpack.mix.js          # Configurazione di Webpack Mix per Laravel
    │
    ├── package.json            # Dipendenze npm per il frontend (React)
    │
    ├── composer.json           # Dipendenze PHP per Laravel
    │
    ├── .env                    # Configurazione ambiente (database, chiavi API, ecc.)
    │
    ├── .gitignore              # File per escludere file e cartelle da Git
    │
    └── README.md               # Documentazione del progetto

## Utilizzo
- **Accedi al frontend su http://localhost:3000**
- **Accedi al backend su http://localhost:8000/admin**
## Licenza
Questo progetto è sotto licenza MIT. Vedi il file LICENSE per maggiori dettagli.