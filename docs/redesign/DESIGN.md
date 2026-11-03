# Piano di design — stile NB1 (neo-brutalismo)

> Ambito: **design grafico e UX** del sito Hugo costruito con `PIANO.md`. La struttura, i contenuti, gli URL e il CMS non cambiano.
> Riferimento visivo: canvas dei mockup, pagina **"NB1 — Sito"** → https://claude.ai/artifact/9JonT2rihTfUFbQmdN4Cy9
> (Home, Case history indice e dettaglio, PEC, Trasparenza, Privacy; Mobile: Home, Menu aperto, Case history dettaglio).

---

## 1. Decisioni prese

| Tema | Decisione |
|---|---|
| Stile | **NB1 — neo-brutalismo classico**: fondo crema, bordi neri 3 px, ombre piene senza sfumatura, blocchi di colore piatti, etichette ruotate |
| Palette | Blu Omniaevo `#163687` (primario), arancio `#e08f14` (accento, dal sito in `_legacy/`), crema `#f2efe9` (fondo), inchiostro `#111111`. Tinte di supporto: lavanda `#c3cff2`, pesca `#ffd9a0`, bianco |
| Font | **Bricolage Grotesque** (variabile, licenza OFL), **self-hosted** in `woff2`. Niente Google Fonts da CDN: la cookie policy dichiara solo cookie tecnici e il CDN trasmette l'IP del visitatore a terzi |
| Navigazione | Barra **in alto, sticky**, sempre utilizzabile durante lo scroll. Sotto i 900 px diventa logo + bottone "Menu" che apre un pannello a tutto schermo |
| CSS | CSS nativo con custom properties, niente framework né preprocessori. File separati per livello, uniti con Hugo Pipes (`resources.Concat`), minificati e con fingerprint in produzione |
| JavaScript | **Zero JS obbligatorio.** Menu mobile con la Popover API (`popover` / `popovertarget`), contenuti espandibili con `<details>`. JS solo come miglioramento facoltativo (es. voce attiva della nav sulle ancore della home) |
| Immagini | Partial `image.html` esistente (WebP + srcset). Le foto stanno in cornici con bordo e ombra; nessun filtro sulle foto in questa fase |
| Accessibilità | Contrasto AA su tutte le combinazioni usate, focus visibile spesso (outline 3 px arancio + offset), `prefers-reduced-motion` rispettato, aree cliccabili ≥ 44 px, un solo `<h1>` per pagina (come oggi) |
| Contenuti | **Nessun testo nuovo inventato.** Dove il mockup mostra testo assente nel contenuto, il template lo omette o mostra solo i campi esistenti |

### Differenze consapevoli rispetto ai mockup
I mockup semplificano alcuni dati. Il sito vero segue il contenuto:

| Mockup | Sito |
|---|---|
| Contatti home con solo `info@` | Tutte le 7 email + PEC da `data/contacts.toml` (decisione Passo 8 di `PIANO.md`), in una griglia di card |
| Scheda progetto con divisione, responsabile, data consegna | Solo i campi del front matter: `client`, `sector`, `areas`. Il resto resta nel corpo del testo così com'è |
| 3 "punti chiave" colorati nel dettaglio case history | Il corpo Markdown resta com'è; liste e immagini del corpo ricevono lo stile NB1 (`.prose`) |
| Filtri per area nell'indice case history | **Non nella v1**: 5 case history su 6 sono `engineering`, il filtro non aiuta. Da aggiungere quando le aree saranno più varie (CSS `:has()` + radio, senza JS) |
| Una sola testimonianza in home | Tutte le voci di `testimonial.items` |
| Fascia tecnologie | Generata dalle liste "Tecnologie", "Programmazione", "Automazione" di `cosaFacciamo.lists` |

---

## 2. Design system

