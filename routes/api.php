<?php

use Illuminate\Http\Request;

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
Route::namespace('Api')->name('api.')->group(function(){

    Route::middleware('api')->prefix('auth')->name('auth.')->group(function() {
         Route::post('signin','Auth\SessionsController@signin')->name('signin');
         Route::get('user','Auth\SessionsController@user')->name('user');
         Route::post('signOutUser','Auth\SessionsController@signOutUser')->name('signOutUser');
    });
});