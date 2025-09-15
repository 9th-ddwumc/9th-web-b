const input = document.querySelector("input");
const todoSection = document.querySelector(".sections section:nth-child(1)");
const doneSection = document.querySelector(".sections section:nth-child(2)");

// 할 일 목록과 해낸 일 목록을 저장할 배열
let todos = [];
let doneTodos = [];

// 페이지 로드 시 저장된 데이터 불러오기 및 UI 복원
window.onload = function () {
  const savedTodos = localStorage.getItem("todos");
  const savedDoneTodos = localStorage.getItem("doneTodos");

  if (savedTodos) {
    todos = JSON.parse(savedTodos);
    todos.forEach((item) => addTodo(item.text));
  }

  if (savedDoneTodos) {
    doneTodos = JSON.parse(savedDoneTodos);
    doneTodos.forEach((item) => completeTodo(item.text));
  }
};

// 할 일에 추가하는 함수
function addTodo(text) {
  const newItem = createItemElement(text, "완료");
  todoSection.appendChild(newItem);
}

// 해낸 일에 추가하는 함수
function completeTodo(text) {
  const newItem = createItemElement(text, "삭제");
  doneSection.appendChild(newItem);
}

// 아이템 div + 버튼 생성하는 공용 함수
function createItemElement(text, btnText) {
  const item = document.createElement("div");
  item.style.display = "flex";
  item.style.justifyContent = "space-between";
  item.style.alignItems = "center";
  item.style.margin = "5px 0";

  const todoText = document.createElement("div");
  todoText.textContent = text;

  const button = document.createElement("button");
  button.textContent = btnText;

  button.addEventListener("click", function () {
    if (button.textContent === "완료") {
      // 해야 할 일 -> 해낸 일
      todos = todos.filter((t) => t.text !== text);
      doneTodos.push({ text });
      updateStorage();

      todoSection.removeChild(item);
      doneSection.appendChild(item);
      button.textContent = "삭제";
    } else if (button.textContent === "삭제") {
      // 해낸 일 목록에서 삭제
      doneTodos = doneTodos.filter((t) => t.text !== text);
      updateStorage();
      doneSection.removeChild(item);
    }
  });

  item.appendChild(todoText);
  item.appendChild(button);

  return item;
}

// localStorage에 데이터 저장 함수
function updateStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
  localStorage.setItem("doneTodos", JSON.stringify(doneTodos));
}

// 입력 엔터 처리
input.addEventListener("keydown", function (event) {
  if (event.key === "Enter" && input.value.trim() !== "") {
    event.preventDefault();

    const text = input.value.trim();
    todos.push({ text });
    updateStorage();

    addTodo(text);

    input.value = "";
  }
});
