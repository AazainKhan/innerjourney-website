<?php
// Enable error logging
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/php_errors.log');

// Test error logging
error_log("Testing error logging");

echo "Error logging test complete. Check php_errors.log in the website root directory.";
