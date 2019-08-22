const { Schema, model } = require('mongoose');
const DevSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    bio:String,
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'Dev'
    }],
    deslikes: [{
        type: Schema.Types.ObjectId,
        ref: 'Dev',

    }],
    avatar: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
//timestamps cria uma coluna automática chamada createdAt e updatedAt que salva a data

module.exports = model('Dev', DevSchema);
