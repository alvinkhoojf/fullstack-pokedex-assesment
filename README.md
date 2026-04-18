# Fullstack Pokedex Assessment

A fullstack Pokedex app built with a Laravel backend and a Next.js frontend.

The backend exposes a Pokemon API that fetches data from [PokeAPI](https://pokeapi.co/). The frontend displays Pokemon cards, supports pagination with Load More, and searches Pokemon by name through the backend API.

## Tech Stack

- Backend: Laravel 12, PHP 8.2+
- Frontend: Next.js 16, React 19, Tailwind CSS
- External API: PokeAPI

## Project Structure

pokedex/
+-- backend/    # Laravel API
+-- frontend/   # Next.js app
+-- README.md

## Backend Setup

From the project root:

```bash
cd backend
composer install
```

Create the Laravel environment file:

```bash
cp .env.example .env
```

Generate the application key:

```bash
php artisan key:generate
```

Run the backend server:

```bash
php artisan serve
```

By default, the backend runs at:

```txt
http://127.0.0.1:8000
```

The frontend expects the API to be available at this address.

## Frontend Setup

Open a second terminal from the project root:

```bash
cd frontend
npm install
```

Run the frontend development server:

```bash
npm run dev
```

By default, the frontend runs at:

```txt
http://localhost:3000
```

Open this URL in your browser to use the app.

## API Documentation

### Get Pokemon List

Returns a paginated list of Pokemon. Each Pokemon includes its name, image, types, height, and weight.

```http
GET /api/pokemons
```

Full local URL:

```txt
http://127.0.0.1:8000/api/pokemons
```

### Query Parameters

| Parameter | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `page` | number | No | `1` | The page number to fetch. |
| `limit` | number | No | `10` | The number of Pokemon to return per page. |
| `search` | string | No | empty | Filters Pokemon by name using a partial, case-insensitive match. |

### Example Requests

Fetch the first page:

```http
GET /api/pokemons?page=1&limit=12
```

Fetch the second page:

```http
GET /api/pokemons?page=2&limit=12
```

Search by Pokemon name:

```http
GET /api/pokemons?page=1&limit=12&search=char
```

This can return Pokemon whose names contain `char`, such as `charmander`, `charmeleon`, and `charizard`.

### Example Response

```json
[
  {
    "name": "charmander",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
    "types": ["fire"],
    "height": 6,
    "weight": 85
  }
]
```

### Response Fields

| Field | Type | Description |
| --- | --- | --- |
| `name` | string | Pokemon name. |
| `image` | string | Official artwork image URL from PokeAPI. |
| `types` | string[] | Pokemon type names. |
| `height` | number | Pokemon height from PokeAPI. |
| `weight` | number | Pokemon weight from PokeAPI. |

### Error Responses

If the external PokeAPI request fails:

```json
{
  "message": "Failed to fetch API"
}
```

If fetching an individual Pokemon detail fails:

```json
{
  "message": "Failed to get Pokemon details"
}
```

Both error cases return HTTP status code `500`.

## Search Behavior

Normal browsing requests only fetch the requested page from PokeAPI.

Search requests work differently because PokeAPI does not provide a built-in partial name search endpoint. When `search` is provided, the backend fetches the broader Pokemon list, filters names on the backend, paginates the filtered results, and then loads details only for the Pokemon returned on that page.

For example:

```txt
search=char
```

matches Pokemon names containing `char`.
