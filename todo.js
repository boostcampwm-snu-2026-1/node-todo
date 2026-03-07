const fs = require("fs");

const command = process.argv[2];
const content = process.argv[3];

if (command === "add") {
  const data = fs.readFileSync("todos.json", "utf8");
  const todos = JSON.parse(data);

  const newTodo = {
    id: todos.length + 1,
    content: content,
    done: false
  };

  todos.push(newTodo);
  fs.writeFileSync("todos.json", JSON.stringify(todos));
  console.log("Todo가 추가되었습니다:", content);
}

if (command === "list") {
  const data = fs.readFileSync("todos.json", "utf8");
  const todos = JSON.parse(data);

  if (todos.length === 0) {
    console.log("Todo가 없습니다.");
  } else {
    for (const todo of todos) {
      const mark = todo.done ? "[x]" : "[ ]";
      console.log(mark, todo.id + ".", todo.content);
    }
  }
}

if (command === "done") {
  const id = Number(process.argv[3]);

  const data = fs.readFileSync("todos.json", "utf8");
  const todos = JSON.parse(data);

  const todo = todos.find(t => t.id === id);

  if (!todo) {
    console.log("해당 ID를 찾을 수 없습니다.");
    return;
  }

  todo.done = true;
  fs.writeFileSync("todos.json", JSON.stringify(todos));
  console.log(`ID ${id}번 항목이 완료되었습니다.`);
}

if (command === "delete") {
  const id = Number(process.argv[3]);

  const data = fs.readFileSync("todos.json", "utf8");
  const todos = JSON.parse(data);

  const newTodos = todos.filter(todo => todo.id !== id);

  if (todos.length === newTodos.length) {
    console.log("해당 ID를 찾을 수 없습니다.");
  } else {
    fs.writeFileSync("todos.json", JSON.stringify(newTodos));
    console.log(`ID ${id}번 항목이 삭제되었습니다.`);
  }
}

if (command === "update") {
  const id = Number(process.argv[3]);
  const newContent = process.argv[4];

  const data = fs.readFileSync("todos.json", "utf8");
  const todos = JSON.parse(data);

  const todo = todos.find(t => t.id === id);

  if (!todo) {
    console.log("해당 ID를 찾을 수 없습니다.");
    return;
  }

  todo.content = newContent;
  fs.writeFileSync("todos.json", JSON.stringify(todos));
  console.log(`ID ${id}번 항목이 수정되었습니다.`);
}