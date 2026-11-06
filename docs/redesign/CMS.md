# Guida per i redattori: Pages CMS

Con Pages CMS si modificano i contenuti del sito senza toccare il codice. Ogni salvataggio crea una modifica nel repository GitHub; il sito si aggiorna da solo.

## 1. Come si entra

1. Ricevi un invito via email dall'amministratore.
2. Apri il link dell'invito e accedi a **app.pagescms.org** con la tua email.
3. Scegli il repository **omniaevo.github.io**. Il ramo è `main`.

Non serve un account GitHub. Chi è invitato via email può modificare contenuti e immagini, ma non può cambiare la configurazione né invitare altre persone.

## 2. Cosa si può modificare

Il menu a sinistra ha due gruppi: **Italiano** e **English (inglese)**. In ciascuno trovi:

| Voce | Cosa contiene | Si può eliminare? |
|---|---|---|
| Home | I testi della pagina iniziale | No (solo modifica) |
| Case history | I progetti realizzati | Sì |
| Servizi | I servizi offerti | Sì |
| Trasparenza | Progetti finanziati e documenti sugli aiuti pubblici | **No** |
| Trasparenza: titolo e banner | Titolo e immagini in cima alla pagina Trasparenza | No |

Privacy, cookie policy, contatti e indirizzi email non si modificano da qui: riguardano l'amministratore.

## 3. Aggiungere un case history

1. Apri **Case history** nel gruppo della lingua giusta.
2. Premi **Aggiungi** (in alto a destra).
3. Scrivi il **Titolo**. Il nome del file nasce dal titolo: per la versione inglese di un progetto già presente in italiano **usa lo stesso nome file** (per esempio `brcko`), così il sito collega le due versioni.
4. Compila gli altri campi. Ognuno ha una riga di spiegazione sotto il nome.
   - **Sommario**: breve frase che compare in elenco.
   - **Immagine principale**: caricala o scegli una già presente. Scrivi anche la **Descrizione dell'immagine**.
   - **Testo**: la descrizione completa; si possono inserire altre immagini.
5. Salva. La voce appare nell'elenco del sito entro pochi minuti (vedi sezione 7).

## 4. Aggiungere un servizio

Come per i case history, in **Servizi**. In più:
- **Ordine**: un numero. I servizi con il numero più basso compaiono per primi, in elenco e nella home.
- **Link**: collegamenti utili, per esempio un portale web. Ogni link ha un testo e un indirizzo completo (`https://...`).
- **Allegati**: documenti da scaricare, per esempio un manuale. Puoi caricare un file o indicare l'indirizzo di un documento esterno.

## 5. Aggiungere una voce di trasparenza

1. Apri **Trasparenza** e premi **Aggiungi**.
2. Compila **Titolo**, **Anno** (la pagina raggruppa le voci per anno), **Tipo** (progetto oppure documento aiuti pubblici) e **File PDF**.
3. Programma, ente finanziatore, importo, descrizione e locandina sono facoltativi. **Non scrivere dati che non hai.**
4. Per le voci in inglese, il campo **Nota accanto al link** vale «(document in Italian)» quando il PDF è in italiano.

Nota: le voci di trasparenza non hanno una pagina propria. Compaiono solo nell'elenco di `/trasparenza/`, con il link al PDF.

## 6. Nascondere, eliminare, modificare

- **Nascondere** una voce senza perderla: attiva **Bozza (non pubblicare)** e salva. La voce resta nel CMS ma sparisce dal sito. Per rimetterla online, disattiva la spunta.
- **Eliminare** (solo Case history e Servizi): apri la voce e usa il pulsante di eliminazione. Non è definitivo: l'amministratore può recuperarla dalla cronologia di GitHub.
- **Trasparenza non si elimina**: sono documenti con obbligo di pubblicazione. Per toglierne una dalla pagina usa **Bozza**.
- **Immagini e PDF** collegati a una voce eliminata **restano** nell'archivio. Si cancellano a parte dalla sezione **Media** (le immagini non più usate occupano spazio).
- **Rinominare** una voce (solo Case history e Servizi) cambia il suo indirizzo web: i vecchi link smettono di funzionare. Evitalo se la pagina è già pubblica.

## 7. Quando compare la modifica sul sito

Ogni salvataggio avvia una pubblicazione automatica. In genere il sito si aggiorna entro **2-5 minuti**. Se non vedi la modifica, ricarica la pagina con Ctrl+F5.

Se dopo 10 minuti la modifica non c'è, avvisa l'amministratore: la pubblicazione potrebbe essere fallita (per esempio per una data scritta male).

## 8. Traduzioni

- Per ogni voce italiana esiste (o va creata) la versione inglese con **lo stesso nome file**.
- Le voci inglesi hanno la spunta **Traduzione rivista**: attivala quando una persona ha controllato il testo.

## 9. Regole da ricordare

- Date: usa il selettore, non scriverle a mano.
- Immagini: formato JPG o PNG. Il sito crea da solo le versioni piccole.
- Testi: non copiare e incollare da Word senza controllare. Meglio incollare come testo semplice.
- I campi con la scritta «Non modificare» sono in sola lettura: servono al sito.

## 10. Per l'amministratore: configurazione iniziale

Questi passi si fanno una volta sola, a mano.

1. **Installare la GitHub App.** Accedi ad `app.pagescms.org` con un account GitHub che ha diritti di amministratore sul repository, installa la GitHub App «Pages CMS» sull'organizzazione **Omniaevo** e consenti l'accesso al repository `omniaevo.github.io`.
2. **Scegliere il ramo.** Nel CMS apri il repository e seleziona il ramo `main`. Pages CMS legge `.pages.yml` per ogni ramo: finché `.pages.yml` non è su `main`, il CMS non vede la configurazione. Per provare prima, puoi selezionare il ramo di lavoro.
3. **Invitare i collaboratori.** In Pages CMS apri il repository, sezione **Collaborators**, e inserisci le email dei redattori. Ricevono un invito e non hanno bisogno di un account GitHub.
4. **Controllare il primo salvataggio.** Crea una voce di prova (con **Bozza** attiva) e verifica che il commit su GitHub sia corretto e che la data sia scritta come `2026-01-31T09:00:00+01:00`. Poi elimina la prova.
5. **Cosa non cambia.** `.pages.yml` si modifica solo da GitHub (i collaboratori via email non possono). `privacy.md`, le pagine di redirect, `hugo.toml` e `data/` non sono esposti nel CMS.

### Note tecniche

- `settings.content.merge: true` fa mantenere le chiavi del front matter che il CMS non conosce, come rete di sicurezza.
- Il cascade che nasconde le pagine di dettaglio di Trasparenza è in `hugo.toml`, non nei file del CMS, così una modifica da editor non può rimuoverlo.
- Le date sono scritte nel formato `yyyy-MM-dd'T'HH:mm:ssXXX`, valido per Hugo. Una data non valida fa fallire la build.
- I file di sezione (`_index.md`) di case history e servizi non sono modificabili da qui.
