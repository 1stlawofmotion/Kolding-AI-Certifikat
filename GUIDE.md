# Guide: Tilpas AI-kørekortet til Kolding Kommune

Alt, du normalt vil ændre, ligger i **`js/config.js`**. Åbn filen i en teksteditor (fx Notepad, VS Code) og gem – opdatér derefter siden i browseren.

## 1. Ændr farver
I `js/config.js` under `farver`:
| Nøgle | Bruges til |
|---|---|
| `primaer` | Header, knapper, certifikatramme |
| `accent` | Fremdriftsbjælke, "Gennemført"-mærke, certifikatets indre ramme |
| `baggrund` | Sidens baggrund |
| `tekst` | Tekstfarve |
| `kort` | Baggrund på kapitelkort |

Brug hex-koder (fx `#0b5c8e` for blå). Find koder på htmlcolorcodes.com. Tjek at tekst og baggrund har god kontrast (tilgængelighed).

## 2. Ændr tekster
- **Sidetitel, undertitel, footer, certifikattekst:** øverst i `config.js`.
- **Kapitler:** under `kapitler`. Hvert kapitel har `titel`, `intro`, `punkter` (liste) og `refleksion` (spørgsmål).
- **Tilføj kapitel:** kopiér ét `{ ... },`-blok og indsæt det. Siden tæller automatisk kapitlerne.
- **Fjern kapitel:** slet blokken. Husk at kommaerne skal passe.
- Brug almindelige anførselstegn `"` rundt om tekst. Vil du bruge `"` i teksten, skriv `\"`.

## 3. Skift logo
Læg logoet i `assets/` (fx `assets/kolding-logo.png`).
- **Header:** i `index.html`, `kapitel.html` og `certifikat.html`, erstat `<strong><a ... data-site="kommune"></a></strong>` med `<img src="assets/kolding-logo.png" alt="Kolding Kommune" height="40">`.
- **Certifikat:** i `js/app.js`, find linjen med `S.logoTekst`. Indlæs et billede med `const img=new Image();img.src="assets/kolding-logo.png";img.onload=draw;` og tegn det med `c.drawImage(img,W/2-100,70,200,70)` i stedet for teksten.
Brug kun logoer, du har ret til at bruge – følg kommunens designmanual.

## 4. Skift skrifttype, størrelser og layout
Alt i **`css/style.css`**:
- Skrifttype: linjen `font-family` under `body`.
- Afrunding: `--radius` øverst.
- Bredde på indholdet: `.wrap { max-width: 860px }`.
- Knapper: `.knap`.

## 5. Certifikatet
Teksterne tegnes i `js/app.js` (se `c.fillText(...)`). Ret tekst, skriftstørrelse (`c.font`) og placering (tallene til sidst er x/y). Størrelse: `width="1200" height="850"` i `certifikat.html`.

## 6. Test lokalt
```
python3 -m http.server 8000
```
Åbn `http://localhost:8000/`. Fremdrift gemmes i browseren (`localStorage`). Vil du nulstille: ryd websteddata, eller kør `localStorage.clear()` i browserens konsol.

## 7. Udgiv på GitHub Pages
1. Opret et repository og upload alle filer.
2. Settings → Pages → Branch `main`, mappe `/ (root)`.
3. Siden er live på adressen GitHub viser.

## 8. Vigtigt
- Kapiteltekster er korte udkast. Skriv eller godkend det endelige indhold i samarbejde med Kolding Kommunes læringsfolk.
- Tjek kommunens retningslinjer for AI og GDPR, så kapitel 5 matcher de godkendte værktøjer.
