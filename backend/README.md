## HostelHub Backend

This folder contains the Node.js / Express.js backend for the HostelHub project. It exposes REST APIs for authentication, hostels, and bookings, and connects to MongoDB Atlas using Mongoose.

### Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcryptjs
- CORS

### Environment Variables

Create a `.env` file in the `backend` directory (a template already exists) and set:

- `MONGO_URI` – your MongoDB Atlas connection string
- `JWT_SECRET` – a strong secret key for signing JWTs
- `PORT` – port for the backend server (default: 5000)

### Install Dependencies

From the project root:

```bash
cd backend
npm install
```

### Run the Server

Using Node:

```bash
node server.js
```

Or with the npm script:

```bash
npm start
```

