# Ride Booking API

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
DATABASE_URI=your database uri
JWT_SECRET=your_jwt_secret
```
####  admin email - admin@example.com , pass - 123456

#### 4. Run the development server

```bash
npm run dev
```

---

### 📒 **API Endpoints Summary**

#### ⛔️ Authentication

| Method | Endpoint             | Description                 |
| ------ | -------------------- | --------------------------- |
| POST   | `/api/auth/register` | Register a new user         |
| POST   | `/api/auth/login`    | Login and receive JWT token |

---

#### 🚗 Rides Endpoints

| Method | Endpoint                   | Description                     |
| ------ | ------------------------   | ------------------------------- |
| POST   | `/api/rides/request`       | Request a ride                  |
| PATCH  | `/api/rides/:id/cancel`    | Cancel ride (before acceptance) |
| GET    | `/api/rides/me`            | View ride history               |
| PATCH  | `/api/rides/:id/accept`    | Driver accept a ride            |
| PATCH  | `/api/rides/:id/status`    | Update ride status              |
| GET    | `/api/rides/all-rides`     | Admin views all rides           |
| GET    | `/api/rides/earnings`      | Driver views ride earnings      |
| GET    | `/api/rides/pending-rides` | Driver view pending ride request|

---

#### 🚖 Driver Endpoints

| Method | Endpoint                    | Description                |
| ------ | --------------------------  | -------------------------- |
| PATCH  | `/api/drivers/availability` | Set online/offline status  |
| PATCH  | `/api/drivers/approve/:id`  | Admin approve the driver   |

---

#### 👮‍♂️ user Endpoints

| Method | Endpoint                        | Description                         |
| ------ | ------------------------------- | ----------------------------------- |
| GET    | `/api/users`                    | Admin views all users               |
| GET    | `/api/users?role=rider`         | Admin views users by role           |
| PATCH  | `/api/users/block/:id`          | Admin block or unblock a user       |
| GET    | `/api/users/report`             | Generate ride & user summary report |

---

### 📊 Example Response: `/api/users/report`

```json
{
    "message": "Report generated",
    "report": {
        "users": {
            "total": 5,
            "blocked": 0
        },
        "riders": {
            "total": 4
        },
        "drivers": {
            "total": 1
        },
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

### 💪 Tech Stack

* **Node.js** / **Express.js**
* **MongoDB** with **Mongoose**
* **JWT** authentication
* **Bcrypt** for password hashing
* **TypeScript**
* **Express-validator** for request validation

---

### 📅 Project Structure

```
src/
├── modules/
│   ├── auth/
│   ├── user/
│   ├── ride/
│   ├── driver/
│   └── user/
├── middlewares/
├── config/
├── utils/
├── app.ts/
├── server.ts
```

---

### 📪 Contact

For any issues or contributions, please open an issue or PR on the repo.
