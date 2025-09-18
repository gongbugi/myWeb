# GEMINI Project Overview

This document provides a comprehensive overview of the project, intended to be used as a guide for future development and maintenance.

## Project Overview

This is a simple Spring Boot web application that provides user authentication functionality, including user signup and login. The application is built with Java 21 and uses Gradle for dependency management.

### Key Technologies

*   **Framework:** Spring Boot
*   **Language:** Java 21
*   **Build Tool:** Gradle
*   **Templating Engine:** Thymeleaf
*   **Database:** MySQL
*   **ORM:** Spring Data JPA
*   **Utilities:** Lombok

### Architecture

The application follows a standard layered architecture:

*   **Controller (`BasicController.java`):** Handles incoming HTTP requests for user authentication and page navigation.
*   **Service (`UserService.java`):** Implements the business logic for user signup and login.
*   **Repository (`UserRepository.java`):** Manages data persistence using Spring Data JPA.
*   **Domain (`User.java`):** Represents the user entity in the database.
*   **DTOs (`LoginRequestDto.java`, `SignUpRequestDto.java`):** Used for data transfer between the controller and service layers.

## Building and Running

### Prerequisites

*   Java 21
*   Gradle

### Running the Application

To run the application, execute the following command in the root directory:

```bash
./gradlew bootRun
```

The application will be accessible at `http://localhost:8080`.

### Testing

To run the tests, execute the following command:

```bash
./gradlew test
```

## Development Conventions

### Coding Style

The project follows the standard Java coding conventions.

### Testing

*   Unit tests should be written for all new functionality.
*   Tests are located in the `src/test/java` directory.
*   The project uses JUnit 5 for testing.

### Database

*   The application is configured to use a MySQL database.
*   The database connection properties are located in the `src/main/resources/application.properties` file.
*   The `User` entity is defined in the `com.gongBG.first.domain.User` class.
