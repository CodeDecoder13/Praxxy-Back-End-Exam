<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Video;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SidebarAdminController extends Controller
{
    public function ProductManagement() 
    {
        return Inertia::render('sidebar/product-management');
    }

    public function UserManagement()
    {
        return Inertia::render('sidebar/user-management');
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
