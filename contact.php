<?php

declare(strict_types=1);

/**
 * Contact Form Handler
 * 
 * Handles both contact form and booking form submissions.
 * This is the entry point that delegates to the modern PHP classes.
 * 
 * @package InnerJourney
 * @since 2.0.0
 */

// Load configuration and autoloader
$configPath = __DIR__ . '/config/app.php';
$autoloadPath = __DIR__ . '/vendor/autoload.php';

// Check if modern infrastructure is available
$useModernStack = file_exists($autoloadPath) && file_exists($configPath);

if ($useModernStack) {
    require_once $autoloadPath;
    $config = require $configPath;
    
    // Use modern classes
    handleModernRequest($config);
} else {
    // Fall back to legacy inline handling
    handleLegacyRequest();
}

/**
 * Modern request handler using PSR-4 classes.
 * 
 * @param array<string, mixed> $config
 */
function handleModernRequest(array $config): void
{
    // Enable error reporting
    error_reporting(E_ALL);
    ini_set('display_errors', '0');
    ini_set('log_errors', '1');
    ini_set('error_log', __DIR__ . '/php_contact_errors.log');
    
    // Generate request ID for logging
    $requestId = uniqid('req_', true);
    
    // Set CORS headers
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    
    // Handle preflight
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit;
    }
    
    try {
        $request = new \InnerJourney\Http\Request();
        $validator = new \InnerJourney\Services\FormValidator();
        $emailService = new \InnerJourney\Services\EmailService(
            adminEmail: $config['admin']['email'],
            adminName: $config['admin']['name'],
            adminPhone: $config['admin']['phone'],
            siteName: $config['app']['name'],
        );
        
        // Only allow POST
        if (!$request->isMethod('POST')) {
            \InnerJourney\Http\JsonResponse::error('Method not allowed', 405);
        }
        
        $data = $request->all();
        $isBooking = $validator->isBookingForm($data);
        
        // Validate required fields
        $requiredFields = $validator->getRequiredFields($isBooking);
        $validator->validateRequired($data, $requiredFields);
        
        // Validate and sanitize
        $email = $validator->validateEmail($data['email']);
        
        if ($isBooking) {
            $firstName = $validator->sanitizeString($data['first-name']);
            $lastName = $validator->sanitizeString($data['last-name']);
            $name = "$firstName $lastName";
            $phone = $validator->formatPhone(
                $data['country-code'] ?? '',
                $data['phone']
            );
            $date = $validator->sanitizeString($data['date']);
            $time = $validator->sanitizeString($data['time']);
            $service = $validator->sanitizeString($data['service']);
            $message = $validator->sanitizeString($data['message'] ?? '');
            
            $subject = "New Consultation Booking from $name - " . $config['app']['name'];
            $adminContent = $emailService->buildBookingAdminEmail(
                $name, $email, $phone, $date, $time, $service, $message
            );
            $userSubject = "Thank you for your consultation booking - " . $config['app']['name'];
            $userContent = $emailService->buildBookingUserEmail($name, $date, $time, $service);
        } else {
            $name = $validator->sanitizeString($data['name']);
            $phone = $validator->formatPhone(
                $data['country-code'] ?? '',
                $data['phone'] ?? ''
            );
            $message = $validator->sanitizeString($data['message']);
            
            $subject = "New Message from $name - " . $config['app']['name'];
            $adminContent = $emailService->buildContactAdminEmail($name, $email, $phone, $message);
            $userSubject = "Thank you for your message - " . $config['app']['name'];
            $userContent = $emailService->buildContactUserEmail($name, $message);
        }
        
        // Send emails
        error_log("[$requestId] Sending admin email");
        $adminSent = $emailService->sendAdminNotification($subject, $adminContent, $email);
        
        if ($adminSent) {
            error_log("[$requestId] Admin email sent, sending confirmation");
            $emailService->sendUserConfirmation($email, $userSubject, $userContent);
            
            // Log the request
            $logEntry = date('Y-m-d H:i:s') . " [$requestId] - " . 
                ($isBooking ? "Booking" : "Contact") . " from $name ($email)\n";
            file_put_contents('consultation_requests.log', $logEntry, FILE_APPEND | LOCK_EX);
            
            $successMessage = $isBooking
                ? 'Thank you! Your consultation booking has been received. I will contact you within 24-48 hours to confirm your appointment.'
                : 'Thank you! Your message has been received. I will get back to you within 24-48 hours.';
            
            \InnerJourney\Http\JsonResponse::success($successMessage);
        } else {
            error_log("[$requestId] Failed to send admin email");
            \InnerJourney\Http\JsonResponse::error(
                'There was an issue sending your message. Please try again later.',
                500
            );
        }
        
    } catch (\InnerJourney\Exceptions\ValidationException $e) {
        error_log("[$requestId] Validation error: " . $e->getMessage());
        \InnerJourney\Http\JsonResponse::send($e->toArray(), $e->getCode());
    } catch (\Throwable $e) {
        error_log("[$requestId] Unexpected error: " . $e->getMessage());
        \InnerJourney\Http\JsonResponse::error('An unexpected error occurred. Please try again later.', 500);
    }
}

