import taskModel from '../models/task.js';

const CheckTaskOwner = async (req, res, next) => {
    const taskId = req.params.id;

    try {
        const task = await taskModel.findOne({
            _id: taskId
        });

        if(task.userId.toString() == req['body']['userId']) {
            next();
        } else {
            res.status(400).json({'message': 'Task belongs to another user, don\'t try to tamper with it!!!'});
        }
    } catch (e) {
        return res.status(400).json({'message': 'Invalid Task Id'});
    }
}

export default CheckTaskOwner;