<?php

namespace App\Http\Controllers;

use App\Models\User;
use Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(),[
            "name" => 'required',
            "email" => 'required|unique:users',
            "password" => 'required|string',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(),400);
        }

        $user = User::create([
            "name" => $request->name,
            "email" => $request->email,
            "password"=> Hash::make($request->password),
        ]);

        $credentials = $request->only('email', 'password');

        if ($token = auth()->attempt($credentials)) {
            return $this->respondWithToken($token);
        }
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(),[
            "email" => 'required',
            "password" => 'required|string|',
        ]);

        if($validator->fails()){
            // return response()->json($validator->errors(),400);
            return response()->json([
                "success" => false,
                "msg" => $validator->errors()
            ], 400);
        }

        if(!$token = auth()->attempt($validator->validated())){
            // return response()->json(["error"=>"unauthorized"]);
            return response()->json([
                "success" => false,
                "msg" => "unauthorized"
            ], 400);
        }

        return $this->respondWithToken($token);
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => $this->guard()->factory()->getTTL() * 60,
            'user' => auth()->user()
        ]);
    }

    public function dashboard(Request $request)
    {
        return response()->json(auth()->user());
    }

    public function guard()
    {
        return Auth::guard();
    }
}
