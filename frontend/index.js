function bcrypt(){
	$.ajax({
		type:"POST",
		cache:false,
		url:"http://localhost:3002/bcrypt",
		data:{
			username:$("#username").val(),
			password:$("#password").val(),
		},
		error:function(err){
			console.log(err);
		},
		success:function(){
			document.location.href = 'http://127.0.0.1:8080/frontend/success.html';
		},
	});
};