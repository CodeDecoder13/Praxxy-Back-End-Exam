<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Video;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class SidebarAdminController extends Controller
{
    public function ProductManagement() 
    {
        return Inertia::render('sidebar/product-management');
    }

    public function UserManagement()
    {
        $users = User::select('id', 'name', 'email', 'created_at')
            ->latest()
            ->paginate(10);

        return Inertia::render('sidebar/user-management', [
            'users' => $users
        ]);
    }

    public function VideoManagement()
    {
        $videos = Video::latest()->get()->map(function ($video) {
            return [
                'id' => $video->id,
                'title' => $video->title,
                'description' => $video->description,
                'url' => $video->url,
                'thumbnail' => $video->thumbnail,
                'created_at' => $video->created_at
            ];
        });
        
        Log::info('Fetched videos:', ['count' => $videos->count(), 'videos' => $videos->toArray()]);

        return Inertia::render('sidebar/video-management', [
            'videos' => $videos,
            'flash' => [
                'success' => session('success'),
                'error' => session('error')
            ]
        ]);
    }
}
