<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function register(Request $request){
        $valid=$request->validate([
            'name'=>'required |max:30',
            'email'=>'required | email',
            'password'=>'required | min:8',
        ]);
        $valid['password']=Hash::make($request->password);

        $user=User::create($valid);

        $token=$user->createToken('web')->plainTextToken;

        return response()->json([
            'status'=>'success',
            'user'=>$user,
            'token'=>$token,
            'message'=>'user register successfully',
        ],200);
    }

    public function login(Request $request)
    {
        $valid = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string|min:8'
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
           return response('Login invalid', 503);
        }

        $token = $user->createToken('web')->plainTextToken;

        return response()->json([
            'status' => 'success',
            'user' => $user,
            'token' => $token,
            'message' => 'Login successfully!'
        ], 200);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        // Auth::user()->tokens()->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Logout successfully!'
        ], 200);
    }

}
