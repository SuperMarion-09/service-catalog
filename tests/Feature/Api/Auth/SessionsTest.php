<?php

namespace Tests\Feature\Api\Auth;
use App\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class SessionsTest extends TestCase
{
    /** @test */

    use RefreshDatabase;

    public function a_user_can_login()
    {
       $attributes = [
           'email' => 'marion@gmail.com',
           'password' => 'secret'
       ];

        $this->post(route('api.auth.signin'),$attributes)
        ->assertStatus(200)
        ->assertJsonStructure([
            'auth_token','token_type','expires_in'
        ]);
    }
    public function a_user_can_be_found()
    {
        $user=_test_user();
        
        $this->get(route('api.auth.user',[
            'auth_token' => _test_user()->auth_token
        ]))
        ->assertStatus(200)->assertJson($user->toArray());
    }
    public function a_user_can_be_logout()
    {
        $user=_test_user();
        
        $this->get(route('api.auth.sigOutUser',[
            'auth_token' => $user->auth_token
        ]))
        ->assertStatus(200);

        $this->assertDatabaseHas('users',[
            'email' => $user->email,
            'auth_token' => null
        ]);
    }
}
