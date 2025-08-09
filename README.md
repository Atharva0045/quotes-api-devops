# InspireAPI: A Dockerized Quote Service Platform

A MERN stack application serving inspirational quotes through a RESTful API. Built with containerization and modern web development practices.

## Features

-   **Full-Stack Application**

    -   Frontend: React with Tailwind CSS
    -   Backend: Express.js, MongoDB
    -   RESTful API with quotes categorization

-   **DevOps Integration**
    -   Docker containerization
    -   MongoDB database with seeding
    -   Basic security features

## Tech Stack

### Frontend

-   React with Vite
-   Tailwind CSS
-   React Query
-   React Router

### Backend

-   Express.js
-   MongoDB with Mongoose
-   Winston logger
-   Security middleware (Helmet, CORS, Rate limiting)

## Getting Started

### Prerequisites

-   Docker and Docker Compose
-   Node.js

### Development Setup

1.  Clone and start MongoDB:

    ```bash
    git clone https://github.com/your-username/quotes-api.git
    cd quotes-api
    ./scripts/docker-compose.sh
    ```

    The `docker-compose.sh` script will:

    -   Start MongoDB container with persistent volume
    -   Wait 10 seconds for MongoDB to initialize
    -   Execute database seeding with 40 predefined quotes across categories:
        -   7 Motivation quotes
        -   7 Inspiration quotes
        -   7 Wisdom quotes
        -   7 Life quotes
        -   7 Success quotes
        -   5 Additional mixed category quotes
    -   Each quote includes:
        -   Text content
        -   Author attribution
        -   Category assignment
        -   Relevant tags
        -   Timestamps
        -   Active status
    -   Display success/failure messages for each operation

    Script location: `/scripts/docker-compose.sh` Permissions: Make sure to set executable permissions:

    ```bash
    chmod +x ./scripts/docker-compose.sh
    ```

2.  Start the application:

    ```bash
    # Backend
    cd backend
    npm install
    npm run dev

    # Frontend
    cd frontend
    npm install
    npm run dev
    ```

### Docker Configuration

The project uses Docker Compose for containerization. Key configurations:

```yaml
services:
    mongodb:
        container_name: quotes-mongo
        image: mongo:latest
        ports:
            - "27017:27017"
        volumes:
            - mongodb_data:/data/db

    backend:
        build: ./backend
        ports:
            - "5000:5000"
        environment:
            - MONGODB_URI=mongodb://mongodb:27017/quotesapi
        depends_on:
            - mongodb

    frontend:
        build: ./frontend
        ports:
            - "3000:3000"
        depends_on:
            - backend

volumes:
    mongodb_data:
```

## 📚 API Documentation

### Base URL

`http://localhost:5000/api`

### Endpoints

#### Quotes

-   `GET /quotes`

    -   Get all quotes
    -   Query parameters:
        -   `page`: Page number (default: 1)
        -   `limit`: Items per page (default: 10)
        -   `category`: Filter by category
        -   `author`: Filter by author
        -   `tags`: Filter by tags (comma-separated)

-   `GET /quotes/:id`

    -   Get a specific quote by ID

-   `GET /quotes/category/:category`

    -   Get quotes by category
    -   Categories: motivation, inspiration, wisdom, life, success

-   `GET /quotes/random`

    -   Get a random quote
    -   Query parameter:
        -   `category`: Optional category filter

-   `GET /quotes/search`
    -   Search quotes
    -   Query parameters:
        -   `q`: Search query
        -   `fields`: Fields to search (default: text,author)

#### Categories

-   `GET /categories`
    -   Get all available categories
    -   Returns count of quotes per category

#### Health Check

-   `GET /health`

    -   Check API health status
    -   Returns:

        ```json
        {
            "status": "healthy",
            "timestamp": "ISO-8601 timestamp",
            "uptime": "server uptime in seconds"
        }
        ```

### Response Format

Success Response:

```json
{
  "success": true,
  "data": {
    // Response data
  },
  "pagination?: {
    "page": number,
    "limit": number,
    "total": number,
    "pages": number
  }
}
```

Error Response:

```json
{
    "success": false,
    "error": {
        "code": "ERROR_CODE",
        "message": "Error description"
    }
}
```

## Configuration

The application uses environment variables for configuration. Create a `.env` file in both frontend and backend directories:

```env
# Backend
PORT=5000
MONGODB_URI=mongodb://localhost:27017/quotesapi
NODE_ENV=development

# Frontend
VITE_API_URL=http://localhost:5000/api
```

## Testing

```bash
# Run backend tests
cd backend
npm test

# Run frontend tests
cd frontend
npm test
```

## Monitoring & Logging

-   Winston logger configured for production
-   Health check endpoint for monitoring
-   Error tracking and performance monitoring
-   Structured logging with timestamp and service name

## Security

-   Helmet.js for security headers
-   Rate limiting
-   CORS configuration
-   Request size limiting
-   Secure environment variable handling

## Contributing

1.  Fork the repository
2.  Create a feature branch: `git checkout -b feature/your-feature`
3.  Commit changes: `git commit -am 'Add some feature'`
4.  Push to the branch: `git push origin feature/your-feature`
5.  Submit a Pull Request

## Contact

-   GitHub: [@Atharva0045](https://github.com/Atharva0045)
-   LinkedIn: [atharva045](https://www.linkedin.com/in/atharva045/)
