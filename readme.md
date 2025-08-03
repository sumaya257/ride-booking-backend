# 🚘 Ride Booking API

### ✨ **Project Overview**

This is a **secure, scalable, and role-based backend API** for a ride booking platform (like Uber or Pathao), built using **Node.js**, **Express**, and **MongoDB**. The system is designed to support different user roles (**admin**, **rider**, and **driver**) with distinct permissions and responsibilities.

Key features:

* JWT-based authentication
* Role-based access control
* Rider & driver ride management
* Admin control panel
* Complete ride lifecycle and history

---

### ⚙️ **Setup & Environment Instructions**

#### 1. Clone the repository

```bash
git clone https://github.com/yourusername/ride-booking-api.git
cd ride-booking-api
```

#### 2. Install dependencies

```bash
npm install
```

#### 3. Create `.env` file

```env
PORT=5000
DATABASE_URI=your_database_uri
JWT_SECRET=your_jwt_secret
```

✅ **Admin credentials:**
**Email:** `admin@example.com`
**Password:** `123456`

#### 4. Run the development server

```bash
npm run dev
```

---

### 📒 **API Endpoints Summary**

---

#### ⛔️ Authentication

| Method | Endpoint             | Description            |
| ------ | -------------------- | ---------------------- |
| POST   | `/api/auth/register` | Register a new user    |
| POST   | `/api/auth/login`    | Login user and get JWT |

✅ **Register Body**

```json
{
  "name": "rider",
  "email": "rider@example.com",
  "password": "123456",
  "role": "rider"
}
```

✅ **Login Body**

```json
{
  "email": "rider@example.com",
  "password": "123456"
}
```

---

#### 🚗 Rides Endpoints

| Method | Endpoint                   | Description                     |
| ------ | -------------------------- | ------------------------------- |
| POST   | `/api/rides/request`       | Rider requests a ride           |
| PATCH  | `/api/rides/:id/cancel`    | Cancel ride (before acceptance) |
| GET    | `/api/rides/me`            | Rider views ride history        |
| PATCH  | `/api/rides/:id/accept`    | Driver accepts a ride           |
| PATCH  | `/api/rides/:id/status`    | Driver updates ride status      |
| GET    | `/api/rides/all-rides`     | Admin views all rides           |
| GET    | `/api/rides/earnings`      | Driver views earnings           |
| GET    | `/api/rides/pending-rides` | Driver gets pending ride list   |

🔸 **Authorization Header for all** (Add to Header):

```
Authorization: Bearer <your_token>
```

✅ **Request a Ride**

```json
{
  "pickupLocation": {
    "address": "Uttara",
    "lat": 23.7465,
    "lng": 90.3760
  },
  "destinationLocation": {
    "address": "Dhanmondi",
    "lat": 23.7925,
    "lng": 90.4078
  }
}
```

✅ **Update Ride Status**

```json
{
  "status": "completed"
}
```

---

#### 🚖 Driver Endpoints

| Method | Endpoint                    | Description                    |
| ------ | --------------------------- | ------------------------------ |
| PATCH  | `/api/drivers/availability` | Set driver online/offline      |
| PATCH  | `/api/drivers/approve/:id`  | Admin approves/suspends driver |

✅ **Set Availability**

```json
{
  "online": true
}
```

✅ **Approve/Suspend Driver (Admin only)**

```json
{
  "approve": true
}
```

---

#### 👮‍♂️ User/Admin Endpoints

| Method | Endpoint                | Description                   |
| ------ | ----------------------- | ----------------------------- |
| GET    | `/api/users`            | Admin views all users         |
| GET    | `/api/users?role=rider` | Admin views users by role     |
| PATCH  | `/api/users/block/:id`  | Admin blocks/unblocks user    |
| GET    | `/api/users/report`     | Admin generates system report |

✅ **Report Example Response**

```json
{
  "message": "Report generated",
  "report": {
    "users": { "total": 5, "blocked": 0 },
    "riders": { "total": 4 },
    "drivers": { "total": 1 },
    "rides": {
      "total": 5,
      "pending": 2,
      "active": 0,
      "completed": 1
    }
  }
}
```

---

### 📊 Postman API Collection

🔗 [Click here to open Postman Collection](https://sumaya-9533077.postman.co/workspace/Sumaya's-Workspace~9a4331e1-d5fe-40eb-8c94-17aefaca48cf/collection/46082450-c70a8fa9-6186-48f7-a896-0e4087a28593?action=share&creator=46082450)

---

### 💪 Tech Stack

* **Node.js** / **Express.js**
* **MongoDB** + **Mongoose**
* **JWT Authentication**
* **Bcrypt** for password hashing
* **TypeScript**
* **Express-validator**

---

### 📁 Project Structure

```
src/
├── modules/
│   ├── auth/
│   ├── user/
│   ├── ride/
│   ├── driver/
├── middlewares/
├── config/
├── utils/
├── app.ts
├── server.ts
```

