# Treepz Company Admin

## Overview

This application provides a comprehensive platform for managing employees, trip histories, business settings, and authentication. It includes functionalities for user authentication, employee management, trip tracking, and business settings.

## Features

- **Authentication**: Secure user login and registration with JWT-based authentication.
- **Employees**: Manage employee records and invite new employees.
- **Trip History**: Track and manage trip histories for employees and vehicles.
- **Settings**: Configure application settings.
- **Business**: Edit business details.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/the-treepz/treepz-company-admin.git
   
2. Install Dependencies
   ```bash
   npm install
   
3. Set Up Environment Variables
```
NODE_ENV=
TREEPZ_JWT_EXPIRY=
TREEPZ_JWT_SECRET=

#DATABASE
TREEPZ_DATABASE_CI_URL=
TREEPZ_DATABASE_STAGING_URL=
TREEPZ_DATABASE_DEV_URL=
TREEPZ_DATABASE_URL=
TREEPZ_DATABASE_TEST_URL=
# DATABASE

# BREVO #
TREEPZ_BREVO_API_KEY=

## MAIL TRAP ##
TREEPZ_MAIL_TRAP_PASSWORD=
TREEPZ_MAIL_TRAP_USERNAME=

#NORILIFFY#
TREEPZ_NOTILIFY_API_KEY=
#NORILIFFY#

#APP URL#
TREEPZ_APP_STAGING_URL=
TREEPZ_APP_URL=
#APP URL#
```
4. Run the Application
  ```bash
   npm start
