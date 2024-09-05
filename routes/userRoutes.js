const express = require('express');
const router = express.Router();
const { User, Thought } = require('../models');

// GET all users
router.get('/users', async (req, res) => {
try {
    const users = await User.find().populate('thoughts').populate('friends');
    res.json(users);
} catch (err) {
    res.status(500).json(err);
}
});

// GET a single user by ID
router.get('/users/:id', async (req, res) => {
try {
    const user = await User.findById(req.params.id).populate('thoughts').populate('friends');
    if (!user) {
    return res.status(404).json({ message: 'No user found with this ID' });
    }
    res.json(user);
} catch (err) {
    res.status(500).json(err);
}
});

// POST a new user
router.post('/users', async (req, res) => {
try {
    const user = await User.create(req.body);
    res.json(user);
} catch (err) {
    res.status(500).json(err);
}
});

// PUT to update a user by ID
router.put('/users/:id', async (req, res) => {
try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!user) {
    return res.status(404).json({ message: 'No user found with this ID' });
    }
    res.json(user);
} catch (err) {
    res.status(500).json(err);
}
});

// DELETE a user by ID
router.delete('/users/:id', async (req, res) => {
try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
    return res.status(404).json({ message: 'No user found with this ID' });
    }
    // Optionally remove the user's associated thoughts
    await Thought.deleteMany({ username: user.username });
    res.json({ message: 'User and associated thoughts deleted' });
} catch (err) {
    res.status(500).json(err);
}
});

// POST to add a friend to a user's friend list
router.post('/users/:userId/friends/:friendId', async (req, res) => {
try {
    const user = await User.findByIdAndUpdate(
    req.params.userId,
    { $addToSet: { friends: req.params.friendId } },
    { new: true }
    );
    if (!user) {
    return res.status(404).json({ message: 'No user found with this ID' });
    }
    res.json(user);
} catch (err) {
    res.status(500).json(err);
}
});

// DELETE to remove a friend from a user's friend list
router.delete('/users/:userId/friends/:friendId', async (req, res) => {
try {
    const user = await User.findByIdAndUpdate(
    req.params.userId,
    { $pull: { friends: req.params.friendId } },
    { new: true }
    );
    if (!user) {
    return res.status(404).json({ message: 'No user found with this ID' });
    }
    res.json(user);
} catch (err) {
    res.status(500).json(err);
}
});

module.exports = router;
