var input = document.querySelector(".todo__input");
var todoList = document.querySelector(".todo__list--todo");
var doneList = document.querySelector(".todo__list--done");
var addButton = document.querySelector(".todo__button--finish");

var todos = [];
var doneTodos = [];

window.onload = function () {
  var savedTodos = localStorage.getItem("todos");
  var savedDoneTodos = localStorage.getItem("doneTodos");
  if (savedTodos) {
    todos = JSON.parse(savedTodos);
    todos.forEach(function (item) {
      addTodo(item.text);
    });
  }
  if (savedDoneTodos) {
    doneTodos = JSON.parse(savedDoneTodos);
    doneTodos.forEach(function (item) {
      completeTodo(item.text);
    });
  }
};

function addTodo(text) {
  if (!todoList) return;
  var newItem = createItemElement(text, "완료");
  todoList.appendChild(newItem);
}

function completeTodo(text) {
  if (!doneList) return;
  var newItem = createItemElement(text, "삭제");
  doneList.appendChild(newItem);
}

function createItemElement(text, btnText) {
  var item = document.createElement("div");
  item.style.display = "flex";
  item.style.justifyContent = "space-between";
  item.style.alignItems = "center";
  item.style.margin = "5px 0";

  var todoText = document.createElement("div");
  todoText.textContent = text;

  var button = document.createElement("button");
  button.textContent = btnText;

  if (btnText === "완료") {
    button.className = "todo__button todo__button--finish";
  } else if (btnText === "삭제") {
    button.className = "todo__button todo__button--delete";
  }

  button.addEventListener("click", function () {
    if (button.textContent === "완료") {
      todos = todos.filter(function (t) {
        return t.text !== text;
      });
      doneTodos.push({ text: text });
      updateStorage();

      if (todoList && doneList) {
        todoList.removeChild(item);
        doneList.appendChild(item);
        button.textContent = "삭제";
        button.className = "todo__button todo__button--delete";
      }
    } else if (button.textContent === "삭제") {
      doneTodos = doneTodos.filter(function (t) {
        return t.text !== text;
      });
      updateStorage();

      if (doneList) {
        doneList.removeChild(item);
      }
    }
  });

  item.appendChild(todoText);
  item.appendChild(button);

  return item;
}

function updateStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
  localStorage.setItem("doneTodos", JSON.stringify(doneTodos));
}

if (addButton && input) {
  addButton.addEventListener("click", function () {
    var text = input.value.trim();
    if (text !== "") {
      todos.push({ text: text });
      updateStorage();
      addTodo(text);
      input.value = "";
    }
  });
}
