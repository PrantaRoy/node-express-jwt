const ToDoTask = require('../models/ToDoTask');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');

dotenv.config();


exports.storeTask = async (req, res) => {
     const { name, description, assigned_to, status } = req.body;
 
     try {
         const taskExists = await ToDoTask.findOne({ name });
         const user = req.user;
         const created_by = user._id;
 
         if (taskExists) {
             return res.status(400).json({ message: 'Task Already Exist' });
         }
 
         const todotask = await ToDoTask.create({
             name,
             description,
             created_by,
             assigned_to,
             status,
         });
 
         res.status(201).json({
             _id: todotask._id,
             name: todotask.name,
             description: todotask.description,
             created_by: todotask.created_by,
             assigned_to: todotask.assigned_to,
             status: todotask.status,
         });
     } catch (error) {
         console.log(error);
         res.status(500).json({
             message: 'Server Error',
         });
     }
 };

exports.getTodos = async (req , res) => {
    
     try {
          const user = req.user;
          const created_by = user._id;
          const todotasks = await ToDoTask.find({ created_by });
          res.status(201).json(todotasks);
     } catch (error) {
          console.log(error);
          res.status(500).json({
               'message' : 'Server Error'
          })
     };
};


exports.showTodo = async (req , res) => {
     try {
          const { id } = req.params;
  
          const todotask = await ToDoTask.findById(id);
          if (!todotask) {
               return res.status(404).json({ message: 'Task not found' });
           }
          res.status(201).json(todotask);
     } catch (error) {
          console.log(error);
          res.status(500).json({
               'message' : 'Server Error'
          })
     };
};


exports.updateTodo = async (req , res) => {
     try {
          const { name, description, assigned_to, status } = req.body;
          const { id } = req.params;
  
          const todotask = await ToDoTask.findById(id);
          if (!todotask) {
               return res.status(404).json({ message: 'Task not found' });
           }
           const updatedTask = await ToDoTask.findByIdAndUpdate(
               id,
               { name, description, assigned_to, status },
               { new: true, runValidators: true }
           );
          res.status(201).json(updatedTask);
     } catch (error) {
          console.log(error);
          res.status(500).json({
               'message' : 'Server Error'
          })
     };
};


exports.deleteTodo = async (req , res) => {
     try {
          const { id } = req.params;
  
          const todotask = await ToDoTask.findById(id);
          if (!todotask) {
               return res.status(404).json({ message: 'Task not found' });
           }
           await ToDoTask.findByIdAndDelete(id);
           res.status(200).json({ message: 'Task deleted successfully' });
     } catch (error) {
          console.log(error);
          res.status(500).json({
               'message' : 'Server Error'
          })
     };
};