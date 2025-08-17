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

// Validate required fields - handle both old contact form and new booking form
$required_fields = [];
$missing_fields = [];

// Check if this is a booking form (has first-name field) or contact form (has name field)
if (isset($input['first-name'])) {
    // This is a booking form
    $required_fields = ['first-name', 'last-name', 'email', 'phone', 'date', 'time', 'service'];
} else {
    // This is the old contact form
    $required_fields = ['name', 'email', 'phone', 'message'];
}

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
if (isset($input['first-name'])) {
    // This is a booking form
    $firstName = htmlspecialchars(trim($input['first-name']), ENT_QUOTES, 'UTF-8');
    $lastName = htmlspecialchars(trim($input['last-name']), ENT_QUOTES, 'UTF-8');
    $name = $firstName . ' ' . $lastName;
    $email = filter_var(trim($input['email']), FILTER_SANITIZE_EMAIL);
    $phone = htmlspecialchars(trim($input['phone']), ENT_QUOTES, 'UTF-8');
    $date = htmlspecialchars(trim($input['date']), ENT_QUOTES, 'UTF-8');
    $time = htmlspecialchars(trim($input['time']), ENT_QUOTES, 'UTF-8');
    $service = htmlspecialchars(trim($input['service']), ENT_QUOTES, 'UTF-8');
    $message = isset($input['message']) ? htmlspecialchars(trim($input['message']), ENT_QUOTES, 'UTF-8') : '';
} else {
    // This is the old contact form
    $name = htmlspecialchars(trim($input['name']), ENT_QUOTES, 'UTF-8');
    $email = filter_var(trim($input['email']), FILTER_SANITIZE_EMAIL);
    $phone = htmlspecialchars(trim($input['phone']), ENT_QUOTES, 'UTF-8');
    $message = htmlspecialchars(trim($input['message']), ENT_QUOTES, 'UTF-8');
}

// Prepare email content
if (isset($input['first-name'])) {
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
    'From: noreply@shanilalifecoaching.com',
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . phpversion(),
    'Content-Type: text/plain; charset=UTF-8'
];

// Send email to admin
$admin_email = 'info@innerjourney-with-shanila.com';
$mail_sent = mail($admin_email, $subject, $email_content, implode("\r\n", $headers));

// Send confirmation email to user
if (isset($input['first-name'])) {
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


Best regards,
Shanila Khan
";
} else {
    // This is the old contact form
    $user_subject = "Thank you for your consultation request - Shanila Mindset and Clarity Coaching";
    $user_content = "
Dear $name,

Thank you for reaching out to me! I have received your consultation request and am excited to help you on your transformation journey.

I will review your message and get back to you within 24-48 hours to schedule your consultation.


Best regards,
Shanila Khan


";
}

$user_headers = [
    'From: noreply@shanilalifecoaching.com',
    'X-Mailer: PHP/' . phpversion(),
    'Content-Type: text/plain; charset=UTF-8'
];

$user_mail_sent = mail($email, $user_subject, $user_content, implode("\r\n", $user_headers));

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
