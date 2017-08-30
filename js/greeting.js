if (localStorage.getItem("name")) {
  greetUser();
  allowNameChange();
}
else {
  let name = document.querySelector("#name");
  name.addEventListener("keydown", function(event) {  

    if (event.key === "Enter"){ //Enter key pressed
      if (this.value === "") {
        let msg = document.querySelector(".greeting-msg");
        msg.innerHTML = "Please enter your name.";
      }
      else {
        localStorage.setItem("name", this.value);
        greetUser();
        allowNameChange();
      }
    }
  });
}

function greetUser() {
  let start = document.querySelector(".start-page");
  let main = document.querySelector(".main-wrapper");
  let greeting = document.querySelector("#greeting");
  let greetingText = timeAppropriateGreeting();
  greetingText += "<span contenteditable=\"false\" spellcheck=\"false\">";
  greetingText += localStorage.getItem("name");
  greetingText += "</span>.";
  greeting.innerHTML = greetingText;
  start.classList.add("hidden");
  main.classList.remove("hidden");
}

function timeAppropriateGreeting() {
  let currentDateTime = new Date();
  let hour = currentDateTime.getHours();
  if (hour >= 0 && hour < 12) {
    return "Good Morning ";
  }
  else if (hour < 18) {
    return "Good Afternoon ";
  }
  else {
    return "Good Evening ";
  }
}

function allowNameChange() {
  let displayedName = document.querySelector("#greeting>span");

  displayedName.addEventListener("dblclick", function(event) {
    this.setAttribute("contenteditable", "true");
    this.classList.add("editName");
    this.focus();
  });

  displayedName.addEventListener("keydown", function(event) {
    if (event.key === "Enter"){ //Enter key pressed
      event.preventDefault();
      displayedName.blur();
    }
  });

  displayedName.addEventListener("blur", function(event) {
    localStorage.setItem("name", this.innerHTML);
    this.setAttribute("contenteditable", "false");
    this.classList.remove("editName");  
  });
}