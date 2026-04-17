<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class PokemonController extends Controller
{
    public function index(Request $request) {
        $page = $request->query('page', 1);
        $limit = $request->query('limit', 10);
        $offset = ($page - 1) * $limit;

        $response = Http::get('https://pokeapi.co/api/v2/pokemon', [
            'limit' => $limit,
            'offset' => $offset
        ]);

        if ($response->failed()) {
            return response()->json([
                'message' => 'Failed to fetch API'
            ], 500);
        }

        $data = $response->json();

        $results = [];

        foreach($data['results'] as $item) {
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
