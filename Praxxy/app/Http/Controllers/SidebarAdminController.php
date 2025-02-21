<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Video;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;

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
        return Inertia::render('sidebar/video-management', [
            'videos' => Video::latest()->get(),
            'flash' => [
                'success' => session('success'),
                'error' => session('error')
            ]
        ]);
    }
}
