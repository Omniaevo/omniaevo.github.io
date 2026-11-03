# Redirect dai vecchi URL

Il sito attuale (WordPress, `www.omniaevo.it`) ha questi URL. GitHub Pages non supporta redirect lato server, quindi sul sito Hugo sono realizzati con pagine statiche (meta refresh).

| Vecchio URL | Nuova destinazione | Come è realizzato |
|---|---|---|
| `/` | `/` | stesso URL |
| `/chi-siamo` | `/#chi-siamo` | pagina `redirect` (`content/it/chi-siamo.md`) |
| `/cosa-facciamo` | `/#cosa-facciamo` | pagina `redirect` (`content/it/cosa-facciamo.md`) |
| `/testimonial` | `/` (sezione rimossa) | pagina `redirect` (`content/it/testimonial.md`) |
| `/contatti` | `/#contatti` | pagina `redirect` (`content/it/contatti.md`) |
| `/cookie-policy` | `/privacy/#cookie` | pagina `redirect` (`content/it/cookie-policy.md`) |
| `/informativa_gdpr` | `/privacy/` | `aliases` in `content/it/privacy.md` |
| `/progetti-fesr-e-documento-trasparenza-aiuti-pubblici` | `/trasparenza/` | `aliases` in `content/it/trasparenza/_index.md` |
| `/case-history/<slug>/` | stesso URL | stesso slug |
| `/servizi/pec-posta-elettronica-certificata/` | stesso URL | stesso slug |
| `/omniaevoremote.exe` | **non migrato** | rimosso (decisione: niente assistenza remota) |
| `/documento_trasparenza_aiuti_pubblici.pdf` | stesso URL | file in `static/` |
| `/wp-content/uploads/2026/02/Scheda-progetto-BaC-iNEST-Spoke*.pdf` | `/uploads/trasparenza/Scheda-progetto-BaC-iNEST-Spoke*.pdf` | **cambia percorso**, nessun redirect (vedi sotto) |
| `/smartworking/` e `/smartworking/bitlocker/` | nessuno | finiscono sulla 404 (decisione) |

## Note

- Le pagine `redirect` hanno `noindex`, non sono nella sitemap e non compaiono negli elenchi. Servono solo a chi ha un vecchio link.
- Gli slug dell'inventario di Hugo non hanno `%20` finale: nella sitemap di WordPress c'era un errore.
- I PDF delle schede iNEST erano sotto `/wp-content/uploads/2026/02/`. Se esistono link esterni a quei file, vanno aggiornati o gestiti con redirect lato server (non possibile su GitHub Pages).
- Se l'hosting definitivo avrà redirect lato server, questa tabella è la mappa da usare. Un redirect HTTP 301 è meglio del meta refresh per i motori di ricerca.
- I redirect valgono solo per l'italiano (il sito vecchio non aveva l'inglese).
