# Dokumentacija Projekta

## Pregled

Ovaj projekat je web aplikacija za online prodavnicu koja omogućava korisnicima pregled proizvoda, dodavanje proizvoda u korpu, kreiranje narudžbi, ostavljanje recenzija i upravljanje korisničkim profilom. Projekat je podijeljen na frontend i backend dio.

## Struktura Projekta

```
.gitignore
frontend/
	.gitignore
	eslint.config.js
	index.html
	package.json
	public/
	README.md
	src/
		.env
		App.css
		App.tsx
		assets/
		context/
		fireBase.ts
		fireBaseStorage.ts
		index.css
		komponente/
		main.tsx
		servisi/
		stranice/
		vite-env.d.ts
	tsconfig.app.json
	tsconfig.json
	tsconfig.node.json
	vite.config.ts
README.md
server/
	.env
	kontroleri/
		adrese.js
		autentifikacija.js
		korisnici.js
		narudzbe.js
		proizvodi.js
		recenzije.js
	modeli/
		Adresa.js
		Korisnik.js
		Korpa.js
		Narudzba.js
		Proizvod.js
		Recenzija.js
	package.json
	sequelizeInstance.js
	server.js
	skipVerifikacijaTokena.js
	verifikacijaTokena.js
```

## Frontend

Frontend aplikacija je izgrađena koristeći React i TypeScript, te koristi Vite za razvoj i build.

### Glavne Komponente

- **App.tsx**: Glavna komponenta aplikacije koja definira rute.
- **Header.tsx** i **Footer.tsx**: Komponente za zaglavlje i podnožje stranice.
- **ListaProizvoda.tsx**: Komponenta za prikaz liste proizvoda.
- **Adresa.tsx**: Komponenta za prikaz i upravljanje adresama korisnika.

### Stranice

- **Home.tsx**: Početna stranica sa filtrima i listom proizvoda.
- **Kontakt.tsx**: Kontakt stranica sa formom za slanje poruka.
- **Login.tsx**: Stranica za prijavu korisnika.
- **Register.tsx**: Stranica za registraciju korisnika.
- **Dashboard.tsx**: Administracijska stranica za upravljanje korisnicima, proizvodima, narudžbama, recenzijama i adresama.
- **Narudzba.tsx**: Stranica za pregled i potvrdu narudžbe.
- **NovaAdresa.tsx**: Stranica za kreiranje ili ažuriranje adrese.
- **NovaRecenzija.tsx**: Stranica za kreiranje ili ažuriranje recenzije.
- **NoviProizvod.tsx**: Stranica za kreiranje ili ažuriranje proizvoda.
- **PregledNarudzbe.tsx**: Stranica za pregled detalja narudžbe.
- **Proizvod.tsx**: Stranica za prikaz detalja o proizvodu i recenzijama.
- **Profil.tsx**: Stranica za prikaz korisničkog profila, recenzija i narudžbi.
- **UpdateKorisnik.tsx**: Stranica za ažuriranje korisničkog profila.
- **UpdateNarudzbe.tsx**: Stranica za ažuriranje narudžbe.
- **Korpa.tsx**: Stranica za prikaz korpe korisnika.
- **Recenzija.tsx**: Stranica za prikaz detalja recenzije.

### CSS Datoteke

- **App.css**: Globalni stilovi aplikacije.
- **Home.css**: Stilovi za početnu stranicu.
- **Kontakt.css**: Stilovi za kontakt stranicu.
- **Login.css**: Stilovi za stranicu za prijavu.
- **Dashboard.css**: Stilovi za administracijsku stranicu.
- **Narudzba.css**: Stilovi za stranicu narudžbi.
- **NovaAdresa.css**: Stilovi za stranicu za kreiranje ili ažuriranje adrese.
- **NovaRecenzija.css**: Stilovi za stranicu za kreiranje ili ažuriranje recenzije.
- **NoviProizvod.css**: Stilovi za stranicu za kreiranje ili ažuriranje proizvoda.
- **PregledNarudzbe.css**: Stilovi za stranicu za pregled narudžbe.
- **Proizvod.css**: Stilovi za stranicu proizvoda.
- **Profil.css**: Stilovi za stranicu korisničkog profila.
- **UpdateKorisnika.css**: Stilovi za stranicu za ažuriranje korisničkog profila.
- **UpdateNarudzbe.css**: Stilovi za stranicu za ažuriranje narudžbe.
- **ListaProizvoda.css**: Stilovi za komponentu liste proizvoda.
- **Korpa.css**: Stilovi za stranicu korpe.
- **Recenzija.css**: Stilovi za stranicu rezencije.

