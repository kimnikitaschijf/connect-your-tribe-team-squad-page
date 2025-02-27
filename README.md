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

Wanneer de gebruiker met de muis over een cirkel hovert, stopt deze met bewegen. Bij een klik opent de cirkel groter, waarna de gebruiker de naam van de student ziet, een link naar diens GitHub profiel, en een like button. Met de like buttonb kan de gebruiker een like geven aan die student.

Bovenaan de pagina is er een knop die de animatie stopt. Zodra deze knop wordt ingedrukt, komen alle cirkels in kolommen naast elkaar te staan, zodat ze niet meer bewegen.

Daarna zijn er acht filters beschikbaar: avatar (standaard aan wanneer de pagina wordt geladen), dier, emoji, eten, hobby, kleur, land en verjaardag.
Wanneer op een filter wordt geklikt, verandert de profielfoto naar het bijbehorende filtertype. Bijvoorbeeld, bij het dier-filter komt er een emoji van dat dier in de cirkel. Bij eten verschijnt de emoji van het favoriete gerecht, bij land komt de vlag-emoji van dat land tevoorschijn, en zo verder voor de andere filters.

En als laatste hebben we een knop die de gebruiker naar de chat pagina brengt, Wanneer de gebruiker op de "chat met onze squad!" button klikt, wordt de gebruiker doorgestuurd naar de chatpagina. Op deze pagina heeft de gebruiker de mogelijkheid om berichten achter te laten. deze berichten worden in een database opgeslagen

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
# Ties kian jij dit controleren en aanvullen als het nodig is.


## Installatie
<!-- Bij Installatie staat stap-voor-stap beschreven hoe je de development omgeving moet inrichten om aan de repository te kunnen werken. -->

## Gebruik

## Bronnen
[stop animatie bij een hover](https://stackoverflow.com/questions/75906720/how-to-make-css-animation-slows-down-to-stop-on-hover-and-continue-moving-infin)

[random number generator](https://www.w3schools.com/js/js_random.asp)
## Licentie

This project is licensed under the terms of the [MIT license](./LICENSE).
