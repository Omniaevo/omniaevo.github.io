# Token del design — A1 «Strati»

> Sistema ridotto, approvato il 2026-11-04. File: `assets/css/tokens.css`.
> Pagina di confronto con anteprime e contrasti: https://claude.ai/artifact/HZypjEick2FYdiWSGVozCJ
> **Regola:** un token fa un solo lavoro. Un valore nuovo entra solo per un caso d'uso che quelli esistenti non coprono, e va scritto qui. Nei CSS non si scrivono colori, misure di testo, spazi o durate a mano.

## Colori (8 valori)

| Token | Valore | Si usa per | Mai per |
|---|---|---|---|
| `--blue` | `#163687` | titoli, link, marchio, numeri dei fatti | testo corrente |
| `--ink` | `#0b1430` | testo corrente e forte, linea di sezione, focus su fondo chiaro, fondo del foglio | — |
| `--muted` | `#4b5470` | etichette e testo secondario, su bianco o `--mist` | testo su arancio |
| `--orange` | `#e08f14` | riempimenti: striscia 04, pulsanti, barre, segnalatore, evidenziatore delle parole chiave, focus su fondo scuro | testo su bianco (2,6:1) |
| `--orange-dark` | `#a5650a` | testo arancio piccolo su bianco (riga iniziale, sottotitoli) | fondi chiari (4,2:1) |
| `--mist` | `#eef1f8` | card piene e blocchi informativi | pagina intera |
| `--line` | `#e3e6ee` | contorni e separatori | testo |
| `--white` | `#ffffff` | pagina, card con contorno, testo sulle strisce blu | testo su arancio (2,6:1) |

**Ricavati** (nessun valore nuovo, con `color-mix`): `--strip-1/2/3` = `--blue` con 10%, 22%, 35% di nero (anche link al passaggio: `--strip-3`); `--orange-hover` = arancio + 8% nero; `--mist-hover` = `--mist` + 8% blu (passaggio e pressione sono lo stesso colore); `--backdrop` = `--ink` al 55%; `--focus` (ink) e `--focus-on-dark` (arancio), 3 px con offset 3 px.

Contrasti verificati: ink/bianco 18,2 · muted/bianco 7,5 · blu/bianco 11,0 · arancio-scuro/bianco 4,7 · bianco/strisce 12,0–15,0 · ink/arancio 7,0 · ink/arancio-hover 6,0 · arancio/strisce blu 4,6–5,8 · blu/arancio (barra) 4,2.

## Parole chiave (evidenziatore)

Classe `.mark`: banda arancio `--orange` alta circa un terzo del corpo, **dietro** la parte bassa del testo (non solo sotto), più o meno centrata sulle lettere, nel loro terzo basso. Il testo mantiene il suo colore: blu sul testo grande (blu/arancio 4,2:1, basta per ≥ 24 px), **ink** sul testo piccolo (7,0:1). Il blu su arancio non va usato su testo piccolo.

**Dove si usa:** solo sui titoli di pagina (`h1`), una sola parola, una per pannello. Mai sui titoli di blocco (`h2`), sui titoli di card, né sui link. Home: «semplici» (IT) e «Simple» (EN), campo `hero.highlight` nel CMS. Gli altri titoli di pagina hanno un campo analogo: «Cosa **facciamo**», «**Servizi**», «Case **history**», «**Trasparenza**» (approvato).

## Icone

Una famiglia, SVG inline (`layouts/_partials/icon.html`), griglia 24, tratto 1,8, angoli arrotondati, `currentColor`, `aria-hidden`. Si usano dove aiutano a riconoscere: contatti, tipo di file, azioni dei pulsanti. **Non** nelle card delle aree né nelle case history. Misure: 22 px in un cerchio da 44 px (36 px sotto i 560 px), 18 px nei pulsanti. Il cerchio è `--mist`; al passaggio diventa `--orange` con icona `--ink`. Da sola solo nel pulsante Contatti, con nome accessibile.

## Contatti e indirizzi

Gli indirizzi email **non vanno mai a capo** (`white-space: nowrap`): le righe con icona sono larghe almeno 340 px (la più lunga ha 27 caratteri); sotto i 560 px l'icona scende a 36 px e il padding si riduce. Le etichette possono andare a capo. Struttura: titolo e frase a sinistra, contatti principali (email info e telefono, in `--fs-h3` con banda arancio sottile che cresce al passaggio) e sede a destra; sotto, gruppi (Supporto, Commerciale e amministrazione, Posta certificata) con righe a contorno. Il gruppo di ogni email è nel campo `group` di `data/contacts.toml`.

