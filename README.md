# School Management API

This project implements a simple School Management System using **Node.js**, **Express**, and **MySQL**. It allows users to add schools and retrieve a list of nearby schools based on a user's current location.

---

## Features

- Add a new school with name, address, latitude, and longitude
- List all schools sorted by proximity to given coordinates (using Haversine formula)
- Input validation and error handling
- Hosted API ready for testing
- Postman collection for easy testing

---

## Tech Stack

- **Node.js**
- **Express.js**
- **MySQL** (with `mysql2/promise`)
- **Dotenv** for environment variable management

---

## API Endpoints

### Add School

- **Endpoint**: `POST /addSchool`
- **Payload (JSON)**:

```json
{
  "name": "Changigarh University",
  "address": "Punjab",
  "latitude": 82.6139,
  "longitude": 73.2090
}
```

- **Response**:

```json
{
  "message": "School added successfully",
  "id": 1
}
```

---

### List Schools by Location

- **Endpoint**: `GET /listSchools?latitude=28.61&longitude=77.20`

- **Query Parameters**:
  - `latitude`: User's latitude
  - `longitude`: User's longitude

- **Response**:

```json
[
  {
    "id": 1,
    "name": "Oxford Public School",
    "address": "Delhi",
    "latitude": 28.6139,
    "longitude": 77.209,
    "distance": 0.9
  },
  ...
]
```

---

## How Distance Is Calculated

This project uses the **Haversine formula** to calculate geographical distances between two points (latitude and longitude) on the Earth's surface.

---

## Setup Instructions

1. **Clone the Repo**

```bash
git clone https://github.com/shoaibzmx/school-management-api.git
cd school-management-api
```

2. **Install Dependencies**

```bash
npm install
```

3. **Create `.env` File**

Create a `.env` file in the root directory with the following content:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=school_db
PORT=3000
```

4. **Set Up Database**

Use MySQL Workbench or CLI to run:

```sql
CREATE DATABASE school_db;

USE school_db;

CREATE TABLE schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  address VARCHAR(255),
  latitude FLOAT,
  longitude FLOAT
);
```

5. **Start the Server**

```bash
npm start
```

---

## Live API (If Deployed)

```
https://school-management-api-mmb6.onrender.com/listSchools?latitude=188&longitude=77.5946
```

---

## Postman Collection

You can test the API using the Postman collection below:

- Link: [Postman Collection](https://www.postman.com/navigation-engineer-28051726/workspace/school-management-api/collection/29738049-f5182fae-b64d-4ba0-ae90-8a97dd336790?action=share&creator=29738049)  




---

## Author

Name : Shoaib Hussain   . 
GitHub:https://github.com/shoaibzmx 

---

## License

This project is licensed under the MIT License.
