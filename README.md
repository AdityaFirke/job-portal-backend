# Job Portal Backend

A role-based RESTful API designed to manage user authentication, job postings, and job applications across multiple user tiers. The system enforces strict security access control, dynamic data relationships, and HTTP-only cookie session management.

---

## Role-Based Access Control (RBAC) & Responsibilities

The system defines 3 distinct user roles, each with specific permissions and business logic:

### 1. Job Seeker
* **Profile Management:** Maintain personal profile details, including an embedded skills array, years of experience, and educational background.
* **Job Discovery:** Browse and view details of all active (`open`) job listings.
* **Application Workflow:** Apply for open positions by submitting resume links and optional cover letters (prevents duplicate applications for the same job).
* **Application Tracking:** View personal application history and monitor recruitment statuses (`applied`, `reviewed`, `interviewed`, `rejected`, `hired`).

### 2. Employer
* **Job Posting & Management:** Post new job openings detailing required skills, employment type, location, and salary ranges.
* **Listing Controls:** Close active job postings once positions are filled or expired.
* **Applicant Review:** Access and inspect full applicant profiles for jobs posted specifically by their employer account.
* **Status Updates:** Update candidate statuses as they move through the hiring pipeline.

### 3. Admin
* **User Oversight:** Inspect all registered accounts across the platform.
* **Account Moderation:** Toggle user account statuses (`active` vs. `blocked`) to manage platform access and security.
* **Content Moderation:** Remove non-compliant or fraudulent job postings system-wide.

---
