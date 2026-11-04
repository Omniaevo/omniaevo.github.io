# Testi del redesign

> Fonte: PDF «OMNIAEVO _ Presentazione Strategia», più vicino alla realtà dei testi del sito attuale. **I testi qui sotto sono provvisori, non definitivi.** Servono a riempire il design con contenuti realistici; Omniaevo li rivedrà.
> Questo documento dice quali testi vanno dove nel design A1 «Strati» ([`ACCORDION.md`](ACCORDION.md)). Data: 2026-11-04. Solo italiano; l'inglese è da fare.

## 1. Regole

- Del PDF si usa **solo ciò che serve**: molte pagine sono incomplete, ripetute o troppo lunghe. Dove il PDF sbaglia o si ripete, il testo è corretto qui; dove è lungo, è accorciato senza cambiare il senso.
- Dove il PDF non dice nulla, resta il testo attuale del sito.
- Niente dati o testimonianze inventati.
- I testi stanno in `content/*/_index.md` e nelle collection, e si modificano dal CMS (`.pages.yml`). Poiché sono provvisori, vanno scritti **solo nei campi del CMS**, mai nei template.

## 2. Decisioni prese (2026-11-04)

| Tema | Decisione |
|---|---|
| Claim dell'hero | Resta quello attuale |
| Management (Belluz) | Tolto, con foto e campi CMS |
| VIDIM Group | Tolto (il PDF non lo cita) |
| Storia | Timeline del PDF, 8 tappe. Sostituisce «Storia» e «Omniaevo oggi» |
| Avvocato | Senza nome: «esperti legali». Nessun blocco «Novità» |
| Sostenibilità | Tolta |
| Case history | Restano i 6 case veri. I case del PDF sono modelli e non si usano |
| Team | Nuova striscia `03 Team`; Trasparenza diventa `04` |
| Servizi | Accorpato in `01 Cosa facciamo` come blocco finale (~270 parole): niente striscia dedicata. Strisce: 5 |
| Pagine del PDF | Non si usano tutte (sezione 3). Contenuti incompleti o prolissi sono corretti o lasciati fuori |

## 3. Cosa si usa del PDF

| Si usa | Dove |
|---|---|
| Servizi (3 cerchi), menu Servizi (4 voci) | `01`, blocco Servizi |
| Valori | `03` Team |
| Timeline 2007–2024, numeri 2024 | `00` |
| Chi siamo, Mission, Vision | `00`; ultima frase di «Chi siamo» e citazione: `03` Team |
| Aree di lavoro (testi) | `01` |
| Tecnologie (elenchi) | `01` |
| Settori (4 pagine presenti) | `01` |
| Servizi (4 testi) | `01`, blocco Servizi |

**Non si usa:** Punti di forza, Scenario, Obiettivi, Analisi cliente, Sito attuale, Proposta d'azione, slogan, **Sostenibilità**, **Novità** (il contenuto utile va nel servizio legale), **case history modello**, descrizioni lunghe dei gruppi di tecnologie, elenchi «Servizi offerti» di aree e settori (ripetono il paragrafo), slide finale (contatti dell'agenzia).

## 4. Dalle voci di menu del PDF alle 5 strisce

