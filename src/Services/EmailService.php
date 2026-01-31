<?php

declare(strict_types=1);

namespace InnerJourney\Services;

/**
 * Email Service
 * 
 * Handles sending emails for contact forms and booking requests.
 * Uses PHP's built-in mail() function which works with cPanel's sendmail.
 */
final readonly class EmailService
{
    public function __construct(
        private string $adminEmail,
        private string $adminName,
        private string $adminPhone,
        private string $siteName,
    ) {}

    /**
     * Send the admin notification email.
     */
    public function sendAdminNotification(
        string $subject,
        string $content,
        string $replyToEmail,
    ): bool {
        $headers = $this->buildHeaders($replyToEmail, $replyToEmail);
        return @mail($this->adminEmail, $subject, $content, implode("\r\n", $headers));
    }

    /**
     * Send a confirmation email to the user.
     */
    public function sendUserConfirmation(
        string $toEmail,
        string $subject,
        string $content,
    ): bool {
        $headers = $this->buildHeaders($this->adminEmail, $this->adminEmail);
        return @mail($toEmail, $subject, $content, implode("\r\n", $headers));
    }

    /**
     * Build the booking admin notification email content.
     */
    public function buildBookingAdminEmail(
        string $name,
        string $email,
        string $phone,
        string $date,
        string $time,
        string $service,
        string $message,
    ): string {
        return <<<EMAIL
New consultation booking received:

Name: {$name}
Email: {$email}
Phone: {$phone}
Preferred Date: {$date}
Preferred Time: {$time}
Service: {$service}

Additional Information:
{$message}

---
This message was sent from the website booking form.
EMAIL;
    }

    /**
     * Build the contact form admin notification email content.
     */
    public function buildContactAdminEmail(
        string $name,
        string $email,
        string $phone,
        string $message,
    ): string {
        return <<<EMAIL
New message received:

Name: {$name}
Email: {$email}
Phone: {$phone}

Message:
{$message}

---
This message was sent from the website contact form.
EMAIL;
    }

    /**
     * Build the booking confirmation email for the user.
     */
    public function buildBookingUserEmail(
        string $name,
        string $date,
        string $time,
        string $service,
    ): string {
        return <<<EMAIL
Dear {$name},

Thank you for booking a consultation with me! I have received your booking request and am excited to work with you on your transformational journey.

Your booking details:
- Preferred Date: {$date}
- Preferred Time: {$time}
- Service: {$service}

I will review your booking and get back to you within 24-48 hours to confirm your appointment time.

If you have any questions, feel free to reply to this email.

Warm regards,
{$this->adminName}
{$this->siteName}
EMAIL;
    }

    /**
     * Build the contact form confirmation email for the user.
     */
    public function buildContactUserEmail(string $name, string $message): string
    {
        return <<<EMAIL
Dear {$name},

Thank you for reaching out to me through my website! I've received your message and appreciate you taking the time to contact me.

Here's a summary of your message:
{$message}

I'll review your message and get back to you within 24-48 hours. If your inquiry is urgent, please call or text me at {$this->adminPhone}.

Warm regards,
{$this->adminName}
{$this->siteName}
EMAIL;
    }

    /**
     * Build email headers array.
     *
     * @return string[]
     */
    private function buildHeaders(string $from, string $replyTo): array
    {
        return [
            'From: ' . $from,
            'Reply-To: ' . $replyTo,
            'X-Mailer: PHP/' . phpversion(),
            'Content-Type: text/plain; charset=UTF-8',
            'MIME-Version: 1.0',
        ];
    }
}
