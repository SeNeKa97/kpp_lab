function submit(){
	const nick = document.getElementById("nickname").value;

	$.post("/entry", {name:nick}, success);
}

function success(id){
	window.location.href = "/game/"+id;
}