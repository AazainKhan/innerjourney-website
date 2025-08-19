<?php
// Test script to check PHP configuration and permissions
header('Content-Type: application/json');

try {
    // Test file permissions
    $logFile = __DIR__ . '/test_permissions.log';
    $testWrite = file_put_contents($logFile, 'Test write at ' . date('Y-m-d H:i:s') . "\n", FILE_APPEND);
    
    if ($testWrite === false) {
        throw new Exception('Cannot write to directory: ' . __DIR__);
    }
    
    // Test email configuration
    $mailTest = @mail(
        'test@example.com',
        'Test Email',
        'This is a test email',
        'From: webmaster@' . ($_SERVER['HTTP_HOST'] ?? 'localhost')
    );
    
    // Return success response
    echo json_encode([
        'success' => true,
        'message' => 'PHP is working correctly',
        'server' => $_SERVER['SERVER_SOFTWARE'] ?? 'Unknown',
        'php_version' => phpversion(),
        'mail_enabled' => function_exists('mail') ? 'Yes' : 'No',
        'mail_test' => $mailTest ? 'Email sent successfully' : 'Email sending failed',
        'permissions' => [
            'log_file' => file_exists($logFile) ? 'Writable' : 'Not writable',
            'directory' => is_writable(__DIR__) ? 'Writable' : 'Not writable'
        ]
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage(),
        'file' => $e->getFile(),
        'line' => $e->getLine()
    ]);
}
