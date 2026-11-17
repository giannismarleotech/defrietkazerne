# De Frietkazerne

Website voor traiteur, frietmobiel en de vaste frituur. De website staat in `dist/` en heeft geen bouwstap nodig.

## Cloudflare Workers

Koppel deze repository in Workers & Pages. Gebruik `main` als productiebranch, laat het buildcommando leeg en gebruik `npx wrangler deploy` als deploycommando. De Worker-naam moet `de-frietkazerne` zijn, gelijk aan `wrangler.jsonc`.

## Inhoud

- `dist/index.html`: homepage met automatische canvasanimatie.
- `dist/traiteur.html`: traiteurassortiment.
- `dist/frietmobiel.html`: mobiele frietformules.
- `dist/frituur.html`: frituurmenu met zoeken en categorieën.
- `dist/contact.html`: contactgegevens en lokaal aanvraagoverzicht; geen verzending.
- `dist/voorwaarden.html`, `privacy.html`, `cookies.html`: informatiepagina’s.
- `dist/assets/`: logo, afbeeldingen en animatie-assets. De oorspronkelijke PDF-folders zijn nog niet opgenomen; daarvoor is afzonderlijk akkoord nodig.

Frituurprijzen zijn een momentopname van Unipage op 17 november 2026. Reviews zijn een selectie met bronvermelding en worden niet automatisch bijgewerkt. Openingsuren volgen de aangeleverde folder; deze wijken af van de uren op Unipage.

Het bedrijfs-e-mailadres en ondernemingsnummer zijn niet door de opdrachtgever aangeleverd. Voeg die toe zodra bevestigd.
