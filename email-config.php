<?php
// Test PHP configuration
ini_set('display_errors', 1);
error_reporting(E_ALL);

/**
 * Email Configuration
 * 
 * This file contains email settings for both local development and production.
 * For local development, it uses Mailpit (http://localhost:8025)
 * For production, it uses the server's default mail function
 */

// Check if we're in a local development environment
$isLocal = (in_array($_SERVER['REMOTE_ADDR'], ['127.0.0.1', '::1']) || 
           (isset($_SERVER['HTTP_HOST']) && strpos($_SERVER['HTTP_HOST'], 'localhost') !== false));

$config = [
    // Default from address
    'from_email' => 'noreply@' . (isset($_SERVER['HTTP_HOST']) ? 
                      str_replace('www.', '', $_SERVER['HTTP_HOST']) : 'yourdomain.com'),
    'from_name' => 'Your Website Name',
    
    // Admin email for notifications
    'admin_email' => 'admin@' . (isset($_SERVER['HTTP_HOST']) ? 
                      str_replace('www.', '', $_SERVER['HTTP_HOST']) : 'yourdomain.com'),
    
    // SMTP settings (used in production)
    'smtp' => [
        'host' => $isLocal ? 'localhost' : 'mail.yourdomain.com',
        'port' => $isLocal ? 1025 : 587, // 1025 for Mailpit, 587 for production
        'username' => $isLocal ? '' : 'your_smtp_username',
        'password' => $isLocal ? '' : 'your_smtp_password',
        'encryption' => $isLocal ? '' : 'tls', // tls or ssl, empty for Mailpit
    ],
    
    // Mail settings
    'mail' => [
        'add_x_header' => $isLocal,
        'log' => $isLocal ? '/tmp/php_mail.log' : false,
    ]
];

// Set environment for .htaccess
if ($isLocal) {
    putenv('APP_ENV=local');
} else {
    putenv('APP_ENV=production');
}

// Check if mailpit is available
$mailpitAvailable = false;
$mailpitVersion = 'Not available';
$mailpitPath = '/usr/local/bin/mailpit';

if (file_exists($mailpitPath)) {
    $mailpitAvailable = true;
    $versionOutput = shell_exec("$mailpitPath --version 2>&1");
    if ($versionOutput) {
        $mailpitVersion = trim($versionOutput);
    }
}

// Check if we can send a test email
$testEmailSent = false;
$testEmailError = null;

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['test_email'])) {
    $to = 'test@example.com';
    $subject = 'Test Email from MAMP';
    $message = 'This is a test email sent from MAMP using Mailpit';
    $headers = 'From: webmaster@example.com' . "\r\n" .
              'Reply-To: webmaster@example.com' . "\r\n" .
              'X-Mailer: PHP/' . phpversion();

    $testEmailSent = mail($to, $subject, $message, $headers);
    if (!$testEmailSent) {
        $testEmailError = error_get_last();
    }
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Email Configuration Test</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="bg-gray-100 p-8">
    <div class="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow">
        <h1 class="text-2xl font-bold mb-6">PHP Email Configuration Test</h1>
        
        <div class="mb-8">
            <h2 class="text-xl font-semibold mb-4">PHP Mail Settings</h2>
            <div class="bg-gray-50 p-4 rounded">
                <pre class="text-sm"><?php echo json_encode($mailSettings, JSON_PRETTY_PRINT); ?></pre>
            </div>
        </div>

        <div class="mb-8">
            <h2 class="text-xl font-semibold mb-4">Mailpit Status</h2>
            <div class="space-y-2">
                <p><span class="font-medium">Mailpit Installed:</span> 
                    <?php echo $mailpitAvailable ? '✅ Yes' : '❌ No'; ?></p>
                <p><span class="font-medium">Mailpit Version:</span> <?php echo htmlspecialchars($mailpitVersion); ?></p>
                <p><span class="font-medium">Mailpit Path:</span> <?php echo $mailpitPath; ?></p>
                <p><span class="font-medium">Mailpit Web Interface:</span> 
                    <a href="http://localhost:8025" class="text-blue-600 hover:underline" target="_blank">http://localhost:8025</a></p>
            </div>
        </div>

        <div class="mb-8">
            <h2 class="text-xl font-semibold mb-4">Send Test Email</h2>
            <?php if (isset($_POST['test_email'])): ?>
                <?php if ($testEmailSent): ?>
                    <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <strong class="font-bold">Success!</strong>
                        <span class="block sm:inline">Test email sent successfully. Check Mailpit at <a href="http://localhost:8025" class="underline" target="_blank">http://localhost:8025</a> to see if it was received.</span>
                    </div>
                <?php else: ?>
                    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <strong class="font-bold">Error!</strong>
                        <span class="block sm:inline">Failed to send test email: 
                            <?php echo htmlspecialchars($testEmailError['message'] ?? 'Unknown error'); ?></span>
                    </div>
                <?php endif; ?>
            <?php endif; ?>

            <form method="post" class="space-y-4">
                <div>
                    <p class="mb-2">Click the button below to send a test email:</p>
                    <button type="submit" name="test_email" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Send Test Email
                    </button>
                </div>
            </form>
        </div>

        <div class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
            <p class="font-bold">Troubleshooting Tips</p>
            <ul class="list-disc pl-5 mt-2 space-y-1">
                <li>Make sure Mailpit is running: <code>mailpit</code> in terminal</li>
                <li>Check Mailpit web interface: <a href="http://localhost:8025" class="underline" target="_blank">http://localhost:8025</a></li>
                <li>Verify PHP can execute Mailpit: <code>which mailpit</code> should return a path</li>
                <li>Check PHP error logs: <code>/Applications/MAMP/logs/php_error.log</code></li>
                <li>Check Apache error logs: <code>/Applications/MAMP/logs/apache_error.log</code></li>
            </ul>
        </div>
    </div>
</body>
</html>
