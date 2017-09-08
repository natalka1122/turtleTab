// greeting
(function() {
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
      return "Good Morning, ";
    }
    else if (hour < 18) {
      return "Good Afternoon, ";
    }
    else {
      return "Good Evening, ";
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

})();

//focus
(function() {
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
    focus.classList.remove("complete");
  }

  function completeFocus() {
    let focusCheckboxChecked = document.querySelector(".fa-check-square-o");
    let focus = document.querySelector("#focus");
    focusCheckboxChecked.classList.remove("hidden");
    focus.classList.add("complete");
  }

})();

// time
(function() {
  Date.prototype.getMonthText = function() {
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months[this.getMonth()];
  };

  $( document ).ready(function() {
    (function () {
      function checkTime(i) {
        return (i < 10) ? "0" + i : i;
      }

      function startTime() {
        var today = new Date(),
          h = checkTime(today.getHours()),
          m = checkTime(today.getMinutes()),
          day = today.getDate();
        month = today.getMonthText();
        $("#time").html(h + ":" + m);
        $("#date").html(month+", "+day);
        t = setTimeout(function () {
          startTime();
        }, 1000);
      }
      startTime();
    })();

  });

})();