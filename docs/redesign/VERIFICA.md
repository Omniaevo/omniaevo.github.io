# Verifica dei contenuti

Data: 2026-11-03. Ambito: **solo contenuti** (testo, link, media) del passo 14 del piano. Non sono incluse le verifiche che dipendono dal design e dal deploy (h1, title/description, hreflang, sitemap, 404, link rotti online): vanno rifatte a design finito, prima del merge su `main`.

Metodo: build di produzione (`hugo --gc --minify --panicOnWarning`), poi confronto automatico di ogni riga di `inventario/INDEX.md` con l'HTML generato. I testi sono confrontati paragrafo per paragrafo (minuscolo, spazi e apici normalizzati). I media sono confrontati con l'hash SHA-256 dei file.

Legenda: **OK** = presente e identico · **modificato** = presente con una differenza voluta · **assente (decisione)** = non migrato per una scelta registrata nel piano.

## Pagine e articoli

| URL originale | Destinazione | Esito | Note |
|---|---|---|---|
| `/` | `/` | modificato | Titolo duplicato "I.C.T a 360° gradi!" e due pulsanti "Scopri di più" in più: assenti (decisione, un solo blocco). Il secondo testo "I.C.T" c'è come paragrafo finale. Refuso "comunicazione :" → "comunicazione:". I due link a `/cosa-facciamo/` e `/contatti/` sono diventati ancore (`#cosa-facciamo`, mailto). Immagini decorative assenti (decisione). |
| `/chi-siamo` | `/#chi-siamo` | modificato | Storia, "Omniaevo oggi" e Management presenti. I tre contatori (23, 18, 462) assenti (decisione). Foto di Massimo Belluz presente (hash identico). |
| `/cosa-facciamo` | `/#cosa-facciamo` | modificato | Intro, campi di attività, tecnologie, programmazione e automazione presenti. Refusi corretti: "confermi" → "conformi", "Java ," → "Java,". Due punti tolti da "I nostri campi di attività". Immagini decorative assenti (decisione). |
| `/testimonial` | `/#testimonial` | OK | Entrambe le testimonianze, con nome, ruolo, azienda e link a mangiarotti.it. |
| `/contatti` | `/#contatti` | modificato | Telefono, indirizzo, PEC e le 7 email presenti (in lista etichettata). "Direct contact" → "Contatti diretti". "(Udine)" → "(UD)", "s.r.l." → "S.r.l." (vengono da `data/contacts.toml`). Download "Assistenza Remota" assente (decisione). |
| `/progetti-fesr-e-documento-trasparenza-aiuti-pubblici` | `/trasparenza/` | modificato | 3 schede, documento aiuti, locandine e banner presenti. "Clicca qui per visualizzare la scheda progetto" → link "Visualizza la scheda progetto". I PDF cambiano percorso (da `/wp-content/uploads/2026/02/` a `/uploads/trasparenza/`), file identici. |
| `/informativa_gdpr` | `/privacy/` | OK | Confronto a 5 parole: nessuna differenza di testo. Restano solo la riga titolo "Informativa GDPR" (ora titolo pagina "Privacy") e i numeri degli elenchi. |
| `/cookie-policy` | `/privacy/#cookie` | OK | Testo identico; tabella Cookiebot resa come tabella. Il titolo "Cookie Policy" non è ripetuto. |
| `/case-history/car-sharing/` | `/case-history/car-sharing/` | OK | |
| `/case-history/monitoraggio-miniere/` | stesso URL | modificato | Refusi corretti: "superfice" → "superficie", "realizzate" → "realizzati". Righe spezzate unite. |
| `/case-history/galleria-di-tors/` | stesso URL | OK | Il bullet "n" (Wingdings) è diventato un elenco puntato. |
| `/case-history/sistema-di-saldatura-laser/` | stesso URL | modificato | "alla stato solido" → "allo stato solido". |
| `/case-history/brcko/` | stesso URL | modificato | "system system" → "system" (testo inglese). |
| `/case-history/sistema-di-supervizione-linea/` | stesso URL | OK | |
| `/servizi/pec-posta-elettronica-certificata/` | stesso URL | modificato | Il corpo con "Webmail PEC : Link" e "Manuale operativo PEC TWT: Scarica" è reso come due liste di link (stessi indirizzi). |
| `/smartworking/bitlocker/` | — | assente (decisione) | Pagina eliminata. |

