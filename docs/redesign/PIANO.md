# Piano di riprogettazione strutturale — omniaevo.it → Hugo

> Ambito: **solo struttura e contenuti**. Il design grafico è escluso: lo integriamo con un piano separato.
> Fonte dei contenuti: sito attuale https://www.omniaevo.it/ (WordPress 6.8). Testi, link e allegati vanno **mantenuti**.

---

## 1. Decisioni prese

| Tema | Decisione |
|---|---|
| Generatore | Hugo extended **0.169.0** (stessa versione in locale e in CI) |
| Repository | `omniaevo.github.io` su GitHub, lavoro su `develop`, deploy da `main` |
| Hosting (fase 1) | GitHub Pages via GitHub Actions → `https://omniaevo.github.io/` |
| CMS | Pages CMS (hosted, app.pagescms.org). I redattori entrano via invito email |
| Lingue | Italiano (default, alla radice `/`) + Inglese (`/en/`) |
| Collection CMS | **Case history**, **Servizi**, **Trasparenza** |
| Case history | Contenuti mantenuti così come sono oggi |
| Supporto | Solo assistenza remota e contatti di assistenza. **Rimuovere** le guide interne e i percorsi morti (BitLocker, categoria Smartworking) |
| Design | Fuori ambito. I template hanno HTML semantico minimo e nessuno stile |
| Bozza statica attuale | Spostata in `_legacy/` come riferimento per la fase di design |

---

## 2. Inventario del sito attuale

### Pagine
| URL attuale | Contenuto |
|---|---|
| `/` | Hero "Soluzioni semplici per esigenze complesse", "I.C.T a 360°" (duplicato), 6 aree (Engineering, Network, Research, Systems, Software, Web Apps), VIDIM Group, CTA contatti |
| `/chi-siamo` | Storia di Omniaevo, Omniaevo oggi (contatori Collaboratori/Paesi/Clienti, oggi a "0" per un bug JS), Management |
| `/cosa-facciamo` | Intro + motto "Rendiamo semplice la tecnologia", Campi di attività, Tecnologie, Programmazione, Automazione |
| `/testimonial` | Testimonial (es. Dott. Erik Franceschini, Mangiarotti Spa). Non è nel menu |
| `/contatti` | Sede, telefono, 8 email per reparto, download assistenza remota |
| `/progetti-fesr-e-documento-trasparenza-aiuti-pubblici` | 3 schede iNEST (Spoke 3 Geo Deck, Spoke 8 GG24, Spoke 9 GL24) + documento trasparenza aiuti pubblici |
| `/informativa_gdpr` | Informativa privacy |
| `/cookie-policy` | Cookie policy |

### Articoli
| Categoria | Articoli |
|---|---|
| Case history (6) | car-sharing, monitoraggio-miniere, galleria-di-tors, sistema-di-saldatura-laser, brcko, sistema-di-supervizione-linea |
| Servizi (1) | pec-posta-elettronica-certificata (link webmail PEC + manuale PDF TWT) |
| Smartworking (1) | bitlocker → **da eliminare** |

### Link e allegati da preservare
- `https://www.omniaevo.it/omniaevoremote.exe` (assistenza remota)
- `https://www.omniaevo.it/documento_trasparenza_aiuti_pubblici.pdf`
- `wp-content/uploads/2026/02/Scheda-progetto-BaC-iNEST-Spoke{3-Geo-Deck,8-GG24,9-GL24}.pdf`
- `https://eshop.twt.it/pec/manuale/TWT-PEC-MO.pdf` + link webmail PEC
- Email: info, amministrazione, assistenza, assistenzapa (solo PA), support, commerciale, reclami @omniaevo.it; PEC omniaevo@qnetpec.it
- Footer: P. IVA 02494210301, Viale Veneto 33/11, 33033 Codroipo (UD), tel. +39 0432 1845421

