	layui.config({
				base: '../../js/' 
			});
	
//初始化加载 start
$(function(){
	
	//我们强烈推荐你在代码最外层把需要用到的模块先加载
	layui.use(['layer', 'form', 'element'], function(){
		  var layer = layui.layer
		  ,form = layui.form()
		  ,element = layui.element();
		  form.render(); //刷新全部
		  
		  
		 //自定义验证规则
		  form.verify({
		    roleName: function(value){
		      if(value.length < 1){
		        return '角色名称至少得输入啊';
		      }
		    }
		  });
		  
		  // 监听submit提交事件	start
		  form.on('submit(save)', function(data){
				var url = hostIp+"/role/save.do";
				$.ajax({
					url: url,
					method: "post",
					data: {
						roleId: data.field.roleId,// id
						roleName: data.field.roleName,// 角色名称
						remark: data.field.remark // 备注
					},
					success:function(obj){
						if(obj.code == "2001" || obj.code == "4001"){
							layer.msg(obj.message , {icon: 1});//成功提示信息
							$("#save_bt").attr("style", "display:none");//保存按钮隐藏
							// 延迟一秒后跳转页面
							setTimeout(function(){
								closeIfrname();
								parent.location.href = hostIpHtml + "/index/views/role/role_list.html";// 跳转页面
							},1000)
						}else if(obj.code == "102"){
							layer.msg("角色名称,已存在，请更换！" , {icon: 2});//失败提示信息
						}else{
							layer.msg(obj.message , {icon: 2});//失败提示信息
						}
					},
					error: function(){
						layer.msg("网络请求异常，请尝试重新登陆！" , {icon: 2});//失败提示信息
					}
				});
				return false;// 阻止跳转页面，只有保存成功时才跳转
		  });
		  // 监听submit提交事件	   end!  
		    
	
	// 回显
	var roleId = getQueryString("roleId");
	var find = getQueryString("find");
	if(find == 1){  // 预览，将”保存“，”预览“2个按钮取消
		$("#save_bt").attr("style", "display:none");//保存按钮
		$("#off_bt").attr("style", "display:none");// 取消按钮
	}

	if(roleId != null && roleId != ''){// 回显
		getfind(roleId);// 回显
	}
	

   });
});
//初始化加载  end!


// 回显
function getfind(roleId){
	if(roleId != null && roleId != ''){
		$.ajax({
			url : hostIp + "/role/getEntityById.do",
			method: "post",
			dataType:"json",
			data: {
				roleId: roleId
			},
			success: function(data){
				$("#roleId").val(data.list.roleObject.roleId);// id
				$("#roleName").val(data.list.roleObject.roleName);//角色名称
				$("#remark").val(data.list.roleObject.remark);// 备注
			},
			error: function(){
				parent.layer.msg("网络请求异常,请常识重新登录" , {icon: 2});//提示信息
			},
			complete: function(){
//				form.render(); //刷新全部
			} 
		});	
	}
}



// 关闭
function closeIfrname(){
	var  frameindex= parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
	parent.layer.close(frameindex);
}



