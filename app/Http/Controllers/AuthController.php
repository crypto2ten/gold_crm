<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class AuthController extends Controller
{
	public function register(Request $request)
	{
		$validator = Validator::make($request->all(), [
			'first_name' => 'required|string|max:255',
			// 'last_name' => 'required|string|max:255',
			'email' => 'required|string|email|max:255|unique:users',
			'password' => 'required|string|min:6|confirmed',
		]);
		if ($validator->fails()) {
			return response(['errors' => $validator->errors()->all()], 422);
		}
		$request['password'] = Hash::make($request['password']);
		$request['remember_token'] = Str::random(10);
		// return response($request->toArray(), 200);/
		$user = User::create($request->toArray());

		// generate unique id for search
		$user->uid = $user->first_name . sprintf('%05d', $user->id);
		$user->disabled = 0;
		$user->save();

		// availibility
		$user->disabled = 0;
		$user->enabled_at = Carbon::now()->format('Y-m-d H:i:s');

		// DB::table('user_role')->insert([
		// 	'user_id' => $user->id,
		// 	'role_id' => 0
		// ]);

        // should be determined later
        $role_id = 1;

        $user->roles()->attach($role_id);

		$token = $user->createToken('Laravel Password Grant Client')->accessToken;
		$response = [
			'success' => true,
			'token' => $token,
			'user' => $user,
			'roles' => 0,
            'message' => 'User registered successfully.'
		];
		return response($response, 200);
	}

	public function login(Request $request)
	{
		$validator = Validator::make($request->all(), [
			'email' => 'required|string|email|max:255',
			'password' => 'required|string|min:6',
		]);
		if ($validator->fails()) {
			return response(['errors' => $validator->errors()->all()], 422);
		}
		$user = User::where([['email', $request->email]])->first();
		if ($user) {
			if ($user->disabled == 0) {
				if (Hash::check($request->password, $user->password)) {

					$credentials = $request->only('email', 'password');

					// if (Hash::check($request->password, $user->password) && $user->hasVerifiedEmail()) {
					$token = $user->createToken('Laravel Password Grant Client')->plainTextToken;

					// $role_id = DB::table('user_role')->where('user_id', '=', $user->id)->first()->role_id;
                    $role = json_decode($user->roles);
                    $role_id = $role[0]->pivot->role_id;

					$response = [
						'success' => true,
						'token' => $token,
						'user' => $user,
						'role' => $role_id,
                        'message' => 'User logged in successfully.'
					];

					return response($response, 200);
					// } else if (!$user->hasVerifiedEmail()) {
					// 	$response = [
					// 		"message" => "Email is not verified.",
					// 		"success" => false
					// 	];
					// 	return response($response, 422);
				} else {
					$response = [
						"message" => "Password mismatch",
						"success" => false
					];
					return response($response, 422);
				}
			} else {
				$response = [
					"message" => 'User has been disabled',
					"success" => false
				];
				return response($response, 422);
			}
		} else {
			$response = [
				"message" => 'User does not exist',
				"success" => false
			];
			return response($response, 422);
		}
	}

	// public function logout(Request $request)
	// {
	//     $token = $request->user()->token();
	//     $token->revoke();
	//     $response = [
	//         'message' => 'You have been successfully logged out!',
	//         'success' => true,
	//     ];
	//     return response($response, 200);
	// }

	// public function updateProfile(Request $request)
	// {
	//     $user = Auth::user();

	//     $validator = Validator::make($request->all(), [
	//         'first_name' => 'required|string|max:255',
	//         'last_name' => 'required|string|max:255',
	//         'email' => [
	//             'required',
	//             'unique:users,email,' . $user->id,
	//         ],
	//         'phone' => 'numeric',
	//     ]);
	//     if ($validator->fails()) {
	//         return response(['errors' => $validator->errors()->all()], 422);
	//     }
	//     $user->update($request->all());

	//     return response()->json([
	//         'success' => true,
	//         'user' => $user
	//     ]);
	// }

	// public function changePwd(Request $request)
	// {
	//     $validator = Validator::make($request->all(), [
	//         'new_pwd' => 'required|string|min:6',
	//     ]);
	//     if ($validator->fails()) {
	//         return response(['errors' => $validator->errors()->all()], 422);
	//     }
	//     $user = Auth::user();
	//     $user->password = Hash::make($request['new_pwd']);
	//     $user->save();

	//     return response()->json([
	//         'success' => true,
	//         'user' => $user
	//     ]);
	// }
}
