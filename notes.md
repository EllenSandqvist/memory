JavaScript - Memory
* Använder dig av DOM:en för att interagera med HTML/CSS.

* Använd dig av lämpliga JavaScript-funktioner som createBoard(), clickCard(), etc

* setTimeout() för att lägga till en timer för hur lång tid man har på sig

* Skapa en array med emojis som kortens värden, 16 emojis och 8 par
* Behövs en array med card1, card2 osv...?

* Skapa 16 divs i HTML och namge de enligt följande card1, card2, card3...

* forEach för att loopa igenom emoji-arrayen och tilldela varje emoji till ett card.
* Hur undviker man att samma card blir slumpat igen? 

* Vända korten mha samma kod som jag har i cv:et

* Se till så att man inte kan trycka igen på samma kort

Spelregler
En spelare flippar ett kort och memorerar värdet. Samma spelare flippar ett nytt kort. Om de båda korten har lika värde erhåller spelaren paret - eller en viss poäng. Om de båda flippade korten inte är lika, vänds korten tillbaka och nästa spelare får försöka på nytt.

Du är fri att välja spelregler för "winning-state". Om du utgår från en istället för två spelare kan exempelivs en timer (setTimeout()) ange sluttiden och vid den tidpunkten ange hur många par som nåddes. Om du utgår från två spelare kan slutstadiet vara när alla kort är matchade och vilken spelare som uppnådde flest.

