<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PokemonController extends Controller
{
    public function index(Request $request) {
        $page = $request->query('page', 1);
        $limit = $request->query('limit', 10);
        $offset = ($page - 1) * $limit;


        return response()->json([
            'page' => $page,
            'limit' => $limit,
            'offset' => $offset
        ]);
    }
}
