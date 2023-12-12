### Live Site Link: https://pristine-perfection-frontend.vercel.app/

### Backend Code : https://github.com/ImranHossain1/pristine-perfection-backend

## Authentication:

    ### Super Admin
    ```bash
        email: imran@gmail.com
        password: admin123
    ```
    ### Admin
    ```bash
        email: helal@gmail.com
        password: admin123
    ```

# Pristine Perfection

Pristine Perfection is a fullstack makeover project built with Next.js, Node.js, Express, Prisma, PostgreSQL, and Cloudinary. The application allows users to book different makeup packages based on various categories, schedule appointments, and post feedback and reviews. Administrators can manage user roles, services, packages, and bookings.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication and authorization
- Booking makeup packages with different categories
- Schedule management for users and administrators
- Service and package management for administrators
- Cloudinary integration for image hosting
- User feedback and review system

## Technologies Used

- **Frontend:**

  - Next.js with App Router
  - React for the user interface
  - Redux for state management

- **Backend:**

  - Node.js with Express for the server
  - Prisma for database access
  - PostgreSQL as the database
  - JWT for authentication

- **Cloud Services:**
  - Cloudinary for image hosting

## Getting Started

To get started with Pristine Perfection, follow the steps below.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ImranHossain1/pristine-perfection-frontend.git
   cd pristine-perfection
   ```

2. Create a .env file in the server directory and configure the following:

   ```bash
    NEXT_PUBLIC_API_BASE_URL="https://pristine-perfection-backend.vercel.app/api/v1"
   ```

3. Install packages:

   ```bash
       npm install
   ```

4. Start app:

   ```bash
       npm run dev
   ```
