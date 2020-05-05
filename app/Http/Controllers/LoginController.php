<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;

class LoginController extends Controller
{
    public function login() {
        return view('pages.login');
    }

    public function user_login(Request $request) {    
        if (Auth::attempt([
            'name' => $request->input('name'),
            'password' => $request->input('password')])) {
            $user = Auth()->user();
            if ($user) {
                return response()->json(['success' => 'Successfully Logged In']);
            } else {
                 return response()->json(['error' => 'Incorrect Email or Password']);
            }
            } else {
                return response()->json(['error' => 'Something went wrong']);
            }
    }

    public function logout() {
        Auth::logout();
        return redirect('/login');
    }
}
