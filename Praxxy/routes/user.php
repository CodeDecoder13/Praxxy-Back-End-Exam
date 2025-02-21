<?php


use App\Http\Controllers\UserManagementController;
use Illuminate\Support\Facades\Route;   
use Inertia\Inertia;

Route::middleware(['auth'])->group(function () {
    Route::post('/users', [UserManagementController::class, 'store'])->name('users.store');
    Route::get('/users/{user}', [UserManagementController::class, 'show'])->name('users.show');
    Route::put('/users/{user}', [UserManagementController::class, 'update'])->name('users.update');
    Route::delete('/users/{user}', [UserManagementController::class, 'destroy'])->name('users.destroy');
});