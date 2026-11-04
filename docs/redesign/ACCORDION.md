# Piano di design e struttura — A1 «Strati» (accordion)

> Lo stile precedente (NB1, neo-brutalismo) è abbandonato dal 2026-11-04: il suo codice CSS si elimina al passo 1.
> Riferimento visivo: canvas dei mockup, pagina **"Accordion — sezioni a strisce"** → https://claude.ai/artifact/9JonT2rihTfUFbQmdN4Cy9
> Artboard: `A1-Strati.dc.html` (desktop) e `AM-Strati.dc.html` (mobile). I mockup sono interattivi: prova strisce, foglio di dettaglio, galleria e pulsante Contatti.
> Contenuti, collection e CMS sono quelli già nel repository (`content/`, `data/`, `.pages.yml`, guida in `CMS.md`), salvo le eccezioni della sezione 1 e i **testi nuovi** del PDF di strategia, raccolti in **[`TESTI.md`](TESTI.md)** (fonte dei testi dal 2026-11-04).
> I testi di `TESTI.md` sono **provvisori** (più vicini alla realtà ma non definitivi): vanno solo nei campi del CMS, così Omniaevo li modifica senza toccare il codice.
> **Aggiornamento 2026-11-04 (testi del PDF):** nuova striscia `Team`, la `00` perde management e VIDIM e guadagna Mission, Vision e timeline, `01` e Servizi cambiano contenuto. Lo stato dei passi già fatti è nella tabella della sezione 4, i passi nuovi sono 2b, 3b, 4b e 7b.
> **Aggiornamento 2026-11-04 (accorpamento):** **Servizi** (~270 parole) non è più una striscia: diventa un blocco dentro `01 Cosa facciamo`. Le strisce sono **5**: `00` Omniaevo, `01` Cosa facciamo, `02` Case history, `03` Team, `04` Trasparenza. La soglia desktop resta **1100 px**.

---

## 1. Decisioni prese

### Struttura

| Tema | Decisione |
|---|---|
| Pagina | **Un solo documento per lingua** (`/` e `/en/`), alto quanto lo schermo (`100dvh`). La pagina non scorre: scorre solo il contenuto della sezione aperta |
| Sezioni | **5 strisce**, numerate **da zero**: `00` Omniaevo, `01` Cosa facciamo (include Servizi), `02` Case history, `03` Team, `04` Trasparenza. Una sola sezione è aperta; all'avvio è aperta la `00`. Trasparenza resta ultima (striscia arancio) |
| Desktop (≥ 1100 px) | Strisce **verticali** affiancate, larghe 96 px. La striscia aperta cresce (`flex-grow`) e occupa lo spazio libero. Con 5 strisce (480 px) più il pannello minimo (560 px) servono 1040 px: la soglia resta **1100 px** |
| Mobile e tablet (< 1100 px) | Strisce **orizzontali** impilate, alte 60 px (5 strisce = 300 px, restano 544 px a 844 px di altezza). La striscia aperta cresce in altezza |
| Schermi bassi (altezza < 560 px, es. telefono in orizzontale) | Niente accordion: le sezioni sono una sotto l'altra e la pagina scorre normalmente. Le strisce diventano intestazioni di sezione |
| Indirizzo delle sezioni | **Hash**: `/#cosa-facciamo`, `/#case-history`, `/#team`, `/#trasparenza` (la `00` è `/`). `/#servizi` resta valido come **alias**: è l'id del blocco Servizi dentro la `01`, quindi apre la `01` e scorre al blocco. Un hash che punta a un elemento *dentro* una sezione (es. `#contatti`, `#chi-siamo`) apre quella sezione e scorre all'elemento. Niente pagine duplicate, niente problemi di contenuto duplicato per i motori di ricerca |
| Dettagli (case, servizi) | Restano **pagine vere** con il loro URL (`/case-history/brcko/`, `/servizi/pec-…/`): indicizzabili e condivisibili. Dalla pagina si aprono in un **foglio dal basso** (bottom sheet) senza cambio pagina; l'URL cambia con `history.pushState` |
| Accesso diretto a un dettaglio | La pagina di dettaglio rende tutta l'interfaccia, con la sezione giusta aperta e il foglio già aperto. Chiudendo il foglio si resta nella sezione |
| Pagine indice `/servizi/`, `/case-history/`, `/trasparenza/` | Diventano pagine `redirect` verso `/#servizi`, `/#case-history`, `/#trasparenza` (`noindex`, fuori dalla sitemap) |
| Privacy e cookie | `/privacy/` resta una pagina vera; dal footer di ogni sezione si apre nel foglio, come un dettaglio |
| 404 | Pagina semplice con lo stesso stile, link alla home. Non usa l'accordion |

### Contenuto delle sezioni

