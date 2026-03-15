import fs from 'node:fs';


function id(todos) {
    if (todos.length === 0) return 1;
    return todos[todos.length - 1].id + 1;
}

function loadTodos() {
    if (!fs.existsSync('todos.json')) {
        fs.writeFileSync('todos.json', '[]');
    }

    const data = fs.readFileSync('todos.json', 'utf-8');
    return JSON.parse(data);
}

function saveTodos(todos) {
    fs.writeFileSync('todos.json', JSON.stringify(todos, null, 2));
}


function add(content) {
    const todos = loadTodos();

    const newTodo = {
        id: id(todos), 
        content: content,
        done: false
    };

    todos.push(newTodo);
    saveTodos(todos);

    console.log(`Todo가 추가되었습니다: ${content}`);
}

const command = process.argv[2];
const arg = process.argv[3];

function list() {
    const todos = loadTodos();

    if (todos.length == 0) {
        console.log("Todo가 없습니다.");
        return;
    }

    for (const todo of todos) {
        const mark = todo.done ? "[x]" : "[]";
        console.log(`${mark} ${todo.id}. ${todo.content}`);
    }
}

function done(id) {
    const todos = loadTodos();
    const todo = todos.find(todo => todo.id === Number(id));

    if (!todo) {
        console.log("해당 ID를 찾을 수 없습니다.");
        return;
    }

    todo.done = true;
    saveTodos(todos);

    console.log(`ID ${id}번 항목이 완료되었습니다.`);
}

if (command === 'add') {
    add(arg);
} else if (command === 'list') {
    list();
} else if (command === 'done') {
    done(arg);
}
