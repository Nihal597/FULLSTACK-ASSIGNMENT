# FULLSTACK-ASSIGNMENT

This is a full-stack Book Exchange platform developed as part of the Full Stack Assignment. The platform enables users to register, log in, list, search, and manage books. It includes features like authentication, book listings, and book search with pagination.

The stack includes:

Frontend: Angular 18
Backend: Express.js
Database: PostgreSQL
Mailing Service: AS Mail Catcher (Pseudo Mail Service)
All services are hosted using Docker for easy deployment and scalability.

Architecture

Frontend: Hosted at localhost:4200, communicates with the backend via API calls.
Backend: Exposed APIs at localhost:3000 for handling data and business logic.
Database: PostgreSQL managed via Docker and accessible through PGAdmin (localhost:5050).
Email Service: AS Mail Catcher running on ports 1080 (UI) and 1025 (backend connection).

Installation

Clone the repository:
bash
RUN below command
git clone https://github.com/Nihal597/FULLSTACK-ASSIGNMENT.git
cd FULLSTACK-ASSIGNMENT
Set up .env file with your environment variables for the database, mail service, and JWT secret.
Use Docker to build and run the services:
bash
RUN below command
docker-compose up --build
Access the application:
Frontend: http://localhost:4200
Backend API Docs (Swagger): http://localhost:3000/swagger/api-docs/
PGAdmin: http://localhost:5050
Mail Service: http://localhost:1080