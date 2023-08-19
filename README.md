# Pola Web

Celem tego projektu jest zbudowanie interfejsu Web w technologii React dla aplikacji [Pola. Zabierz ją na zakupy](https://www.pola-app.pl/). W tym celu ściśle współpracuje z [pola-backend](https://github.com/KlubJagiellonski/pola-backend).

Masz dość masówki globalnych koncernów? Szukasz lokalnych firm tworzących unikatowe produkty? Pola pomoże Ci odnaleźć polskie wyroby. Zabierając Polę na zakupy, odnajdujesz produkty „z duszą” i wspierasz polską gospodarkę.

Zeskanuj kod kreskowy z dowolnego produktu i dowiedz się więcej o firmie, która go wyprodukowała. Pola powie Ci, czy dany producent opiera się na polskim kapitale, ma u nas swoją produkcję, tworzy wykwalifikowane miejsca pracy, jest częścią zagranicznego koncernu.

Ten projekt został rozpoczęty wykorzystując starter [https://evaluates2.github.io/Gatsby-Starter-TypeScript-Redux-TDD-BDD](https://evaluates2.github.io/Gatsby-Starter-TypeScript-Redux-TDD-BDD).

Podgląd wersji deweloperskiej: [https://pola-staging.herokuapp.com/](https://pola-staging.herokuapp.com/)

# Packages

We actually use Gatsby version 4 what requires usage of Gatsby plugins in proper versions too

Migration:
https://www.gatsbyjs.com/docs/reference/release-notes/migrating-from-v2-to-v3/
https://www.gatsbyjs.com/docs/reference/release-notes/migrating-from-v3-to-v4/

to check obsolate packages (in particular Gatsby plugins)

```
npm outdated
```

## Dostępne skrypty

W katalogu projektu możesz uruchomić:

### `npm start`

Uruchamia aplikację w trybie programistycznym.
Odtwórz [http://localhost:8000](http://localhost:8000) aby wyświetlić go w przeglądarce.

Strona zostanie załadowana ponownie, jeśli wprowadzisz zmiany.
W konsoli zostaną również wyświetlone wszelkie błędy analizy statycznej (ang. lint).

Otwórz [http://localhost:8000/\_\_\_graphql](http://localhost:8000/___graphql) aby testować bazę danych aplikacji (artykuły, grafiki, faq)

### `npm run test`

Uruchamia test runner w interaktywnym trybie obserwującym zmiany.

When testing React components you need to import React

Jest

```typescript
import React from 'react';
```

React Testing Library

get

query

find

### `npm run build`

Kompiluje aplikację do produkcji do folderu `build`.
Prawidłowo buduje aplikacje Reacta w trybie produkcyjnym i optymalizuje ją pod kątem najlepszej wydajności.

Run linting (calls both prettier linting and tslint)

```
npm run lint
```

# Deploy

Deployments go through Github actions process and Github pages. All pushes to **prod** branch are automatically deployed. Pola API is hosted on Heroku cloud infrastructure.

```
git checkout prod
git merge master
git commit -m "merge master to production ver. X.Y.Z"
git push
```
