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

// 3. todo 완료 처리하기

// 4. todo 삭제하기

// 5. todo 내용 변경하기
