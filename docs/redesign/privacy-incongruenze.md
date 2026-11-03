# Privacy e cookie: punti da far valutare

I testi in `content/it/privacy.md` sono identici a quelli del sito attuale (`inventario/informativa_gdpr.md` e `inventario/cookie-policy.md`). Non sono stati corretti: li valuta una persona (revisione legale, vedi PIANO sez. 6).

## Non corrispondono al nuovo sito

| # | Punto del testo | Problema |
|---|---|---|
| 1 | Informativa, sez. 2: "rispondere a richieste degli utenti attraverso il form sul sito web" | Il nuovo sito non ha form: solo email (`mailto:`). |
| 2 | Informativa, sez. 2: "La base giuridica del trattamento è il contratto, nonché l'esplicito consenso" | Il sito non raccoglie dati con un consenso esplicito. |
| 3 | Informativa, sez. 7: "Questa Applicazione raccoglie ... Nome, Cognome, Ragione sociale e Email" | Il nuovo sito non raccoglie dati dai visitatori. |
| 4 | Informativa, sez. 7: "L'eventuale utilizzo di Cookie (segue informativa specifica)" | Il nuovo sito non imposta cookie (nessun Cookiebot, nessun login, nessuna analytics). |
| 5 | Informativa, sez. 8: log di sistema e indirizzo IP | Il nuovo sito è ospitato su GitHub Pages: i log li tratta GitHub (terza parte, possibile trasferimento extra UE). Non è citato. |
| 6 | Informativa, sez. 7: link a `www.omniaevo.it` | Il nuovo sito, finché non cambia il dominio, è su `omniaevo.github.io`. |
| 7 | Cookie policy: "Dichiarazione Cookie aggiornata l'ultima volta il 26/06/2023 da Cookiebot" e tabella `CookieConsent` / `cookiebot.com` | Cookiebot non viene usato nel nuovo sito. Tabella (resa come tabella Markdown) e dichiarazione sono da togliere. |
| 8 | Cookie policy, "Cookie tecnici essenziali": "la condivisione dei nostri contenuti, la memorizzazione delle Sue credenziali di accesso" | Il nuovo sito non ha login né condivisione sui social. |
| 9 | Informativa, sez. 1: fax +39 0432 901514 | Il fax non compare altrove nel sito (contatti, footer). Verificare che sia ancora attivo. |

## Date e riferimenti da verificare

| # | Punto | Nota |
|---|---|---|
| 10 | Informativa, sez. 10: "Ultima modifica: 08/11/2018" | La data in fondo è diversa da quella della cookie policy (26/06/2023). Da aggiornare dopo la revisione. |
| 11 | Informativa, sez. 5, titolo: "Reg. UE 2016/676" | Il regolamento GDPR è il 2016/679 (il testo lo cita giusto altrove). |

## Refusi nei testi (non corretti)

- "Privacy Policy di **Ominaevo** srl" (titolo)
- "relativo alla protezione delle persone fisiche con riguardo al trattamento **dai** dati personali"
- "che potrà **fa** valere rivolgendo apposita richiesta" (sez. 5)
- Cookie policy: "direttiva 95/46**CE**" (senza "/")
