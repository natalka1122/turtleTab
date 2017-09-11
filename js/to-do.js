(function() {
  var todoList;

  localforage.getItem("todoList").then(function(arr) {
    // if todoList exists in storage
    if(arr) {
      todoList = arr;
      populateTodoList(todoList);
    }
    else {
      todoList = [];
    }

    // toggle class="completed" when li clicked
    $("#toto ul").on("click","li",function(){
      $(this).toggleClass("completed");
      saveCompletedItem();
    });

    // click on trash icon to delete li
    $("#toto ul").on("click","li span",function(e){
      let classes = this.parentNode.classList;
      //console.log(classes);
      $(this).parent().fadeOut(1000,function(){
        $(this).remove();
      });
      e.stopPropagation();
      deleteLiFromStorage(classes);
    });

    // get input and display as li
    $("#todoInput").keypress(function(evt){
      if(evt.which === 13){
        if($(this).val() !== "") {
          var todtxt=$(this).val();
          $(this).val("");
          let index = findNextIndex();
          $("ul").append("<li class='" + index + "'><span><i class='fa fa-trash-o' aria-hidden='true'></i></span>"+ todtxt +"</li>");
          saveNewTodoItem(index, todtxt);
        }          
      }
    });

    // hide or show todo input box when pencil icon clicked
    $("#toto .fa-pencil").on("click",function(){
      $("#todoInput").fadeToggle();
    });
    
  }).catch(function(error) {
    console.log(error);
  });

  function saveNewTodoItem(id, todo) {
    let todoObj = {
      "id": id,
      "todo": todo,
      "isComplete": false
    };
    todoList.push(todoObj);
    localforage.setItem("todoList", todoList).then(function(value) {})
    .catch(function(error) {
      console.log(error);
    });
  }

  function populateTodoList(todoList) {
    let list = document.querySelector("#toto>ul");
    let len = todoList.length;
    for (let i = 0; i < len; i++) {
      let li = document.createElement("li");
      let index = todoList[i].id;
      li.classList.add(index);
      li.innerHTML = "<span><i class='fa fa-trash-o li' aria-hidden='true'></i></span>" + todoList[i].todo;
      if (todoList[i].isComplete) {
        li.classList.add("completed");
      }
      list.appendChild(li);
    }    
  }

  function findNextIndex() {
    let todoIndex = 0;
    let len = todoList.length;
    for (let i = 0; i < len; i ++) {
      // find largest id in array, and make next index 1 higher
      if (todoList[i].id >= todoIndex) {
        todoIndex = todoList[i].id + 1;
      }
    }
    return todoIndex;    
  }

  function saveCompletedItem() {
    localforage.getItem("todoList").then(function(array) {
      let list = document.querySelector("#toto>ul");
      let listItems = list.getElementsByTagName("li");
      let len = listItems.length;
      for (let i = 0; i < len; i++) {
        if (listItems[i].classList.contains("completed")) {
          array[i].isComplete = true;
        }
        else {
          array[i].isComplete = false;
        }
      }
      localforage.setItem("todoList", array).then(function(value) {})
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  function deleteLiFromStorage(classes) {
    localforage.getItem("todoList").then(function(array) {
      todoList = array.filter(function(obj) {
        return obj.id != classes[0];
      });
      localforage.setItem("todoList", todoList).then(function(value) {})
    })
    .catch(function(error) {
      console.log(error);
    });
  }

})();
