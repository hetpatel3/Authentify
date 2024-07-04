# Authentify - JWT Based Authentication

Authentify is a secure authentication system that uses JWT (JSON Web Tokens) to manage user sessions. The system supports user registration, login, and protected content access using JWT tokens. It also ensures password security by hashing passwords with bcrypt.

## Features

- User Registration
- User Login
- JWT-based Authentication
- Protected Routes
- Password Hashing with bcrypt
- Change Password
- Logout Functionality

## Prerequisites

- Node.js
- MongoDB

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/hetpatel3/Authentify.git
    cd Authentify
    ```

2. **Install dependencies:**

    ```bash
    npm install bcryptjs body-parser cookie-parser cors dotenv express jsonwebtoken mongoose
    ```
    
3. **Set up your environment variables:**

    Create a `.env` file in the root directory and add your MongoDB URI, port, and JWT secret:

    ```plaintext
    MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/yourdatabase
    PORT=4000
    TOKEN_SECRET=yourjwtsecret
    ```

4. **Start the server:**

    ```bash
    node server.js
    ```

    Your server should now be running on `http://localhost:4000`.


## Project Structure

![Screenshot (591)](https://github.com/hetpatel3/Authentify/assets/149918332/b1f8ac91-fd9c-4d0c-b419-b654093e6925)

## Usage

### Home page

1. Open `index.html` in your browser.
2. choose desirable action.

![Screenshot (592)](https://github.com/hetpatel3/Authentify/assets/149918332/742d6a22-ff24-4cbf-987a-52e553117748)



### Register a New User

1. Open `signup.html` in your browser.
2. Fill in the required details and submit the form.

![Screenshot (593)](https://github.com/hetpatel3/Authentify/assets/149918332/e2d0cd3a-a864-4b1f-bb31-d2618a0fe445)


### Log In

1. Open `login.html` in your browser.
2. Enter your registered email and password and submit the form.

![Screenshot (595)](https://github.com/hetpatel3/Authentify/assets/149918332/e196203a-bbbc-49e9-8682-6b9e264709d4)



### Log In with JWT Token

1. Open `jwtlogin.html` in your browser.
2. Enter your JWT token and submit the form.

![Screenshot (596)](https://github.com/hetpatel3/Authentify/assets/149918332/f05538ed-3e55-4775-bba4-13f74de161a3)


### Access Protected Content

1. After logging in, you will be redirected to `content.html`.
2. This page can only be accessed if you are logged in.

![Screenshot (597)](https://github.com/hetpatel3/Authentify/assets/149918332/77f9329c-1d6f-4530-9b00-33c67253dd63)


### Change Password

1. After logging in, You Can Change Your Password Using Your Existing Password.

![Screenshot (600)](https://github.com/hetpatel3/Authentify/assets/149918332/f0b81041-408e-4b9a-b8b7-7554cf2388f1)


### Log Out

1. Click the "Logout" button on the `content.html` page to log out.

![Screenshot (599)](https://github.com/hetpatel3/Authentify/assets/149918332/3b31142a-ee76-48de-b8fa-97edd3f42925)



## Use Cases

1. **Secure User Authentication:** Authentify provides a secure authentication system using JWT (JSON Web Tokens) to manage user sessions, ensuring robust user authentication for various applications.

2. **User Registration:** Authentify allows users to register for accounts, capturing essential user details such as username, email, and password, ensuring seamless onboarding experiences.

3. **Protected Routes:** With Authentify, developers can easily implement protected routes in their applications, allowing access to authenticated users only, enhancing application security.

4. **Password Security:** Authentify ensures password security by employing bcrypt for password hashing, safeguarding user credentials against unauthorized access and potential security breaches.

## Acknowledgements

- Thanks to the open-source community for their contributions to libraries and frameworks used in this project.
- Special thanks to Hitesh Chaudhary and Harkirat Singh for their insightful YouTube channels, which provided valuable knowledge and inspiration for this project.
