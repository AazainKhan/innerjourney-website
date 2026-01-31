<?php

declare(strict_types=1);

namespace InnerJourney\Http;

/**
 * HTTP Request Handler
 * 
 * Encapsulates request data parsing and provides a clean interface
 * for accessing POST data from both JSON and form submissions.
 */
final readonly class Request
{
    /** @var array<string, mixed> */
    private array $data;
    private string $method;
    private bool $isJson;

    public function __construct()
    {
        $this->method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
        $this->isJson = $this->detectJsonRequest();
        $this->data = $this->parseRequestData();
    }

    /**
     * Get a value from the request data.
     */
    public function get(string $key, mixed $default = null): mixed
    {
        return $this->data[$key] ?? $default;
    }

    /**
     * Get all request data.
     *
     * @return array<string, mixed>
     */
    public function all(): array
    {
        return $this->data;
    }

    /**
     * Check if a key exists and is not empty.
     */
    public function has(string $key): bool
    {
        return isset($this->data[$key]) && $this->data[$key] !== '';
    }

    /**
     * Check if the request method matches.
     */
    public function isMethod(string $method): bool
    {
        return strtoupper($this->method) === strtoupper($method);
    }

    /**
     * Check if this is a JSON request.
     */
    public function isJson(): bool
    {
        return $this->isJson;
    }

    /**
     * Get the client's IP address.
     */
    public function ip(): string
    {
        return $_SERVER['HTTP_X_FORWARDED_FOR'] 
            ?? $_SERVER['HTTP_CLIENT_IP'] 
            ?? $_SERVER['REMOTE_ADDR'] 
            ?? 'unknown';
    }

    /**
     * Detect if the request is sending JSON.
     */
    private function detectJsonRequest(): bool
    {
        $contentType = $_SERVER['CONTENT_TYPE'] ?? '';
        return str_contains($contentType, 'application/json');
    }

    /**
     * Parse the request data based on content type.
     *
     * @return array<string, mixed>
     */
    private function parseRequestData(): array
    {
        $rawInput = file_get_contents('php://input') ?: '';

        if ($this->isJson && $rawInput !== '') {
            $decoded = json_decode($rawInput, true);
            if (json_last_error() === JSON_ERROR_NONE && is_array($decoded)) {
                /** @var array<string, mixed> $decoded */
                return $decoded;
            }
        }

        // Fall back to POST data or parse the raw input
        if (!empty($_POST)) {
            // Ensure string keys for type safety
            $result = [];
            foreach ($_POST as $key => $value) {
                $result[(string) $key] = $value;
            }
            return $result;
        }

        if ($rawInput !== '') {
            $parsed = [];
            parse_str($rawInput, $parsed);
            // Ensure string keys for type safety
            $result = [];
            foreach ($parsed as $key => $value) {
                $result[(string) $key] = $value;
            }
            return $result;
        }

        return [];
    }
}
