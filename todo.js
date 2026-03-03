import fs from "node:fs"; // 파일 제어 도구 불러오기

var count = 1;
const task = `[ ] ${count}. ${process.argv[3]}`;

// 1. 파일에 todo 추가하기
if (process.argv[2] == "add") {
  fs.appendFileSync("todo.txt", `${task}\n`);
  count++;
}

// 2. todo 목록 조회하기

// 3. todo 완료 처리하기

// 4. todo 삭제하기

// 5. todo 내용 변경하기
