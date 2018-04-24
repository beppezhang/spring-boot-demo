
// 初始化加载
$(function(){
	getUser();
});

// 加载头像和昵称
function getUser(){
		// 获取头像和昵称
		var nickName = $("#nickName").val();// 当前登录昵称
		var userPic = $("#userPic").val();// 头像
		// 加载图片和头像
		$.ajax({
			url: hostIp + "/uuser/getUser.do",
			method: "post",
			dataType: "json",
			data: {
				nickName: nickName,
				userPic: userPic
			},
			success: function(data){
				if(data.list.user.nickName != "" && data.list.user.nickName != null){
					$("#nickName").html(data.list.user.nickName);
				}
				
				if(data.list.user.userPic != "" && data.list.user.userPic != null){
					$("#LAY_demo_upload").attr("src", data.list.user.userPic);
				}else{
					$("#LAY_demo_upload").attr("style", "display:none");
				}
			},
			error: function(){
				//layer.msg("网络请求异常，请尝试重新登录！");
			}
			
		});
}
 



//退出/注销
function logout(){
	location.href = hostIp + "/login/logout.do";
}