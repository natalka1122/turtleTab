$("#toto ul").on("click","li",function(){
	$(this).toggleClass("completed");
});

// click on X to delete
$("#toto ul").on("click","li span",function(e){
	$(this).parent().fadeOut(1000,function(){
		$(this).remove();
	});
	e.stopPropagation();
});
$("#todoInput").keypress(function(evt){
	if(evt.which === 13){
		var todtxt=$(this).val();
		$(this).val("");
		$("ul").append("<li><span><i class='fa fa-trash-o' aria-hidden='true'></i></span> "+ todtxt +"</li>")
	}
});

$("#toto .fa-pencil").on("click",function(){
	$("#todoInput").fadeToggle();
});