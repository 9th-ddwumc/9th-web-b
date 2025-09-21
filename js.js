// HTML 요소 가져오기
const input = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const doneList = document.getElementById("done-list");

// 배열
var todoItems = [];
var doneItems = [];

// localStorage에서 데이터 불러오기
var saved = localStorage.getItem("todos");
if (saved) {
  var parsed = JSON.parse(saved);
  todoItems = parsed.todo;
  doneItems = parsed.done;
}

// 화면 그리기
function render() {
  // 기존 내용을 초기화
  todoList.innerHTML = "";
  doneList.innerHTML = "";

  // todo 배열 렌더링
  for (var i = 0; i < todoItems.length; i++) {
    var li = document.createElement("li");
    li.innerHTML = todoItems[i] + " <button>완료</button>";

    (function(index){
      li.querySelector("button").onclick = function() {
        doneItems.push(todoItems[index]);  // 완료 배열로 이동
        todoItems.splice(index, 1);        // todo 배열에서 삭제
        saveAndRender();
      };
    })(i);

    todoList.appendChild(li);
  }

  // done 배열 렌더링
  for (var j = 0; j < doneItems.length; j++) {
    var li = document.createElement("li");
    li.innerHTML = doneItems[j] + " <button>삭제</button>";

    (function(index){
      li.querySelector("button").onclick = function() {
        doneItems.splice(index, 1);        // 완료 배열에서 삭제
        saveAndRender();
      };
    })(j);

    doneList.appendChild(li);
  }
}

// 배열 상태 저장 후 렌더링
function saveAndRender() {
  localStorage.setItem("todos", JSON.stringify({ todo: todoItems, done: doneItems }));
  render();
}

// Enter 키로 todo 추가
input.onkeyup = function(e) {
  if (e.key === "Enter" && input.value.trim() !== "") {
    todoItems.push(input.value.trim());
    input.value = "";
    saveAndRender();
  }
}

// 페이지 로드 시 초기 렌더링
render();