### Konfiguracija

- **vite.config.ts**: Konfiguracija za Vite.
- **tsconfig.json**: Konfiguracija za TypeScript.

## Backend

Backend aplikacija je izgrađena koristeći Express.js i Sequelize ORM za rad s MySQL bazom podataka.

### Glavne Datoteke

- **server.js**: Glavna datoteka servera koja pokreće aplikaciju.
- **sequelizeInstance.js**: Konfiguracija za povezivanje s bazom podataka.
- **verifikacijaTokena.js**: Middleware za verifikaciju JWT tokena.
- **skipVerifikacijaTokena.js**: Middleware za preskakanje verifikacije tokena.

### Kontroleri

- **adrese.js**: Rute za upravljanje adresama.
- **autentifikacija.js**: Rute za registraciju i prijavu korisnika.
- **korisnici.js**: Rute za upravljanje korisnicima.
- **narudzbe.js**: Rute za upravljanje narudžbama.
- **proizvodi.js**: Rute za upravljanje proizvodima.
- **recenzije.js**: Rute za upravljanje recenzijama.

### Modeli

- **Adresa.js**: Model za adresu.
- **Korisnik.js**: Model za korisnika.
- **Korpa.js**: Model za korpu.
- **Narudzba.js**: Model za narudžbu.
- **Proizvod.js**: Model za proizvod.
- **Recenzija.js**: Model za recenziju.

## Pokretanje Projekta

### Frontend

1. Navigirajte do direktorija `frontend`.
2. Instalirajte zavisnosti:
    ```sh
    npm install
    ```
3. Pokrenite razvojni server:
    ```sh
    npm run dev
    ```

### Backend

1. Navigirajte do direktorija `server`.
2. Instalirajte zavisnosti:
    ```sh
    npm install
    ```
3. Pokrenite server:
    ```sh
    nodemon server.js
    ```

## API Dokumentacija

### Korisnici

- **POST /server/autentifikacija/registracija**: Registracija novog korisnika.
- **POST /server/autentifikacija/login**: Prijava korisnika.
- **GET /server/korisnici**: Dohvati sve korisnike (samo admin).
- **GET /server/korisnik/:id**: Dohvati korisnika po ID-u.
- **PUT /server/korisnik/:id**: Ažuriraj korisnika.
- **DELETE /server/korisnik/:id**: Obriši korisnika.

### Proizvodi

- **POST /server/proizvodi**: Kreiraj novi proizvod (samo admin).
- **GET /server/proizvodi**: Dohvati sve proizvode.
- **GET /server/proizvodi/:id**: Dohvati proizvod po ID-u.
- **PUT /server/proizvodi/:id**: Ažuriraj proizvod (samo admin).
- **DELETE /server/proizvodi/:id**: Obriši proizvod (samo admin).

### Narudžbe

- **POST /server/narudzbe**: Kreiraj novu narudžbu.
- **GET /server/narudzbe**: Dohvati sve narudžbe.
- **GET /server/narudzbe/:id**: Dohvati narudžbu po ID-u.
- **PUT /server/narudzbe/:id**: Ažuriraj narudžbu.
- **DELETE /server/narudzbe/:id**: Obriši narudžbu.

### Recenzije

- **POST /server/recenzije**: Kreiraj novu recenziju.
- **GET /server/recenzije**: Dohvati sve recenzije.
- **GET /server/recenzije/:id**: Dohvati recenziju po ID-u.
- **PUT /server/recenzije/:id**: Ažuriraj recenziju.
- **DELETE /server/recenzije/:id**: Obriši recenziju.

### Adrese

- **POST /server/adrese**: Kreiraj novu adresu.
- **GET /server/adrese**: Dohvati sve adrese.
- **GET /server/adrese/:id**: Dohvati adresu po ID-u.
- **PUT /server/adrese/:id**: Ažuriraj adresu.
- **DELETE /server/adrese/:id**: Obriši adresu.

## Zaključak

Ova dokumentacija pruža pregled strukture i funkcionalnosti projekta, kao i upute za pokretanje i korištenje API-ja. Za dodatne informacije, molimo pregledajte izvorni kod i komentare unutar datoteka.