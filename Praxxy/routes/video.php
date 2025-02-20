<?php

use App\Http\Controllers\VideoController;
use Illuminate\Support\Facades\Route;   
use Inertia\Inertia;

Route::middleware(['auth'])->group(function () {
    Route::get('/videos', [VideoController::class, 'index'])->name('videos.index');
    Route::post('/videos', [VideoController::class, 'store'])->name('videos.store');
    Route::put('/videos/{video}', [VideoController::class, 'update'])->name('videos.update');
    Route::delete('/videos/{video}', [VideoController::class, 'destroy'])->name('videos.destroy');
});