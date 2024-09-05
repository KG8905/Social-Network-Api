const mongoose = require('mongoose');
const reactionSchema = require('./Reaction'); // Import Reaction schema

const thoughtSchema = new mongoose.Schema({
thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280
},
createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => new Date(timestamp).toLocaleString() // Getter to format the date
},
username: {
    type: String,
    required: true
},
reactions: [reactionSchema]
}, {
toJSON: {
    virtuals: true,
    getters: true
},
id: false
});

// Create a virtual property `reactionCount` that gets the length of the reactions array
thoughtSchema.virtual('reactionCount').get(function() {
return this.reactions.length;
});

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;
