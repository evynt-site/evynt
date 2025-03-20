# Evynt - Event Booking Platform

Evynt is a microservices-based event booking platform that allows users to book events, manage bookings, and receive email confirmations.

## Project Structure
```
├── app
├── artisan
├── booking-service  # Node.js microservice for managing event bookings
├── bootstrap
├── composer.json
├── composer.lock
├── config
├── database
├── email-service    # Node.js microservice for sending email confirmations
├── event-service    # Flask microservice for managing events
├── frontend         # Next.js frontend application
├── node_modules
├── package-lock.json
├── package.json
├── phpunit.xml
├── postcss.config.js
├── public
├── README.md
├── resources
├── routes
├── storage
├── tailwind.config.js
├── tests
├── vendor
└── vite.config.js
```

## Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v20.x recommended)
- [Python 3](https://www.python.org/)
- [MySQL](https://www.mysql.com/)
- [Laravel](https://laravel.com/)
- [Docker](https://www.docker.com/) (for RabbitMQ)

## Setup Guide
### 1. Clone the repository
```sh
git clone https://github.com/your-repo/evynt.git
cd evynt
```

### 2. Set up environment variables
Create `.env` files in each microservice and configure them appropriately.
#### **Booking Service (`booking-service/.env`)**
```
MYSQL_USER=danishh
MYSQL_PASSWORD=your-password
MYSQL_HOST=mysql-danishh.alwaysdata.net
MYSQL_DB=danishh_evynt_events
USER_SERVICE_URL=http://localhost:8000/api/user
RABBITMQ_HOST=amqp://localhost
```

#### **Event Service (`event-service/.env`)**
```
FLASK_APP=app.py
MYSQL_USER=your-user
MYSQL_PASSWORD=your-password
MYSQL_HOST=your-mysql-host
MYSQL_DB=evynt_events
```

#### **Email Service (`email-service/.env`)**
```
SMTP_HOST=smtp.your-email-provider.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASSWORD=your-email-password
RABBITMQ_HOST=amqp://localhost
```

### 3. Start RabbitMQ (Docker)
```sh
docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
```
RabbitMQ will be accessible at [http://localhost:15672](http://localhost:15672) (default login: guest/guest).

### 4. Install dependencies
```sh
cd booking-service && npm install && cd ..
cd email-service && npm install && cd ..
cd frontend && npm install && cd ..
```

### 5. Start services
```sh
# Start Laravel User Service
php artisan serve --host=0.0.0.0 --port=8000

# Start Flask Event Service
cd event-service
flask run --host=0.0.0.0 --port=5000

# Start Node.js Booking Service
cd booking-service
npm start

# Start Node.js Email Service
cd email-service
npm start

# Start Next.js Frontend
cd frontend
npx next start
```

## Usage
1. **Register/Login**: Authenticate users using Laravel Sanctum.
2. **Book an Event**: The frontend calls the booking service, which interacts with the event and user services.
3. **Receive Email Confirmation**: RabbitMQ queues the email, and the email service sends a confirmation.

## API Endpoints
### Booking Service
- `POST /bookings` - Create a new booking
- `GET /bookings` - Retrieve all bookings

### Event Service
- `GET /events` - Retrieve all events
- `POST /events` - Create a new event

### User Service (Laravel)
- `GET /api/user` - Fetch user data from Sanctum token

### Architectural Overview
![image](https://github.com/user-attachments/assets/fae91b15-4b08-40ef-bc1e-68c11fec94b9)


## Troubleshooting
- **RabbitMQ Connection Issues:** Ensure RabbitMQ is running and accessible via `docker ps`.
- **Database Errors:** Verify `.env` configuration and database credentials.
- **Email Authentication Failed:** Check SMTP credentials and enable "less secure apps" if needed.

## License
MIT License

---
Developed with ❤️ by Danish

