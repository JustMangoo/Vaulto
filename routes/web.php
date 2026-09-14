<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VaultController;

Route::inertia('/', 'Welcome')->name('welcome');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('home', 'Overview')->name('home');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/vaults', [VaultController::class, 'index'])->name('vaults.index');
    Route::get('/vaults/create', [VaultController::class, 'create'])->name('vaults.create');
    Route::post('/vaults', [VaultController::class, 'store'])->name('vaults.store');

});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('gems', 'Gems')->name('gems');
});

require __DIR__.'/settings.php';