### Token (custom properties in `assets/css/tokens.css`)
```css
:root {
  /* Colori */
  --c-blue: #163687;  --c-orange: #e08f14;  --c-cream: #f2efe9;  --c-ink: #111111;
  --c-lavender: #c3cff2;  --c-peach: #ffd9a0;  --c-white: #ffffff;
  /* Linee e ombre */
  --bw: 3px;  --border: var(--bw) solid var(--c-ink);
  --sh-s: 3px 3px 0 var(--c-ink);  --sh-m: 6px 6px 0 var(--c-ink);  --sh-l: 8px 8px 0 var(--c-ink);  --sh-xl: 10px 10px 0 var(--c-ink);
  /* Tipografia */
  --font: "Bricolage Grotesque", system-ui, sans-serif;
  --fs-body: 1.0625rem;              /* 17 px */
  --fs-h1: clamp(3rem, 8vw, 7rem);   /* 48 → 112 px */
  --fs-h2: clamp(2.25rem, 5vw, 4.5rem);
  --fs-h3: clamp(1.5rem, 2.5vw, 2.25rem);
  --lh-tight: 0.92;  --lh-body: 1.6;  --track-tight: -0.045em;
  /* Layout */
  --max: 1320px;  --gutter: clamp(16px, 3vw, 32px);  --space-section: clamp(56px, 8vw, 96px);
}
```

### Componenti (classi BEM leggere, file `assets/css/components.css`)
| Componente | Dove | Note |
|---|---|---|
| `.site-header` | tutte | sticky, fondo crema, bordo inferiore. Logo = blocco blu con ombra. Voce attiva = fondo arancio + bordo + ombra (`aria-current`) |
| `.menu-panel` | < 900 px | popover a tutto schermo, fondo blu, voci grandi numerate, selettore lingua a due celle, mail |
| `.btn` (+ `--accent`, `--dark`, `--light`) | ovunque | bordo + ombra; `:hover` sposta di 2 px e riduce l'ombra; `:active` annulla l'ombra |
| `.tag` | aree, settori, anni | bordo, fondo lavanda/bianco, testo piccolo in grassetto |
| `.card` (+ varianti colore) | aree, case history, servizi, trasparenza | bordo + `--sh-l`; varianti `--blue`, `--orange`, `--lavender`, `--peach` |
| `.highlight` | titoli h1 | parola in blocco colorato con bordo (span decorativo, non `<mark>`); varianti arancio e blu ruotata −2° |
| `.sticker` | hero | adesivo tondo/ruotato ("dal 2007"), solo decorativo (`aria-hidden`) |
| `.marquee` | home | fascia arancio con le tecnologie; animazione facoltativa, ferma con `prefers-reduced-motion` |
| `.breadcrumb` | pagine interne | `nav aria-label` + `aria-current` |
| `.spec-card` | dettaglio case history | "scheda progetto": testata nera, `<dl>` a righe |
| `.cta-band` | fondo pagine interne | fascia blu con titolo e bottone mail |
| `.prose` | corpo Markdown | tipografia del testo lungo (max 68 caratteri), liste numerate a righe con bordo, immagini del corpo in griglia con cornice |
| `.site-footer` | tutte | fondo blu, dati da `contacts.toml`, link legali |

### Breakpoint
- `900px`: nav → bottone Menu; griglie a 3 colonne → 1 colonna; hero a 2 colonne → 1.
- `600px`: card orizzontali (case history) → verticali; righe scorrevoli (`overflow-x: auto` + `scroll-snap`) per case history in home e galleria.

---

## 3. Mappa mockup → template

| Mockup (canvas) | Template | Modifica |
|---|---|---|
| Home | `layouts/home.html` | ristrutturazione markup per sezioni NB1, nessun cambio ai dati |
| Case history — indice | `layouts/case-history/section.html` | card orizzontali con immagine, tag area, descrizione, cliente |
| Case history — dettaglio | `layouts/case-history/page.html` | breadcrumb, titolo, `.spec-card`, immagine principale, `.prose`, prev/next come card |
| PEC | `layouts/servizi/page.html` + `section.html` | `links` e `attachments` come card d'azione (↗ esterno, ↓ PDF) |
| Trasparenza | `layouts/trasparenza/section.html` + `_partials/transparency-list.html` | banner in cornice, progetti come card con locandina, documenti come righe blu |
| Privacy | `layouts/page.html` (o `layouts/privacy/page.html` se serve) | indice sticky da `.TableOfContents`, testo su "foglio" bianco |
| Menu mobile | `_partials/header.html` | popover |
| — | `layouts/404.html`, `section.html` generico | stessi componenti, nessun mockup dedicato |

---

## 4. Passi

Ogni passo è piccolo e si verifica da solo. Alla fine di ogni passo **non** si fa commit: si propone il messaggio (Conventional Commits) e l'utente decide.

