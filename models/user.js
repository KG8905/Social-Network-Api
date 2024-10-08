const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
username: {
    type: String,
    unique: true,
    required: true,
    trim: true
},
email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match a valid email address']
},
thoughts: [
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Thought'
    }
],
friends: [
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
    }
]
}, {
toJSON: {
    virtuals: true
},
id: false
});

// Create a virtual property `friendCount` that gets the length of the user's friends array
userSchema.virtual('friendCount').get(function() {
return this.friends.length;
});

const User = mongoose.model('User', userSchema);

module.exports = User;
