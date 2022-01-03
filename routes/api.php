<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
//
//Route::middleware("auth")->group(function() {
//
//});


Route::get('/booksList',function (){
    return view('book.index');
});
Route::prefix("/books")->group(function(){
    Route::get('/',[BookController::class,"index"])->name('books.index');
    Route::get('/delete/{id}',[BookController::class,"destroy"])->name('books.destroy');
    Route::post('/add',[BookController::class,"store"])->name("books.store");
    Route::get('/{id}',[BookController::class,"edit"])->name("books.edit");
    Route::post('/update/{id}',[BookController::class,"update"])->name("books.update");
});


Route::prefix('/users')->group(function(){
    Route::post('/',[AuthController::class,"register"])->name('users.register');
});
Route::post('/login',[AuthController::class,"login"])->name("login");
Route::get('/logout',[AuthController::class,"logout"])->name("logout");
