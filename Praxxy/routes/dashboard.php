<?php

use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;   
use Inertia\Inertia;

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
});