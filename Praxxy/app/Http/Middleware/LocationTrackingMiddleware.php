<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Session;

class LocationTrackingMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->has(['latitude', 'longitude'])) {
            Session::put('location_latitude', $request->latitude);
            Session::put('location_longitude', $request->longitude);
            Session::put('location_last_updated', now());
        }

        return $next($request);
    }
}