| # | Passo | Dipende da |
|---|---|---|
| 1 | Fondamenta: token, font self-hosted, reset e base, pipeline CSS | — |
| 2 | Header sticky, menu mobile, footer | 1 |
| 3 | Componenti condivisi (btn, tag, card, breadcrumb, cta-band, prose) | 1 |
| 4 | Home | 2, 3 |
| 5 | Case history (indice + dettaglio) | 2, 3 |
| 6 | Servizi (indice + PEC) | 2, 3 |
| 7 | Trasparenza | 2, 3 |
| 8 | Privacy, 404, template generici | 2, 3 |
| 9 | Passata mobile e accessibilità | 4–8 |
| 10 | Verifica EN e finale | 9 |

---

## 5. Prompt

### Preambolo comune (incollalo all'inizio di ogni prompt)

```text
Contesto: sito Hugo extended 0.169.0 nel repo omniaevo.github.io, branch develop. La struttura
è completa (docs/redesign/PIANO.md). Ora applichiamo il design NB1 descritto in
docs/redesign/DESIGN.md: leggilo prima di iniziare e rispetta le decisioni della sezione 1
e il design system della sezione 2. Riferimento visivo: canvas
https://claude.ai/artifact/9JonT2rihTfUFbQmdN4Cy9, pagina "NB1 — Sito".
Applica la skill hugo-best-practices.
Regole:
- Non cambiare contenuti, URL, front matter, .pages.yml o data/: solo layouts/, assets/,
  static/fonts/ e i18n/ (solo per nuove etichette UI, in it ed en).
- CSS nativo con i token di tokens.css: niente colori, ombre o font scritti a mano fuori
  dai token. Niente framework, niente JS obbligatorio.
- HTML semantico e accessibile: un <h1> per pagina, landmark, focus visibile, contrasto AA,
  decorazioni con aria-hidden.
- Codice, classi e commenti in inglese. Testi UI via i18n.
- Alla fine esegui `hugo --gc --minify --printPathWarnings --printI18nWarnings --panicOnWarning`:
  zero warning. Controlla la pagina con `hugo server` a 1440 px e a 390 px.
- NON fare commit: proponi il messaggio di commit nel resoconto.
- Resoconto finale: file creati o modificati, differenze rispetto al mockup e perché,
  TODO aperti.
```

### Passo 1 — Fondamenta

```text
Obiettivo: preparare la base del design system.

Fai così:
1. Scarica Bricolage Grotesque variabile (Google Fonts / repo ufficiale, licenza OFL),
   sottoinsieme latin + latin-ext, formato woff2, in static/fonts/. Aggiungi il file della
   licenza accanto al font.
2. assets/css/ diviso in: tokens.css (sezione 2 del piano), fonts.css (@font-face con
   font-display: swap), base.css (reset minimo, body crema, tipografia, link, focus-visible,
   skip link visibile al focus, prefers-reduced-motion), layout.css (.container con --max e
   --gutter, sezioni con --space-section), components.css e pages.css (vuoti per ora).
3. _partials/head/css.html: unisci i file nell'ordine sopra con resources.Concat in
   css/main.css; in produzione minify + fingerprint + integrity (come oggi).
   Elimina il vecchio placeholder assets/css/main.css.
4. Preload del font principale nel <head>.

Criteri di accettazione: tutte le pagine hanno fondo crema, font Bricolage, focus visibile;
nessuna richiesta a domini esterni (verifica nella scheda Network).
```

### Passo 2 — Header, menu mobile, footer