## Card

Stile V2, approvato: numero con evidenziatore, contorno 2 px; al passaggio fondo `--mist` e freccia che diventa cerchio arancio e si sposta di 2 px. Le card sono tutte alte uguali: categoria 1 riga, titolo 2 righe, descrizione 3 righe, troncati con «…». Case history: variante C2 (approvata): copertina 16:9 dentro la card, con margine di 8 px. **Immagini dentro una card:** stanno a una distanza fissa dal bordo e hanno raggio `--r-s` (12 px). La regola rigorosamente concentrica (raggio della card meno la distanza) con 12 px di distanza dava 4 px, quasi squadrato; con `--r-s` lo scarto ottico è accettabile. Management: distanza 12 px, foto 200×250 px, a sinistra, con il testo che scorre accanto e sotto; se l'area interna della card è più stretta di 400 px (container query) la foto sta sopra il testo. Case history C2: distanza 8 px, stesso raggio. Nessuna icona nelle card.

## Tipografia

Due famiglie, tre pesi, sei misure. Bricolage Grotesque 800 per titoli e numeri grandi. Schibsted Grotesk 400 per il testo, 600 per l'enfasi (etichette, link, pulsanti, nomi). Mai maiuscolo, nessuna spaziatura tra le lettere sul testo piccolo.

| Token | Misura | Peso · interlinea | Dove |
|---|---|---|---|
| `--fs-display` | 48 → 88 | 800 · 0,95 | titolo della home e di ogni sezione (`h1`) |
| `--fs-h2` | 28 → 44 | 800 · 1,1 | Chi siamo, numeri dei fatti e delle aree (`h2`) |
| `--fs-h3` | 28 | 800 · 1,1 | titolo di card o servizio (`h3`), «Contatti», etichetta della striscia su desktop |
| `--fs-lead` | 20 | 400 · 1,5 | testo di apertura, etichetta della striscia sul telefono |
| `--fs-body` | 16 | 400 · 1,6; 600 per i nomi | testo corrente, valori nelle card |
| `--fs-small` | 14 | 400; 600 per pulsanti | etichette, pulsanti, riga iniziale, dati societari, numeri delle strisce |

Spaziatura tra le lettere: −0,03em su display e titoli, zero altrove.

## Spazi, forme, movimento

- **Spazi**: `--space-1…6` = 8, 16, 24, 32, 48, 64. 24 = padding delle card; 64 = tra i blocchi di una sezione; 48 e 64 = padding alto e basso del pannello.
- **Raggi**: `--r-s` 12 (foto, card piccole), `--r-m` 16 (card, blocchi, foglio), pillola (pulsanti), cerchio (Contatti, segnalatore).
- **Linee**: `--bw` 2 px. `--line` per contorni, `--ink` per aprire una sezione.
- **Card**: *piena* (`--mist`, senza linea) se informa; *con contorno* (`--bw` `--line`, fondo bianco) se si apre o si clicca. Mai le due insieme. Nessuna ombra.
- **Movimento**: `--t-fast` .3 s (colori, dissolvenza, segnalatore); `--t-slow` .6 s con curva (.7, 0, .2, 1) (strisce, foglio). Tutto a zero con `prefers-reduced-motion`.
- **Punti di rottura**: 1100 px (accordion), 720 px (colonne dei contenuti), 560 px di altezza (flusso normale).
- **Altro**: solo tema chiaro; target ≥ 44 px.

## Dal mockup al sistema

Il mockup è uno schizzo con valori sparsi. Si accettano piccole differenze (pochi pixel o una sfumatura): 11–13 px → 14; 15 → 14 o 16; 17–19 → 16 o 20; 22 → 20; 26–32 → 28; 34–44 → h2; 56 → h2; spazi 6/10/12/20/40/80 → 8/16/24/32/48/64; raggi 10/14/22/24 → 12/16; pesi 500/700 → 600/800; il grigio `#2c3550` → `--ink`; `#c9d0e2`, `#dfe5f3`, `#d3dbf0`, `#0b2157` → ricavati o `--line`. Differenza voluta: focus inchiostro su fondo chiaro, arancio sulle strisce.
