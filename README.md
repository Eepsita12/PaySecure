<a name="readme-top"></a>

<br />

<div align="center">

  <h3 align="center">Secure Money Transfer & Audit Log System</h3>

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

The core focus of this system is **transaction safety and data consistency**. Specifically, it implements **MongoDB transactions and sessions** to ensure atomic balance updates and maintains an **immutable audit log** for every successful transfer. This guarantees that either all transfer operations succeed or none do, preventing partial or inconsistent states.

Instead of numeric user IDs, the system uses **email addresses (Gmail IDs)** as unique identifiers, mirroring real-world digital payment systems.

## GitHub Link:
https://github.com/your-username/lenden-assignment

---

### Built With

* [![Node.js][Node]][Node-url]
* [![Express][Express]][Express-url]
* [![MongoDB][Mongo]][Mongo-url]
* [![React][React.js]][React-url]
* [![JWT][JWT]][JWT-url]
---------
## Usage
### 1. Registration
Users can register using their email address and password.

---

### 2. Login
Registered users can log in and receive a JWT token for authenticated access.

---

### 3. Dashboard
The dashboard displays the current wallet balance and recent transaction history.

---

### 4. Money Transfer
Users can transfer money by entering the receiver’s email address and transfer amount.

---

### 5. Transaction History
Users can view all sent and received transactions with timestamps.

---

## 6. Implementation approach and core logic 

### 1. Backend Implementation

a. **Authentication & Authorization**  
  - Users are authenticated using JWT tokens generated during login.  
  - Tokens include the user’s email and expiration metadata.  
  - All sensitive routes are protected via JWT middleware.  

b. **Transaction Handling & Atomicity**  
  - Money transfers are executed inside MongoDB sessions and transactions.  
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

### Option 1: Backend Setup
```bash
cd backend
npm install
npm run dev
Option 2: Frontend Setup
bash
Copy code
cd frontend
npm install
npm start
Environment Configuration
Create a .env file in the backend directory:

env
Copy code
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
API Endpoints
Endpoint	Method	Auth Required	Request Body (JSON)	Description & Key Logic
/api/register	POST	❌ No	{"email": "...", "password": "..."}	Registers a new user account.
/api/login	POST	❌ No	{"email": "...", "password": "..."}	Authenticates user and returns a JWT token.
/api/balance	GET	✅ Yes	None	Fetches current wallet balance.
/api/transfer	POST	✅ Yes	{"receiverEmail": "...", "amount": number}	Performs an atomic money transfer.
/api/transactions	GET	✅ Yes	None	Fetches transaction history for the user.

AI USAGE LOG
1. Backend Transaction Logic
AI Agent: ChatGPT
Score: ⭐⭐⭐⭐⭐ (5 / 5)

Assisted in designing MongoDB transaction and session-based logic.

Helped ensure atomic balance updates and rollback safety.

Significantly improved backend reliability.

2. JWT Authentication & Middleware
AI Agent: ChatGPT
Score: ⭐⭐⭐⭐☆ (4 / 5)

Helped structure JWT authentication and route protection.

Minor manual refinements required for middleware flow.

3. Frontend State Synchronization
AI Agent: ChatGPT
Score: ⭐⭐⭐⭐⭐ (5 / 5)

Assisted with automatic UI updates after transfers.

Improved user experience without requiring page reloads.

4. Error Debugging & Validation
AI Agent: ChatGPT
Score: ⭐⭐⭐⭐☆ (4 / 5)

Assisted in identifying backend and frontend errors.

Manual validation ensured correct edge-case handling.

5. README & Documentation
AI Agent: ChatGPT
Score: ⭐⭐⭐⭐⭐ (5 / 5)

Helped structure and refine project documentation.

Ensured clarity, assignment compliance, and readability.

Thank you!

