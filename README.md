<a name="readme-top"></a>

<div align="center">

  <h3 align="center">PaySecure - Real-time Transaction & Audit Log System</h3>

  <p align="center">
    A backend-focused MERN stack application for secure, atomic money transfers
    with complete transaction auditability.
  </p>
</div>


<!-- TABLE OF CONTENTS -->


<!-- ABOUT THE PROJECT -->
## About The Project
This is a full-stack money transfer system built to handle user registration, authentication, wallet balance management, and secure peer-to-peer money transfers.
The project is split into two main parts: a Node.js + Express backend API with MongoDB, and a React frontend dashboard.

The core focus of this system is transaction safety and data consistency. Specifically, it implements MongoDB transactions and sessions to ensure atomic balance updates and maintains an immutable audit log for every successful transfer. This guarantees that either all transfer operations succeed or none do, preventing partial or inconsistent states.

Instead of numeric user IDs, the system uses email addresses (Gmail IDs) as unique identifiers, mirroring real-world digital payment systems.

## GitHub Link:
https://github.com/Eepsita12/PaySecure

---

### Built With

* [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
* [![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
* [![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
* [![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
* [![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)

---------
## Usage
### 1. Registration
Users can register using their email address and password.

<img width="1919" height="864" alt="image" src="https://github.com/user-attachments/assets/5441bbdd-9f30-478c-834c-85a3d393ba38" />


---

### 2. Login
Registered users can log in and receive a JWT token for authenticated access.

<img width="1918" height="869" alt="image" src="https://github.com/user-attachments/assets/b85aca05-45a9-47c4-a3ec-1d5aa5ad8ac6" />


---

### 3. Dashboard
The dashboard displays the current wallet balance and the payment element.

<img width="1904" height="863" alt="image" src="https://github.com/user-attachments/assets/6c18cdcf-dd1a-4ffd-91ca-d5c350a117f3" />



---

### 4. Money Transfer
Users can transfer money by entering the receiver’s email address and transfer amount.

---

### 5. Transaction History
Users can view all sent and received transactions with timestamps.

<img width="1891" height="820" alt="image" src="https://github.com/user-attachments/assets/5d32308d-164d-4b04-b1bd-4c9a5fff53a1" />


---

## Implementation approach and core logic 

### 1. Backend Implementation

a. **Authentication & Authorization**  
  - Users are authenticated using JWT tokens generated during login.  
  - Tokens include the user’s email and expiration metadata.  
  - All sensitive routes are protected via JWT middleware.  

b. **Transaction Handling & Atomicity**  
  - Money transfers are executed inside MongoDB sessions and transactions.
  - The balance amount is set to Rs. 1000 by default for mocking transactions.  
  - Sender balance deduction and receiver balance credit occur atomically.  
  - If any step fails, the entire transaction is rolled back automatically.  

c. **Audit Log System**  
  - Each successful transfer generates an immutable audit log entry.  
  - Audit logs store sender email, receiver email, transfer amount, timestamp, and status.  
  - Logs are stored in a separate collection for traceability and integrity.  

d. **Data Validation**  
  - Validations ensure sender and receiver existence.  
  - Prevents transfers with insufficient balance or invalid amounts.  
  - Ensures transaction correctness before execution.  

e. **Error Handling**  
  - Centralized error responses for authentication, validation, and transfer failures.  
  - Clear error messages for insufficient balance, invalid users, and unauthorized access.  

### 2. Frontend Implementation

a. **API Integration**  
  - Axios is used for HTTP requests.  
  - JWT tokens are attached to requests via the `Authorization` header.  

b. **Routing & Route Protection**  
  - Client-side routing handled using `react-router-dom`.  
  - Protected routes ensure only authenticated users can access the dashboard.  
  - Unauthorized users are redirected to the login page.  

c. **State Management & UI Updates**  
  - React Hooks (`useState`, `useEffect`) manage application state.  
  - Wallet balance and transaction history refresh automatically after transfers.  

d. **UI & Feedback**  
  - Clean and responsive UI for transfers and transaction viewing.  
  - Success and error messages displayed based on API responses.  

  ---
## Development Setup Guide

Follow these instructions to get the project up and running on your local machine.

---

## Backend Setup
```bash
cd backend
npm install
npm run dev
```
## Frontend Setup

```bash
cd frontend
npm install
npm start
```

## Environment Configuration
Create a .env file in the backend directory:
```bash
env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## API Endpoints
| Endpoint           | Method | Auth Required | Request Body (JSON)                        | Description & Key Logic                     |
|-------------------|--------|---------------|-------------------------------------------|--------------------------------------------|
| /api/register      | POST   | ❌ No         | {"email": "...", "password": "..."}       | Registers a new user account.              |
| /api/login         | POST   | ❌ No         | {"email": "...", "password": "..."}       | Authenticates user and returns a JWT token.|
| /api/transfer      | POST   | ✅ Yes        | {"receiverEmail": "...", "amount": number}| Performs an atomic money transfer.         |
| /api/transactions  | GET    | ✅ Yes        | None                                      | Fetches transaction history for the user. |



## 🤖 AI Assistance & Contribution Analysis

This section documents how AI tools were used during development, along with a transparent evaluation of their effectiveness. Final implementation decisions, validations, and refinements were performed manually.

---

### 1. Backend Transaction Logic AI Agent  
**Tool Used:** ChatGPT  
**Score:** ⭐⭐⭐ (3 / 5)

- Assisted in designing MongoDB transaction flows using sessions.
- Helped conceptualize atomic balance updates for sender and receiver.
- Provided guidance on rollback safety during failed transfers.
- While the AI helped with overall transaction structure, manual debugging was required to correctly manage session lifecycles.
- Edge cases such as partial failures and proper error propagation needed human intervention.
- Final correctness and reliability depended heavily on manual testing and refinements.

---

### 2. JWT Authentication & Middleware AI Agent  
**Tool Used:** ChatGPT  
**Score:** ⭐⭐⭐ (3 / 5)

- Assisted in structuring JWT-based authentication logic.
- Helped outline middleware for route protection.
- Suggested token verification and authorization flow.
- AI-generated middleware logic required adjustments to align with Express request flow.
- Token decoding and error-handling logic needed manual correction.
- Security-related decisions (status codes, error messages, middleware order) were finalized manually.

---

### 3. Frontend State Synchronization AI Agent  
**Tool Used:** Gemini  
**Score:** ⭐⭐⭐⭐⭐ (5 / 5)

- Assisted in implementing real-time UI state updates after transactions.
- Helped synchronize wallet balance and transaction history without page reloads.
- Improved frontend responsiveness and user experience.
- Suggestions were directly applicable and required minimal modification.
- Successfully reduced redundant API calls and improved state consistency.
- Delivered optimal results with little to no manual correction.

---

### 4. Error Debugging & Validation AI Agent  
**Tool Used:** ChatGPT  
**Score:** ⭐⭐⭐⭐ (4 / 5)

- Assisted in identifying backend and frontend runtime errors.
- Helped trace issues related to API responses and state mismatches.
- Provided debugging strategies and fixes.
- AI effectively identified most issues, but some bugs required deeper contextual understanding.
- Edge cases and environment-specific errors were resolved manually.
- Final validation and testing remained a human-driven process.

---

### 5. README & Documentation AI Agent  
**Tool Used:** ChatGPT  
**Score:** ⭐⭐⭐⭐ (4 / 5)

- Assisted in structuring project documentation.
- Helped improve clarity, formatting, and technical explanations.
- Ensured assignment requirements were clearly addressed.
- Technical accuracy was reviewed and refined manually.
- Some sections were rewritten to better reflect actual implementation.
- Final documentation tone and content alignment were human-curated.

---

## Thank You

