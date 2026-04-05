import fs from "node:fs";

const FILE_NAME = "todos.json";

function readTodos() {
  if (!fs.existsSync(FILE_NAME)) {
    return [];
  }

  const data = fs.readFileSync(FILE_NAME, "utf-8");

  if (data === "") {
    return [];
  }

  return JSON.parse(data);
}

function writeTodos(todos) {
  fs.writeFileSync(FILE_NAME, JSON.stringify(todos, null, 2));
}

function addTodo(content) {
  const todos = readTodos();
  const newId = todos.length === 0 ? 1 : todos[todos.length - 1].id + 1;

  todos.push({
    id: newId,
    content: content,
    done: false,
  });

  writeTodos(todos);
  console.log(`Todo가 추가되었습니다: ${content}`);
}

function listTodos() {
  const todos = readTodos();

  if (todos.length === 0) {
    console.log("Todo가 없습니다.");
    return;
  }

  for (const todo of todos) {
    const mark = todo.done ? "[x]" : "[ ]";
    console.log(`${mark} ${todo.id}. ${todo.content}`);
  }
}

function doneTodo(id) {
  const todos = readTodos();
  const todo = todos.find((item) => item.id === Number(id));

  if (!todo) {
    console.log("해당 ID를 찾을 수 없습니다.");
    return;
  }

  todo.done = true;
  writeTodos(todos);
  console.log(`ID ${id}번 항목이 완료되었습니다.`);
}

function deleteTodo(id) {
  const todos = readTodos();
  const index = todos.findIndex((item) => item.id === Number(id));

  if (index === -1) {
    console.log("해당 ID를 찾을 수 없습니다.");
    return;
  }

  todos.splice(index, 1);
  writeTodos(todos);
  console.log(`ID ${id}번 항목이 삭제되었습니다.`);
}

function updateTodo(id, newContent) {
  const todos = readTodos();
  const todo = todos.find((item) => item.id === Number(id));

  if (!todo) {
    console.log("해당 ID를 찾을 수 없습니다.");
    return;
  }

  todo.content = newContent;
  writeTodos(todos);
  console.log(`ID ${id}번 항목이 수정되었습니다.`);
}

const command = process.argv[2];

if (command === "add") {
  addTodo(process.argv[3]);
} else if (command === "list") {
  listTodos();
} else if (command === "done") {
  doneTodo(process.argv[3]);
} else if (command === "delete") {
  deleteTodo(process.argv[3]);
} else if (command === "update") {
  updateTodo(process.argv[3], process.argv[4]);
}