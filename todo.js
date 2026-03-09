import fs from "node:fs"; // 파일 제어 도구 불러오기

let todolist = [];

try {
  todolist = fs.readFileSync("todo.json", "utf-8");
  todolist = JSON.parse(todolist);
} catch (err) {
  fs.writeFileSync("todo.json", "[]");
}

// 1. 파일에 todo 추가하기
let task = {
  id: 0,
  content: process.argv[3],
  done: false,
};

if (process.argv[2] == "add") {
  let maxid = todolist[todolist.length - 1]?.id || 0;
  task.id = maxid + 1;
  todolist = [...todolist, task];
  fs.writeFileSync("todo.json", JSON.stringify(todolist, null, 2));
  console.log(`"${process.argv[3]}"가 할 일에 추가되었다.`);
}

// 2. todo 목록 조회하기
if (process.argv[2] == "list") {
  if (todolist.length == 0) {
    console.log("Todo가 없습니다.");
  } else {
    for (const task of todolist) {
      console.log(`[${task.done ? "x" : ""}] ${task.id}. ${task.content}`);
    }
  }
}

// 3. todo 완료 처리하기
if (process.argv[2] == "done") {
  const id = parseInt(process.argv[3]);
  const index = todolist.findIndex((task) => task.id == id);
  if (index == -1) {
    console.log("해당 ID를 찾을 수 없습니다.");
  } else {
    todolist[index].done = true;
    fs.writeFileSync("todo.json", JSON.stringify(todolist, null, 2));
    console.log(`ID [${todolist[index].id}]번 항목이 완료되었습니다.`);
  }
}
// 4. todo 삭제하기
if (process.argv[2] == "delete") {
  const id = parseInt(process.argv[3]);
  const index = todolist.findIndex((task) => task.id == id);
  if (index == -1) {
    console.log("해당 ID를 찾을 수 없습니다.");
  } else {
    todolist.splice(index, 1);
    fs.writeFileSync("todo.json", JSON.stringify(todolist, null, 2));
    console.log(`ID [${id}]번 항목이 삭제되었습니다.`);
  }
}
// 5. todo 내용 변경하기
if (process.argv[2] == "update") {
  const id = parseInt(process.argv[3]);
  const newContent = process.argv[4];
  const index = todolist.findIndex((task) => task.id == id);
  if (index == -1) {
    console.log("해당 ID를 찾을 수 없습니다.");
  } else {
    todolist[index].content = newContent;
    fs.writeFileSync("todo.json", JSON.stringify(todolist, null, 2));
    console.log(`ID [${id}]번 항목이 "${newContent}"로 변경되었습니다.`);
  }
}
