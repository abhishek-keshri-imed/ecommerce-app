# Ecommerce Full Stack Project (Production Ready)

A professional MERN stack application featuring a centralized Seller Dashboard and a secure, high-availability API infrastructure.

---

## 🏗 Project Architecture

This project follows a mono-repo structure for streamlined development and deployment.

* **/backend**: Node.js & Express server acting as a secure REST API.
* **/dashboard**: React & Vite frontend optimized for production.

---

## 🌐 Production Environment (IIS)

The application is deployed on **Internet Information Services (IIS)** using a Reverse Proxy architecture with full SSL encryption.

| Component | URL | Port | Service |
| :--- | :--- | :--- | :--- |
| **Frontend** | `https://ecommerce.test` | 443 | Static Files (Vite Build) |
| **Backend API** | `https://api.ecommerce.test` | 444 | Node.js (via Reverse Proxy) |

### Infrastructure Details:
* **Reverse Proxy**: IIS Application Request Routing (ARR) forwards requests from Port 444 to the internal Node process on Port 5000.
* **Process Management**: **PM2** manages the Node.js lifecycle, ensuring the API stays online 24/7.
* **SPA Routing**: A custom `web.config` is used in the `dist` folder to handle React Router client-side navigation.
* **SSL/TLS**: Secured with SNI-enabled certificates for local HTTPS development.

---

## 🚀 How to Run

### 1. Development Mode
Use this mode for active coding with Hot Module Replacement (HMR).

**Backend:**
```bash
cd backend
npm install
npm run dev


cd backend
pm2 restart ecommerce-api