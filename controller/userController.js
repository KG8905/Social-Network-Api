const { Thought, User } = require("../models");

const userController = {
  // Get all users
getAllUsers(req, res) {
    User.find()
    .then((users) => res.json(users))
    .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Failed to retrieve users", error: err });
    });
},

  // Create a new user
createUser(req, res) {
    User.create(req.body)
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Failed to create user", error: err });
    });
},

  // Get a user by ID
getUserById(req, res) {
    User.findOne({ _id: req.params.id })
    .then((user) => {
        if (!user) {
        return res.status(404).json({ message: "No user found with this ID" });
        }
        res.json(user);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Failed to retrieve user", error: err });
    });
},

  // Update a user by ID
updateUser(req, res) {
    User.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { runValidators: true, new: true }
    )
    .then((user) => {
        if (!user) {
        return res.status(404).json({ message: "No user found with this ID" });
        }
        res.json(user);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Failed to update user", error: err });
    });
},

  // Delete a user and their associated thoughts
deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.id })
    .then((user) => {
        if (!user) {
        return res.status(404).json({ message: "No user found with this ID" });
        }
        return Thought.deleteMany({ _id: { $in: user.thoughts } });
    })
    .then(() => res.json({ message: "User and associated thoughts deleted!" }))
    .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Failed to delete user", error: err });
    });
},

  // Add a friend to a user's friend list
addFriend(req, res) {
    User.findOneAndUpdate(
    { _id: req.params.id },
      { $addToSet: { friends: req.params.friendId } }, // Changed 'friendsId' to 'friendId'
    { runValidators: true, new: true }
    )
    .then((user) => {
        if (!user) {
        return res.status(404).json({ message: "No user found with this ID" });
        }
        res.json(user);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Failed to add friend", error: err });
    });
},

  // Remove a friend from a user's friend list
removeFriend(req, res) {
    User.findOneAndUpdate(
    { _id: req.params.id },
      { $pull: { friends: req.params.friendId } }, // Changed 'friendsId' to 'friendId'
    { runValidators: true, new: true }
    )
    .then((user) => {
        if (!user) {
        return res.status(404).json({ message: "No user found with this ID" });
        }
        res.json(user);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Failed to remove friend", error: err });
    });
},
};

module.exports = userController;