/**
 * Legacy request handler - original inline code.
 * Used as fallback when Composer is not available.
 */
function handleLegacyRequest(): void
{
    // Check if we're in local development (skip email sending)
    $isLocal = in_array($_SERVER['REMOTE_ADDR'] ?? '', ['127.0.0.1', '::1']) ||
               str_contains($_SERVER['HTTP_HOST'] ?? '', 'localhost');
    
    // Enable error reporting
    error_reporting(E_ALL);
    ini_set('display_errors', '0');
    ini_set('log_errors', '1');
    ini_set('error_log', __DIR__ . '/php_contact_errors.log');

    $request_id = uniqid('req_', true);
    error_log("[$request_id] Starting request (legacy mode, local=$isLocal)");

    // Function to send JSON response
    $send_json_response = function(array $data, int $status_code = 200): void {
        http_response_code($status_code);
        header('Content-Type: application/json');
        echo json_encode($data);
        exit;
    };

    // Set CORS headers
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Content-Type: application/json');

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit;
    }

    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        $send_json_response(['error' => 'Method not allowed'], 405);
    }

    // Parse input
    $rawInput = file_get_contents('php://input');
    $isJson = isset($_SERVER['CONTENT_TYPE']) && 
              str_contains($_SERVER['CONTENT_TYPE'], 'application/json');

    $input = [];
    if ($isJson && !empty($rawInput)) {
        $input = json_decode($rawInput, true) ?? [];
    } else {
        $input = $_POST;
        if (empty($input) && !empty($rawInput)) {
            parse_str($rawInput, $input);
        }
    }

    // Determine form type
    $is_booking = isset($input['first-name']);
    $required = $is_booking 
        ? ['first-name', 'last-name', 'email', 'phone', 'date', 'time', 'service']
        : ['name', 'email', 'message'];

    // Validate required
    $missing = array_filter($required, fn($f) => empty($input[$f]));
    if ($missing) {
        $send_json_response([
            'success' => false,
            'error' => 'Missing required fields: ' . implode(', ', $missing),
            'missing_fields' => array_values($missing)
        ], 400);
    }

    // Validate email
    if (!filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
        $send_json_response(['success' => false, 'error' => 'Invalid email format'], 400);
    }

    // Sanitize
    $sanitize = fn($v) => htmlspecialchars(trim($v ?? ''), ENT_QUOTES, 'UTF-8');
    $email = filter_var(trim($input['email']), FILTER_SANITIZE_EMAIL);
    
    if ($is_booking) {
        $name = $sanitize($input['first-name']) . ' ' . $sanitize($input['last-name']);
        $phone = '+' . ($input['country-code'] ?? '') . ' ' . ltrim($input['phone'], '+0');
        $date = $sanitize($input['date']);
        $time = $sanitize($input['time']);
        $service = $sanitize($input['service']);
        $message = $sanitize($input['message'] ?? '');
        
        $subject = "New Consultation Booking from $name - Inner Journey With Shanila";
        $content = "New consultation booking:\n\nName: $name\nEmail: $email\nPhone: $phone\nDate: $date\nTime: $time\nService: $service\n\nMessage:\n$message";
    } else {
        $name = $sanitize($input['name']);
        $phone = isset($input['phone']) && $input['phone'] 
            ? '+' . ($input['country-code'] ?? '') . ' ' . ltrim($input['phone'], '+0')
            : 'Not provided';
        $message = $sanitize($input['message']);
        
        $subject = "New Message from $name - Inner Journey With Shanila";
        $content = "New message:\n\nName: $name\nEmail: $email\nPhone: $phone\n\nMessage:\n$message";
    }

    // Send email (skip on localhost - just log instead)
    $headers = implode("\r\n", [
        'From: ' . $email,
        'Reply-To: ' . $email,
        'Content-Type: text/plain; charset=UTF-8'
    ]);
    
    $admin_email = 'info@innerjourney-with-shanila.com';
    
    if ($isLocal) {
        // Local development: log the email instead of sending
        error_log("[$request_id] LOCAL DEV - Would send email to: $admin_email");
        error_log("[$request_id] Subject: $subject");
        error_log("[$request_id] Content: $content");
        $sent = true; // Simulate success
    } else {
        // Production: actually send the email
        $sent = @mail($admin_email, $subject, $content, $headers);
    }

    if ($sent) {
        // Log the submission
        $logEntry = date('Y-m-d H:i:s') . " [$request_id] - " . 
            ($is_booking ? "Booking" : "Contact") . " from $name ($email)" . 
            ($isLocal ? " [LOCAL TEST]" : "") . "\n";
        file_put_contents(__DIR__ . '/consultation_requests.log', $logEntry, FILE_APPEND | LOCK_EX);
        
        $send_json_response([
            'success' => true,
            'message' => $is_booking 
                ? 'Thank you! Your booking has been received.'
                : 'Thank you! Your message has been sent.',
            'timestamp' => date('Y-m-d H:i:s'),
            'dev_mode' => $isLocal
        ]);
    } else {
        $send_json_response([
            'success' => false,
            'error' => 'Failed to send message. Please try again.'
        ], 500);
    }
}
