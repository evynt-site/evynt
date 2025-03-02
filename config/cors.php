<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'], // Allow Sanctum CSRF
    'allowed_methods' => ['*'], // Allow all methods
    'allowed_origins' => ['http://localhost:3000'],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'], // Allow all headers
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true, // ✅ Required for cookies
    //'Access-Control-Allow-Credentials'=> true
];
