const express = require('express');
const router = express.Router();
const { Thought, User } = require('../models');

// GET all thoughts
router.get('/thoughts', async (req, res) => {
try {
    const thoughts = await Thought.find();
    res.json(thoughts);
} catch (err) {
    res.status(500).json(err);
}
});

// GET a single thought by ID
router.get('/thoughts/:id', async (req, res) => {
try {
    const thought = await Thought.findById(req.params.id);
    if (!thought) {
    return res.status(404).json({ message: 'No thought found with this ID' });
    }
    res.json(thought);
} catch (err) {
    res.status(500).json(err);
}
});

// POST a new thought
router.post('/thoughts', async (req, res) => {
try {
    const thought = await Thought.create(req.body);
    await User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: thought._id } }, { new: true });
    res.json(thought);
} catch (err) {
    res.status(500).json(err);
}
});

// PUT to update a thought by ID
router.put('/thoughts/:id', async (req, res) => {
try {
    const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!thought) {
    return res.status(404).json({ message: 'No thought found with this ID' });
    }
    res.json(thought);
} catch (err) {
    res.status(500).json(err);
}
});

// DELETE a thought by ID
router.delete('/thoughts/:id', async (req, res) => {
try {
    const thought = await Thought.findByIdAndDelete(req.params.id);
    if (!thought) {
    return res.status(404).json({ message: 'No thought found with this ID' });
    }
    res.json({ message: 'Thought deleted' });
} catch (err) {
    res.status(500).json(err);
}
});

// POST a reaction to a thought
router.post('/thoughts/:thoughtId/reactions', async (req, res) => {
try {
    const thought = await Thought.findByIdAndUpdate(
    req.params.thoughtId,
    { $addToSet: { reactions: req.body } },
    { new: true }
    );
    if (!thought) {
    return res.status(404).json({ message: 'No thought found with this ID' });
    }
    res.json(thought);
} catch (err) {
    res.status(500).json(err);
}
});

// DELETE a reaction by reactionId
router.delete('/thoughts/:thoughtId/reactions/:reactionId', async (req, res) => {
try {
    const thought = await Thought.findByIdAndUpdate(
    req.params.thoughtId,
    { $pull: { reactions: { reactionId: req.params.reactionId } } },
    { new: true }
    );
    if (!thought) {
    return res.status(404).json({ message: 'No thought found with this ID' });
    }
    res.json(thought);
} catch (err) {
    res.status(500).json(err);
}
});

module.exports = router;
