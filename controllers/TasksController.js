import taskModel from '../models/task.js';

const CreateTask = async (req, res) => {
    const task = req['entity'];

    await taskModel.create(task);

    return res.status(201).json({'message': 'Task created successfully!'});
}

const GetTask = async (req, res) => {
    const taskId = req.params.id;

    if(!taskId) return res.status(400).json({'message': 'Cannot Find Task, id missing'});

    try {
        const task = await taskModel.findOne({
            _id: taskId
        });

        return res.status(200).json({
            id: task._id.toString(),
            title: task.title,
            description: task.description,
            status: task.status
        });

    } catch (e) {
        return res.status(400).json({'message': 'Task does not exist'});
    }
}

const GetTasks = async (req, res) => {
    const tasks = await taskModel.find({
        userId: req['body']['userId']
    });

    const resTasks = tasks.map((task) => {
        return {
            id: task._id.toString(),
            title: task.title,
            description: task.description,
            status: task.status
        }
    });

    return res.status(200).json(resTasks);
}

const EditTasks = async (req, res) => {
    const task = req['entity'];

    task['id'] = req['params']['id'];

    if(!task['id']) return res.status(400).json({'message': 'Cannot Update Task, id missing'});

    try {
        await taskModel.findOneAndUpdate({
            _id: task['id'],
            userId: task['userId']
        }, {
            title: task.title,
            description: task.description,
            status: task.status
        });
    
        return res.status(200).json({'message': 'Task updated successfully!'});
    } catch (e) {
        return res.status(400).json({'message': 'Task does not exist'});
    }

}

const DeleteTask = async (req, res) => {
    const taskId = req.params.id;

    if(!taskId) return res.status(400).json({'message': 'Cannot Delete Task, id missing'});

    try {
        await taskModel.findOneAndDelete({
            _id: taskId
        });

        return res.status(200).json({'message': 'Task deleted successfully!'});
    } catch (e) {
        return res.status(400).json({'message': 'Task does not exist'});
    }
}

export { CreateTask, GetTasks, GetTask, EditTasks, DeleteTask };