```text
Obiettivo: header sticky e footer NB1 su tutte le pagine.

Fai così:
1. _partials/header.html: struttura del mockup Home. Logo = link alla home in blocco blu
   con ombra. Menu main da site.Menus.main con aria-current (stile voce attiva: fondo
   arancio, bordo, ombra). Selettore lingua come piccolo bottone bordato.
2. Sotto 900 px: nascondi la nav e mostra un <button popovertarget="menu-panel"> "Menu"
   (icona hamburger in CSS, aria-label da i18n). Il pannello è un elemento con attributo
   popover, a tutto schermo, fondo blu: voci numerate grandi, selettore lingua a due celle,
   bottone mail di info@. Bottone "Chiudi" con popovertargetaction="hide".
   Le voci sono <a> normali. Verso un'altra pagina il pannello si chiude da solo (la pagina
   cambia). Verso un'ancora della stessa pagina resterebbe aperto: aggiungi un piccolo
   script inline (miglioramento progressivo) che chiama hidePopover() al click di un link
   del pannello. Senza JS il menu resta usabile (si chiude con "Chiudi" o Esc).
3. html { scroll-padding-top } uguale all'altezza dell'header, così le ancore non finiscono
   sotto la barra.
4. _partials/footer.html: fondo blu, testo bianco, dati da data/contacts.toml, link legali,
   anno automatico. Resta partialCached come oggi.

Criteri di accettazione: header visibile in ogni punto dello scroll; menu mobile apribile e
chiudibile con tastiera (Esc chiude); nessun JS necessario per aprirlo.
```

### Passo 3 — Componenti condivisi

```text
Obiettivo: scrivere in components.css i componenti della tabella "Componenti" del piano.

Fai così:
1. .btn e varianti, .tag, .card e varianti colore, .highlight, .sticker, .breadcrumb,
   .spec-card, .cta-band, .marquee, .prose.
2. .prose: stile per il Markdown dei corpi (titoli, paragrafi max 68ch, liste puntate e
   numerate a righe con bordo, immagini in cornice con ombra; più immagini consecutive in
   griglia a 2–4 colonne). Usa il render hook immagini esistente.
3. _partials/breadcrumb.html e _partials/cta-band.html riusabili (testi da i18n).
4. Stati :hover, :focus-visible, :active per tutto ciò che è cliccabile.

Criteri di accettazione: una pagina di prova locale (non committata) mostra tutti i
componenti; contrasti verificati (annota i valori nel resoconto).
```

### Passo 4 — Home

```text
Obiettivo: applicare il mockup Home a layouts/home.html.

Fai così:
1. Hero: tag "ICT a 360°", <h1>, adesivo "dal 2007" decorativo (aria-hidden), card con
   testo e bottone verso #cosa-facciamo. Evidenziazione del titolo senza toccare il front
   matter: il template divide hero.title in parole e avvolge l'ultima in .highlight
   (arancio). Regola generica: funziona con qualsiasi titolo e in EN. Il blocco blu ruotato
   su "semplici" del mockup non si replica (richiederebbe un campo nuovo nel CMS).
2. Fascia .marquee con gli items delle liste di cosaFacciamo.
3. #chi-siamo: card bianca con storia/oggi + card blu con foto management (image-by-path).
4. #cosa-facciamo: intro, poi 6 card numerate a colori alterni, poi le liste in <details>
   ("Campi di attività", "Tecnologie"…), così la sezione resta corta.
5. #servizi: fascia pesca con i servizi della collection (per weight).
6. #case-history: ultime 3 come card con immagine; su mobile riga scorrevole.
7. #testimonial: tutte le voci come card lavanda con virgolette arancio.
8. #vidim-group: card semplice (loghi assenti: nessun placeholder visibile).
9. #contatti: sezione blu a tutta larghezza, titolo grande, bottone info@ e griglia di card
   con tutte le email (ruolo da i18n, nota PA), PEC, telefono, indirizzo.

Criteri di accettazione: tutti i testi presenti prima restano; le ancore del menu
funzionano sotto l'header sticky; layout corretto a 1440 e 390 px.
```

### Passo 5 — Case history

```text
Obiettivo: indice e dettaglio come nei mockup.

Fai così:
1. section.html: breadcrumb, <h1> con "history" evidenziato, intro (.Content) solo se c'è,
   card orizzontali (immagine | tag aree, titolo, descrizione, cliente se presente,
   "Leggi →"). Griglia a 2 colonne, 1 sotto 900 px, card verticali sotto 600 px.
   Niente filtri (vedi sezione 1).
2. page.html: breadcrumb, tag aree, <h1>, description come lead, .spec-card con i soli
   campi presenti (client, sector, areas), immagine principale in cornice (lazy=false),
   corpo in .prose, nav precedente/successivo come due card.
3. Chiusura con _partials/cta-band.html.

Criteri di accettazione: 6 dettagli corretti, nessun campo vuoto mostrato, immagini del
corpo in griglia.
```

### Passo 6 — Servizi

