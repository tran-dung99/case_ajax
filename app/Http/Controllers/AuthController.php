<?php

namespace App\Http\Controllers;

use App\Models\User;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            "email"=> 'required',
            "password"=> 'required',
        ]);
//        $data = $request->only("email","password");
//        $data["password"] = Hash::make($request->password);
        if(Auth::attempt(['email' => $request->email, 'password' => $request->password])){
            return response()->json(["success"=>true]);
        }else{
           $error = "Email hoặc mật khẩu không hợp lệ";
           return response()->json(["error"=>$error]);
        }
    }

    public function register(Request $request) {
        $data = $request->only("name","email","password");
        $data["password"] = Hash::make($request->password);
        $user = User::create($data);
        return response()->json(["data"=>$user,"success"=>true]);
    }

    public function logout()
    {
        Auth::logout();
        return response()->json();
    }
}
