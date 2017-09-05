if (localStorage.getItem("focus")) {
  displayFocus();
}
else {
  let focusInput = document.querySelector("#focus-input");
  focusInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter"){ //Enter key pressed
      if (this.value === "") {
        console.log("empty");
      }
      else {
        localStorage.setItem("focus", this.value);
        displayFocus();
      }
    }
  });
}


let focusClose = document.querySelector(".focus-close");
focusClose.addEventListener("mouseup", deleteFocus);

let focusCheckbox = document.querySelector(".focus-row>div");
focusCheckbox.addEventListener("mouseup", completeFocus);

function displayFocus() {
  let focusQuestion = document.querySelector("#focus-question");
  let focusInput = document.querySelector("#focus-input");
  let focusDay =document.querySelector("#focus-day");
  let focusRow =document.querySelector(".focus-row");
  let focus = document.querySelector("#focus");
  let focusText = localStorage.getItem("focus");
  focus.innerHTML = focusText;
  focusInput.value = "";
  focusQuestion.classList.add("hidden");
  focusInput.classList.add("hidden");
  focusDay.classList.remove("hidden");
  focusRow.classList.remove("hidden");
}

function deleteFocus() {
    let focusQuestion = document.querySelector("#focus-question");
    let focusInput = document.querySelector("#focus-input");
    let focusDay =document.querySelector("#focus-day");
    let focusRow =document.querySelector(".focus-row");
    let focus = document.querySelector("#focus");
    focus.innerHTML = "";
    focusQuestion.classList.remove("hidden");
    focusInput.classList.remove("hidden");
    focusDay.classList.add("hidden");
    focusRow.classList.add("hidden");
    localStorage.removeItem("focus");
}

function completeFocus() {
  let focusCheckboxChecked = document.querySelector(".fa-check-square-o");
  let focus = document.querySelector("#focus");
  focusCheckboxChecked.classList.toggle("hidden");
  focus.classList.toggle("complete");
}