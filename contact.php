<?php
// Contact form handler for Shanila Mindset and Clarity Coaching website

// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 0); // Don't show errors to users
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/php_contact_errors.log');

// Generate a unique ID for this request
$request_id = uniqid('req_', true);

// Log the start of the request
error_log("[$request_id] Starting request processing");

// Function to send JSON response and exit
function send_json_response($data, $status_code = 200) {
    http_response_code($status_code);
    header('Content-Type: application/json');
    echo json_encode($data);
    exit;
}

// Set CORS headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Log the request with all server variables for debugging
error_log("=== New Contact Form Submission ===");
error_log("Request Method: " . $_SERVER['REQUEST_METHOD']);
error_log("Content Type: " . ($_SERVER['CONTENT_TYPE'] ?? 'Not set'));
error_log("Request Headers: " . json_encode(getallheaders()));

// Read raw POST data
$rawInput = file_get_contents('php://input');
error_log("Raw input: " . $rawInput);

// Check if this is a JSON request
$isJson = false;
if (isset($_SERVER['CONTENT_TYPE']) && strpos($_SERVER['CONTENT_TYPE'], 'application/json') !== false) {
    $isJson = true;
    error_log("Detected JSON request");
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    send_json_response(['error' => 'Method not allowed'], 405);
}

// Get POST data
$input = [];

try {
    if ($isJson && !empty($rawInput)) {
        $input = json_decode($rawInput, true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new Exception('Invalid JSON: ' . json_last_error_msg());
        }
        error_log("Parsed JSON input: " . print_r($input, true));
    } else {
        // Handle regular form data
        $input = $_POST;
        // If no POST data, try to parse form data
        if (empty($input) && !empty($rawInput)) {
            parse_str($rawInput, $input);
        }
        error_log("Form data: " . print_r($input, true));
    }
} catch (Exception $e) {
    error_log("Error parsing input: " . $e->getMessage());
    send_json_response(['success' => false, 'error' => 'Invalid request data: ' . $e->getMessage()], 400);
}

// Validate required fields - handle both old contact form and new booking form
$required_fields = [];
$missing_fields = [];
$is_booking_form = isset($input['first-name']);

if ($is_booking_form) {
    // This is a booking form
    $required_fields = ['first-name', 'last-name', 'email', 'phone', 'date', 'time', 'service'];
} else {
    // This is the contact form
    $required_fields = ['name', 'email', 'message'];
}

foreach ($required_fields as $field) {
    if (empty($input[$field])) {
        $missing_fields[] = $field;
    }
}

if (!empty($missing_fields)) {
    $errorMsg = 'Missing required fields: ' . implode(', ', $missing_fields);
    error_log($errorMsg);
    send_json_response([
        'success' => false,
        'error' => $errorMsg,
        'missing_fields' => $missing_fields
    ], 400);
}

// Validate email
if (!filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
    send_json_response(['success' => false, 'error' => 'Invalid email format'], 400);
}

// Sanitize input data
if ($is_booking_form) {
    // This is a booking form
    $firstName = htmlspecialchars(trim($input['first-name']), ENT_QUOTES, 'UTF-8');
    $lastName = htmlspecialchars(trim($input['last-name']), ENT_QUOTES, 'UTF-8');
    $name = $firstName . ' ' . $lastName;
    $email = filter_var(trim($input['email']), FILTER_SANITIZE_EMAIL);
    $countryCode = isset($input['country-code']) ? htmlspecialchars(trim($input['country-code']), ENT_QUOTES, 'UTF-8') : '';
    $phoneNumber = htmlspecialchars(trim($input['phone']), ENT_QUOTES, 'UTF-8');
    // Format phone number with country code (remove any existing + or 00 at the start of the phone number)
    $phone = '+' . $countryCode . ' ' . ltrim($phoneNumber, '+0');
    $date = htmlspecialchars(trim($input['date']), ENT_QUOTES, 'UTF-8');
    $time = htmlspecialchars(trim($input['time']), ENT_QUOTES, 'UTF-8');
    $service = htmlspecialchars(trim($input['service']), ENT_QUOTES, 'UTF-8');
    $message = isset($input['message']) ? htmlspecialchars(trim($input['message']), ENT_QUOTES, 'UTF-8') : '';
} else {
    // This is the contact form
    $name = htmlspecialchars(trim($input['name']), ENT_QUOTES, 'UTF-8');
    $email = filter_var(trim($input['email']), FILTER_SANITIZE_EMAIL);
    $countryCode = isset($input['country-code']) ? htmlspecialchars(trim($input['country-code']), ENT_QUOTES, 'UTF-8') : '';
    $phoneNumber = isset($input['phone']) ? htmlspecialchars(trim($input['phone']), ENT_QUOTES, 'UTF-8') : '';
    $phone = !empty($phoneNumber) ? '+' . $countryCode . ' ' . ltrim($phoneNumber, '+0') : 'Not provided';
    $message = htmlspecialchars(trim($input['message']), ENT_QUOTES, 'UTF-8');
}

// Prepare email content
if ($is_booking_form) {
    // This is a booking form
    $subject = "New Consultation Booking from $name - Inner Journey With Shanila";
    $email_content = "
New consultation booking received:

Name: $name
Email: $email
Phone: $phone
Preferred Date: $date
Preferred Time: $time
Service: $service

Additional Information:
$message

---
This message was sent from the website booking form.
";
} else {
    // This is the old contact form
    $subject = "New Message from $name - Inner Journey With Shanila";
    $email_content = "
New message received:

Name: $name
Email: $email
Phone: $phone

Message:
$message

---
This message was sent from the website contact form.
";
}

