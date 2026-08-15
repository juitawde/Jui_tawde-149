# 🏥 Carevia — Hospital Management System

Carevia is a full-stack **Hospital Management System** designed to simplify hospital and bed management through a clean, modern web interface.

The application provides secure user authentication, hospital CRUD operations, real-time bed availability information, and a responsive dashboard for monitoring hospital resources.

🌐 **Live Website:** https://hospital-management-chi-flame.vercel.app/

---

## ✨ Features

### 🔐 User Authentication
- User registration
- Secure login and logout
- Passport.js authentication
- Session-based authentication
- Password hashing using bcrypt
- Protected application access

### 🏥 Hospital Management
- Add new hospitals
- View all hospitals
- Update hospital information
- Delete hospitals
- View individual hospital details
- Track hospital location and capacity

### 🛏️ Bed Availability
- Track total beds
- Track available beds
- Track occupied beds
- Quickly identify hospitals with available beds
- Dashboard statistics for bed availability

### 📊 Dashboard
- Total hospitals count
- Hospitals with available beds
- Total available beds
- Quick overview of the hospital management system
- Clean and responsive interface

### 🎨 Modern UI
- Responsive design
- Professional healthcare-inspired interface
- Interactive buttons and cards
- Hover effects and transitions
- Lucide React icons
- Clean typography and spacing
- Mobile-friendly layout

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- JavaScript
- CSS3
- Lucide React

### Backend
- Node.js
- Express.js
- RESTful API
- Passport.js
- Passport Local Strategy
- Express Session

### Database
- MongoDB
- Mongoose

### Authentication & Security
- Passport.js
- bcryptjs
- Express Session
- CORS

### Deployment
- Vercel — Frontend
- Render — Backend
- MongoDB Atlas — Database

---

## 🏗️ Project Architecture

```text
Carevia/
│
├── backend/
│   ├── controllers/
│   │   └── authController.js
│   │
│   ├── middleware/
│   │   └── logger.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Hospital.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── hospitalRoutes.js
│   │
│   ├── db.js
│   ├── passport.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## 🔄 Application Flow

User
  │
  ▼
React Frontend
  │
  │ HTTP Requests
  ▼
Express REST API
  │
  ├── Passport Authentication
  │
  ├── Hospital Routes
  │
  └── User Routes
  │
  ▼
Mongoose
  │
  ▼
MongoDB Database

---

## 🔑 API Endpoints

Authentication:

| Method | Endpoint             | Description                      |
| ------ | -------------------- | -------------------------------- |
| POST   | `/api/auth/register` | Register a new user              |
| POST   | `/api/auth/login`    | Login user                       |
| POST   | `/api/auth/logout`   | Logout user                      |
| GET    | `/api/auth/me`       | Get currently authenticated user |

Hospitals:

| Method | Endpoint                   | Description                       |
| ------ | -------------------------- | --------------------------------- |
| GET    | `/api/hospitals`           | Get all hospitals                 |
| GET    | `/api/hospitals/available` | Get hospitals with available beds |
| GET    | `/api/hospitals/:id`       | Get hospital by ID                |
| POST   | `/api/hospitals`           | Create a hospital                 |
| PUT    | `/api/hospitals/:id`       | Update a hospital                 |
| DELETE | `/api/hospitals/:id`       | Delete a hospital                 |

---

## 📊 Dashboard

The Carevia dashboard provides an overview of important hospital statistics:

🏥 Total number of hospitals
🛏️ Hospitals with available beds
❤️ Total available beds
📋 Hospital management overview

The dashboard is designed to give users a quick understanding of the current hospital resource availability.

---

## 🏥 Hospital Management

Users can manage hospital records directly from the Hospitals section.

Each hospital record can contain information such as:

1. Hospital name
2. City
3. Total beds
4. Available beds
5. Hospital status

Users can:

1. Add a hospital
2. View hospital records
3. Edit hospital information
4. Delete hospital records
5. Monitor bed availability

---

## 🔐 Authentication

Carevia uses Passport.js Local Strategy for authentication.

The authentication process works as follows:

Registration
     │
     ▼
Password received
     │
     ▼
bcrypt password hashing
     │
     ▼
User stored in MongoDB
     │
     ▼
Login
     │
     ▼
Passport Local Strategy
     │
     ▼
Credentials verified
     │
     ▼
Session created
     │
     ▼
Authenticated user

Passwords are never stored directly in plain text. They are securely hashed using bcrypt before being stored in the database.

---

## 🌐 Deployment
Frontend

The frontend is deployed using Vercel.

🌐 Live Application:

https://hospital-management-chi-flame.vercel.app/

Backend

The backend is deployed separately as a Node.js/Express API.

The frontend communicates with the deployed backend through REST API requests.

Database

MongoDB is used as the application's database.

---

## 📸 Screenshots

<img width="1469" height="880" alt="Screenshot 2026-08-14 at 12 40 09 AM" src="https://github.com/user-attachments/assets/87a5b5eb-171d-4fee-932c-b0418ad2263c" />

<img width="1470" height="956" alt="Screenshot 2026-08-13 at 2 19 20 PM" src="https://github.com/user-attachments/assets/a8e6343a-5473-432b-8af3-120d25b5d8ab" />

<img width="1470" height="956" alt="Screenshot 2026-08-13 at 2 19 28 PM" src="https://github.com/user-attachments/assets/8d640e66-6fa3-4605-8dc8-366fb87d9a0f" />

---

## 🔮 Future Improvements

Possible future improvements include:

🔎 Hospital search and filtering
📍 Map-based hospital locations
📊 Advanced analytics and charts
👥 Role-based access control
👨‍⚕️ Doctor management
🧑‍🤝‍🧑 Patient management
📅 Appointment scheduling
🔔 Notifications for bed availability
📈 Hospital performance analytics
🌓 Dark mode
📱 Progressive Web App support

---

## 👩‍💻 Author

Jui Sudhir Tawde

B.Tech Computer Science Engineering Student

---

## ⭐ Project

If you found this project interesting, consider giving the repository a ⭐ on GitHub!

---

## 📄 License

This project is created for educational and project-development purposes.



