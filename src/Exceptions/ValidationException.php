<?php

declare(strict_types=1);

namespace InnerJourney\Exceptions;

use Exception;

/**
 * Validation Exception
 * 
 * Thrown when form validation fails.
 */
final class ValidationException extends Exception
{
    /**
     * @param string[] $fields The fields that failed validation
     */
    public function __construct(
        string $message,
        private readonly array $fields = [],
        int $code = 400,
    ) {
        parent::__construct($message, $code);
    }

    /**
     * Get the fields that failed validation.
     *
     * @return string[]
     */
    public function getFields(): array
    {
        return $this->fields;
    }

    /**
     * Convert to array for JSON response.
     *
     * @return array<string, mixed>
     */
    public function toArray(): array
    {
        $result = [
            'success' => false,
            'error' => $this->getMessage(),
        ];

        if ($this->fields !== []) {
            $result['missing_fields'] = $this->fields;
        }

        return $result;
    }
}
