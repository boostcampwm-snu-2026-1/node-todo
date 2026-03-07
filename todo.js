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