## PDF e allegati

| URL originale | Nuova posizione | Esito |
|---|---|---|
| `wp-content/uploads/2026/02/Scheda-progetto-BaC-iNEST-Spoke3-Geo-Deck.pdf` | `/uploads/trasparenza/` | OK (hash identico) |
| `.../Spoke8-GG24.pdf` | `/uploads/trasparenza/` | OK |
| `.../Spoke9-GL24.pdf` | `/uploads/trasparenza/` | OK |
| `/documento_trasparenza_aiuti_pubblici.pdf` | stesso URL | OK |
| `/omniaevoremote.exe` | — | assente (decisione) |
| `https://eshop.twt.it/pec/manuale/TWT-PEC-MO.pdf` | link esterno nella PEC | OK |

## Immagini e altri media

| File | Esito |
|---|---|
| 24 immagini dei case history (6 pagine) | OK, tutte presenti (hash identici) in `/uploads/case-history/` |
| `massimo.jpg` | OK, in `/uploads/home/massimo-belluz.jpg` |
| `PEC-Posta-Elettronica-Certificata.jpg` | OK |
| Locandine Spoke 3/8/9 e banner Efficientamento/Sviluppo FESR | OK, in `/uploads/trasparenza/` |
| Hero, 6 immagini delle aree, campi di attività, programmazione, sede | assenti (decisione: immagini decorative) |
| `favicon_omniaevo.png`, `Header_Omniaevo_Completo_WEB_300x60.png` (logo) | **assenti: il sito Hugo non ha favicon né logo.** Da risolvere nella fase di design. |

## Link e indirizzi

- Email: i 7 indirizzi `@omniaevo.it` e la PEC sono tutti nella home. Nessuna email duplicata nei contenuti.
- Link esterni nel sito generato: 6. Nessun link interno rotto. Stato HTTP dei 6 link esterni:

| Link | Stato |
|---|---|
| `http://mangiarotti.it/` | 301 → https (ok) |
| `http://www.omniaevo.it/` (nella privacy) | 301 → https (ok) |
| `https://cookiepedia.co.uk/how-to-manage-cookies` | 200 |
| `https://eshop.twt.it/pec/manuale/TWT-PEC-MO.pdf` | 200 |
| `https://www.garanteprivacy.it/regolamentoue` | 200 |
| `https://twtmail.twt.it/welcome.wssp` | **non verificabile da qui**: il server risponde ma usa una rinegoziazione TLS vecchia che questo ambiente rifiuta. Aprilo a mano in un browser. |

## TODO rimasti nel repository

| Dove | TODO |
|---|---|
| `content/{it,en}/_index.md` (servizi, case history) | Nessuna introduzione nel sito attuale: `intro` vuoto |
| `content/{it,en}/_index.md` (VIDIM) | Loghi non disponibili |
| `content/{it,en}/servizi/_index.md`, `case-history/_index.md` | Nessuna introduzione né description |
| `alt` delle immagini dei case history | Descrizioni provvisorie ("Titolo – immagine N") |
| Contenuti EN | 15 file con `reviewed = false`: traduzione da far rivedere |
| Privacy e cookie | Testi invariati; punti da rivedere in `privacy-incongruenze.md`; nessuna traduzione inglese |
| `funder` e `amount` della trasparenza | Vuoti: i dati sono nei PDF ma non sul sito attuale (decisione da prendere) |
| Favicon e logo | Mancanti (vedi sopra) |

## Conclusione

Nessun testo, link o file del sito attuale è andato perso senza una decisione registrata. Le differenze sono: refusi corretti, elementi duplicati o decorativi non migrati, contatori e assistenza remota rimossi, PDF spostati di cartella.

Non verificato in questa fase: la parte tecnica di design (h1, title e description unici, hreflang, sitemap, `robots.txt`, 404 nelle due lingue) e tutto ciò che richiede il deploy online (GitHub Pages, `/en/` raggiungibile, CMS collegato).
