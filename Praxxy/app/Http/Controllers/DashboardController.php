<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\User;
use App\Models\Video;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        try {
            // Basic counts
            $productsCount = Product::count();
            $usersCount = User::count();
            $videosCount = Video::count();
            $visitorsCount = DB::table('sessions')->count();

            // Get last 7 days statistics
            $last7Days = collect(range(6, 0))->map(function ($days) {
                return Carbon::now()->subDays($days)->format('Y-m-d');
            });

            // Daily statistics for the last 7 days
            $dailyStats = $last7Days->map(function ($date) {
                $startOfDay = Carbon::parse($date)->startOfDay();
                $endOfDay = Carbon::parse($date)->endOfDay();

                return [
                    'date' => $date,
                    'products' => Product::whereBetween('created_at', [$startOfDay, $endOfDay])->count(),
                    'videos' => Video::whereBetween('created_at', [$startOfDay, $endOfDay])->count(),
                    'users' => User::whereBetween('created_at', [$startOfDay, $endOfDay])->count(),
                    'visitors' => DB::table('sessions')
                        ->whereBetween('last_activity', [$startOfDay->timestamp, $endOfDay->timestamp])
                        ->count(),
                ];
            });

            // Format data for charts
            $chartData = [
                'dates' => $dailyStats->pluck('date')->values(),
                'products' => $dailyStats->pluck('products')->values(),
                'videos' => $dailyStats->pluck('videos')->values(),
                'users' => $dailyStats->pluck('users')->values(),
                'visitors' => $dailyStats->pluck('visitors')->values(),
            ];

            // Sample visitor locations data (in production, this would come from your database)
            // You would typically store this in your sessions table or a separate visitor_locations table
            $visitorLocations = [
                ['lat' => 14.5995, 'lng' => 120.9842, 'count' => 150, 'city' => 'Manila'],
                ['lat' => 10.3157, 'lng' => 123.8854, 'count' => 80, 'city' => 'Cebu'],
                ['lat' => 7.0707, 'lng' => 125.6087, 'count' => 60, 'city' => 'Davao'],
                ['lat' => 16.4023, 'lng' => 120.5960, 'count' => 40, 'city' => 'Baguio'],
                ['lat' => 13.1391, 'lng' => 123.7437, 'count' => 30, 'city' => 'Legazpi'],
            ];

            $stats = [
                'products_count' => $productsCount,
                'users_count' => $usersCount,
                'videos_count' => $videosCount,
                'unique_visitors' => $visitorsCount,
                'chart_data' => $chartData,
                'visitor_locations' => $visitorLocations,
            ];

        } catch (\Exception $e) {
            \Log::error('Dashboard Error: ' . $e->getMessage());
            
            $stats = [
                'products_count' => 0,
                'users_count' => 0,
                'videos_count' => 0,
                'unique_visitors' => 0,
                'chart_data' => [
                    'dates' => [],
                    'products' => [],
                    'videos' => [],
                    'users' => [],
                    'visitors' => [],
                ],
                'visitor_locations' => [],
            ];
        }

        return Inertia::render('Dashboard', compact('stats'));
    }
}
