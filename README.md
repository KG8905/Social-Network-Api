# Social-Network-Api
Description

The Social Network API is a back-end application built with Node.js, Express, and MongoDB. It provides a robust API for a social networking platform, where users can create accounts, share their thoughts, react to friends’ thoughts, and manage a friends list. This project demonstrates the use of Mongoose for database interaction, CRUD operations, and RESTful API principles.

Table of Contents

	•	Installation
	•	Usage
	•	API Endpoints
	•	Technologies Used
	•	License
	•	Contributing
	•	Questions

Installation

	1.	Clone the repository:
    git clone https://github.com/your-username/social-network-api.git

   2.	Navigate to the project directory:
   cd social-network-api

   	3.	Install dependencies:
    npm install

    4.	Create a .env file at the root of the project and set your MongoDB URI:
    MONGODB_URI=mongodb://localhost:27017/socialNetworkDB

    5.	Start the server:
    npm start

    Usage

After installing the dependencies and starting the server, the API will be available at http://localhost:3001.

You can test the various endpoints using a tool like Postman or Insomnia. Refer to the API Endpoints section for available routes.

Seed Database (Optional)

If you want to seed the database with test data, you can run:
npm run seed

API Endpoints

Users

	•	GET /api/users - Get all users
	•	POST /api/users - Create a new user
	•	GET /api/users/:id - Get a single user by ID
	•	PUT /api/users/:id - Update a user by ID
	•	DELETE /api/users/:id - Delete a user by ID

Thoughts

	•	GET /api/thoughts - Get all thoughts
	•	POST /api/thoughts - Create a new thought
	•	GET /api/thoughts/:id - Get a single thought by ID
	•	PUT /api/thoughts/:id - Update a thought by ID
	•	DELETE /api/thoughts/:id - Delete a thought by ID

Reactions

	•	POST /api/thoughts/:thoughtId/reactions - Add a reaction to a thought
	•	DELETE /api/thoughts/:thoughtId/reactions/:reactionId - Remove a reaction from a thought

Friends

	•	POST /api/users/:userId/friends/:friendId - Add a friend
	•	DELETE /api/users/:userId/friends/:friendId - Remove a friend

Technologies Used

	•	Node.js: JavaScript runtime for building server-side applications.
	•	Express.js: Web framework for Node.js used to create the API endpoints.
	•	MongoDB: NoSQL database for storing user and thought data.
	•	Mongoose: ODM for MongoDB, used for database interaction and schema definition.
	•	JavaScript: Programming language used throughout the project.

License

This project is licensed under the MIT License.

Contributing

Contributions are welcome! Please follow these steps to contribute:

	1.	Fork the repository.
	2.	Create a new branch (git checkout -b feature/YourFeature).
	3.	Commit your changes (git commit -m 'Add some feature').
	4.	Push to the branch (git push origin feature/YourFeature).
	5.	Open a Pull Request.

Questions

If you have any questions or need further assistance, feel free to reach out:

	•	GitHub: KG8905
	


