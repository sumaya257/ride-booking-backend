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

---

#### 🚖 Driver Endpoints

| Method | Endpoint                    | Description                |
| ------ | --------------------------  | -------------------------- |
| PATCH  | `/api/drivers/availability` | Set online/offline status  |
| GET    | `/api/drivers/requests`     | View pending ride requests |

---

#### 👮‍♂️ Admin Endpoints

| Method | Endpoint                        | Description                         |
| ------ | ------------------------------- | ----------------------------------- |
| GET    | `/api/admin/users`              | View all users                      |
| PATCH  | `/api/admin/driver/:id/approve` | Approve or suspend a driver         |
| PATCH  | `/api/admin/user/:id/block`     | Block or unblock a user             |
| GET    | `/api/admin/report`             | Generate ride & user summary report |

---

### 📊 Example Response: `/api/admin/report`

```json
{
  "users": { "total": 120, "blocked": 10 },
  "riders": { "total": 70 },
  "drivers": { "total": 45 },
  "rides": {
    "total": 200,
    "pending": 12,
    "active": 5,
    "completed": 183
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
│   ├── rider/
│   ├── driver/
│   └── ride/
├── middlewares/
├── config/
├── utils/
├── app.ts
```

---

### 📪 Contact

For any issues or contributions, please open an issue or PR on the repo.

---

### 📝 License

This project is licensed under the MIT License.
