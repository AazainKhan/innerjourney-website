<?php
// Contact form handler for Shanila Mindset and Clarity Coaching website

// Set headers
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Get POST data
$input = json_decode(file_get_contents('php://input'), true);

// If JSON parsing failed, try regular POST
if (!$input) {
    $input = $_POST;
}

// Validate required fields
$required_fields = ['name', 'email', 'phone', 'service', 'message'];
$missing_fields = [];

foreach ($required_fields as $field) {
    if (empty($input[$field])) {
        $missing_fields[] = $field;
    }
}

if (!empty($missing_fields)) {
    http_response_code(400);
    echo json_encode([
        'error' => 'Missing required fields',
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
$name = htmlspecialchars(trim($input['name']), ENT_QUOTES, 'UTF-8');
$email = filter_var(trim($input['email']), FILTER_SANITIZE_EMAIL);
$phone = htmlspecialchars(trim($input['phone']), ENT_QUOTES, 'UTF-8');
$service = htmlspecialchars(trim($input['service']), ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars(trim($input['message']), ENT_QUOTES, 'UTF-8');
$preferred_time = isset($input['preferred_time']) ? htmlspecialchars(trim($input['preferred_time']), ENT_QUOTES, 'UTF-8') : '';

// Prepare email content
$subject = "New Consultation Request from $name";
$email_content = "
New consultation request received:

Name: $name
Email: $email
Phone: $phone
Service Interest: $service
Preferred Time: $preferred_time

Message:
$message

---
This message was sent from the Shanila Mindset and Clarity Coaching website contact form.
";

// Email headers
$headers = [
    'From: noreply@shanilalifecoaching.com',
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . phpversion(),
    'Content-Type: text/plain; charset=UTF-8'
];

// Send email to admin
$admin_email = 'admin@shanilalifecoaching.com'; // Change this to actual admin email
$mail_sent = mail($admin_email, $subject, $email_content, implode("\r\n", $headers));

// Send confirmation email to user
$user_subject = "Thank you for your consultation request - Shanila Mindset and Clarity Coaching";
$user_content = "
Dear $name,

Thank you for reaching out to Shanila Mindset and Clarity Coaching! We have received your consultation request and are excited to help you on your transformation journey.

Here's a summary of your request:
Service Interest: $service
Preferred Time: $preferred_time

We will review your message and get back to you within 24-48 hours to schedule your consultation.

In the meantime, feel free to explore our website to learn more about our services and approach.

Best regards,
The Shanila Mindset and Clarity Coaching Team

---
Shanila Mindset and Clarity Coaching
Transforming lives through expert guidance
";

$user_headers = [
    'From: noreply@shanilalifecoaching.com',
    'X-Mailer: PHP/' . phpversion(),
    'Content-Type: text/plain; charset=UTF-8'
];

$user_mail_sent = mail($email, $user_subject, $user_content, implode("\r\n", $user_headers));

// Log the request (optional)
$log_entry = date('Y-m-d H:i:s') . " - Consultation request from $name ($email) for $service\n";
file_put_contents('consultation_requests.log', $log_entry, FILE_APPEND | LOCK_EX);

// Prepare response
if ($mail_sent) {
    $response = [
        'success' => true,
        'message' => 'Thank you! Your consultation request has been received. We will contact you within 24-48 hours to schedule your session.',
        'timestamp' => date('Y-m-d H:i:s')
    ];
    
    http_response_code(200);
} else {
    $response = [
        'error' => 'Failed to send consultation request. Please try again or contact us directly.',
        'timestamp' => date('Y-m-d H:i:s')
    ];
    
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
