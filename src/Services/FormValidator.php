<?php

declare(strict_types=1);

namespace InnerJourney\Services;

use InnerJourney\Exceptions\ValidationException;

/**
 * Form Validator
 * 
 * Validates and sanitizes form input data.
 */
final class FormValidator
{
    /**
     * Validate that required fields are present.
     *
     * @param array<string, mixed> $data
     * @param string[] $requiredFields
     * @throws ValidationException
     */
    public function validateRequired(array $data, array $requiredFields): void
    {
        $missing = [];
        
        foreach ($requiredFields as $field) {
            if (!isset($data[$field]) || trim((string) $data[$field]) === '') {
                $missing[] = $field;
            }
        }

        if ($missing !== []) {
            throw new ValidationException(
                'Missing required fields: ' . implode(', ', $missing),
                $missing
            );
        }
    }

    /**
     * Validate email format.
     *
     * @throws ValidationException
     */
    public function validateEmail(string $email): string
    {
        $sanitized = filter_var(trim($email), FILTER_SANITIZE_EMAIL);
        
        if ($sanitized === false || !filter_var($sanitized, FILTER_VALIDATE_EMAIL)) {
            throw new ValidationException('Invalid email format');
        }

        return $sanitized;
    }

    /**
     * Sanitize a string value.
     */
    public function sanitizeString(mixed $value): string
    {
        if ($value === null) {
            return '';
        }
        
        return htmlspecialchars(trim((string) $value), ENT_QUOTES, 'UTF-8');
    }

    /**
     * Format a phone number with country code.
     */
    public function formatPhone(string $countryCode, string $phoneNumber): string
    {
        if ($phoneNumber === '') {
            return 'Not provided';
        }

        $countryCode = preg_replace('/[^0-9]/', '', $countryCode) ?? '';
        $phoneNumber = ltrim($phoneNumber, '+0');
        
        return '+' . $countryCode . ' ' . $phoneNumber;
    }

    /**
     * Check if this is a booking form submission.
     *
     * @param array<string, mixed> $data
     */
    public function isBookingForm(array $data): bool
    {
        return isset($data['first-name']);
    }

    /**
     * Get the required fields for the form type.
     *
     * @return string[]
     */
    public function getRequiredFields(bool $isBooking): array
    {
        if ($isBooking) {
            return ['first-name', 'last-name', 'email', 'phone', 'date', 'time', 'service'];
        }
        
        return ['name', 'email', 'message'];
    }
}
