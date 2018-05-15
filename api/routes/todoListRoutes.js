'use strict';
const Pusher = require('pusher');
module.exports = function(app) {
  var todoList = require('../controllers/todoListController');




  app.get('/', (req, res) => {
    res.send('all good');
  });
  

 

  app.post('/pusher/auth', (req, res) => {
      const socketId = req.body.socket_id;
      const channel = req.body.channel_name;
      const auth = pusher.authenticate(socketId, channel);
      res.send(auth);
    });
    const pusher = new Pusher({
      appId: '522066',
    key: '33a4da173eb9b8ad3bed',
    secret: 'ce32a4bfaabb69c023e2',
    cluster: 'ap2',
    encrypted: true
    });
  
  // todoList Routes
  app.route('/tasks')
    .get(todoList.list_all_tasks)
    .post(todoList.create_a_task);


    app.post('/vote', (req, res) => {
        const { body } = req;
        const { player } = body;
        pusher.trigger('vote-channel', 'vote', {
          player,
        });
        res.json({ player });
      });

    app.post('/pusher/auth', (req, res) => {
        console.log('POST to /pusher/auth');
        const socketId = req.body.socket_id;
        const channel = req.body.channel_name;
      });

  app.route('/tasks/:taskId')
    .get(todoList.read_a_task)
    .put(todoList.update_a_task)
    .delete(todoList.delete_a_task);
};