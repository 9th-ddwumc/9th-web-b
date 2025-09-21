document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("todo-input");
  const todoList = document.getElementById("todo-list");
  const doneList = document.getElementById("done-list");

  // localStorage에서 데이터 로드
  function loadTodos() {
    const data = JSON.parse(localStorage.getItem("todos")) || { todo: [], done: [] };
    data.todo.forEach(text => todoList.appendChild(createTodoItem(text, false)));
    data.done.forEach(text => doneList.appendChild(createTodoItem(text, true)));
  }

  // localStorage에 데이터 저장
  function saveTodos() {
    const todos = {
      todo: [...todoList.querySelectorAll("li")].map(li => li.firstChild.textContent),
      done: [...doneList.querySelectorAll("li")].map(li => li.firstChild.textContent)
    };
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  // todo 아이템 생성 
  function createTodoItem(text, isDone) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = text;
  li.appendChild(span);

  if (!isDone) {
    // 해야 할 일에는 완료 버튼만
    const completeBtn = document.createElement("button");
    completeBtn.textContent = "완료";
    completeBtn.addEventListener("click", () => {
      doneList.appendChild(createTodoItem(text, true));
      li.remove();
      saveTodos();
    });
    li.appendChild(completeBtn);
  } else {
    // 해낸 일에는 삭제 버튼만
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "삭제";
    deleteBtn.addEventListener("click", () => {
      li.remove();
      saveTodos();
    });
    li.appendChild(deleteBtn);
  }

  return li;
}


  // ✅ Enter 입력 시 todo 추가
  input.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      const text = input.value.trim();
      if (text === "") return;

      const li = createTodoItem(text, false);
      todoList.appendChild(li);
      input.value = "";
      saveTodos();
    }
  });

  // 초기 로드
  loadTodos();
});
