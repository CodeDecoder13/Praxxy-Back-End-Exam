<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SidebarAdminController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth'])->group(function () {
    Route::get('/product-management', [SidebarAdminController::class, 'ProductManagement'])->name('sidebar.product-management');
    Route::get('/video-management', [SidebarAdminController::class, 'VideoManagement'])->name('sidebar.video-management');
    Route::get('/user-management', [SidebarAdminController::class, 'UserManagement'])->name('sidebar.user-management');
    
});