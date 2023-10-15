# NestJS URL Shortener


A simple URL shortener API built with NestJS, Mongoose, and MongoDB. The API offers user registration, login, URL encoding (shortening), and decoding.



## Getting Started

Follow these steps to get the application up and running:

##### 1. Clone this repository to your local machine:

```
git clone <repository-url>
cd <repository-directory>
```
##### 2. Install the required npm packages:

```
npm install
```
##### 3. Create a `.env` file in the root directory of the project with the following content:

```
MONGODB_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-preferred-port>
```

##### 4. Start the server:

```
npm run start
```

The API should now be running. Access it in your web browser at `http://localhost:<your-preferred-port>`

### Usage

- `/signup` Register a new user with email and password.

- `/login` Login a user with email and password.

- `/encode` Encodes a URL to a shortened one sending the a json with the url key.

- `/decode` Decodes a shortened URL to its original URL by passing the key shortener in a json format.



### License

This project is licensed under the MIT License.