### Problemi da correggere (non sono modifiche ai testi)
- Il titolo "I.C.T a 360°" e il blocco "Cosa facciamo" sono duplicati in home.
- I contatori di Chi siamo mostrano 0 (prendere i valori reali dall'HTML o chiederli).
- Il `<title>` della home è "Omniaevo - Omniaevo".
- Nella sitemap gli slug finiscono con `%20`.
- Il footer mostra "© 2019": l'anno va generato in automatico.

---

## 3. Nuova mappa del sito

```
/                          Home (one-page)
├─ #chi-siamo              storia, oggi (contatori), management
├─ #cosa-facciamo          intro + 6 aree + campi/tecnologie/programmazione/automazione
├─ #servizi                elenco dalla collection Servizi
├─ #case-history           ultime 3 → /case-history/
├─ #testimonial
├─ #vidim-group
└─ #contatti               sede, telefono, email per reparto
/case-history/             archivio              (collection)
/case-history/<slug>/      dettaglio
/servizi/                  archivio              (collection)
/servizi/<slug>/           dettaglio
/trasparenza/              elenco per anno, link ai PDF (collection, senza pagine di dettaglio)
/supporto/                 assistenza remota + email assistenza
/privacy/                  informativa GDPR + cookie policy (#cookie)
/404
```
La stessa struttura esiste sotto `/en/`.

### Struttura dei contenuti (repo)
```
content/
  it/  _index.md  case-history/  servizi/  trasparenza/  supporto.md  privacy.md
  en/  (stessi percorsi e stessi slug → Hugo collega le traduzioni in automatico)
data/contacts.toml         dati indipendenti dalla lingua (email, telefono, P.IVA, indirizzo)
i18n/it.toml, i18n/en.toml etichette UI
static/uploads/            media caricati dal CMS (immagini + PDF)
static/omniaevoremote.exe  stesso percorso del sito attuale
static/documento_trasparenza_aiuti_pubblici.pdf  stesso percorso
```

> **Eccezione alla skill `hugo-best-practices`**: niente page bundle per le collection CMS. Pages CMS gestisce meglio una sola cartella media (`static/uploads/`), che va montata anche in `assets/` per l'image processing.

### Campi delle collection
| Collection | Campi |
|---|---|
| Case history | `title`, `date`, `description` (sommario), `image`, `imageAlt`, `client` (facoltativo), `sector` (facoltativo), `areas` (scelte tra le 6), corpo |
| Servizi | `title`, `date`, `description`, `image`, `imageAlt`, `weight` (ordine), `links` (lista label + url), `attachments` (lista label + file), corpo |
| Trasparenza | `title`, `date`, `year`, `kind` (`progetto` / `documento-aiuti`), `program` (es. "iNEST Spoke 3"), `funder` (facoltativo), `amount` (facoltativo), `file` (PDF), `description`, `image` + `imageAlt` (facoltativi, es. locandina del progetto) |

Il front matter di `content/<lingua>/trasparenza/_index.md` ha inoltre la lista `banners` (`image` + `imageAlt`), mostrata in cima alla pagina. Da esporre in Pages CMS come voce di tipo "file" (passo 12).

Tutte e tre le collection hanno anche il campo `draft` (booleano, default `false`). Con `draft = true` la voce resta nel repo ma non viene pubblicata.

### Eliminazione dal CMS
| Collection | Eliminazione dal CMS | Nascondere senza eliminare |
|---|---|---|
| Case history | Sì | `draft` |
| Servizi | Sì | `draft` |
| Trasparenza | **No** (documenti con obblighi di pubblicazione) | solo `draft` |
| Home, Supporto (tipo file) | Non applicabile, solo modifica | — |

Un file eliminato resta nella history di Git e si può ripristinare. I media collegati (immagini, PDF) **non** vengono eliminati insieme alla voce: si gestiscono a parte nella sezione Media.

I testi della home (sezioni e testimonial) stanno nel front matter di `content/<lingua>/_index.md`. Si possono modificare da Pages CMS come voce di tipo "file".

---

## 4. Passi

Ogni passo è piccolo, si verifica da solo e finisce con un commit su `develop`.

| # | Passo | Dipende da |
|---|---|---|
| 1 | Estrazione dei contenuti dal sito attuale | — |
| 2 | Setup del progetto Hugo | — |
| 3 | Layout base senza design | 2 |
| 4 | Home IT | 1, 3 |
| 5 | Collection Case history IT | 1, 3 |
| 6 | Collection Servizi IT | 1, 3 |
| 7 | Collection Trasparenza IT | 1, 3 |
| 8 | Supporto e contatti IT | 1, 3 |
| 9 | Privacy e cookie IT | 1, 3 |
| 10 | Versione inglese | 4–9 |
| 11 | Redirect dai vecchi URL | 4–9 |
| 12 | Configurazione Pages CMS | 5–7 |
| 13 | Deploy GitHub Pages | 3 |
| 14 | Verifica finale | tutti |

---

## 5. Prompt

### Preambolo comune (incollalo all'inizio di ogni prompt)

```text
Contesto: stiamo ricostruendo il sito https://www.omniaevo.it/ (oggi WordPress) con Hugo
extended 0.169.0 nel repo omniaevo.github.io, branch develop. Il piano completo è in
docs/redesign/PIANO.md: leggilo prima di iniziare e rispetta le decisioni della sezione 1.
Applica la skill hugo-best-practices.
Regole:
- Ambito solo strutturale: NON creare CSS, design, font, icone o animazioni. Usa HTML
  semantico con classi descrittive; il design arriva dopo.
- Mantieni testi, link e allegati del sito attuale parola per parola, prendendoli da
  docs/redesign/inventario/. Correggi solo refusi evidenti ed elencali nel resoconto.
  Non inventare contenuti. Se manca un dato, scrivi TODO e segnalalo.
- Codice, nomi file, chiavi i18n e commenti in inglese. Contenuti nella lingua del sito.
- Alla fine esegui `hugo --gc --minify --printPathWarnings --printI18nWarnings --panicOnWarning`:
  la build deve avere zero warning. Fai un commit su develop con un messaggio
  Conventional Commits.
- Resoconto finale: file creati o modificati, TODO aperti, differenze rispetto al sito attuale.
```

### Passo 1 — Estrazione dei contenuti

```text
Obiettivo: creare un inventario fedele dei contenuti di https://www.omniaevo.it/, da usare
come unica fonte per i passi successivi.

Fai così:
1. Leggi sitemap_index.xml e le sitemap page/post. Visita ogni URL dell'inventario
   (sezione 2 del piano), tranne /smartworking/bitlocker.
2. Per ogni pagina o articolo crea docs/redesign/inventario/<slug>.md con:
   URL originale, titolo, meta description (se c'è), data, e il testo completo
   convertito in Markdown, con titoli, elenchi e link nell'ordine originale.
   Escludi menu, footer, banner cookie e metadati WordPress (es. "Admin77df99", timestamp).
3. Contatori di /chi-siamo: cerca i valori reali negli attributi HTML (data-*) del
   contatore. Se non li trovi, scrivi TODO.
4. Scarica in docs/redesign/inventario/media/ le immagini dei contenuti (case history,
   servizi, management, loghi VIDIM) e i PDF del dominio omniaevo.it. Per i PDF esterni
   (TWT) registra solo l'URL.
5. Crea docs/redesign/inventario/INDEX.md con una tabella: URL originale → file inventario
   → nuova destinazione (sezione 3 del piano) → media collegati.
6. Testi ripetuti (es. "I.C.T a 360°" in home): registrali una sola volta e annota il duplicato.

Non creare file Hugo in questo passo.
Criteri di accettazione: ogni URL dell'inventario ha il suo file. Ogni link e PDF trovato
compare in INDEX.md. Nessun testo è stato riassunto.
```

### Passo 2 — Setup del progetto Hugo

```text
Obiettivo: inizializzare il progetto Hugo alla radice del repo.

Fai così:
1. Sposta la bozza statica attuale (index.html, informativa_gdpr.html, css/, js/, assets/)
   in _legacy/ con git mv. Non cancellare nulla.
2. Crea la struttura della sezione 3 del piano: content/it, content/en, data/, i18n/,
   layouts/, static/uploads/, archetypes/.
3. hugo.toml:
   - baseURL https://omniaevo.github.io/, title "Omniaevo", timeZone Europe/Rome
   - lingue: it (default, alla radice, contentDir content/it) e en (/en/, contentDir content/en)
   - menu main per lingua, con voci che puntano alle ancore della home e alle pagine
     /case-history/, /servizi/, /trasparenza/, /supporto/
   - [pagination], [taxonomies] vuoto (non servono taxonomy), enableRobotsTXT,
     goldmark unsafe = false, [security]
   - module mounts: monta static/uploads anche in assets/uploads (ripeti i mount di default
     di static e assets)
4. data/contacts.toml: ragione sociale, P.IVA, indirizzo, telefono, tutte le email
   (con il ruolo di ognuna e la nota "solo per PA ed enti pubblici" su assistenzapa),
   la PEC. Prendi i valori dall'inventario.
5. .gitignore (public/, resources/_gen/, .hugo_build.lock).
6. Archetype per case-history, servizi e trasparenza con i campi della sezione 3,
   compreso draft = false.
7. Aggiungi in i18n/it.toml e i18n/en.toml le chiavi UI che servono ora.

Criteri di accettazione: `hugo` termina senza errori (le pagine possono ancora mancare).
_legacy/ non finisce nell'output: verificalo in public/.
```

### Passo 3 — Layout base senza design

```text
Obiettivo: creare i template minimi con la struttura nuova di Hugo (≥ 0.146), senza stile.

Fai così:
1. layouts/baseof.html: <html lang>, skip link a #main, header, main, footer.
2. _partials/head.html: charset, viewport, title ("Pagina | Omniaevo"; in home
   "Omniaevo — <claim>"), meta description, canonical, hreflang di tutte le traduzioni,
   partial embedded opengraph/twitter_cards/schema, noindex fuori produzione.
3. _partials/header.html: logo testuale "Omniaevo" con link alla home della lingua,
   menu main con aria-current, selettore lingua basato su .Translations
   (fallback: home dell'altra lingua).
4. _partials/footer.html: dati da data/contacts.toml, anno corrente generato,
   link a privacy e cookie (/privacy/#cookie).
5. Template: home.html (vuoto per ora), section.html (elenco), page.html, 404.html.
6. Render hook per immagini (alt obbligatorio, lazy, width/height) e per link
   (warn su link interni rotti, rel noopener sui link esterni).
7. Nessun CSS. Al massimo un placeholder vuoto assets/css/main.css già caricato con
   Hugo Pipes, così il passo di design deve solo riempirlo.

Criteri di accettazione: HTML valido, un solo <h1> per pagina, landmark presenti,
selettore lingua funzionante tra it ed en.
```

### Passo 4 — Home IT

```text
Obiettivo: costruire la home italiana one-page con i contenuti di home, chi-siamo,
cosa-facciamo, testimonial e contatti.

Fai così:
1. content/it/_index.md: front matter strutturato con una chiave per sezione, nell'ordine
   della mappa (sezione 3): hero, chiSiamo, cosaFacciamo, servizi (solo titolo e intro),
   caseHistory (titolo e intro), testimonial (lista: testo, autore, ruolo, azienda),
   vidim, contatti (intro + CTA). Testi presi dall'inventario.
2. Unisci "I.C.T a 360°" e "Cosa facciamo" senza duplicati: un solo blocco introduttivo,
   poi le 6 aree con i loro testi, poi campi di attività, tecnologie, programmazione e
   automazione dalla pagina /cosa-facciamo.
3. home.html: una <section id="..."> per ogni sezione, con le ancore della mappa.
   #servizi elenca la collection servizi (per weight). #case-history mostra le ultime 3
   con un link all'archivio. #contatti usa data/contacts.toml.
4. Contatori: valori dall'inventario, resi come testo statico (niente JS).

Criteri di accettazione: tutti i testi delle 5 pagine d'origine sono presenti una sola
volta (verifica con l'inventario). Le ancore funzionano dal menu.
```

### Passo 5 — Collection Case history IT

```text
Obiettivo: migrare i 6 case history in content/it/case-history/.

Fai così:
1. Un file per case history, con lo stesso slug del sito attuale (senza %20):
   car-sharing, monitoraggio-miniere, galleria-di-tors, sistema-di-saldatura-laser,
   brcko, sistema-di-supervizione-linea.
2. Front matter secondo la sezione 3 del piano. Usa la data originale. description = il
   testo attuale (sono frasi brevi). Copia l'immagine in static/uploads/case-history/.
   imageAlt descrittivo; se non è deducibile, scrivi TODO.
3. Testi identici all'originale: la decisione è lasciarli così come sono.
4. _index.md della sezione con titolo e intro (se l'originale non ha un'intro, TODO).
5. Template: elenco (section) e dettaglio (page) specifici per la sezione solo se
   servono campi in più (client, sector, areas). Navigazione precedente/successivo
   come sul sito attuale.

Criteri di accettazione: 6 pagine generate con i rispettivi URL; immagini processate
(webp + srcset) dal render hook o dal partial immagine.
```

### Passo 6 — Collection Servizi IT

```text
Obiettivo: creare la collection servizi e migrare "PEC Posta Elettronica Certificata".

Fai così:
1. content/it/servizi/pec-posta-elettronica-certificata.md con: testo originale,
   links = [Webmail PEC → URL originale], attachments = [Manuale operativo PEC TWT → URL
   originale del PDF]. Il PDF è esterno: non scaricarlo, lascia il link.
2. _index.md della sezione.
3. Template di elenco e dettaglio che mostrano links e attachments come liste.
4. Il campo weight decide l'ordine nell'elenco e nella sezione #servizi della home.

Criteri di accettazione: /servizi/ e /servizi/pec-posta-elettronica-certificata/
generati; link esterni con rel noopener; aggiungere un servizio richiede solo un nuovo file.
```

### Passo 7 — Collection Trasparenza IT

```text
Obiettivo: creare la collection trasparenza, senza pagine di dettaglio.

Fai così:
1. Una voce per ciascuno dei 3 progetti iNEST (Spoke 3 Geo Deck, Spoke 8 GG24,
   Spoke 9 GL24) e una voce "Documento trasparenza aiuti pubblici".
2. Copia i 3 PDF in static/uploads/trasparenza/. Il documento aiuti resta in
   static/documento_trasparenza_aiuti_pubblici.pdf (stesso URL del sito attuale).
3. Front matter secondo la sezione 3. Campi facoltativi vuoti se il dato non c'è:
   non inventare importi o enti.
4. Le voci non generano pagine proprie (build.render = never via cascade). La pagina
   /trasparenza/ le elenca raggruppate per anno (dal più recente) e separa progetti e
   documenti. Ogni voce ha un link al PDF.
5. Titolo della pagina: "Progetti FESR e Trasparenza aiuti pubblici" (dall'originale).

Criteri di accettazione: 4 voci visibili, 4 PDF raggiungibili, nessuna pagina di
dettaglio in public/trasparenza/.
```

### Passo 8 — Supporto e contatti IT

```text
Obiettivo: creare /supporto/ e completare i dati di contatto.

Fai così:
1. Copia omniaevoremote.exe dal sito attuale in static/omniaevoremote.exe (stesso URL).
   Registra nel resoconto dimensione e hash SHA-256 del file.
2. content/it/supporto.md: download assistenza remota, email assistenza, support,
   assistenzapa (con la nota "solo per PA ed enti pubblici"). Testi dall'inventario
   di /contatti. Niente guide interne, niente BitLocker.
3. La sezione #contatti della home e la pagina supporto leggono le email da
   data/contacts.toml: nessuna email duplicata nei contenuti.

Criteri di accettazione: tutte le 8 email e la PEC compaiono almeno una volta nel sito,
il download funziona, nessun riferimento a BitLocker o Smartworking.
```

### Passo 9 — Privacy e cookie IT

```text
Obiettivo: migrare informativa GDPR e cookie policy in content/it/privacy.md.

Fai così:
1. Testo integrale dell'informativa GDPR, poi una sezione con id "cookie" che contiene
   il testo integrale della cookie policy. Non modificare i testi legali.
2. Elenca nel resoconto i punti dei testi che non corrispondono più al nuovo sito
   (es. cookie di terze parti di WordPress o plugin che non usiamo più, date di
   aggiornamento). Non correggerli: li valuta un umano.
3. Link alla pagina solo nel footer, non nel menu.

Criteri di accettazione: testi identici all'inventario; lista delle incongruenze
consegnata.
```

### Passo 10 — Versione inglese

```text
Obiettivo: creare content/en/ con la traduzione di tutti i contenuti italiani.

Fai così:
1. Per ogni file in content/it/ crea il file con lo stesso percorso e lo stesso slug in
   content/en/. Hugo collega le traduzioni in automatico.
2. Traduci in inglese professionale (B2B, tono tecnico ma semplice). Non tradurre nomi
   propri, nomi di progetti (iNEST, Geo Deck…) e ragioni sociali.
3. Aggiungi `reviewed = false` nel front matter di ogni file tradotto.
4. Trasparenza: traduci titolo e descrizione, ma i PDF restano gli stessi (in italiano).
   Aggiungi "(document in Italian)" accanto al link.
5. Privacy: traduzione di cortesia con questa nota in testa: "This translation is
   provided for convenience; the Italian version prevails." Segnala nel resoconto che
   serve una revisione legale.
6. Completa i18n/en.toml, poi esegui la build con --printI18nWarnings.

Criteri di accettazione: ogni pagina IT ha la sua EN. Il selettore lingua porta alla
pagina corrispondente. Nessuna chiave i18n mancante.
```

### Passo 11 — Redirect dai vecchi URL

```text
Obiettivo: fare in modo che i vecchi URL di omniaevo.it continuino a funzionare dopo il
cambio di dominio.

GitHub Pages non supporta redirect lato server, quindi:
1. Redirect da percorso a percorso: usa `aliases` nel front matter della pagina di
   destinazione.
   - /progetti-fesr-e-documento-trasparenza-aiuti-pubblici/ → /trasparenza/
   - /informativa_gdpr/ → /privacy/
   - /cookie-policy/ → /privacy/#cookie (vedi punto 2)
   - /servizi/pec-posta-elettronica-certificata/ resta uguale (stesso slug)
   - /case-history/<slug>/ resta uguale (stesso slug)
2. Redirect verso un'ancora (/chi-siamo/, /cosa-facciamo/, /testimonial/, /contatti/,
   /cookie-policy/): crea un content type "redirect" con campo `target` e un template
   che genera meta refresh + link canonical + link visibile. Escludi queste pagine da
   sitemap e liste (build.list = never) e aggiungi noindex.
3. /smartworking/bitlocker/ e /smartworking/: nessun redirect, finiscono sulla 404.
4. Crea docs/redesign/redirect.md con la tabella completa vecchio → nuovo, da riusare
   se un giorno l'hosting avrà redirect lato server.

Criteri di accettazione: ogni URL della sezione 2 del piano (tranne BitLocker) porta al
contenuto giusto; verificalo con `hugo server` e curl.
```

### Passo 12 — Configurazione Pages CMS

```text
Obiettivo: rendere modificabili le collection da Pages CMS.

Prima leggi la documentazione attuale (https://pagescms.org/docs/configuration/) e
verifica la sintassi.
Fai così:
1. Crea .pages.yml alla radice:
   - media: static/uploads, output /uploads
   - content di tipo collection: Case history IT/EN, Servizi IT/EN, Trasparenza IT/EN,
     con i campi della sezione 3 (tipi: string, text, date, image, file, select per
     areas e kind, number per weight e year, rich-text per il corpo)
   - content di tipo file: Home IT/EN (front matter di _index.md), Supporto IT/EN
   - format toml-frontmatter, come i file esistenti
   - i nomi dei file dei nuovi elementi sono generati dal titolo (slug)
   - operations per collection (sezione "Eliminazione dal CMS" del piano):
     Case history e Servizi create + rename + delete; Trasparenza create, senza
     rename e senza delete
   - campo draft in ogni collection, di tipo boolean con default false, etichetta
     "Bozza (non pubblicare)"
2. Etichette dei campi in italiano, pensate per redattori non tecnici, con una
   descrizione di una riga per ogni campo.
3. Non esporre privacy, redirect, hugo.toml e data/ nel CMS.
4. docs/redesign/CMS.md: guida per i redattori (accesso via invito email, come
   aggiungere un case history, un servizio, una voce di trasparenza, quanto tempo
   passa prima che il sito si aggiorni, come nascondere una voce con "Bozza", come
   eliminarla, che i media collegati restano e si eliminano da Media, e che le voci di
   Trasparenza non si eliminano). Includi anche i passi manuali per l'admin:
   installare la GitHub App, scegliere il branch main, invitare i collaboratori.

Criteri di accettazione: .pages.yml valido; un nuovo elemento creato seguendo i campi
produce un file che passa la build senza warning; una voce con draft = true non compare
in public/; la collection Trasparenza non mostra l'azione elimina.
```

### Passo 13 — Deploy GitHub Pages

```text
Obiettivo: pubblicare il sito su https://omniaevo.github.io/ a ogni push su main.

Fai così:
1. .github/workflows/hugo.yml secondo la sezione Build and Deploy della skill
   hugo-best-practices, con HUGO_VERSION 0.169.0. Verifica le versioni correnti delle
   action ufficiali (checkout, configure-pages, upload-pages-artifact, deploy-pages).
2. La build usa --panicOnWarning e il baseURL di configure-pages.
3. Nel resoconto scrivi le impostazioni manuali da fare nel repo: Settings → Pages →
   Source "GitHub Actions", e lo stato attuale di Pages sul repo.

Criteri di accettazione: il workflow passa su un branch di test o con workflow_dispatch.
Il sito è raggiungibile e le pagine /en/ funzionano.
```

### Passo 14 — Verifica finale

```text
Obiettivo: confermare che non si è perso nessun contenuto e che la struttura è completa.

Fai così:
1. Per ogni riga di docs/redesign/inventario/INDEX.md verifica che testo, link e media
   siano presenti nella nuova destinazione. Produci docs/redesign/VERIFICA.md con l'esito
   per ogni riga (OK / mancante / modificato e perché).
2. Controlla tutti i link interni ed esterni del sito generato e segnala quelli rotti.
3. Controlla: un <h1> per pagina, title e description unici, hreflang corretti,
   sitemap con it ed en, robots.txt, 404 nelle due lingue.
4. Raccogli tutti i TODO rimasti nel repo in un'unica lista.

Non correggere nulla in questo passo: consegna solo il rapporto.
```

---

## 6. Fuori ambito (prossimi piani)
- Design grafico, CSS, componenti visivi, animazioni (la bozza in `_legacy/` è il riferimento).
- Passaggio del dominio omniaevo.it e hosting definitivo.
- Revisione legale di privacy/cookie e della traduzione EN.
- Revisione umana dei testi EN (`reviewed = false`).
