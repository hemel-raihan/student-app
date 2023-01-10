<?php

use App\Http\Controllers\Admin\StudentController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Admin\TeacherController;
use Illuminate\Http\Request;
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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('login',[\App\Http\Controllers\AuthController::class, 'login']);

Route::group(['middleware' => 'api'], function ($routes) {

    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::get('dashboard', [AuthController::class, 'dashboard']);

    Route::post('student/create', [StudentController::class, 'create']);
    Route::get('student/list', [StudentController::class, 'index']);
    Route::post('student/details', [StudentController::class, 'show']);
    Route::post('student/update', [StudentController::class, 'update']);

    Route::post('teacher/create', [TeacherController::class, 'create']);
    Route::get('teacher/list', [TeacherController::class, 'index']);
    Route::post('teacher/details', [TeacherController::class, 'show']);
    Route::post('teacher/update', [TeacherController::class, 'update']);
});
