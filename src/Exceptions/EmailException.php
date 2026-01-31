<?php

declare(strict_types=1);

namespace InnerJourney\Exceptions;

use Exception;

/**
 * Email Exception
 * 
 * Thrown when email sending fails.
 */
final class EmailException extends Exception
{
    public function __construct(
        string $message = 'Failed to send email',
        private readonly string $recipient = '',
        int $code = 500,
    ) {
        parent::__construct($message, $code);
    }

    /**
     * Get the intended recipient.
     */
    public function getRecipient(): string
    {
        return $this->recipient;
    }
}
