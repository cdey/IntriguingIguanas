const db = require('../db.js');

module.exports = {
  deleteTask: (task_id) => {
    return db.query(`DELETE FROM tasks WHERE id=${task_id}`);
  },
  editTask: (task_id, text) => {
    return db.query(`UPDATE tasks SET text='${text}' WHERE id=${task_id}`);
  },
  addTask: (list_id, text) => {
    return db.query(`INSERT INTO tasks (list_id, text) VALUES (${list_id},'${text}')`);
  },
  assignTask: (task_id, user) => {
    return db.query(`UPDATE tasks SET assigned='${user}' WHERE id=${task_id}`);
  },
  fetchTasks: (list_id) => {
    return db.query(`SELECT * FROM tasks WHERE list_id=${list_id}`)
  }
}