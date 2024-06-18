const mongoose = require('mongoose');


const ToDoTaskSchema = new mongoose.Schema({

     name : {
          type: String,
          required : true
     },
     description : {
          type: String,
          required : true
     },
     created_by : {
          type: String,
          required : true
     },
     assigned_to : {
          type: String,
     },
     status: {
          type: String,
          required: true,
          enum: ['active', 'completed','incomplete','pending'],
      }
});


const ToDoTask = mongoose.model('ToDoTask', ToDoTaskSchema);

module.exports = ToDoTask;
