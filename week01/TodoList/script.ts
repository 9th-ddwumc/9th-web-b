// const input = document.querySelector(".todo__input") as HTMLInputElement | null;
// const todoList = document.querySelector(".todo__list--todo") as HTMLElement | null;
// const doneList = document.querySelector(".todo__list--done") as HTMLElement | null;
// const addButton = document.querySelector(".todo__button--finish") as HTMLButtonElement | null;

// interface Todo {
//   text: string;
// }

// let todos: Todo[] = [];
// let doneTodos: Todo[] = [];

// window.onload = function () {
//   const savedTodos = localStorage.getItem("todos");
//   const savedDoneTodos = localStorage.getItem("doneTodos");

//   if (savedTodos) {
//     todos = JSON.parse(savedTodos);
//     todos.forEach((item) => {
//       addTodo(item.text);
//     });
//   }
//   if (savedDoneTodos) {
//     doneTodos = JSON.parse(savedDoneTodos);
//     doneTodos.forEach((item) => {
//       completeTodo(item.text);
//     });
//   }
// };

// function addTodo(text: string) {
//   if (!todoList) return;
//   const newItem = createItemElement(text, "완료");
//   todoList.appendChild(newItem);
// }

// function completeTodo(text: string) {
//   if (!doneList) return;
//   const newItem = createItemElement(text, "삭제");
//   doneList.appendChild(newItem);
// }

// function createItemElement(text: string, btnText: "완료" | "삭제"): HTMLElement {
//   const item = document.createElement("div");
//   item.style.display = "flex";
//   item.style.justifyContent = "space-between";
//   item.style.alignItems = "center";
//   item.style.margin = "5px 0";

//   const todoText = document.createElement("div");
//   todoText.textContent = text;

//   const button = document.createElement("button");
//   button.textContent = btnText;

//   if (btnText === "완료") {
//     button.className = "todo__button todo__button--finish";
//   } else if (btnText === "삭제") {
//     button.className = "todo__button todo__button--delete";
//   }

//   button.addEventListener("click", function () {
//     if (button.textContent === "완료") {
//       todos = todos.filter((t) => t.text !== text);
//       doneTodos.push({ text });
//       updateStorage();

//       if (todoList && doneList) {
//         todoList.removeChild(item);
//         doneList.appendChild(item);
//         button.textContent = "삭제";
//         button.className = "todo__button todo__button--delete";
//       }
//     } else if (button.textContent === "삭제") {
//       doneTodos = doneTodos.filter((t) => t.text !== text);
//       updateStorage();

//       if (doneList) {
//         doneList.removeChild(item);
//       }
//     }
//   });

//   item.appendChild(todoText);
//   item.appendChild(button);

//   return item;
// }

// function updateStorage() {
//   localStorage.setItem("todos", JSON.stringify(todos));
//   localStorage.setItem("doneTodos", JSON.stringify(doneTodos));
// }

// if (addButton && input) {
//   addButton.addEventListener("click", function () {
//     const text = input.value.trim();
//     if (text !== "") {
//       todos.push({ text });
//       updateStorage();
//       addTodo(text);
//       input.value = "";
//     }
//   });
// }
