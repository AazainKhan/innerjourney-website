# PHP Modernization Plan for Inner Journey Website

## 📊 Current State Analysis

### Hosting Environment (from cPanel)
- **cPanel Version:** 118.0 (build 40)
- **Server:** whmhost33 on Linux (x86_64)
- **Apache:** 2.4.63
- **Database:** MariaDB 10.6.20
- **PHP:** Updated to 8.4 ✅
- **Deployment:** Git-based via `.cpanel.yml`

### Current PHP Codebase

| File | Purpose | Lines | Status |
|------|---------|-------|--------|
| `contact.php` | Contact/booking form handler | 349 | Functional but legacy |
| `email-config.php` | Email/SMTP config + test page | 151 | Dev/debug tool, mixed HTML/PHP |
| `error_log.php` | Error logging test | 12 | Simple debug utility |
| `php.ini` | Local mail config | 31 | Local dev only |

### Key Findings
1. ✅ **Strengths:** Error logging, input sanitization, CORS handling, JSON responses
2. ⚠️ **No Composer** – no dependency management or autoloading
3. ⚠️ **No PSR standards** – no namespaces, interfaces, or modern structure
4. ⚠️ **Single monolithic file** – `contact.php` handles everything (validation, email, logging, response)
5. ⚠️ **Inline configuration** – admin email and settings hardcoded
6. ⚠️ **No type declarations** – missing PHP 8's strict typing features
7. ⚠️ **Mixed concerns** – `email-config.php` is both config and HTML test page

---

## 🎯 Modernization Goals

1. **Maintain Backwards Compatibility** – existing form endpoints (`contact.php`) continue working
2. **Leverage PHP 8.4 Features** – typed properties, union types, attributes, constructor promotion
3. **Introduce Composer** – for autoloading and future package management
4. **Add Structure Without Overhaul** – gradual refactoring, not a rewrite
5. **Improve Developer Experience** – better error handling, configuration, testing

---

## 📋 Phased Implementation Plan

### Phase 1: Foundation (Low Risk)
*Estimated effort: 2-3 hours*

| Task | Description | Status |
|------|-------------|--------|
| 1.1 Add Composer | Initialize `composer.json` with PSR-4 autoloading for a new `src/` directory | ✅ |
| 1.2 Create Config System | Create `config/app.php` with environment-based settings | ✅ |
| 1.3 Add .env Support | Use `vlucas/phpdotenv` for environment variables | ✅ |
| 1.4 Update .cpanel.yml | Add `composer install --no-dev` to deployment tasks | ✅ |

**New File Structure:**
```
/
├── composer.json          ← NEW
├── config/
│   └── app.php            ← NEW (centralized config)
├── src/                   ← NEW (modern PHP classes)
├── contact.php            ← Keep (wrapper/entry point)
└── .env.example           ← NEW (environment template)
```

---

### Phase 2: Refactor Core Logic (Medium Risk)
*Estimated effort: 4-6 hours*

| Task | Description | Status |
|------|-------------|--------|
| 2.1 Create Service Classes | Extract logic into typed classes: `FormValidator`, `EmailService`, `JsonResponder` | ✅ |
| 2.2 Add Type Declarations | Full strict typing with PHP 8.4 (return types, typed properties, union types) | ✅ |
| 2.3 Refactor contact.php | Keep as thin entry point; delegate to new classes | ✅ |
| 2.4 Create Request Class | Encapsulate `$_POST`/`php://input` handling in a `Request` class | ✅ |

**Example New Class:**
```php
// src/Services/EmailService.php
declare(strict_types=1);

namespace InnerJourney\Services;

final readonly class EmailService
{
    public function __construct(
        private string $adminEmail,
        private string $fromName,
    ) {}
    
    public function sendToAdmin(string $subject, string $content, string $replyTo): bool
    {
        // Implementation
    }
}
```

---

### Phase 3: Validation & Error Handling (Medium Risk)
*Estimated effort: 3-4 hours*

| Task | Description | Status |
|------|-------------|--------|
| 3.1 Create Validation DTOs | Use PHP 8 attributes for form validation rules | ⬜ |
| 3.2 Add Exception Classes | Custom exceptions: `ValidationException`, `EmailException` | ✅ |
| 3.3 Centralized Error Handler | Global exception handler with proper logging | ⬜ |
| 3.4 Add Rate Limiting | Simple file-based or session-based rate limiting | ⬜ |

---

### Phase 4: Testing & Quality (Optional but Recommended)
*Estimated effort: 3-5 hours*