| Sezione | Contenuto | Origine dei dati |
|---|---|---|
| `00` Omniaevo | Hero (riga «Omniaevo S.r.l. · Codroipo (UD) · dal 2007», **claim attuale** con «semplici» evidenziato (banda arancio dietro il testo), testo; niente pulsante), Chi siamo (testo, **Mission**, **Vision**), **Storia** (timeline 2007–2024), Dati societari (segnaposto «[da inserire]» per REA e capitale sociale finché mancano) + pulsante «Trasparenza →», **Contatti** (griglia etichetta + valore, tutti i recapiti), riga legale. **Tolti:** management, VIDIM, Sostenibilità | `content/*/_index.md` (`hero`, `facts`, `chiSiamo`), `data/contacts.toml` |
| `01` Cosa facciamo | Intro, 6 aree numerate `00`–`05` (Infrastrutture IT, Networking, Automazione industriale, Project management, Sviluppo software, Ricerca) con testo, tecnologie come etichette (4 gruppi, nuovo: AI), **Settori** (4 schede uguali, Industriale quando c'è il testo), poi il blocco **Servizi** (`id="servizi"`, sottotitolo «Come lavoriamo»): intro di una riga, **4 servizi numerati** `01`–`04` (Consulenza, Progettazione, Implementazione, Supporto legale integrato) che aprono il foglio, e gruppo «Assistenza clienti»: PEC e **Scaricabili** (`omniaevoremote.exe` ripristinato e allegati) | `cosaFacciamo` di `_index.md`; blocco Servizi: collection `servizi` + `servizi` di `_index.md` + campo `downloads` (vedi sotto) |
| `02` Case history | Card tutte uguali (copertina, categoria, titolo 2 righe, descrizione 3 righe, troncati con «…»). Aprono il foglio | collection `case-history` |
| `03` Team | Citazione, testo, **Valori** (3 schede), griglia dei **riquadri foto + mansione** (circa 10, tutti uguali, segnaposto SVG finché mancano le foto) | `team` di `_index.md` |
| `04` Trasparenza | Intro, dati societari, elenco documenti e bandi (PDF) | collection `trasparenza`, `data/contacts.toml` |

I testi esatti di ogni blocco sono in [`TESTI.md`](TESTI.md). I 3 riquadri di fatti della `00` usano solo dati del PDF di strategia (2024) e sono modificabili dal CMS. **Niente contatori inventati.**

> **Regola di stile:** il mockup è la sola fonte. Niente stili, colori, forme o componenti presi da altrove. Dove il mockup non copre un caso (es. testo dei dati che il mockup ha riassunto, stato di focus) si sceglie la soluzione più vicina al mockup e la si elenca tra le differenze nel resoconto del passo.

### Interfaccia (dettagli già approvati sul mockup)

- **Prima striscia** bianca, unita al contenuto della `00`: in alto il **logo** (marchio di `_legacy/assets/logo.svg`, blu), al centro l'etichetta verticale, in basso **un solo pulsante Contatti** (solo icona, nome accessibile «Contatti») e sotto il segnalatore. Il pulsante apre la `00` e scorre al blocco Contatti.
- **Altre strisce**: numero in alto, etichetta verticale, segnalatore in basso. Colori: tre blu ricavati da `--blue` (`--strip-1/2/3`); Trasparenza arancio `--orange` con testo inchiostro. Le tre strisce blu usano i tre toni in ordine, senza ripartenze: `01` = `--strip-1`, `02` = `--strip-2`, `03` Team = `--strip-3`; `04` Trasparenza arancio. Striscia aperta: barra di 4 px a destra (arancio; blu sulla striscia arancio).
- **Titoli e testo**: vedi `TOKENS.md`. Titoli in blu, Bricolage 800; testo Schibsted 400, enfasi 600. Sottotitoli piccoli (es. «Storia», «Omniaevo oggi») in 16 px 600, `--orange-dark`. Pulsanti: pillola arancio con testo inchiostro, 44 px. Link: blu, 600, sottolineati. Parole chiave: evidenziatore `.mark`.
- **Allineamento**: logo e numeri stanno nello **stesso riquadro** (52 × 52 px desktop, 36 × 36 px mobile), così le etichette partono tutte dalla stessa altezza.
- **Segnalatore**: SVG, mai caratteri di testo. Chiuso = anello + «+». Aperto = cerchio pieno del colore del testo con punto centrale del colore della striscia (su striscia blu: cerchio bianco, punto blu). I cerchi sono concentrici per costruzione.
- **Card**: stessa dimensione in tutta la griglia. Altezze fisse e `line-clamp` (categoria 1 riga, titolo 2, descrizione 3). Il testo completo è nel foglio.
- **Foglio di dettaglio**: un solo modello per tutti. Su desktop sale **dentro la sezione aperta** (le strisce restano visibili). In alto maniglia, etichetta (es. «Case history»), pulsante chiudi. Poi titolo, sottotitolo, **galleria**, testo, elenco puntato, azioni.
- **Galleria desktop**: immagine grande a sinistra (intera, `object-fit: contain`, contatore «2 / 5») e a destra un **mini carosello verticale** con 3 miniature visibili e frecce ↑ ↓. Miniatura attiva con bordo arancio.
- **Galleria mobile**: **carosello orizzontale** classico con `scroll-snap` e puntini (quello attivo è arancio e più lungo).

### Tecnica

| Tema | Decisione |
|---|---|
| Tipografia | **Bricolage Grotesque** (titoli, già self-hosted) + **Schibsted Grotesk** (testo), entrambi OFL, **self-hosted** in `woff2`. Niente Google Fonts da CDN: la cookie policy dichiara solo cookie tecnici e il CDN trasmette l'IP del visitatore a terzi |
| CSS | CSS nativo con custom properties, Hugo Pipes (`resources.Concat`, minify, fingerprint). Il CSS NB1 si elimina |
| Senza JavaScript | Il sito funziona lo stesso: le strisce sono link `#…`, la sezione aperta segue `:target` (con `:has()`); i dettagli sono pagine normali; la galleria scorre con `scroll-snap` |
| Con JavaScript | Un solo file vanilla `assets/js/app.js` (obiettivo < 250 righe, niente librerie): accordion, pulsante Contatti, deep link, foglio (`fetch` + `<dialog>`), galleria, cronologia del browser. Sostituisce `nav.js` |
| Foglio | `<dialog>` con `showModal()`: focus intrappolato, `Esc`, sfondo inerte, nativi. Il contenuto arriva con `fetch` della pagina di dettaglio (si prende solo `[data-sheet]`), con **prefetch** al passaggio del mouse o al focus e una cache in memoria. Su desktop il dialog si posiziona sopra la sezione aperta; il `::backdrop` copre solo quella zona (`clip-path`), se il browser lo supporta |
| Cronologia | Aprire una sezione: `pushState` dell'hash. Aprire un dettaglio: `pushState` dell'URL. «Indietro» chiude il foglio o torna alla sezione precedente |
| Animazioni | Striscia: `flex-grow` 0,6 s. Contenuto: dissolvenza con piccolo ritardo, già alla larghezza finale (niente riflusso del testo). Foglio: sale dal basso in 0,5 s. **Tutto disattivato con `prefers-reduced-motion`** |
| Galleria (contenuto) | **Nuovo campo `gallery`** (lista di immagini con testo alternativo) nelle collection Case history e Servizi. Le immagini oggi nel corpo Markdown dei case si spostano in `gallery` (migrazione una tantum); il testo del corpo non cambia. Il campo `image` resta la copertina |
| Scaricabili | **Nuovo campo `downloads`** in `servizi` di `_index.md` (titolo, file, nota), modificabile dal CMS. Il manuale PEC resta allegato del servizio PEC e compare anche qui |
| Eseguibile | `static/omniaevoremote.exe`, **stesso URL** del sito vecchio (`/omniaevoremote.exe`). Il file lo fornisce l'utente; finché manca, la voce non compare. Quando arriva: copiarlo in `static/` e registrare dimensione e SHA-256 |
| Titoli | Un solo `<h1>` per pagina. Home: `<h1>` = claim dell'hero; titoli di sezione `<h2>`. Pagine di dettaglio: `<h1>` = titolo nel foglio; l'hero scende a `<h2>` |
| Accessibilità | Strisce = `<button aria-expanded aria-controls>` (con JS) o `<a>` (senza JS); pannelli `role="region"`; pannelli chiusi `inert` (niente focus su contenuti nascosti); contrasto AA; target ≥ 44 px; focus visibile 3 px: inchiostro su fondi chiari, arancio sulle strisce blu (l'arancio su bianco fa solo 2,6:1; il mockup usa arancio ovunque, differenza voluta) |
| Stampa | Foglio di stile `print`: tutte le sezioni aperte una dopo l'altra, strisce nascoste |

### Risposte alle domande aperte (2026-11-04)

| Domanda | Passo | Decisione |
|---|---|---|
| Migrazione delle immagini dal corpo dei case al campo `gallery` | 9 | **Approvata.** Si spostano solo le immagini; il testo del corpo non cambia |
| Valori di **REA** e **capitale sociale** | 3 | **Vuoti per ora.** Campi vuoti in `data/contacts.toml`, riga non mostrata, TODO nel resoconto |
| File `omniaevoremote.exe` | 5 | **Lo fornisce l'utente più avanti.** Non scaricarlo. La voce resta nei dati; il template la mostra solo se `static/omniaevoremote.exe` esiste |
| Categorie dei case senza cliente | 6 | Non inventarle: mostrare `client`, poi `sector`, poi la prima area; se mancano tutti, niente riga |
| Contatore immagini «1 / 5» | 9 | Resta un conteggio (parte da 1) |
| Claim dell'hero | 3b | **Resta quello attuale** («Soluzioni semplici per esigenze complesse»). Gli slogan del PDF non si usano |
| Management (Belluz) | 3b | **Tolto** dal sito, con foto e campi CMS |
| VIDIM Group | 3b | **Tolto**: il PDF non lo cita |
| Storia | 3b | Fa fede la **timeline del PDF** (8 tappe). Sostituisce «Storia» e «Omniaevo oggi» |
| Avvocato nel testo legale | 5 | **Senza nome**: «esperti legali». Nessun blocco «Novità» |
| Sostenibilità | 3b | **Tolta** |
| Team | 2b, 7b | **Nuova striscia `03 Team`**; Trasparenza diventa `04`. Riquadri foto + mansione tutti uguali, segnaposto SVG, ordine per struttura aziendale |
| Servizi | 2b, 5 | **Accorpato in `01 Cosa facciamo`** come blocco finale (~270 parole, non regge una striscia). Niente striscia Servizi; `/#servizi` resta alias del blocco; le pagine di dettaglio dei servizi restano. Strisce: 5, soglia 1100 px |
| Case history del PDF | 6 | **Non si usano** (dati inventati). Restano i 6 case veri; del PDF si prende lo schema Sfida / Soluzione / Risultati |

---

## 2. Design system

### Token
I token (8 colori, 6 misure di testo, 3 pesi, 6 spazi, 2 raggi, 2 durate) sono descritti in **[`TOKENS.md`](TOKENS.md)** e vivono in `assets/css/tokens.css`. Nei CSS si usano solo quelli.

### Componenti
| Componente | File | Note |
|---|---|---|
| `.accordion` | `layout.css` | contenitore flex `100dvh`; riga su desktop, colonna < 1100 px; flusso normale con altezza < 560 px |
| `.strip` | `components.css` | `.strip__mark` (logo o numero, riquadro fisso), `.strip__label` (verticale su desktop), `.strip__contact`, `.strip__indicator` (SVG), `.strip__bar` |
| `.panel` | `components.css` | contenitore scorrevole; `.panel__inner` alla larghezza finale `--panel-w` (min 560 px) |
| `.card` | `components.css` | dimensione fissa, `.card__cover`, `.card__meta` (1 riga), `.card__title` (2 righe), `.card__text` (3 righe) |
| `.facts`, `.legal-data`, `.contacts`, `.chips`, `.download`, `.doc-list` | `components.css` | blocchi delle sezioni |
| `.area` | `components.css` | card delle aree (già fatta, passo 4); riusata dalle schede dei **Settori** |
| `.timeline` | `components.css` | **nuovo, non è nel mockup:** righe anno + punti della Storia (`00`). Va disegnato prima sul mockup (passo 3b) |
| `.values` | `components.css` | 3 schede uguali con icona SVG (`04` Team) |
| `.team`, `.person` | `components.css` | **nuovi, non sono nel mockup:** griglia di riquadri uguali (foto verticale 4:5, nome, mansione su 2 righe), segnaposto SVG se manca la foto (passo 7b). Prima persona in scheda grande (2 colonne × 2 righe, `.person--featured`). Vanno disegnati prima sul mockup |
| `.sheet` | `components.css` | `<dialog>`: maniglia, testata fissa, corpo scorrevole |
| `.gallery` | `components.css` | binario `scroll-snap` delle immagini + colonna miniature (desktop) / puntini (mobile) |
| `.prose` | `components.css` | testo Markdown nel foglio e in privacy |

---

## 3. Mappa mockup → template

| Elemento | Template | Note |
|---|---|---|
| Pagina con le strisce | `layouts/baseof.html` + `layouts/_partials/accordion.html` | il partial riceve la sezione da aprire e il contenuto opzionale del foglio |
| Home | `layouts/home.html` | `accordion.html` con sezione `00` aperta |
| Sezioni | `layouts/_partials/sections/{omniaevo,cosa-facciamo,case-history,team,trasparenza}.html` | una per file, dati da front matter e collection |
| Blocco Servizi | `layouts/_partials/sections/servizi-block.html` | incluso in fondo a `cosa-facciamo.html`, con `id="servizi"` |
| Striscia | `layouts/_partials/strip.html` | logo o numero, etichetta, Contatti (solo `00`), segnalatore |
| Dettaglio case | `layouts/case-history/page.html` | `accordion.html` con `02` aperta + `sheet.html` già aperto |
| Dettaglio servizio | `layouts/servizi/page.html` | come sopra con `01` aperta e scorrimento al blocco Servizi |
| Foglio | `layouts/_partials/sheet.html` + `gallery.html` | un solo modello; il contenuto è in `[data-sheet]` |
| Privacy | `layouts/page.html` | `accordion.html` con `00` aperta + foglio con il testo |
| Indici collection | `layouts/{servizi,case-history,trasparenza}/section.html` | redirect verso l'hash (riusa `layouts/redirect/`) |
| 404 | `layouts/404.html` | pagina semplice |

---

## 4. Passi

Ogni passo è piccolo e si verifica da solo. Alla fine di ogni passo **non** si fa commit: si propone il messaggio (Conventional Commits) e l'utente decide. Fino al passo 11 il sito può sembrare incompleto: si lavora sul branch `feature/redesign`.

Stato al 2026-11-04. I passi 1–4 sono stati fatti con i **testi di prima**: i passi 2b, 3b e 4b li aggiornano ai testi di [`TESTI.md`](TESTI.md) senza rifare il lavoro. Il passo 7b aggiunge il Team; il passo 5 (Servizi) è ora un blocco della 01.

| # | Passo | Dipende da | Stato |
|---|---|---|---|
| 1 | Fondamenta: token, font, base, rimozione CSS NB1 | — | **Fatto** (`6bb92f3`) |
| 2 | Accordion statico (senza JS): strisce, pannelli, responsive, `:target` | 1 | **Fatto** (`2e5731e`): 5 strisce (con Servizi, senza Team) |
| **2b** | **Riordino strisce: Servizi accorpato in 01, Team aggiunto (sempre 5), mockup** | 2 | Da fare |
| 3 | Sezione 00 Omniaevo | 2 | **Fatto** (`92328ff`, `14d80bd`, `47fc525`) con i testi vecchi: hero, 3 fatti, storia, management, VIDIM, dati societari, contatti, riga legale |
| **3b** | **Testi nuovi nella 00**: fatti 23/18/462, Mission, Vision, timeline; via management e VIDIM | 3, 2b | Da fare |
| 4 | Sezione 01 Cosa facciamo | 2 | **Fatto** (`e6316a2`): intro, 6 card delle aree con anteprima al passaggio e foglio, tecnologie come chip |
| **4b** | **Testi nuovi nella 01**: nuove aree, gruppo AI, Settori (4) | 4 | Da fare |
| 5 | Blocco Servizi dentro la 01 + Scaricabili + eseguibile (con i 4 servizi nuovi) | 4b | Da fare |
| 6 | Sezione 02 Case history (card) | 2b | **Fatto**: 6 card uguali (copertina 16:9, meta, titolo 2 righe, testo 3 righe), contatore |
| 7 | Sezione 04 Trasparenza (ex `04` poi `05`) | 2b | **Fatto**: titolo, locandine, dati societari, righe PDF (3 progetti + 1 documento) |
| **7b** | **Sezione 03 Team**: citazione, Valori, riquadri foto + mansione | 2b | **Fatto** (IT; EN al passo 12) |
| 8 | JS dell'accordion: pulsanti, cronologia, deep link, Contatti | 3–7b | **Fatto** |
| 9 | Pagine di dettaglio con foglio e galleria (senza JS) + campo `gallery` | 8 | **Fatto** |
| 10 | JS del foglio e della galleria | 9 |
| 11 | URL: redirect degli indici, privacy nel foglio, 404, sitemap | 10 |
| 12 | Versione inglese | 11 |
| 13 | Passata accessibilità, mobile, schermi bassi, stampa | 12 |
| 14 | Verifica finale e documentazione | 13 |

---

## 5. Prompt

### Preambolo comune (incollalo all'inizio di ogni prompt)

```text
Contesto: sito Hugo extended 0.169.0 nel repo omniaevo.github.io, branch feature/redesign.
Applichiamo il design e la struttura A1 «Strati» descritti in docs/redesign/ACCORDION.md:
leggilo prima di iniziare e rispetta le decisioni della sezione 1 e il design system della
sezione 2. I testi da usare sono in docs/redesign/TESTI.md (è la fonte: copiali senza
ritoccarli e segnala ciò che manca o è marcato TODO). Riferimento visivo: canvas
https://claude.ai/artifact/9JonT2rihTfUFbQmdN4Cy9, pagina "Accordion — sezioni a strisce",
artboard A1-Strati (desktop) e AM-Strati (mobile): leggi i file .dc.html per misure, colori
e comportamento.
Applica la skill hugo-best-practices.
Regole:
- Non cambiare testi dei contenuti né URL dei dettagli, salvo i testi di TESTI.md dove il
  passo lo dice. Modifiche a front matter, .pages.yml o data/ solo dove il passo lo dice.
  Ogni campo nuovo del front matter va anche in .pages.yml (IT ed EN) con descrizione per i
  redattori. I testi inglesi mancanti restano vuoti (non tradurre senza chiedere).
- CSS nativo con i token di tokens.css: niente colori, ombre o font scritti a mano fuori dai
  token. Niente framework. JS solo in assets/js/app.js, vanilla, e il sito deve funzionare
  anche senza.
- Icone e indicatori in SVG inline, mai caratteri di testo. Elementi ripetuti con dimensioni
  fisse e testo troncato. Logo e numeri delle strisce nello stesso riquadro.
- HTML semantico e accessibile: un <h1> per pagina, landmark, focus visibile, contrasto AA,
  target ≥ 44 px, decorazioni con aria-hidden.
- Codice, classi e commenti in inglese. Testi UI via i18n (it ed en).
- Alla fine esegui `hugo --gc --minify --printPathWarnings --printI18nWarnings --panicOnWarning`:
  zero warning. Controlla con `hugo server` a 1440×900, 1100×800, 1099×800, 390×844 e 844×390.
- Stile: solo quello del mockup (leggi i file .dc.html: misure, colori, pesi, forme). Non mescolare
  altri stili. Se devi discostartene (caso non coperto, contrasto, contenuto del CMS che il mockup
  non ha) avvisa nel resoconto con motivo, e mettilo in «differenze rispetto al mockup».
- NON fare commit: proponi il messaggio di commit nel resoconto.
- Resoconto finale: file creati o modificati, differenze rispetto al mockup e perché,
  TODO aperti.
```

### Passo 1 — Fondamenta

```text
Obiettivo: base del nuovo design system e rimozione dello stile NB1.

Fai così:
1. Scarica Schibsted Grotesk variabile (repo ufficiale o Google Fonts, licenza OFL),
   sottoinsiemi latin + latin-ext, woff2, in static/fonts/. Aggiorna OFL.txt (o aggiungine
   uno per font). Bricolage Grotesque è già presente: verifica che il file copra i pesi
   500–800.
2. assets/css/: riscrivi tokens.css come in docs/redesign/TOKENS.md; fonts.css con i due
   @font-face (font-display: swap); base.css (reset minimo, body bianco, font-body, titoli
   in font-display, link, focus-visible arancio 3 px, skip link, prefers-reduced-motion).
   Svuota components.css, pages.css e layout.css dal codice NB1.
3. Calcola i contrasti di tutte le coppie testo/fondo dei token (tabella nel resoconto).
   Se una coppia non passa AA, proponi il valore corretto e aggiorna il token.
4. Preload dei due font principali nel <head>.
5. Prepara l'SVG del logo: copia il marchio di _legacy/assets/logo.svg in
   assets/images/logo-mark.svg, togli metadata e id inutili, fill = currentColor, così il
   colore arriva dal CSS.

Criteri di accettazione: build senza warning; nessuna richiesta a domini esterni; nessuna
regola NB1 rimasta (grep di --sh-, --c-cream, .sticker, .marquee: zero risultati).
```

### Passo 2 — Accordion statico

```text
Obiettivo: lo scheletro a strisce, funzionante senza JavaScript.

Fai così:
1. layouts/_partials/accordion.html: <div class="accordion"> con 5 <section class="panel-wrap"
   id="…"> (id: omniaevo, cosa-facciamo, servizi, case-history, trasparenza). Parametri:
   la sezione aperta (default omniaevo) e, opzionale, il markup del foglio. Il partial
   mette data-open sulla sezione aperta.
2. layouts/_partials/strip.html: striscia come <a href="#id"> con .strip__mark (logo SVG
   per la 00, numero 01–04 per le altre, nello stesso riquadro --strip-mark), etichetta,
   segnalatore SVG (anello + «+» chiuso; cerchio pieno + punto centrale aperto, colori
   come in sezione 1), barra della striscia aperta. Per la 00: pulsante Contatti come
   <a href="#contatti"> con sola icona e aria-label.
3. Ogni sezione contiene la striscia e un .panel scorrevole con .panel__inner largo
   --panel-w (min 560 px) e, per ora, solo il titolo della sezione.
4. layout.css: desktop riga flex, strisce larghe --strip, la sezione aperta flex-grow 1
   con transizione --t-slow. < 1100 px: colonna, strisce alte --strip-m, etichetta
   orizzontale. Altezza < 560 px: flusso normale, la pagina scorre, tutte le sezioni aperte.
5. Senza JS la sezione aperta segue :target; senza hash è aperta quella con data-open:
   usa :has() su .accordion. Le sezioni chiuse non mostrano il pannello.
6. home.html usa accordion.html. baseof.html: niente più header e footer globali
   (lo skip link punta al pannello aperto).

Criteri di accettazione: a 1440 px e a 390 px i link delle strisce aprono la sezione
giusta senza JS; strisce ferme, pannello scorrevole; nessuno scroll orizzontale; logo e
numeri allineati al pixel (stessa y del centro su desktop, stessa x su mobile).
```

### Passo 2b — Riordino strisce: Servizi accorpato, Team aggiunto

```text
Obiettivo: le strisce restano 5 ma cambiano: via Servizi (diventa un blocco della 01), dentro
Team. Nessun cambio di soglia (1100 px).

Prima: il mockup ha ancora la striscia Servizi e non ha il Team. Sul canvas, nella pagina
«Accordion — sezioni a strisce», togli la striscia Servizi, aggiungi la striscia Team e il suo
pannello con la griglia dei riquadri (vedi passo 7b), desktop e mobile, con lo stile esistente.
Disegna anche il blocco Servizi in fondo alla 01 (sottotitolo «Come lavoriamo», 4 righe
numerate, gruppo «Assistenza clienti»). Mostra il risultato e aspetta l'approvazione prima del
codice.

Fai così:
1. Ordine e id: omniaevo (00), cosa-facciamo (01), case-history (02), team (03),
   trasparenza (04). Numeri delle strisce da zero.
2. Aggiorna accordion.html, strip.html e le etichette i18n (it ed en): togli la striscia
   «Servizi» (l'etichetta resta per il sottotitolo del blocco), nuova etichetta «Team».
3. layout.css e :target/:has(): la soglia resta 1100 px (5 strisce da 96 px = 480 px, più
   pannello minimo 560 px = 1040 px). Controlla 1100×800 e 1099×800.
4. Colori delle strisce: 01 --strip-1, 02 --strip-2, 03 --strip-3, 04 arancio.
5. Il pannello 03 contiene per ora solo il titolo «Team». Trasparenza (id trasparenza) è 04:
   aggiorna numeri, etichette e CSS.
6. Alias `#servizi`: l'id passa a un elemento dentro la 01 (per ora un titolo segnaposto).
   Senza JS l'hash su un elemento interno deve aprire la 01: estendi :target/:has() perché
   il pannello che contiene il target risulti aperto.

Criteri di accettazione: 5 strisce funzionanti senza JS; /#servizi apre la 01; a 1100 px e a
390 px nessuno scroll orizzontale; numeri allineati; build senza warning.
```

### Passo 3 — Sezione 00 Omniaevo (fatto con i testi vecchi)

```text
Obiettivo: contenuto completo della prima sezione.

Fai così:
1. _partials/sections/omniaevo.html: hero (<h1> in home), testo; 3 riquadri di fatti
   (anno 2007 dal testo della storia o da un nuovo campo foundedYear in data/contacts.toml,
   numero aree = len di cosaFacciamo.areas, VIDIM da vidim.title); Chi siamo (storia,
   oggi, management con foto via partial image.html); dati societari da contacts.toml;
   pulsante «Trasparenza →» (#trasparenza); blocco Contatti con id="contatti" (telefono,
   tutte le email con le etichette i18n, PEC, indirizzo); riga legale (P.IVA, Privacy,
   Cookie).
2. data/contacts.toml: aggiungi rea e shareCapital vuoti (decisione: restano vuoti per
   ora). Il template mostra la riga solo se il valore esiste. TODO nel resoconto.
3. Il contenuto della 00 è su fondo bianco come la striscia; una linea --line li separa.

Criteri di accettazione: tutte le 7 email e la PEC compaiono; nessun testo inventato;
/#contatti apre la 00 e mostra il blocco Contatti (anche senza JS).
```

### Passo 3b — Testi nuovi nella 00

```text
Obiettivo: aggiornare la 00 ai testi di TESTI.md (sezione 5.1), senza toccare il resto.

Prima: la timeline non è nel mockup. Disegnala sul canvas (righe anno + punti, stile
esistente, desktop e mobile: 8 tappe) e aspetta l'approvazione prima del codice.

Fai così:
1. Togli il management: blocco, foto (resta in static/uploads, segnalalo come file
   orfano), campi chiSiamo.management in it ed en e nel .pages.yml, stile .about__person.
2. Togli VIDIM: blocco .network, campo vidim (it ed en, .pages.yml), voce factNetwork in
   i18n, stile. Controlla che nessun altro punto lo usi.
3. Fatti: nuovo campo facts (lista di { value, label }) con 23 collaboratori, 18 Paesi,
   462 clienti; il partial li legge da lì (non più calcolati). Il 2007 resta nella riga
   sopra il titolo (foundedYear). Mantieni il componente .facts e i link/frecce se ancora
   utili (altrimenti riquadri senza link: motiva).
4. Chi siamo: campo chiSiamo.text, chiSiamo.mission.text, chiSiamo.vision.text (sottotitoli
   piccoli «Mission» e «Vision»). Via chiSiamo.storia e chiSiamo.oggi.
5. Storia: nuovo campo chiSiamo.timeline (lista di { year, items[] }) con le 8 tappe;
   componente .timeline come da mockup approvato. Anno in Bricolage 800 blu.
6. Hero, Dati societari, Contatti, riga legale restano invariati. Testi: copiali da
   TESTI.md; per l'inglese lascia i campi vuoti e segnalali.

Criteri di accettazione: nessun riferimento rimasto a management, Belluz, vidim, factNetwork
(grep zero); la 00 non ha più testi vecchi di storia; build senza warning; il CMS mostra e
salva i campi nuovi.
```

### Passo 4 — Sezione 01 Cosa facciamo (fatto con i testi vecchi)

```text
Obiettivo: sezione Cosa facciamo.

Fai così: intro (intro.title + primo paragrafo; gli altri paragrafi e closing in un
<details> «Approfondisci» o integralmente, secondo il mockup: scegli e motiva); 6 card
delle aree con numero 00–05 (indice da zero), titolo, testo troncato a 3 righe, card tutte
uguali; liste Tecnologie, Programmazione, Automazione come etichette (togli la virgola
finale di "Java,"). Il titolo di lists[0] (campi di attività) come elenco testuale.

Criteri di accettazione: card di altezza identica anche tra righe diverse; numerazione da
00; testo completo delle aree raggiungibile (title sulla card o testo intero sotto).
```

### Passo 4b — Testi nuovi nella 01

```text
Obiettivo: aggiornare la 01 ai testi di TESTI.md (sezione 5.2), mantenendo le card
già fatte (stessa dimensione, anteprima al passaggio, foglio sul touch).

Fai così:
1. Aree: rinomina e riordina come in TESTI.md 5.2 (Infrastrutture IT, Networking,
   Automazione industriale, Project management, Sviluppo software, Ricerca), con title,
   summary e text. Il numero resta l'indice da zero. Nessun campo nuovo: niente elenchi
   «Servizi offerti».
2. Tecnologie: gruppi Infrastrutture (ex «Tecnologie»), Programmazione, Automazione
   (invariati) e AI (nuovo, etichette come in TESTI.md). Solo etichette, nessuna descrizione.
3. Settori (nuovo blocco dopo le tecnologie): campo cosaFacciamo.settori (lista di
   { title, text }); 4 schede uguali con il componente delle aree (Produttivo, HighTech,
   Civile, Pubblica amministrazione). Industriale si aggiunge quando c'è il testo: basta
   una voce in più nel CMS, il template non cambia. Il campo sector dei case resta vuoto
   finché l'utente non sceglie i valori.
4. Intro invariata. Testi da TESTI.md (sono provvisori: solo nei campi del CMS, mai nei
   template); inglese vuoto, segnalato.

Criteri di accettazione: card di altezza identica; il CMS salva i nuovi campi; nessun testo
vecchio delle aree rimasto (Engineering, Network, Systems, Web Apps: grep zero).
```

### Passo 5 — Blocco Servizi (dentro la 01), Scaricabili, eseguibile

```text
Obiettivo: i 4 servizi nuovi, area download e assistenza remota, come ultimo blocco della
sezione 01 Cosa facciamo (non è più una striscia).

Fai così:
0. Servizi nuovi (TESTI.md 5.3): crea in content/it/servizi/ le 4 voci Consulenza,
   Progettazione, Implementazione, Supporto legale integrato (weight 1–4, testo e elenco
   «Servizi offerti» come campo services nel front matter, senza nome dell'avvocato).
   Il PEC resta, con weight maggiore (viene dopo, nel gruppo «Assistenza clienti»).
   Compila servizi.intro in _index.md. Le versioni inglesi: file vuoti o assenti, segnalati.
   Aggiungi il campo services anche al .pages.yml della collection (IT ed EN).
1. NON scaricare omniaevoremote.exe: lo fornisce l'utente più avanti. Il template mostra
   una voce di download solo se il file esiste (per i file locali: os.FileExists su
   static/…). TODO nel resoconto. Se il file è già in static/, registra dimensione e
   SHA-256.
2. content/it/_index.md e content/en/_index.md: aggiungi servizi.downloads (lista di
   { title, file, note }) con l'eseguibile («Assistenza remota», nota «Per Windows. Avvialo
   quando te lo chiede il tecnico.») e il manuale PEC. Aggiungi il campo in .pages.yml
   (IT ed EN) con descrizioni per i redattori.
3. _partials/sections/servizi-block.html, incluso in fondo a cosa-facciamo.html, con
   id="servizi" e sottotitolo piccolo «Come lavoriamo» (stile dei sottotitoli, non un h2 di
   sezione: sotto <h2> «Cosa facciamo» va un <h3>): intro, righe dei servizi (collection
   servizi, ByWeight) come link alla pagina di dettaglio (il foglio arriva al passo 10);
   gruppo «Assistenza clienti» con PEC e card «Scaricabili» con
   tipo file (EXE/PDF) ricavato dall'estensione, attributo download sui file locali.
4. Aggiorna docs/redesign/redirect.md: /omniaevoremote.exe di nuovo allo stesso URL.

Criteri di accettazione: senza il file la voce dell'eseguibile non compare e la build non
dà warning; copiando un file di prova in static/ la voce compare e /omniaevoremote.exe
risponde in hugo server (poi togli il file di prova); i download sono
modificabili dal CMS; nessuna duplicazione del manuale PEC nei dati (un solo punto da
cui il CMS lo modifica, o motivazione se serve duplicarlo).
```

### Passo 6 — Sezione 02 Case history

```text
Obiettivo: griglia di card uguali.

Nota: i case del PDF di strategia (p. 64–69) NON si usano (dati e testimonianze
inventati). Restano i 6 case veri.

Fai così: _partials/sections/case-history.html con tutte le case history (ordinate per
data, più recenti prima, o per weight se presente). Card = link alla pagina di dettaglio:
copertina (image, object-fit cover, rapporto 16:10, via image.html con srcset), riga meta
(client, altrimenti sector, altrimenti prima area; troncata a 1 riga), titolo (2 righe),
descrizione (3 righe), freccia SVG. Altezze fisse + line-clamp. Mostra il numero dei
progetti accanto al titolo della sezione.

Criteri di accettazione: tutte le card hanno la stessa altezza a ogni larghezza; i testi
lunghi finiscono con «…»; nessuna categoria inventata.
```

### Passo 7 — Sezione 04 Trasparenza

```text
Obiettivo: sezione Trasparenza (ultima striscia, numero 04, id trasparenza).

Fai così: _partials/sections/trasparenza.html: titolo e intro da content/*/trasparenza/
_index.md; dati societari (stesso partial della 00, nessuna duplicazione di markup);
elenco documenti (collection trasparenza, ordine per anno e data) come righe link al PDF
con tipo, titolo, anno, icona download. La striscia è arancio con testo inchiostro.

Criteri di accettazione: tutti e 4 i PDF scaricabili; contrasto AA della striscia arancio;
alias del vecchio URL WordPress ancora funzionante (il target cambia al passo 11).
```

### Passo 7b — Sezione 03 Team

```text
Obiettivo: la nuova sezione Team (TESTI.md 5.5) con i riquadri per le foto.

Prima: il mockup approvato nel passo 2b contiene già il pannello Team. Seguilo.

Fai così:
1. Dati: campo team in content/it/_index.md e content/en/_index.md: title, quote
   (citazione), text, values (lista di { title, icon }: «Qualità e affidabilità»,
   «Problem solving», «Personalizzazione»; icon = chiave di un SVG già definito in
   icon.html o nuovo), members (lista di
   { name, role, photo, photoAlt }). Aggiungi tutto a .pages.yml (IT ed EN), con la
   descrizione dei campi per i redattori: formato foto, ordine = ordine in pagina,
   mansione breve.
2. Segnaposto: 10 membri con name «Nome Cognome» e role «Mansione» e senza foto.
   Il partial mostra una sagoma di persona SVG sul fondo --mist quando photo è vuoto.
   Segnala nel resoconto che vanno sostituiti prima della pubblicazione (criterio del
   passo 14).
3. layouts/_partials/sections/team.html: titolo, citazione grande, testo, Valori (3
   schede uguali con icona SVG), griglia .team di .person. Riquadro:
   foto verticale 4:5 con object-fit cover (stesso ritaglio per tutti), nome (1 riga),
   mansione (2 righe al massimo, poi «…»). Tutti i riquadri hanno la stessa dimensione;
   colonne: 5 su desktop largo, 3 sul pannello stretto, 2 su mobile. Immagini via
   image.html con srcset e alt dai dati (alt vuoto per i segnaposto: decorativi).
4. Le foto non si decidono qui: l'utente le fornisce. Documenta in CMS.md (passo 14)
   formato e peso consigliati.

Criteri di accettazione: 10 riquadri identici anche con nomi e mansioni di lunghezza
diversa; la sezione funziona senza JS (/#team); il CMS permette di aggiungere, togliere e
riordinare le persone e di caricare le foto; niente testo inventato oltre ai segnaposto.
```

### Passo 8 — JS dell'accordion

```text
Obiettivo: accordion fluido come nel mockup, con miglioramento progressivo.

Fai così:
1. assets/js/app.js (sostituisce nav.js; aggiorna _partials/head/js.html), caricato con
   defer, nessuna dipendenza.
2. All'avvio trasforma i link delle strisce in comportamento di pulsante: aria-expanded,
   aria-controls, gestione click e tastiera (Invio/Spazio). La sezione aperta si decide
   dall'hash (anche hash di elementi interni: apri la sezione che li contiene e scorri a
   loro dentro il pannello, non la pagina).
3. Apertura: history.pushState dell'hash, inert sui pannelli chiusi, dissolvenza del
   contenuto dopo l'allargamento. popstate e hashchange sincronizzano lo stato.
4. Pulsante Contatti: apre la 00 e scorre a #contatti con scroll smooth (instant con
   prefers-reduced-motion).
5. Il titolo del documento cambia con la sezione («Servizi — Omniaevo»).

Criteri di accettazione: avanti/indietro del browser funzionano; Tab non entra nei
pannelli chiusi; con JS disattivato il comportamento del passo 2 resta; nessun errore in
console.
```

### Passo 9 — Pagine di dettaglio con foglio e galleria

```text
Obiettivo: le pagine di dettaglio rendono l'interfaccia con il foglio già aperto
(funziona senza JS).

Fai così:
1. La migrazione è approvata (sezione 1). Aggiungi il campo
   gallery (lista di { image, alt }) alle collection Case history e Servizi in .pages.yml
   (IT ed EN). Sposta le immagini del corpo Markdown dei case in gallery con uno script
   una tantum (nello scratchpad, non nel repo); il testo del corpo non cambia. Mostra il
   diff dei front matter nel resoconto.
2. _partials/sheet.html: <dialog class="sheet" open> con data-sheet sul contenuto:
   maniglia, etichetta (i18n), chiudi (link alla sezione: /#case-history o /#servizi),
   <h1> titolo, sottotitolo (client/sector), galleria, .prose con il corpo, azioni (links
   e attachments del front matter, «Contattaci» = #contatti).
3. _partials/gallery.html: binario scroll-snap con tutte le immagini (image.html, contain),
   contatore «n / N» (conteggio da 1), colonna miniature (desktop) come <button> o, senza
   JS, come link #img-n; puntini su mobile. Immagine 1 = image del front matter se gallery
   è vuota.
4. case-history/page.html e servizi/page.html: accordion.html con la sezione giusta aperta
   e il foglio. L'hero della 00 scende a <h2> in queste pagine.
5. Su desktop il foglio occupa l'area della sezione aperta (left = strisce precedenti);
   su mobile tutta la larghezza, 92% dell'altezza.

Criteri di accettazione: /case-history/brcko/ senza JS mostra il foglio leggibile e
scorrevole e la galleria scorribile; un solo <h1>; nessuna immagine persa (conta prima e
dopo la migrazione).
```

### Passo 10 — JS del foglio e della galleria

```text
Obiettivo: aprire i dettagli senza cambio pagina.

Fai così (in app.js):
1. Click su una card o una riga di servizio: fetch della pagina, DOMParser, estrai
   [data-sheet], inseriscilo nel <dialog> unico della pagina, showModal(), pushState
   dell'URL. Prefetch su pointerenter e focus; cache in una Map. Se fetch fallisce,
   navigazione normale.
2. Chiusura (pulsante, Esc, click sul backdrop, Indietro): animazione di discesa, focus
   restituito alla card di partenza, history.back() se il foglio era stato aperto da noi,
   altrimenti replaceState verso l'hash della sezione.
3. Pagina di dettaglio aperta direttamente: trasforma il dialog [open] in modale
   (close() + showModal()).
4. ::backdrop solo sull'area della sezione su desktop (clip-path con variabile CSS
   calcolata), a tutto schermo su mobile e dove non supportato.
5. Galleria desktop: click su miniatura = scorri il binario all'immagine; frecce ↑ ↓ =
   immagine precedente/successiva; la colonna mostra 3 miniature e segue l'attiva.
   Mobile: IntersectionObserver aggiorna puntini e contatore. Tastiera: frecce sinistra/
   destra quando la galleria ha il focus.

Criteri di accettazione: apertura senza ricaricare la pagina; URL condivisibile; Indietro
chiude il foglio; focus intrappolato e restituito; nessun errore in console; con
prefers-reduced-motion niente animazioni.
```

### Passo 11 — URL, privacy, 404, sitemap

```text
Obiettivo: sistemare tutti gli indirizzi della nuova struttura.

Fai così:
0. Il Team è una sezione senza pagine di dettaglio: nessun redirect, solo /#team.
1. layouts/{servizi,case-history,trasparenza}/section.html → redirect a /#servizi (alias del
   blocco dentro la 01), /#case-history, /#trasparenza (riusa il layout redirect: noindex,
   fuori sitemap).
   L'alias WordPress di trasparenza punta a /#trasparenza.
2. Pagine redirect esistenti: /chi-siamo → /#chi-siamo (ancora dentro la 00; la
   sezione Team è raggiungibile da /#team),
   /cosa-facciamo → /#cosa-facciamo, /contatti → /#contatti, /testimonial → /.
3. Privacy: layouts/page.html rende l'accordion con la 00 aperta e il testo nel foglio
   (TableOfContents nel foglio). I link Privacy/Cookie del footer delle sezioni aprono il
   foglio come i dettagli.
4. 404: pagina semplice, stesso stile, link alla home.
5. Sitemap: solo home e pagine di dettaglio (case, servizi, privacy). hreflang it/en
   corretti.
6. Aggiorna docs/redesign/redirect.md.

Criteri di accettazione: ogni URL della tabella di redirect.md porta al posto giusto;
nessun link interno rotto (controlla con htmltest o uno script di crawl su public/).
```

### Passo 12 — Versione inglese

```text
Obiettivo: /en/ completo come /it/.

Fai così: verifica che ogni sezione (5), campo nuovo (downloads, gallery, facts, timeline, mission,
vision, services dei servizi, settori, team) ed etichetta i18n esista in inglese; dove il testo inglese manca, mostra il campo vuoto e segnalalo (non
tradurre tu i contenuti senza chiedere). Selettore lingua: piccolo link IT/EN nel blocco
Contatti e nella riga legale della 00 (scegli e motiva; niente nella striscia).

Criteri di accettazione: build senza warning i18n; ogni pagina IT ha la sua EN o una
nota nel resoconto.
```

### Passo 13 — Accessibilità, mobile, schermi bassi, stampa

```text
Obiettivo: passata di qualità su tutto.

Fai così: controllo con axe (o Lighthouse) di home, un case, PEC, privacy, 404 a
1440×900 e 390×844; navigazione solo tastiera; lettore schermo (Orca o VoiceOver) su
strisce e foglio; 844×390 (flusso normale); 1100 e 1099 px (passaggio di layout); zoom 200%;
prefers-reduced-motion; foglio di stile print (sezioni tutte aperte, strisce nascoste).
Correggi ciò che trovi. Controlla anche i dettagli visivi del mockup: card uguali,
allineamento logo/numeri, segnalatore concentrico, pulsante Contatti solo icona.

Criteri di accettazione: zero errori axe; ordine del focus logico; nessun contenuto
tagliato a 200%.
```

### Passo 14 — Verifica finale e documentazione

```text
Obiettivo: chiudere il lavoro.

Fai così: build di produzione come nella CI; Lighthouse (prestazioni, accessibilità, SEO)
su home e un case, numeri nel resoconto; peso della home (HTML + CSS + JS + font) e del
primo caricamento di un foglio. Aggiorna docs/redesign/CMS.md (campi gallery, downloads, facts, timeline,
mission, vision, services, settori, team; come aggiungere una persona del Team e formato
delle foto; dove si trova l'eseguibile) e VERIFICA.md: rifai il confronto dei testi e dei media con
inventario/INDEX.md sull'HTML generato (nessun testo deve mancare dopo il passaggio a
strisce e fogli) e aggiorna URL e redirect. Elenca i TODO aperti (REA, capitale sociale,
eseguibile, testi mancanti, settore «Industriale» mancante, riassunti da approvare, nomi,
mansioni e foto del Team, traduzioni inglesi, conferma dei numeri 2024). Il confronto con
l'inventario va fatto tenendo conto dei testi tolti di proposito (management, VIDIM,
Sostenibilità) e sostituiti (storia, aree, servizi): elencali come «sostituiti», non come
«mancanti».

Criteri di accettazione: CI verde su una pull request di prova (build-only); nessun TODO
non documentato; **nessuna occorrenza di «Nome Cognome» né di «Mansione»** nell'HTML
generato (se restano, la pubblicazione è bloccata).
```

---

## 6. Fuori ambito (prossimi piani)
- Striscia per i Contatti (oggi: pulsante nella 00 + blocco in fondo alla 00): sarebbe la sesta.
- Sezione «Lavora con noi» / carriere (il PDF segnala che mancano nel sito): serve un indirizzo email dedicato e i testi.
- Sezione Sostenibilità (tolta dai testi del PDF il 2026-11-04).
- Case history compilati con Sfida / Soluzione / Risultati: servono dati reali di Omniaevo.
- Filtri nell'elenco case history.
- Animazioni oltre a strisce, foglio e galleria.
- Dominio omniaevo.it e hosting definitivo (redirect HTTP 301 al posto dei meta refresh).
- Revisione legale di privacy e cookie (punti aperti in `privacy-incongruenze.md`).
- Revisione umana dei testi inglesi (`reviewed = false` nei contenuti EN).
