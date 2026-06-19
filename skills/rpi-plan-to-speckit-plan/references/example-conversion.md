# Example Conversion — User Auth Plan

## Input RPI plan

```markdown
# Implementation Plan: User Authentication

## Technical Context
- Language: Python 3.11
- Framework: FastAPI
- Storage: PostgreSQL + Redis
- Testing: pytest
- Platform: Linux/Docker
- Performance: <100ms response for auth endpoints
- Constraints: Must support 10k concurrent sessions

## Architecture Decisions
- Service-oriented: separate Auth Service, User Service, API Gateway
- Password hashing: bcrypt 12 rounds
- Sessions: JWT + httpOnly cookies, 7-day expiry
- Email: AsyncIO queue to SendGrid

## Project Structure (Selected: Web App)
- backend/src/ → models/, services/, api/
- frontend/src/ → components/, pages/, services/ (future phase)

## Complexity Justification
- Added Redis for session caching: Needed for performance (10k sessions in-memory queries)
- Service separation: Simpler monolith insufficient due to reuse requirements

## Assumptions
- PostgreSQL + Redis provisioned and accessible
- SendGrid API key configured
- Frontend will use httpOnly cookies securely

## Blockers
- Email service integration timeline unclear; assuming availability
- Performance testing needed before launch
```

## Output Spec-Kit plan

```markdown
# Implementation Plan: User Authentication

**Branch**: `001-user-auth` | **Date**: 2026-06-17 | **Spec**: `spec.md`

**Input**: RPI plan from `docs/scope-research/user-auth-plan.md`

## Summary

Build user authentication system supporting email registration, password reset, and session management. Use FastAPI backend with PostgreSQL + Redis for session caching and performance.

## Technical Context

**Language/Version**: Python 3.11
**Primary Dependencies**: FastAPI, SQLAlchemy, bcrypt, redis-py
**Storage**: PostgreSQL (user accounts, password resets), Redis (session cache)
**Testing**: pytest with asyncio plugin
**Target Platform**: Linux/Docker (cloud deployment)
**Project Type**: web-service (REST API backend)
**Performance Goals**: <100ms response time for auth endpoints (p95)
**Constraints**: Support 10k concurrent sessions without degradation; <500MB memory footprint
**Scale/Scope**: Initial launch targets 100k users; scale to 1M users in v2

## Constitution Check

- [x] Python 3.11 approved for new services
- [x] FastAPI + SQLAlchemy is standard backend stack
- [x] PostgreSQL + Redis approved for state management
- [ ] Performance testing gate: must complete before release

## Project Structure

### Documentation (this feature)

```text
specs/001-user-auth/
├── spec.md
├── plan.md
├── data-model.md
├── contracts/
└── tasks.md
```

### Source Code (repository root)

**Selected: Option 2 (Web application with separate backend/frontend)**

Backend:
```text
backend/
├── src/
│   ├── models/
│   ├── services/
│   ├── api/
│   ├── middleware/
│   └── config.py
└── tests/
```

Frontend: Deferred to Phase 2 (separate feature)

**Rationale**: Web API first allows mobile + web clients to share auth. Frontend in separate feature branch enables parallel development.

## Design Decisions

### Core Architecture
- Layered architecture: API → Services → Models → Storage
- Service-oriented split: Auth Service, User Service, Mail Service
- Async-first request handling for concurrent traffic

### Key Design Patterns
- Repository pattern for data access
- Middleware for cross-cutting concerns
- Dependency injection for service wiring

### Data Model
- User has many Sessions and PasswordResets
- Session belongs to User
- PasswordReset belongs to User

### Security & Performance Considerations
- bcrypt 12 rounds
- JWT + httpOnly cookies
- email verification tokens
- Redis session caching

## Risk & Assumption Review
- Assumption: PostgreSQL and Redis are available
- Risk: SendGrid outage blocks registration
- Blocker: load-testing environment unavailable until next sprint
- Unknown: mobile auth requirements in v2

## Next Steps
1. Generate tasks
2. Start setup and foundational work
3. Validate each story independently
4. Run review after implementation
```