| Task | Description | Status |
|------|-------------|--------|
| 4.1 Add PHPUnit | Unit tests for service classes | ⬜ |
| 4.2 Add PHPStan | Static analysis at level 8 for type safety | ✅ |
| 4.3 Add PHP-CS-Fixer | Automated code style (PSR-12) | ✅ |
| 4.4 GitHub Actions | CI/CD for tests and linting on PR | ⬜ |

---

## 📁 Proposed Final Structure

```
/
├── composer.json
├── composer.lock
├── config/
│   ├── app.php
│   └── mail.php
├── src/
│   ├── DTOs/
│   │   ├── BookingRequest.php
│   │   └── ContactRequest.php
│   ├── Exceptions/
│   │   ├── ValidationException.php
│   │   └── EmailException.php
│   ├── Services/
│   │   ├── EmailService.php
│   │   ├── FormValidator.php
│   │   └── RequestHandler.php
│   └── Http/
│       ├── Request.php
│       └── JsonResponse.php
├── contact.php              ← Thin entry point (includes autoloader, delegates)
├── .env.example
├── .gitignore               ← Add vendor/ and .env
└── phpstan.neon             ← Static analysis config
```

---

## 🔄 Deployment Changes

Update `.cpanel.yml`:
```yaml
deployment:
  tasks:
    - export DEPLOYPATH=/home/innerjourneywith/public_html/
    # NEW: Install Composer dependencies
    - cd $DEPLOYPATH && composer install --no-dev --optimize-autoloader
    # ... existing copy tasks ...
    - /bin/cp -R src $DEPLOYPATH
    - /bin/cp -R config $DEPLOYPATH
    - /bin/cp composer.json $DEPLOYPATH
    - /bin/cp composer.lock $DEPLOYPATH
```

---

## ⚠️ Risk Mitigation

1. **Keep `contact.php` URL intact** – no breaking changes to form endpoints
2. **Feature flag new code** – can toggle between old/new implementations
3. **Test on staging first** – cPanel allows subdomain testing
4. **Rollback plan** – git revert to any previous commit

---

## 🚀 Quick Wins (Immediate Improvements)

These can be done right now with minimal risk:

1. **Add `declare(strict_types=1);`** to all PHP files
2. **Extract admin email to config** – remove hardcoded `info@innerjourney-with-shanila.com`
3. **Remove `email-config.php`** from production deploy (it's a dev tool with security risk)
4. **Add proper error log rotation** – currently logs grow indefinitely

---

## 📊 Priority Matrix

| Priority | Phase | Impact | Effort | Risk |
|----------|-------|--------|--------|------|
| **HIGH** | Phase 1 (Composer + Config) | Foundation for everything | Low | Very Low |
| **HIGH** | Quick Wins | Immediate security/quality | Very Low | None |
| **MEDIUM** | Phase 2 (Service Classes) | Code quality + maintainability | Medium | Low |
| **MEDIUM** | Phase 3 (Validation) | Robustness | Medium | Low |
| **LOW** | Phase 4 (Testing) | Long-term quality | Medium | None |

---

## Progress Log

- **2026-01-31**: Plan created, beginning Phase 1 implementation
- **2026-01-31**: Phase 1 completed:
  - Added `composer.json` with PSR-4 autoloading
  - Created `config/app.php` with centralized configuration
  - Added `.env.example` for environment variables
  - Updated `.cpanel.yml` for deployment
  - Updated `.gitignore` for vendor/ and .env
- **2026-01-31**: Phase 2 completed:
  - Created `src/Http/JsonResponse.php` - JSON response helper
  - Created `src/Http/Request.php` - Request encapsulation
  - Created `src/Services/EmailService.php` - Email handling
  - Created `src/Services/FormValidator.php` - Input validation
  - Created `contact-new.php` - modernized entry point with legacy fallback
- **2026-01-31**: Phase 3 partially completed:
  - Created `src/Exceptions/ValidationException.php`
  - Created `src/Exceptions/EmailException.php`
- **2026-01-31**: Phase 4 partially completed:
  - Added PHPStan config (`phpstan.neon`) - passes level 8
  - Added PHP-CS-Fixer in composer.json

## Next Steps

1. **Test locally**: Run `contact-new.php` with test requests
2. **Replace `contact.php`**: Once tested, rename `contact-new.php` to `contact.php`
3. **Deploy to staging**: Test on cPanel subdomain before production
4. **Add remaining features**: DTOs, rate limiting, PHPUnit tests