| Voce PDF | Dove va |
|---|---|
| Omniaevo (Chi siamo, Team) | `00` e `03` Team |
| Aree di lavoro, Tecnologie, Settori, Servizi | `01` (Servizi è l'ultimo blocco) |
| Case history | `02` |
| Contatti | `00` (blocco già presente) |
| — | `04` Trasparenza (invariata) |

## 5. Testi per sezione

### 5.1 — `00` Omniaevo

**Hero:** claim e testo restano quelli attuali.

**Fatti** (3 riquadri uguali, campo `facts`: lista di `{ value, label }`):

| Valore | Etichetta |
|---|---|
| 23 | collaboratori |
| 18 | Paesi di collaborazione |
| 462 | clienti |

Dati 2024: da riconfermare. L'anno «dal 2007» è già sopra il titolo.

**Chi siamo** (`chiSiamo.text`):
> Omniaevo è la sinergia tra competenze diverse e passioni comuni, un partner affidabile nell'ingegneria digitale che accompagna i propri clienti verso l'innovazione. Non ci limitiamo alla consulenza: progettiamo e costruiamo soluzioni che trasformano idee in realtà tangibili.

**Mission** (`chiSiamo.mission.text`, accorciata):
> La nostra missione è trasformare le sfide complesse in opportunità semplici e realizzabili, attraverso l'innovazione tecnologica. Crediamo che con creatività e competenza si possano raggiungere soluzioni straordinarie, capaci di fare la differenza.

**Vision** (`chiSiamo.vision.text`, accorciata):
> Immaginiamo un futuro in cui tecnologia e ingegneria lavorano in armonia per migliorare il mondo. Creiamo soluzioni che superano le aspettative dei clienti, garantendo innovazione, qualità ed efficacia in ogni progetto.

**Storia** (`chiSiamo.timeline`: lista di `{ year, items[] }`, dal PDF; punti accorciati dove ripetevano):

| Anno | Punti |
|---|---|
| 2007 | Fondazione di Omniaevo S.r.l. · Primi progetti software per grandi realtà nazionali |
| 2010 | Prima espansione del team nello sviluppo software · Primi servizi di automazione industriale |
| 2013 | Ampliamento del know-how: automazione industriale, reti aziendali, hosting/housing |
| 2015 | Espansione nei mercati internazionali con una piattaforma innovativa di car-sharing · Collaborazioni attive con aziende in 5 nuovi paesi |
| 2018 | 15 collaboratori · Nuove soluzioni per la mobilità intelligente · Primi rapporti con i maggiori player internazionali |
| 2020 | Oltre 300 clienti · Servizi di assistenza tecnica avanzata per aziende private ed enti pubblici |
| 2022 | Leader nelle tecnologie per piattaforme di mobilità intelligente e integrata · Team a 20 collaboratori |
| 2024 | 23 collaboratori · Collaborazioni con 18 paesi · 462 clienti · Soluzioni personalizzate per aziende private ed enti pubblici nell'information technology e nell'assistenza tecnica |

**Restano invariati:** Dati societari + pulsante «Trasparenza →», Contatti, riga legale.
**Tolti:** `chiSiamo.storia`, `chiSiamo.oggi`, `chiSiamo.management` (foto `/uploads/home/massimo-belluz.jpg`), `vidim`.

### 5.2 — `01` Cosa facciamo

**Intro:** invariata.

**6 aree** (ordine e numeri `00`–`05`; per ognuna `title`, `summary` sulla card, `text` nel foglio). Nessun elenco «Servizi offerti»: ripeterebbe il testo.

| N | Titolo (era) | Riassunto (card) |
|---|---|---|
| 00 | Infrastrutture IT (Systems) | Piattaforme di elaborazione e virtualizzazione, assistenza tecnica |
| 01 | Networking (Network) | Progettazione e installazione di sistemi di comunicazione di rete |
| 02 | Automazione industriale (Engineering) | Soluzioni per l'industria e il monitoraggio ambientale |
| 03 | Project management (nuova) | Progetti articolati multi-tecnologia con metodologie moderne |
| 04 | Sviluppo software (Software + Web Apps) | Software, firmware e applicazioni web per server, client e mobile |
| 05 | Ricerca (Research) | Processi, algoritmi, modellazione matematica, analisi dati |

**00 · Infrastrutture IT**
> Progettiamo, realizziamo e manteniamo infrastrutture IT complete, su misura: dalla piccola azienda unipersonale alla grande struttura articolata. Piattaforme di elaborazione, virtualizzazione, storage, clustering e disaster recovery, con assistenza tecnica on-site e off-site. L'obiettivo è un'infrastruttura robusta, scalabile ed efficiente, che supporti la crescita e l'innovazione.

**01 · Networking**
> Progettiamo e installiamo sistemi di comunicazione avanzati: cablaggi in rame e fibra, connettività wireless, firewall, VPN, soluzioni multi-homing, ponti radio, bus di campo civili e industriali, thin client, PCoIP e desktop virtualization. L'obiettivo è una connettività affidabile e sicura.

**02 · Automazione industriale**
> Progettiamo soluzioni per l'industria: automazione, robotica, controllo di processo, supervisione, sistemi di misura e monitoraggio, sistemi di visione, gestione energetica, saldatura automatizzata e controllo produzione. Sviluppiamo inoltre applicazioni per il monitoraggio geologico e ambientale.

**03 · Project management**
> Gestiamo progetti articolati multi-tecnologia con le metodologie più moderne ed efficaci. Il nostro team segue ogni progetto con professionalità, perché ogni soluzione sia realizzata in modo efficace e nei tempi previsti.

**04 · Sviluppo software**
> Progettiamo architetture distribuite e scalabili basate su microservizi in container Docker, con comunicazione sincrona o asincrona (code di messaggi Kafka o zeroMQ) e scalabilità gestita con Kubernetes. Sviluppiamo sistemi completi orientati al web: processi aziendali, flotte veicoli e car sharing, analisi e visualizzazione dati, gestione documentale, tracking della produzione, supervisione e monitoraggio remoti, GIS e cartografie dinamiche. Realizziamo anche database distribuiti, big data e business intelligence.

**05 · Ricerca**
> Investiamo in ricerca per studiare processi, algoritmi e modellazione matematica, raccolta e analisi dati (scientifici, economici, marketing), data-fusion e analisi geografiche. Progettiamo elettronica digitale e analogica personalizzata e sviluppiamo software di laboratorio e prototipi hardware e software.

**Tecnologie** (4 gruppi di etichette, campo `lists`; solo le etichette, senza descrizioni). Il gruppo «Tecnologie» attuale si chiama **Infrastrutture** (contiene VMware e Veeam). Il quarto è nuovo.

| Gruppo | Etichette |
|---|---|
| Infrastrutture | Ipervisori VMware, KVM · Veeam backup · Ubiquiti networking · PFsense · Docker · Kubernetes · Ansible |
| Programmazione | Java · C#, C/C++ · NodeJS · PHP · Swift · Zend Framework · Code Igniter · Angular · JQuery/Bootstrap · Nest · Loopback · Git/GitLab, Continuous integration e deployment |
| Automazione | PLC · Robot GE Fanuc · Yaskawa · Sensoristica · Sistemi di visione · Raccolta dati ed analisi · Tecnologie IoT |
| **AI** (nuovo) | Python, R · TensorFlow, PyTorch, Keras · Scikit-learn, XGBoost · NLTK, SpaCy · OpenCV, YOLO · Jupyter, Anaconda · Google AI Platform, Microsoft Azure AI, Amazon SageMaker |

**Settori** (nuovo blocco, campo `cosaFacciamo.settori`: lista di `{ title, text }`; schede uguali). Il PDF ha 4 testi su 5 voci di menu («Industriale» manca): **si mostrano 4 settori**; Industriale si aggiunge quando c'è il testo.

| Titolo | Testo |
|---|---|
| Produttivo | Sosteniamo il settore produttivo con soluzioni che aumentano la produttività e migliorano la qualità dei prodotti: sistemi di controllo e monitoraggio, raccolta e analisi dei dati di produzione. |
| HighTech | Adottiamo e integriamo le tecnologie più avanzate: sviluppo software, infrastrutture IT, virtualizzazione e cloud, automazione, AI e IoT, per i clienti più esigenti e innovativi. |
| Civile | Offriamo soluzioni per migliorare la gestione di infrastrutture e servizi, con enti pubblici e privati: sistemi di gestione, smart city, monitoraggio ambientale, gestione energetica e risparmio. |
| Pubblica amministrazione | Sosteniamo la transizione digitale degli enti pubblici con consulenza, progettazione e implementazione di tecnologie conformi alle normative: digitalizzazione dei processi, e-government, sicurezza IT, assistenza continua. |

### 5.3 — `01` Cosa facciamo, blocco Servizi

Non è più una striscia: sta in fondo alla `01`, dopo i Settori, con `id="servizi"` e sottotitolo «Come lavoriamo».

**Intro** (`servizi.intro`, dal PDF):
> Consulenza ingegneria digitale · Progettazione e sviluppo hardware e software · Implementazione e supporto legale integrato.

**4 servizi** numerati `01`–`04`, come percorso. Ognuno è una voce della collection `servizi`, con testo e un elenco breve (campo `services`). **Aggiornamento 2026-11-04:** le 4 schede **non sono link** e non hanno pagina di dettaglio (`build.render = "never"`): non c'è altro contenuto da mostrare. Solo la PEC resta una pagina. PEC e scaricabili restano sotto, come gruppo «Assistenza clienti».

**01 · Consulenza**
> Il primo passo è capire le esigenze specifiche del cliente. Offriamo analisi dettagliate e strategie personalizzate per ottimizzare i processi aziendali e adottare le tecnologie più adatte.

Elenco: Analisi delle esigenze aziendali · Valutazione delle infrastrutture IT esistenti · Strategie di trasformazione digitale · Piani di ottimizzazione delle risorse.

**02 · Progettazione**
> La progettazione traduce le idee in soluzioni realizzabili. Un team di esperti crea progetti dettagliati che rispondono alle necessità operative e strategiche del cliente, con efficienza e scalabilità.

Elenco: Infrastrutture IT · Architetture software · Reti e sistemi di comunicazione · Soluzioni di automazione industriale.

**03 · Implementazione**
> L'implementazione è il momento in cui le soluzioni progettate prendono vita. Gestiamo l'intero processo con precisione, perché ogni componente sia installato e configurato correttamente.

Elenco: Installazione di hardware e software · Configurazione di reti e sistemi di comunicazione · Soluzioni di automazione · Migrazione di dati e sistemi.

**04 · Supporto legale integrato**
> Collaboriamo con esperti legali per garantire che le soluzioni siano conformi a leggi e regolamenti, GDPR compreso, fin dall'inizio del progetto. L'obiettivo è offrire un servizio di costruzione di strumenti digitali il più completo possibile.

Elenco: Consulenza legale su normative IT · Conformità GDPR · Sicurezza informatica · Redazione e revisione di contratti IT.

### 5.4 — `02` Case history

Restano i 6 case attuali. Dal PDF si prende solo lo schema del foglio, **Sfida · Soluzione · Risultati**, da compilare solo con dati reali forniti da Omniaevo. Il campo `sector` dei case si compila quando Omniaevo sceglie i settori.

### 5.5 — `03` Team (nuova striscia)

**Citazione** (`team.quote`): «Un team multidisciplinare in grado di realizzare progetti di ingegneria digitale per industria e servizi.»

**Testo** (`team.text`, da «Chi siamo»): Il nostro team affronta ogni sfida con creatività e precisione, coprendo aspetti hardware, software ed elettronici e trattando con competenza le informazioni digitali.

**Valori** (3 schede uguali con icona SVG, `team.values`; spostati qui dalla `00`): Qualità e affidabilità · Problem solving · Personalizzazione.

**Persone** (`team.members`: lista di `{ name, role, photo, photoAlt }`). Circa 10 riquadri tutti uguali: foto verticale 4:5, stesso ritaglio, nome e mansione (al massimo 2 righe). Senza foto compare una sagoma SVG su fondo `--mist`. Durante lo sviluppo i riquadri dicono `Nome Cognome` / `Mansione`: vanno sostituiti prima della pubblicazione (il passo 14 lo verifica). **Scheda grande (2026-11-04):** la prima persona, Massimo Belluz (Amministratore Unico e responsabile R&D, foto `/uploads/home/massimo-belluz.jpg` già nel sito), ha una scheda larga due colonne e alta due righe; le altre le stanno accanto (campo `featured`). Da Omniaevo: nomi, mansioni, ordine (per struttura aziendale) e foto.

### 5.6 — `04` Trasparenza

Invariata.

## 6. Punti aperti

- Tutti i testi sono **provvisori**: Omniaevo li rivedrà.
- Numeri 23 · 18 · 462 (2024): confermare.
- Settore Industriale: manca il testo.
- Riassunti nuovi («Project management», «Sviluppo software»): da approvare.
- Nomi, mansioni e foto del Team.
- Traduzione inglese di tutto.
- Errori del PDF corretti qui: le pagine «Project management» e «Sviluppo software» ripetevano il testo di «Systems»; la slide Mission ripeteva il claim; date del car-sharing (2013 vs 2015: vale la timeline, 2015).

## 7. Campi da aggiungere o togliere

| Dove | Cosa |
|---|---|
| `content/*/_index.md` → `facts` | nuovo, lista `{ value, label }` |
| `chiSiamo` | nuovi `text`, `mission`, `vision`, `timeline`; tolti `storia`, `oggi`, `management` |
| `vidim` | tolto (anche `factNetwork` in `i18n/*.toml` e lo stile `.network`) |
| `cosaFacciamo.areas` | rinominate e riordinate (5.2) |
| `cosaFacciamo.lists` | nuovo gruppo AI; «Tecnologie» rinominato «Infrastrutture» |
| `cosaFacciamo.settori` | nuovo, 4 voci |
| `servizi.intro` | compilato |
| collection `servizi` | 4 nuove voci con `weight` e `services` |
| `team` | nuovo: `title`, `quote`, `text`, `values`, `members` |
| `.pages.yml` | ogni campo sopra, in italiano e inglese, con descrizioni per i redattori |
| `CMS.md` | aggiornare al passo 14 |
