# Example Conversion — User Authentication

## Input RPI spec

```markdown
# User Authentication Feature

## Goals
1. Allow new users to register with email + password (MVP)
2. Support password reset flow (Important)
3. Add SSO option for enterprises (Future)

## Non-Goals
- OAuth/GitHub login (v1)
- Two-factor authentication (v2)

## Requirements
- Users register via email
- Password must be validated (min 8 chars, complexity rules)
- Reset link sent via email
- Session persists across page reloads
- Support PostgreSQL + Redis

## Acceptance Criteria
- User can register → confirm email → log in
- User can request password reset → receive link → set new password
- Session persists for 7 days
- Invalid passwords rejected with clear message

## Edge Cases
- User registers twice with same email (rejected)
- Password reset link expires after 1 hour
- Concurrent login attempts (session conflict)

## Success Metrics
- 95% email delivery
- <2 sec registration → dashboard
- <5% password reset failure rate
```

## Output Spec-Kit spec

```markdown
# Feature Specification: User Authentication

**Feature Branch**: `001-user-auth`

**Created**: 2026-06-17

**Status**: Ready

**Input**: RPI spec from `docs/specs/user-auth.md`

## User Scenarios & Testing *(mandatory)*

### User Story 1 - User Registration & Email Verification (Priority: P1)

Users can create an account by providing email and password, receive a confirmation email, and access the app after verification.

**Why this priority**: This is the core MVP feature that enables user identity and onboarding. Without it, no user can access the system.

**Independent Test**: New user can register with unique email, receive verification email, confirm email, and log in successfully. System rejects duplicate email registrations.

**Acceptance Scenarios**:
1. **Given** user is on registration page, **When** user enters email and valid password and clicks register, **Then** user receives confirmation email with 24-hour link
2. **Given** user receives confirmation email, **When** user clicks the link, **Then** user is marked verified and can log in
3. **Given** user tries to register with already-registered email, **When** user submits form, **Then** system shows "Email already in use" error

---

### User Story 2 - Password Reset (Priority: P2)

Authenticated or unauthenticated users can reset their password via email reset link.

**Why this priority**: Critical for user retention and account recovery. Moderate complexity; can be built after core auth works.

**Independent Test**: Logged-out user can request password reset, receive email, follow reset link, set new password, and log in with new password.

**Acceptance Scenarios**:
1. **Given** user is on login page, **When** user clicks "Forgot Password" and enters email, **Then** user sees confirmation message and receives reset email
2. **Given** user receives reset email, **When** user clicks reset link, **Then** user is directed to password set page
3. **Given** user enters new password on reset page, **When** user submits, **Then** password is updated and user can log in with new password

---

### User Story 3 - Enterprise SSO Option (Priority: P3)

Enterprise customers can enable SSO login for their team members (future phase).

**Why this priority**: Valuable for enterprise adoption but not required for MVP launch. Can be added in v2.

**Independent Test**: Enterprise admin can enable SSO, team member can log in via SSO provider, user is mapped to correct account.

**Acceptance Scenarios**:
1. **Given** enterprise admin has SSO configured, **When** team member visits login page, **Then** SSO option is available
2. **Given** team member clicks SSO, **When** team member authenticates with provider, **Then** team member is logged in automatically

---

### Edge Cases

* What happens if user registers twice with same email? (Reject with error)
* How long do password reset links stay valid? (1 hour)
* What happens if two users log in simultaneously from different devices? (Both sessions valid; last-one-wins not enforced v1)

## Requirements *(mandatory)*

### Functional Requirements

* **FR-001**: System MUST allow users to register with email and password
* **FR-002**: System MUST validate passwords (minimum 8 characters, [NEEDS CLARIFICATION: complexity rules not specified])
* **FR-003**: System MUST send verification email to user email address
* **FR-004**: System MUST mark user as verified only after email confirmation
* **FR-005**: Users MUST be able to request password reset from login page
* **FR-006**: System MUST send password reset link valid for 1 hour
* **FR-007**: System MUST persist session across page reloads for 7 days

### Key Entities

* **User**: Represents a registered user; attributes: email, password_hash, verified, created_at, updated_at; relationships: many sessions, many password_resets
* **Session**: Represents an active login session; attributes: user_id, token, created_at, expires_at; relationships: belongs to user
* **PasswordReset**: Represents a password reset request; attributes: user_id, token, created_at, expires_at; relationships: belongs to user

## Success Criteria *(mandatory)*

### Measurable Outcomes

* **SC-001**: Users can complete registration in under 2 minutes
* **SC-002**: System sends verification and reset emails with 95% delivery rate
* **SC-003**: Password reset completion rate reaches 90%
* **SC-004**: System supports 1000 concurrent authenticated sessions without degradation

## Assumptions

* Email service is available and configured
* PostgreSQL + Redis infrastructure exists or will be provisioned
* Frontend framework handles session tokens securely
* Users have access to verified email addresses
* Password reset links are not reusable after success

## Notes

* Converted from RPI spec: `docs/specs/user-auth.md`
* User Story 3 marked P3 — deprioritize until MVP auth proven
* Next step: run `/speckit.clarify` to resolve password complexity rules
* Then: run `/speckit.plan`
```
