const Task = require('../models/Task');

//it will create new tasks document
exports.createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const task = new Task({ title, description, status });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//get all document present in collection
exports.getTasks = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 3;

    const { status, search = '' } = req.query;
    const filter = {
      ...(status && { status }),
      ...(search && { title: { $regex: search, $options: 'i' } }),
    }
    
    //pagination
    const skip = (page - 1) * limit
    const tasks = await Task.find(filter).skip(skip).limit(limit);
    const total = await Task.countDocuments(filter);
    res.json({
      page: page,
      limit: limit,
      total,
      tasks
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get singal document based on id
exports.getTask = async (req, res) => {
  try {
    // console.log(req.params.id);
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//it will update in document in req id
exports.updateTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, status },
      { new: true, runValidators: true }
    );
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//it will delete a particular document based on req id
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
