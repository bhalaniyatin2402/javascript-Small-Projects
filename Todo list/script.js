// declaring all global variable here
const input = document.getElementById("input");
const addBtn = document.getElementById("addbtn");
const ulTag = document.getElementById("ultag");

// items add to list when click +Add button
addBtn.addEventListener("click", () => {
  if (input.value !== "") {
    const newli = document.createElement("li")
    newli.innerHTML = `<p>${input.value}</p>s
        <button id="editbtn" onclick="editListItem(this)">Edit</button>
        <button id="removebtn" onclick="removeListItem(this)">Remove</button>`;
    ulTag.appendChild(newli);
    input.value = "";

    if (ulTag.children[0].id === "emptylist") {
      ulTag.children[0].remove();
    }
  }
});

// remove item from list
function removeListItem(removeBtn) {
  removeBtn.parentElement.remove();
  if (ulTag.children.length <= 0) {
    const p = document.createElement("p");
    p.id = "emptylist";
    p.textContent = "There is no task. Enter task name and add here";
    ulTag.appendChild(p);
  }
}

// edit list item name
function editListItem(event) {
  if (event.textContent === "Edit") {
    event.textContent = "Done";
    const inputfield = document.createElement("input");
    inputfield.id = "inputfield";
    inputfield.style.flexGrow = 1;
    inputfield.classList.add("design");
    inputfield.value = event.previousElementSibling.textContent;
    event.parentElement.replaceChild(inputfield, event.previousElementSibling);
  } else {
    if (inputfield.value !== "") {
      event.textContent = "Edit";
      const taskname = document.createElement("p");
      taskname.id = "taskname";
      taskname.textContent = event.previousElementSibling.value;
      event.parentElement.replaceChild(taskname, event.previousElementSibling);
    }
  }
}