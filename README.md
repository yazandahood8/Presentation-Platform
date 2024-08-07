# Presentation Platform

## Overview
This project is a server-side service for managing presentations. The service is implemented using Node.js with Express and MongoDB.

## Prerequisites
- Node.js (version 14 or higher)
- MongoDB

## Installation
1. **Clone the Repository**:
    ```sh
    git clone https://github.com/yazandahood8/Presentation-Platform.git
    ```
2. **Navigate to the Project Directory**:
    ```sh
    cd presentation-platform
    ```
3. **Install Dependencies**:
    ```sh
    npm install
    ```

## Running the Application
1. **Start MongoDB**:
    Ensure MongoDB is running. You can start it with:
    ```sh
    mongod
    ```
2. **Start the Server**:
    To start the server normally:
    ```sh
    npm start
    ```
    To start the server in development mode with automatic restarts on file changes:
    ```sh
    npm run dev
    ```
3. **Access the Application**:
    The server will run on `http://localhost:3000`.

## API Endpoints
- **Create a New Presentation**:
    - **Method**: `POST`
    - **Endpoint**: `/api/presentations`
    - **Request Body**: `{ "title": "Presentation Title", "authors": ["Author Name"], "publishDate": "YYYY-MM-DD" }`

- **Fetch a Presentation by Title**:
    - **Method**: `GET`
    - **Endpoint**: `/api/presentations/:title`

- **Add a Slide to a Presentation**:
    - **Method**: `POST`
    - **Endpoint**: `/api/presentations/:title/slides`
    - **Request Body**: `{ "title": "Slide Title", "content": "Slide Content" }`

- **Alter a Slide**:
    - **Method**: `PUT`
    - **Endpoint**: `/api/presentations/:title/slides/:slideId`
    - **Request Body**: `{ "title": "New Slide Title", "content": "New Slide Content" }`

- **Alter the Authors List**:
    - **Method**: `PUT`
    - **Endpoint**: `/api/presentations/:title/authors`
    - **Request Body**: `{ "authors": ["New Author Name"] }`

- **Delete a Slide**:
    - **Method**: `DELETE`
    - **Endpoint**: `/api/presentations/:title/slides/:slideId`

- **Delete a Presentation**:
    - **Method**: `DELETE`
    - **Endpoint**: `/api/presentations/:title`

- **Get All Presentations**:
    - **Method**: `GET`
    - **Endpoint**: `/api/presentations`

## Testing
You can use tools like Postman or Swagger to test the API endpoints.

