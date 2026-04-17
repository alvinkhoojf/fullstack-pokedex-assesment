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

        return response()->json([
            'message' => 'Pokemon fetched succesfully',
            'page' => $page,
            'limit' => $limit,
            'offset' => $offset,
            'data' => $data
        ]);
    }
}
