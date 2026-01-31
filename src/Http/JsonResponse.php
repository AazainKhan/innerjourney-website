<?php

declare(strict_types=1);

namespace InnerJourney\Http;

/**
 * JSON Response Helper
 * 
 * Provides a clean interface for sending JSON responses with proper headers.
 */
final readonly class JsonResponse
{
    /**
     * Send a JSON response and terminate execution.
     *
     * @param array<string, mixed> $data
     */
    public static function send(array $data, int $statusCode = 200): never
    {
        http_response_code($statusCode);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($data, JSON_THROW_ON_ERROR | JSON_UNESCAPED_UNICODE);
        exit;
    }

    /**
     * Send a success response.
     *
     * @param array<string, mixed> $extra Additional data to include
     */
    public static function success(string $message, array $extra = []): never
    {
        self::send([
            'success' => true,
            'message' => $message,
            'timestamp' => date('Y-m-d H:i:s'),
            ...$extra,
        ]);
    }

    /**
     * Send an error response.
     *
     * @param array<string, mixed> $extra Additional data to include
     */
    public static function error(string $message, int $statusCode = 400, array $extra = []): never
    {
        self::send([
            'success' => false,
            'error' => $message,
            'timestamp' => date('Y-m-d H:i:s'),
            ...$extra,
        ], $statusCode);
    }
}
