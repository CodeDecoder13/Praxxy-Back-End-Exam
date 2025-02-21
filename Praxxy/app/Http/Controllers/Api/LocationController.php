<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class LocationController extends Controller
{
    public function update(Request $request)
    {
        $validated = $request->validate([
            'latitude' => 'required|numeric|between:-90,90',
            'longitude' => 'required|numeric|between:-180,180',
        ]);

        Session::put('location_latitude', $validated['latitude']);
        Session::put('location_longitude', $validated['longitude']);
        Session::put('location_last_updated', now());

        return response()->json([
            'message' => 'Location updated successfully',
            'data' => [
                'latitude' => $validated['latitude'],
                'longitude' => $validated['longitude'],
                'updated_at' => now(),
            ]
        ]);
    }

    public function get()
    {
        return response()->json([
            'latitude' => Session::get('location_latitude'),
            'longitude' => Session::get('location_longitude'),
            'last_updated' => Session::get('location_last_updated'),
        ]);
    }
}
