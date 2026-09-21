import mongoose, { isObjectIdOrHexString } from "mongoose";

const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending'
    },
    userId: mongoose.Schema.Types.ObjectId
});

const taskModel = mongoose.model('task', taskSchema);

export default taskModel;