<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class PokemonController extends Controller
{
    public function index(Request $request) {
        $page = $request->query('page', 1);
        $limit = $request->query('limit', 12);
        $search = strtolower(trim($request->query('search', '')));
        $offset = ($page - 1) * $limit;

        $response = Http::get('https://pokeapi.co/api/v2/pokemon', [
            'limit' => $search ? 2000 : $limit,
            'offset' => $search ? 0 : $offset
        ]);

        if ($response->failed()) {
            return response()->json([
                'message' => 'Failed to fetch API'
            ], 500);
        }

        $data = $response->json();
        $pokemonList = $data['results'];

        if ($search) {
            $pokemonList = array_values(array_filter($pokemonList, function ($item) use ($search) {
                return str_contains($item['name'], $search);
            }));

            $pokemonList = array_slice($pokemonList, $offset, $limit); // extract the search result, without modifiying the original data
        }

        $results = [];

        foreach($pokemonList as $item) {
            $getDetails = Http::get($item['url']);

            if ($getDetails->failed()) {
                return response()->json([
                    'message' => 'Failed to get Pokemon details'
                ], 500);
            }

            $details = $getDetails->json();

            $types = [];

            foreach($details['types'] as $type) {
                $types[] = $type['type']['name'];
            }

            $results[] = [
                'name' => $details['name'],
                'image' => $details['sprites']['other']['official-artwork']['front_default'],
                'types' => $types,
                'height' => $details['height'],
                'weight' => $details['weight'],
            ];
        }

        return $results;
    }

    
}
