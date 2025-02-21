<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;   
use Inertia\Inertia;

Route::middleware(['auth'])->group(function () {
    Route::get('/products', [ProductController::class, 'index']);
    Route::post('/products', [ProductController::class, 'store']);
    Route::put('/products/{product}', [ProductController::class, 'update'])->name('products.update');
    Route::delete('/products/{product}', [ProductController::class, 'destroy']);
});
