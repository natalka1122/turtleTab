let start = document.querySelector(".start-page");
let main = document.querySelector(".main-wrapper");
let greeting = document.querySelector("#greeting");

if (localStorage.getItem("name")) {
  let greetingText = timeAppropriateGreeting() + localStorage.getItem("name") + "!";
  start.classList.toggle("hidden");
  main.classList.toggle("hidden");
  greeting.innerHTML = greetingText;
}
else {
  let name = document.querySelector("#name");
  let msg = document.querySelector(".greeting-msg");

  name.addEventListener('keydown', function(event) {  

    if (event.which == 13){ //Enter key pressed
      if (this.value === "") {
        msg.innerHTML = "<span>Please enter your name.</span><span><a href=\"\">Not now!</a></span>";
      }
      else {
        start.classList.toggle("hidden");
        localStorage.setItem("name", this.value);
        main.classList.toggle("hidden");
        let greetingText = timeAppropriateGreeting() + localStorage.getItem("name") + "!";
        greeting.innerHTML = greetingText;
      }
    }

  });
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