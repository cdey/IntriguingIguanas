// const { addList } = require('../database/db-queries/list.js')
const {
  fetchBoard
} = require('../database/db-queries/board.js')
const {
  addList,
  fetchLists
} = require('../database/db-queries/list.js')
const {
  addTask,
  fetchTasks
} = require('../database/db-queries/task.js')

var sockets = require('socket.io');
var io;
//import database queries

var rooms = [];
var currentBoard = null;

module.exports = {
    io: function() {
      return io;
    },
    init: function(server) {
        io = sockets(server);

        io.on('connection', function(socket) {
              console.log('Connected to ' + socket);

              socket.on('join-board', function(data) {
                  var room = data.taskBoardId.toString()

                  fetchLists(data.taskBoardId)
                    .then(lists => {
                      socket.emit('update-board', lists)
                      socket.to(room).emit('update-board', lists)
                    })
                  socket.join(room)
                  io.of('/').in(room).clients(function(error, clients) {
                    if (error) throw error;
                    console.log(`Clients in room ${room}: ${clients}`);
                  });
                  // <------------- CREATE LIST ------------->
                  socket.on('create-list', function(data) {
                    addList(data.name, data.boardId)
                      .then(msg => {
                        fetchLists(data.boardId)
                          .then(lists => {
                            socket.emit('update-board', lists)
                            socket.to(room).emit('update-board', lists)
                          })
                          .catch(err => {
                            console.log('Retrieving board error')
                          })
                      })
                      .catch(err => {
                        console.log('Error creating list', err)
                      })
                  });

                  // <------------- CREATE TASK ------------->
                  socket.on('create-task', function(data) {
                    addTask(data.listId, data.text)
                      .then((results) => {
                        socket.emit('update-list')
                        socket.to(room).emit('update-list')
                      })
                      .catch(err => {
                        console.log('Error creating tasks', err)
                      })
                  });


                  socket.on('fetch-tasks', (data) => {
                    console.log('---> LIST_ID', data.list_id)
                    fetchTasks(data.list_id)
                      .then(results => {
                        socket.emit('tasks-fetched', data.rows)
                        socket.to(room).emit('tasks-fetched', data.rows)
                      })
                      .catch(err => {
                        console.log('Retrieving tasks error')
                      })
                  })

                  socket.on('disconnect', function() {
                    console.log('client disconnected')
                  });

                  return io;
                })
              })
            }
          }