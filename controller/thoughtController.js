const { Thought, User } = require("../models");

const thoughtController = {
  // Get all thoughts
getAllThoughts(req, res) {
    Thought.find()
    .then((thoughts) => res.json(thoughts))
    .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Failed to retrieve thoughts", error: err });
    });
},

  // Get a single thought by its ID
getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
    .then((thought) => {
        if (!thought) {
        return res.status(404).json({ message: "No thought found with this ID" });
        }
        res.json(thought);
    })
    .catch((err) => {
        console.error(err);
        res.status(400).json({ message: "Invalid thought ID", error: err });
    });
},

  // Create a new thought and associate it with a user
createThought(req, res) {
    Thought.create(req.body)
    .then((dbThoughtData) => {
        return User.findOneAndUpdate(
        { _id: req.body.userID },
        { $push: { thoughts: dbThoughtData._id } },
        { new: true }
        );
    })
    .then((userData) => {
        if (!userData) {
        return res.status(404).json({ message: "User not found with this ID" });
        }
        res.json({ message: "Thought created and associated with user", userData });
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Failed to create thought", error: err });
    });
},

  // Update a thought by its ID
updateThought(req, res) {
    Thought.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { runValidators: true, new: true }
    )
    .then((thought) => {
        if (!thought) {
        return res.status(404).json({ message: "No thought found with this ID" });
        }
        res.json(thought);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Failed to update thought", error: err });
    });
},

  // Delete a thought by its ID and remove it from the user's thoughts array
deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.id })
    .then((thought) => {
        if (!thought) {
        return res.status(404).json({ message: "No thought found with this ID" });
        }
        return User.findOneAndUpdate(
        { _id: req.body.userID },
        { $pull: { thoughts: thought._id } },
        { new: true }
        );
    })
    .then((userData) => {
        if (!userData) {
        return res.status(404).json({ message: "User not found with this ID" });
        }
        res.json({ message: "Thought deleted and removed from user", userData });
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Failed to delete thought", error: err });
    });
},

  // Add a reaction to a thought
addReaction(req, res) {
    console.log('You are adding a reaction');
    Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $addToSet: { reactions: req.body } },
    { runValidators: true, new: true }
    )
    .then((thought) => {
        if (!thought) {
        return res.status(404).json({ message: 'No thought found with this ID' });
        }
        res.json(thought);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Failed to add reaction", error: err });
    });
},

  // Delete a reaction by its ID from a thought
deleteReaction(req, res) {
    Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $pull: { reactions: { reactionId: req.params.reactionId } } },
    { runValidators: true, new: true }
    )
    .then((thought) => {
        if (!thought) {
        return res.status(404).json({ message: 'No thought found with this ID' });
        }
        res.json(thought);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Failed to delete reaction", error: err });
    });
},
};

module.exports = thoughtController;