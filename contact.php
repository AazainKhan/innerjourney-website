<?php
// Contact form handler for Shanila Mindset and Clarity Coaching website

// Enable error logging
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/php_contact_errors.log');

// Set headers
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Log the request with all server variables for debugging
error_log("=== New Contact Form Submission ===");
error_log("Request Method: " . $_SERVER['REQUEST_METHOD']);
error_log("Content Type: " . ($_SERVER['CONTENT_TYPE'] ?? 'Not set'));
error_log("Request Headers: " . json_encode(getallheaders()));
error_log("POST Data: " . file_get_contents('php://input'));

// Check if this is a JSON request
$isJson = false;
if (isset($_SERVER['CONTENT_TYPE']) && strpos($_SERVER['CONTENT_TYPE'], 'application/json') !== false) {
    $isJson = true;
    error_log("Detected JSON request");
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Get POST data
$input = [];
$rawInput = file_get_contents('php://input');

try {
    if ($isJson && !empty($rawInput)) {
        $input = json_decode($rawInput, true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new Exception('Invalid JSON: ' . json_last_error_msg());
        }
        error_log("Parsed JSON input: " . print_r($input, true));
    } else {
        $input = $_POST;
        error_log("Regular POST data: " . print_r($input, true));
    }
} catch (Exception $e) {
    error_log("Error parsing input: " . $e->getMessage());
    $input = [];
}

// Fallback to regular POST if JSON parsing failed
if (empty($input) && !empty($_POST)) {
    $input = $_POST;
    error_log("Falling back to regular POST data: " . print_r($input, true));
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
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => $errorMsg,
        'missing_fields' => $missing_fields
    ]);
    exit;
}

// Validate email
if (!filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email format']);
    exit;
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
    $subject = "New Consultation Booking from $name";
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
    $subject = "New Consultation Request from $name";
    $email_content = "
New consultation request received:

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
$mail_sent = mail($admin_email, $subject, $email_content, implode("\r\n", $headers));

if ($mail_sent) {
    // Send confirmation email to user
    if ($is_booking_form) {
        // This is a booking form
        $user_subject = "Thank you for your consultation booking - Shanila Mindset and Clarity Coaching";
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
Shanila Mindset and Clarity Coaching
";
    } else {
        // This is the contact form
        $user_subject = "Thank you for your message - Shanila Mindset and Clarity Coaching";
        $user_content = "
Dear $name,

Thank you for reaching out to me through my website! I've received your message and appreciate you taking the time to contact me.

Here's a summary of your message:
$message

I'll review your message and get back to you within 24-48 hours. If your inquiry is urgent, please call me at [Your Phone Number] or text me at [Your WhatsApp Number].

Warm regards,
Shanila Khan
Shanila Mindset and Clarity Coaching
";
    }
    
    // Send confirmation email to user
    $user_headers = [
        'From: ' . $admin_email,
        'Reply-To: ' . $admin_email,
        'X-Mailer: PHP/' . phpversion(),
        'Content-Type: text/plain; charset=UTF-8'
    ];
    
    $user_mail_sent = mail($email, $user_subject, $user_content, implode("\r\n", $user_headers));
    
    if ($user_mail_sent) {
        error_log("Confirmation email sent to $email");
    } else {
        error_log("Failed to send confirmation email to $email");
    }
    
    // Log the email sending result
    if ($mail_sent) {
        error_log("Email sent to admin: $admin_email");
        
        // Return success response
        $response = [
            'success' => true,
            'message' => 'Your message has been sent successfully! I will get back to you soon.'
        ];
    } else {
        error_log("Failed to send email to admin: $admin_email");
        
        // Return error response
        $response = [
            'success' => false,
            'error' => 'Failed to send your message. Please try again later.'
        ];
    }
    
    // Return JSON response
    header('Content-Type: application/json');
    echo json_encode($response);
    exit;

// Log the request (optional)
if (isset($input['first-name'])) {
    $log_entry = date('Y-m-d H:i:s') . " - Consultation booking from $name ($email) - $service on $date at $time\n";
} else {
    $log_entry = date('Y-m-d H:i:s') . " - Consultation request from $name ($email)\n";
}
file_put_contents('consultation_requests.log', $log_entry, FILE_APPEND | LOCK_EX);

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