```text
Obiettivo: indice servizi e dettaglio PEC come nel mockup PEC.

Fai così:
1. page.html: breadcrumb, tag "Servizio", <h1>, immagine in cornice, corpo in .prose.
   links → card d'azione bianche con "↗" (link esterno); attachments → card blu con
   quadrato "PDF" e "↓". Fascia assistenza con l'email di supporto da contacts.toml.
2. section.html: stesse card dell'indice case history (un servizio oggi, ma il layout
   regge N elementi).

Criteri di accettazione: link esterni con rel noopener (come oggi); le card hanno un solo
link ciascuna (niente link annidati).
```

### Passo 7 — Trasparenza

```text
Obiettivo: pagina /trasparenza/ come nel mockup.

Fai così:
1. Banner in cornici bianche affiancate.
2. Progetti: card con locandina (proporzione 3:4), tag programma e anno, bottone
   "Scheda progetto · PDF ↓". Raggruppamento per anno mantenuto (titolo anno come tag
   grande).
3. Documenti: righe blu a tutta larghezza con quadrato "PDF", titolo, anno, freccia.
4. fileNote (EN) accanto al link, come oggi.

Criteri di accettazione: 4 voci, 4 PDF raggiungibili, nessuna pagina di dettaglio generata.
```

### Passo 8 — Privacy, 404, generici

```text
Obiettivo: pagine di testo lungo e pagine di servizio.

Fai così:
1. Privacy: due colonne. A sinistra indice sticky da .TableOfContents (configura
   markup.tableOfContents per h2–h3 se serve), a destra il testo in un "foglio" bianco
   con .prose. Sotto 900 px l'indice va sopra il testo, in un <details> chiuso.
2. 404: titolo grande con "404" evidenziato, testo i18n, bottone alla home.
3. page.html e section.html generici: stessi componenti, nessun caso speciale.

Criteri di accettazione: l'indice porta alle sezioni sotto l'header sticky; #cookie
funziona dal footer.
```

### Passo 9 — Passata mobile e accessibilità

```text
Obiettivo: verificare e correggere tutte le pagine a 390 px e con la tastiera.

Fai così:
1. Confronta ogni pagina con i mockup mobile (Home, Menu, Case history dettaglio) e
   applica lo stesso schema alle pagine senza mockup.
2. Tastiera: ordine del focus, skip link, menu popover, details. Screen reader: landmark,
   aria-current, alt delle immagini.
3. Contrasti di ogni combinazione testo/fondo usata; aree cliccabili ≥ 44 px.
4. prefers-reduced-motion: nessuna animazione (marquee fermo, nessuna transizione hover).
5. Lighthouse (mobile) su Home, Case history dettaglio, Privacy: annota punteggi
   Accessibility e Performance.

Criteri di accettazione: nessun overflow orizzontale a 320–390 px; Accessibility ≥ 95.
```

### Passo 10 — Verifica EN e finale

```text
Obiettivo: chiudere il lavoro di design.

Fai così:
1. Ripeti i controlli del passo 9 sulle pagine /en/: testi più lunghi non rompono bottoni,
   tag e titoli evidenziati.
2. Controlla che nessun colore, font o ombra sia fuori dai token (grep sui valori esadecimali
   fuori da tokens.css).
3. Aggiorna docs/redesign/VERIFICA.md con una sezione "Design" (pagina → esito).
4. Raccogli i TODO del design in un'unica lista.

Non correggere nulla in questo passo: consegna solo il rapporto.
```

---

## 6. Prerequisiti di contenuto (da chiedere, non bloccanti)
- Testo introduttivo per `/case-history/` e `/servizi/` (oggi TODO).
- Descrizione del servizio PEC (oggi solo link e manuale).
- Loghi VIDIM Group (oggi assenti).
- Aree delle case history: oggi 5 su 6 sono `engineering`. Se alcune toccano anche Network, Research, Software, il filtro dell'indice torna utile.

## 7. Fuori ambito (prossimi piani)
- Illustrazioni proprietarie (variante NB1-A del canvas) e decorazioni (NB1-B): il layout prevede già i punti dove inserirle (hero, card aree).
- Trattamento delle foto in bicromia (variante NB1-C).
- Animazioni oltre il marquee.
- Dominio omniaevo.it e hosting definitivo.
