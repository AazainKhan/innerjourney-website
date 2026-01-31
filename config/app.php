<?php

declare(strict_types=1);

/**
 * Application Configuration
 * 
 * This file loads environment variables and provides centralized configuration.
 * All configuration values should be accessed through this file.
 */

// Load Composer autoloader if available
$autoloadPath = __DIR__ . '/../vendor/autoload.php';
if (file_exists($autoloadPath)) {
    require_once $autoloadPath;
    
    // Load environment variables from .env file
    $dotenv = Dotenv\Dotenv::createImmutable(dirname(__DIR__));
    $dotenv->safeLoad();
}

/**
 * Get an environment variable with an optional default value.
 */
function env(string $key, mixed $default = null): mixed
{
    $value = $_ENV[$key] ?? $_SERVER[$key] ?? getenv($key);
    
    if ($value === false) {
        return $default;
    }
    
    // Convert string booleans
    return match (strtolower((string) $value)) {
        'true', '(true)' => true,
        'false', '(false)' => false,
        'null', '(null)' => null,
        default => $value,
    };
}

/**
 * Application configuration array
 */
return [
    // Application
    'app' => [
        'env' => env('APP_ENV', 'production'),
        'debug' => env('APP_DEBUG', false),
        'name' => env('SITE_NAME', 'Inner Journey With Shanila'),
        'url' => env('SITE_URL', 'https://innerjourney-with-shanila.com'),
    ],
    
    // Admin settings
    'admin' => [
        'email' => env('ADMIN_EMAIL', 'info@innerjourney-with-shanila.com'),
        'name' => env('ADMIN_NAME', 'Shanila Khan'),
        'phone' => '+44 7387 973 382',
    ],
    
    // Mail settings
    'mail' => [
        'from_name' => env('MAIL_FROM_NAME', 'Inner Journey With Shanila'),
    ],
    
    // Logging
    'logging' => [
        'path' => __DIR__ . '/../logs',
        'contact_log' => 'consultation_requests.log',
        'error_log' => 'php_contact_errors.log',
    ],
];
