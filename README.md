<a name="readme-top"></a>

<br />
<div align="center">

<h3 align="center">Score API</h3>

  <p align="center">
    API allowing register/login users and get/post scores using JWT authentication.<br>
<b>🚀DEPLOYED ON</b>: https://europe-west1-snake-game-project-e8b0d.cloudfunctions.net/api/docs

</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#authentication">Authentication</a></li>
        <li><a href="#additional-features">Additional Features</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#deployment">Deployment</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>

  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

The whole purpose of this project was to implement a backend server for my snake game frontend [available in a separate repository: GitHub](https://github.com/owsiej/snake-game-angular).

### Authentication:

The backend provides an API for user authentication:

- **Register** (`/register`): Creates a new user account.
- **Login** (`/login`): Authenticates an existing user. Upon successful login, the response includes an access token and a refresh token. The refresh token is securely stored in the database associated with the user.
- **Logout** (`/logout`): Invalidates the user's session by removing the refresh token from their database record.
- **Refresh Token** (`/refresh-token`): Allows users to obtain a new access token when the existing one expires.

### Additional Features:

- **Swagger Documentation** (`/docs`): Provides detailed API documentation (available after server deployment).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

<div style="display: flex;">
<a href="https://www.npmjs.com">
  <img src="https://user-images.githubusercontent.com/25181517/121401671-49102800-c959-11eb-9f6f-74d49a5e1774.png" alt="npm" width="40" height="40"/>
</a>
<a href="https://nestjs.com">
  <img src="https://github.com/marwin1991/profile-technology-icons/assets/136815194/519bfaf3-c242-431e-a269-876979f05574" alt="nest-js" width="40" height="40"/>
</a>
<a href="https://www.mongodb.com">
  <img src="https://user-images.githubusercontent.com/25181517/182884177-d48a8579-2cd0-447a-b9a6-ffc7cb02560e.png" alt="mongo" width="40" height="40"/>

<a href="https://swagger.io/tools/swaggerhub/">
  <img src="https://user-images.githubusercontent.com/25181517/186711335-a3729606-5a78-4496-9a36-06efcc74f800.png" alt="swagger" width="40" height="40"/>
  <a href="https://code.visualstudio.com">
  <img src="https://user-images.githubusercontent.com/25181517/192108891-d86b6220-e232-423a-bf5f-90903e6887c3.png" alt="vsc" width="40" height="40"/>
  <a href="https://www.postman.com">
  <img src="https://user-images.githubusercontent.com/25181517/192109061-e138ca71-337c-4019-8d42-4792fdaa7128.png" alt="postman" width="40" height="40"/>
</div>
<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

First start with installing `npm`.

```sh
npm install npm@latest -g
```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/owsiej/scores-api
   ```
2. Jump to root directory
   ```sh
   cd scores-api
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Create `.env` file with following variables:

   ```js
   MONGO_CONNECTION_STRING = ;
   MONGO_DATABASE_NAME = ;
   PORT = ;
   JWT_SECRET_KEY = ;
   JWT_REFRESH_SECRET_KEY = ;
   ALLOW_ORIGIN = ;
   ```

### Deployment

Run server

```sh
npm run start
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

After deployment, all available endpoints you can check at `/docs`.
![swagger](./src/assets/swagger-docs.jpg)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