// Email headers
$headers = [
    'From: ' . $email,
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . phpversion(),
    'Content-Type: text/plain; charset=UTF-8',
    'MIME-Version: 1.0'
];

// Send email to admin
$admin_email = 'info@innerjourney-with-shanila.com';
$success = true;

// Log that we're about to send emails
error_log("[$request_id] Preparing to send emails");

// Prepare user email content
if ($is_booking_form) {
    // This is a booking form
    $user_subject = "Thank you for your consultation booking - Inner Journey With Shanila";
    $user_content = "
Dear $name,

Thank you for booking a consultation with me! I have received your booking request and am excited to work with you on your transformational journey.

Your booking details:
- Preferred Date: $date
- Preferred Time: $time
- Service: $service

I will review your booking and get back to you within 24-48 hours to confirm your appointment time.

If you have any questions, feel free to reply to this email.

Warm regards,
Shanila Khan
Inner Journey With Shanila
";
} else {
    // This is the contact form
    $user_subject = "Thank you for your message - Inner Journey With Shanila";
    $user_content = "
Dear $name,

Thank you for reaching out to me through my website! I've received your message and appreciate you taking the time to contact me.

Here's a summary of your message:
$message

I'll review your message and get back to you within 24-48 hours. If your inquiry is urgent, please call or text me at +44 7387 973 382.

Warm regards,
Shanila Khan
Inner Journey With Shanila
";
}

// Send email to admin
error_log("[$request_id] Sending admin email to $admin_email");
$mail_sent = @mail($admin_email, $subject, $email_content, implode("\r\n", $headers));

if ($mail_sent) {
    error_log("[$request_id] Admin email sent successfully");
    error_log("Email sent to admin: $admin_email");
    
    // Send confirmation email to user
    $user_headers = [
        'From: ' . $admin_email,
        'Reply-To: ' . $admin_email,
        'X-Mailer: PHP/' . phpversion(),
        'Content-Type: text/plain; charset=UTF-8'
    ];
    
    error_log("[$request_id] Sending confirmation email to $email");
    $user_mail_sent = @mail($email, $user_subject, $user_content, implode("\r\n", $user_headers));
    
    if ($user_mail_sent) {
        error_log("[$request_id] Confirmation email sent successfully");
        error_log("Confirmation email sent to $email");
    } else {
        error_log("Failed to send confirmation email to $email");
        $success = false;
    }
} else {
    error_log("Failed to send email to admin: $admin_email");
    $success = false;
}

// Return appropriate response
if ($success) {
    send_json_response([
        'success' => true,
        'message' => 'Your message has been sent successfully!'
    ]);
} else {
    // Log the error
    error_log('Failed to send one or more emails');
    
    // Return error response
    send_json_response([
        'success' => false,
        'error' => 'There was an issue sending your message. Please try again later.'
    ], 500);
}

// Log the request with request ID
if (isset($input['first-name'])) {
    $log_entry = date('Y-m-d H:i:s') . " [$request_id] - Consultation booking from $name ($email) - $service on $date at $time\n";
} else {
    $log_entry = date('Y-m-d H:i:s') . " [$request_id] - Contact form submission from $name ($email)\n";
}
file_put_contents('consultation_requests.log', $log_entry, FILE_APPEND | LOCK_EX);

error_log("[$request_id] Request processing complete");

// Prepare response
if ($mail_sent) {
    if (isset($input['first-name'])) {
        $response = [
            'success' => true,
            'message' => 'Thank you! Your consultation booking has been received. I will contact you within 24-48 hours to confirm your appointment.',
            'timestamp' => date('Y-m-d H:i:s')
        ];
    } else {
        $response = [
            'success' => true,
            'message' => 'Thank you! Your consultation request has been received. I will contact you within 24-48 hours to schedule your session.',
            'timestamp' => date('Y-m-d H:i:s')
        ];
    }
    
    http_response_code(200);
} else {
    if (isset($input['first-name'])) {
        $response = [
            'error' => 'Failed to send consultation booking. Please try again or contact us directly.',
            'timestamp' => date('Y-m-d H:i:s')
        ];
    } else {
        $response = [
            'error' => 'Failed to send consultation request. Please try again or contact us directly.',
            'timestamp' => date('Y-m-d H:i:s')
        ];
    }
    
    http_response_code(500);
}

// Return JSON response
echo json_encode($response);

// Optional: Save to database if you have one
// saveToDatabase($name, $email, $phone, $service, $message, $preferred_time);

function saveToDatabase($name, $email, $phone, $service, $message, $preferred_time) {
    // This function would save the consultation request to a database
    // Implementation depends on your database setup (MySQL, PostgreSQL, etc.)
    
    /*
    Example MySQL implementation:
    
    $db = new PDO('mysql:host=localhost;dbname=shanila_coaching', 'username', 'password');
    $stmt = $db->prepare("
        INSERT INTO consultation_requests (name, email, phone, service, message, preferred_time, created_at)
        VALUES (?, ?, ?, ?, ?, ?, NOW())
    ");
    $stmt->execute([$name, $email, $phone, $service, $message, $preferred_time]);
    */
}
?>
