# BEXA-FE

Dies ist das Frontend-Projekt **BEXA-FE**, entwickelt mit **Angular**. Es dient als Benutzeroberfläche für die zugehörige Anwendung und enthält alle notwendigen Konfigurationen, Komponenten und Stylesheets.

---

## Projektstruktur
```
BEXA-FE/
├── public/ # Öffentliche Assets
├── src/
│ ├── app/ # Hauptanwendung
│ │ ├── app.config.ts # Konfigurationsdatei
│ │ ├── app.routes.ts # Routing für die App
│ │ ├── app.scss # Stylesheet der App
│ │ ├── app.spec.ts # Unit-Tests
│ │ ├── app.ts # Haupt-App-Logik
│ │ └── app.html # Haupt-Template
│ ├── index.html # Root HTML-Datei
│ ├── main.ts # Bootstrap der Angular-App
│ └── styles.scss # Globale Styles
├── .editorconfig
├── .gitignore
├── angular.json
├── package.json
├── package-lock.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
└── tsconfig.spec.json
```

---

## Voraussetzungen

- Node.js >= 16.x
- npm >= 8.x
- Angular CLI >= 16.x (optional, für Entwicklung und Build)

---

## Installation

### Repository klonen:

```bash
git clone <REPO_URL>
cd BEXA-FE
```

### Abhängigkeiten installieren:
```bash
npm install
```

### Um die App im Entwicklungsmodus zu starten:
```bash
ng serve --open
```
#### Die App wird unter http://localhost:4200/ verfügbar sein. Änderungen am Code werden automatisch übernommen.

### Build: 
#### Für die Produktion kann die App gebaut werden:
```bash
ng build --prod
Die gebauten Dateien werden im dist/-Ordner abgelegt.
```

### Tests: 
#### Unit-Tests können mit dem Angular-Test-Runner ausgeführt werden:
```bash
ng test
```

### Konventionen
- `TypeScript für Logik (.ts)`
- `SCSS für Styles (.scss)`
- `HTML für Templates (.html)`
- `Routing zentral in app.routes.ts`
- `Konfiguration in app.config.ts`
