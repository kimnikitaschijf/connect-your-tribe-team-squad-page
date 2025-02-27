# Squad Page
Ontwerp en maak samen met je team een website met NodeJS, Express, JSON en Liquid

De instructie vind je in: [INSTRUCTIONS](https://github.com/fdnd-task/connect-your-tribe-squad-page/blob/main/docs/INSTRUCTIONS.md)

## Inhoudsopgave Squad page

  * [Beschrijving](#beschrijving)
  * [Kenmerken](#kenmerken)
  * [Installatie](#installatie)
  * [Gebruik](#gebruik)
  * [Bronnen](#bronnen)
  * [Licentie](#licentie)

## Beschrijving
<!-- In de Beschrijving staat hoe je project er uit ziet, hoe het werkt en wat je er mee kan. -->
<!-- Voeg een mooie poster visual toe 📸 -->
<!-- Voeg een link toe naar Github Pages 🌐-->

Op de pagina ziet de gebruiker als eerste bewegende cirkels met de GitHub profiel foto's van studenten. Bij elke refresh van de pagina krijgen de cirkels een andere richting.


https://github.com/user-attachments/assets/489a52ea-7d1a-4252-aa58-51c84eaaefea



Wanneer de gebruiker met de muis over een cirkel hovert, stopt deze met bewegen. Bij een klik opent de cirkel groter, waarna de gebruiker de naam van de student ziet, een link naar diens GitHub profiel, en een like button. Met de like buttonb kan de gebruiker een like geven aan die student.


https://github.com/user-attachments/assets/a7e56994-33a2-4385-9293-2fc2ea592f27


Bovenaan de pagina is er een knop die de animatie stopt. Zodra deze knop wordt ingedrukt, komen alle cirkels in kolommen naast elkaar te staan, zodat ze niet meer bewegen.

Daarna zijn er acht filters beschikbaar: avatar (standaard aan wanneer de pagina wordt geladen), dier, emoji, eten, hobby, kleur, land en verjaardag.
Wanneer op een filter wordt geklikt, verandert de profielfoto naar het bijbehorende filtertype. Bijvoorbeeld, bij het dier-filter komt er een emoji van dat dier in de cirkel. Bij eten verschijnt de emoji van het favoriete gerecht, bij land komt de vlag-emoji van dat land tevoorschijn, en zo verder voor de andere filters.

En als laatste hebben we een knop die de gebruiker naar de chat pagina brengt, Wanneer de gebruiker op de "chat met onze squad!" button klikt, wordt de gebruiker doorgestuurd naar de chatpagina. Op deze pagina heeft de gebruiker de mogelijkheid om berichten achter te laten. deze berichten worden in een database opgeslagen
![team_sp_header](https://github.com/user-attachments/assets/0b52ded7-c36b-4697-b58c-31a654350136)

## Kenmerken
<!-- Bij Kenmerken staat welke technieken zijn gebruikt en hoe. Wat is de HTML structuur? Wat zijn de belangrijkste dingen in CSS? Wat is er met Javascript gedaan en hoe? Misschien heb je een framwork of library gebruikt? -->

### checkbox en label voor achtergrond tint
We hebben een checkbox en een label over alle cirkels. Wanneer er op een cirkel wordt geklikt, wordt met de checked eigenschap gecontroleerd of de checkbox is aangeklikt. Als dit het geval is, krijgt de div met de klasse tinted-background, die eerst op display: none stond, de waarde display: block, waardoor de hele pagina een tint krijgt.
Om het kaartje weer te sluiten, kan de gebruiker opnieuw op het profielkaartje klikken.

Daarnaast krijgt de geklikte cirkel een hogere z-index dan de div, zodat deze goed zichtbaar blijft boven de overlay.

Dit is opgezet om de aandacht naar de geklikte cirkel te trekken en ervoor te zorgen dat er niet op meerdere cirkels tegelijk geklikt kan worden, waardoor het voorkomt dat er meerdere cirkels tegelijkertijd openstaan.

### stop animatie button
We hebben daarna een knop om de animatie te stoppen. Dit wordt gedaan met een eventlistener op de knop. Wanneer er op de knop wordt geklikt, krijgen alle cirkels de class static, wat de animatie stopt. Vervolgens krijgt de container van de cirkels de class static-main, waardoor de cirkels in kolommen naast elkaar worden geplaatst.

### de cirkels
De profielafbeelding wordt ingeladen vanuit de database, waarbij de GitHub-handle uit Whois wordt gehaald en de rest van de URL zelf wordt toegevoegd.

Bij een klik wordt JavaScript gebruikt om de class open toe te voegen aan de cirkel. Deze class verandert de cirkel in een rechthoek en zorgt ervoor dat de like-button en de GitHub-link, die eerst op display: none stonden, op display: block worden gezet.
Wanneer er op het profielkaartje weer geklikt wordt, sluit het weer door de open class weg te haalen met javascript.


### Cirkel animatie
Elke cirkel heeft twee keyframes: een voor de horizontale beweging en een voor de verticale beweging. JavaScript genereert random getallen die bepalen hoe snel en in welke richting de cirkels bewegen.
Bijvoorbeeld, als de cirkel 800ms heeft om naar de rechterkant van de pagina te bewegen, maar slechts 400ms om naar beneden te gaan, zal de cirkel diagonaal naar beneden bewegen.
Wanneer de cirkel de rand van het scherm bereikt, gaat hij weer terug naar de positie vanwaar hij kwam, omdat alternate is aangegeven in de animatie op de cirkels.

#### Random number voor cirkel animatie
JavaScript wordt gebruikt om drie random getallen tussen 0 en 100 te genereren. Twee van deze getallen worden gebruikt in de keyframes om de snelheid van de animatie te bepalen. Het derde getal wordt gebruikt om elke cirkel een andere z-index te geven. Hierdoor krijgen de cirkels steeds een andere volgorde. deze 3 getallen worden als custom properties meegegeven aan de cirkels, waardoor elke cirkel in een andere richting zal bewegen, deze custom properties veranderen bij elke refresh van de pagina.

### Like button in de open cirkels
Wanneer er op de like-knop wordt geklikt, wordt de like-counter met 1 verhoogd.
# Akiko kan jij uitleggen hoe dit werkt

### Filters
Wanneer er op een filter wordt geklikt, verandert de profielfoto naar een emoji. Dit wordt gedaan met de variabele show in de server.js. Voor elke filter wordt er een nieuwe route gemaakt, en elke route heeft de bijbehorende waarde voor show (bijvoorbeeld, show = fav_animal voor het dierfilter, show = fav_gerecht voor het etenfilter, enz.).

In Liquid gebruiken we if-statements om te controleren welke waarde de show-variabele heeft. Als show = fav_animal is, veranderen de profielfoto's naar een emoji van dat dier.

De emoji wordt weergegeven met when-statements. Wanneer we bijvoorbeeld de naam van het favoriete dier uit de Whois-database krijgen, wordt er met een when-statement gecontroleerd of het dier "aap" is. Als dat het geval is, wordt de emoji van een aap getoond.

https://github.com/kimnikitaschijf/connect-your-tribe-team-squad-page/blob/11c59d872f3bf3c43b3d7793d65007d968aeada2/views/index.liquid#L60-L96

Zo ziet dit er nu uit: <br>

<img width="784" alt="Scherm­afbeelding 2025-02-27 om 11 16 41" src="https://github.com/user-attachments/assets/566a857a-8f03-478f-a283-5054fd889101" />

<br>
Dit wordt ook toegepast bij de andere filters: Land, hobby & eten. Bv land:
https://github.com/kimnikitaschijf/connect-your-tribe-team-squad-page/blob/11c59d872f3bf3c43b3d7793d65007d968aeada2/views/index.liquid#L38-L58

Als het kleur filter actief is wordt er een rondje van de kleur weergeven. Deze kleur wordt opgehaald uit de database. 

<img width="273" alt="Scherm­afbeelding 2025-02-27 om 11 18 13" src="https://github.com/user-attachments/assets/69461b21-30bc-49a0-9d80-4429b648eee8" />

<br>
Bij het verjaardag filter is de data uit de database omgezet naar de leeftijd. Ipv dat er bijvoorbeeld 2004-12-21 staat, wordt dit in de liquid omgezet naar de leeftijd in getallen. Deze past zich aan op de datum. Als iemand vandaag jarig is wordt de leeftijd automatisch aangepast. Ook wordt er op de verjaardag zelf een taart emoji toegevoegd bij de jarige persoon: <br>

<img width="251" alt="Scherm_afbeelding 2025-02-27 om 10 37 08" src="https://github.com/user-attachments/assets/2405ba0d-e3c3-4761-9ff6-1b0dc4a09dfd" />

### Chat pagina
Met een post route in server.js en een formulier met een submit button worden de berichten vanuit het formulier opgehaald en naar de database gestuurd. Wanneer de gebruiker het formulier invult en op de submit button klikt, wordt het bericht naar de server gestuurd via de post route. Wanneer de pagina opnieuw wordt geladen of door iemand anders wordt bezocht, worden de voorgaande berichten opgehaald uit de database en weergegeven op de chat pagina.

https://github.com/kimnikitaschijf/connect-your-tribe-team-squad-page/blob/11c59d872f3bf3c43b3d7793d65007d968aeada2/server.js#L102-L105
Dit zorgt ervoor dat na de 'naam' van de persoon dubbele puntjes komen zodat er een scheiding wordt gemaakt tussen de 'naam' en het 'bericht' van de persoon.

https://github.com/kimnikitaschijf/connect-your-tribe-team-squad-page/blob/11c59d872f3bf3c43b3d7793d65007d968aeada2/views/ties.liquid#L7-L9
Dit zorgt ervoor dat de berichten die mensen sturen ook daadwerkelijk te zien zijn.

Daarnaast zorgt deze js ervoor dat het ook daadwerkelijk functioneerd.
https://github.com/kimnikitaschijf/connect-your-tribe-team-squad-page/blob/680e1bf23e5beb5bd61d4d3eddcd94b5c84cbcb4/server.js#L96-L108

https://github.com/kimnikitaschijf/connect-your-tribe-team-squad-page/blob/680e1bf23e5beb5bd61d4d3eddcd94b5c84cbcb4/server.js#L96-L108
Er word eerst een POST request gedaan op de route /chatten, daar komt de data ook binnen als iemand een 'formulier' verzend.
https://github.com/kimnikitaschijf/connect-your-tribe-team-squad-page/blob/680e1bf23e5beb5bd61d4d3eddcd94b5c84cbcb4/server.js#L99-L100
Hier worden de gegevens die de persoon heeft ingevuld in het 'formulier' uit request.body gehaald.
https://github.com/kimnikitaschijf/connect-your-tribe-team-squad-page/blob/680e1bf23e5beb5bd61d4d3eddcd94b5c84cbcb4/server.js#L102
Dit controlleerd of alle 2 de velden zijn ingevuld, zo niet word het 'formulier' ook niet opgeslagen.
https://github.com/kimnikitaschijf/connect-your-tribe-team-squad-page/blob/680e1bf23e5beb5bd61d4d3eddcd94b5c84cbcb4/server.js#L103
Een string word gemaakt van het bericht bijvoorbeeld "Ties: Hoi"
https://github.com/kimnikitaschijf/connect-your-tribe-team-squad-page/blob/680e1bf23e5beb5bd61d4d3eddcd94b5c84cbcb4/server.js#L104
Na het verzenden wordt de gebruiker doorgestuurd naar /chatten. De pagina herlaad daardoor en nieuwe berichten worden geladen.
https://github.com/kimnikitaschijf/connect-your-tribe-team-squad-page/blob/680e1bf23e5beb5bd61d4d3eddcd94b5c84cbcb4/server.js#L107

### Responsive
Als de animatie van de cirkels aan is, blijven de cirkels binnen het scherm door gebruik te maken van dvh en dvw (dynamic viewport height en dynamic viewport width). De breedte van de cirkels is opgeslagen in een custom property.
In de keyframes wordt de translate gemaakt op 100dvw - de diameter van de cirkel (de custom property voor de breedte). Dit zorgt ervoor dat de cirkel naar het randje van het scherm beweegt. Voor de horizontale animatie wordt er een extra 5em van de berekende waarde afgetrokken, wat voorkomt dat de cirkels buiten het scherm gaan en er een horizontale scrollbar verschijnt.

Voor de verticale beweging wordt er 16em extra afgetrokken om te voorkomen dat er een verticale scrollbar verschijnt. Op kleinere schermen kan er wel een scrollbar verschijnen, omdat er anders niet genoeg ruimte is voor de filters bovenaan en de cirkels onderaan. Dit zorgt ervoor dat de cirkels altijd netjes binnen het zichtbare gebied blijven zonder dat ze uit het scherm vallen of ongewenste scrollbars veroorzaken, tenzij er echt niet genoeg ruimte is op kleinere schermen.

Als de animatie van de cirkels uit is, is de pagina responsief door gebruik te maken van een grid-layout die automatisch nieuwe kolommen toevoegt wanneer er genoeg ruimte is. Dit wordt gedaan met de repeat en minmax functies in CSS.

repeat zorgt ervoor dat het grid automatisch kolommen toevoegt en de breedte van de kolommen aanpast.
auto-fit zorgt ervoor dat de kolommen automatisch worden ingevuld op basis van de beschikbare ruimte.
minmax kijkt als er genoeg ruimte is voor een nieuwe kolom.
Dit zorgt ervoor dat het aantal kolommen zelf gemaakt worden afhankelijk van de schermgrootte, waardoor de layout flexibel is en zich goed aanpast aan verschillende schermformaten.


## Installatie
<!-- Bij Installatie staat stap-voor-stap beschreven hoe je de development omgeving moet inrichten om aan de repository te kunnen werken. -->

## Gebruik

## Bronnen
[stop animatie bij een hover](https://stackoverflow.com/questions/75906720/how-to-make-css-animation-slows-down-to-stop-on-hover-and-continue-moving-infin)

[random number generator](https://www.w3schools.com/js/js_random.asp)
## Licentie

This project is licensed under the terms of the [MIT license](./LICENSE).
