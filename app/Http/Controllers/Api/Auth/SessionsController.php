<?php

namespace App\Http\Controllers\Api\Auth;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Tymon\JWTauth\Facades\JWTauth;

class SessionsController extends Controller
{
    public function signin( Request $request){
        $request->validate([
            'email' => 'required|email|exists:users',
            'password' => 'required'
        ]);

        if(! $token = auth()->attempt($request->all())){
            return response()->json(['error'=>'Unauthorized'],401);
        }

        $this->storeAuthToken($token);

        return $this->respondWithToken($token);
    }

    public function user(Request $request){
        return JWTauth::setToken($request->input('auth_token'))->toUser();
    }

    protected function storeAuthToken($token){
        $user =  auth()->user();

        $user->auth_token = $token;

        return $user->update();

    }

   


    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'auth_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }
}