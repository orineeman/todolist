const addBtn = document.querySelector(".addBtn");
const inputTodo = document.querySelector(".inputTodo");
const ulList = document.querySelector(".ulList");
const toggleBtn = document.querySelector(".toggleBtn");
const divList = document.querySelector(".divList");
const showBtn = document.querySelector(".showBtn");
let arrAllLists = [];


// הוספת אובייקט למערך
addBtn.onclick = function () {
  if (inputTodo.value !== "") {
    arrAllLists.push({
      toDolist: inputTodo.value,
      done: false,
    });
    inputTodo.value = "";
    inputTodo.focus();
    displayList(arrAllLists);
  }
};
// תצוגת הרשימה על המסך
function displayList(arr) {
  ulList.innerHTML = "";
  for (i = 0; i < arr.length; i++) {
    let list = createNewLi(arr[i]);
    if (arr[i].done === true) {
      list.classList.add("linethrough");
    } 
    ulList.append(
      list,
      createNewRemoveBtn(list, i),
      createNewDoneBtn(list, i, arr[i])
    );
  }
}
// יצירת רשומה חדשה
function createNewLi(objList) {
  const newLi = document.createElement("li");
  newLi.classList.add("newLi");
  newLi.textContent = objList.toDolist;
  return newLi;
}
// "יצירת כפתור "הסרה
function createNewRemoveBtn(list, arrIndex) {
  const newRemoveBtn = document.createElement("button");
  newRemoveBtn.classList.add("newRemoveBtn");
  newRemoveBtn.textContent = "remove";
  newRemoveBtn.id = "RemoveBtn" + arrIndex;
  newRemoveBtn.title="click to remove task";
  newRemoveBtn.onclick = () => RemoveList(list, arrIndex);
  return newRemoveBtn;
}
// הסרת רשומה
function RemoveList(list, arrIndex) {
  arrAllLists = arrAllLists.filter((p) => p.toDolist !== list.textContent);
  ulList.removeChild(list);
  ulList.removeChild(document.getElementById("RemoveBtn" + arrIndex));
  ulList.removeChild(document.getElementById("DoneBtn" + arrIndex));
}
// "יצירת כפתור "נעשה
function createNewDoneBtn(list, arrIndex, objList) {
  const newDoneBtn = document.createElement("button");
  newDoneBtn.classList.add("newDoneBtn");
  newDoneBtn.textContent = "done";
  newDoneBtn.id = "DoneBtn" + arrIndex;
  newDoneBtn.title="click to mark the task";
  newDoneBtn.onclick = () => doneList(list, arrIndex, objList);
  return newDoneBtn;
}
// "סימון רשומה כ"נעשה
function doneList(list, arrIndex, objList) {
  list.classList.add("linethrough");
  objList.done = true;
}
// שינוי מראה הדף
toggleBtn.onclick = function () {
  if (toggleBtn.innerText === "Dark Mode") {
    divList.style.background = "black";
    toggleBtn.textContent = "Standard view";
  } else {
    divList.style.background = "white";
    toggleBtn.textContent = "Dark Mode";
  }
};
// מראה רק את הרשומות שנעשו
showBtn.onclick = function showButton() {
  if (showBtn.textContent === "Show done") {
    const doneArr = [];
    for (let i = 0; i < arrAllLists.length; i++) {
      if (arrAllLists[i].done === true) {
        doneArr.push(arrAllLists[i]);
      }
    }
    displayList(doneArr);
    showBtn.textContent = "Show all";
  } else {
    displayList(arrAllLists);
    showBtn.textContent = "Show done";
  }
};
