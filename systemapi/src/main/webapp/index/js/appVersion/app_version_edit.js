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
		   /* roleName: function(value){
		      if(value.length < 1){
		        return '角色名称至少得输入啊';
		      }
		    }*/
		  });

		  // 监听submit提交事件	start
		  form.on('submit(save)', function(data){
				var url = hostIp+"/appVersion/modify.do";
				$.ajax({
					url: url,
					method: "post",
					data:$("#appForms").serialize(),
					success:function(obj){
						if(obj.code == "4001"){
							layer.msg(obj.message , {icon: 1});//成功提示信息
							$("#save_bt").attr("style", "display:none");//保存按钮隐藏
							// 延迟一秒后跳转页面
							setTimeout(function(){
								closeIfrname();
								parent.location.href = hostIpHtml + "/index/views/appVersion/app_version_list.html";// 跳转页面
							},1000);
						}else{
							layer.msg(obj.message , {icon: 2});//失败提示信息
						}
					},
					error: function(){
						//layer.msg("网络请求异常，请尝试重新登陆！" , {icon: 2});//失败提示信息
					}
				});
				return false;// 阻止跳转页面，只有保存成功时才跳转
		  });
		  // 监听submit提交事件	   end!


		// 回显
		var appVersionId = getQueryString("appVersionId");
		getFind(appVersionId, form);

   });
});
//初始化加载  end!


// 回显
function getFind(appVersionId, form){
	if(appVersionId != null && appVersionId != ''){
		$.ajax({
			url : hostIp + "/appVersion/getEntity.do",
			method: "post",
			dataType:"json",
			data: {
				appVersionId: appVersionId
			},
			success: function(data){
				$("#appVersionId").val(data.list.data.appVersionId);// id
				$("#appType").find("option[value='"+data.list.data.appType+"']").prop("selected", true);
				$("#forcedUpdate").find("option[value='"+data.list.data.forcedUpdate+"']").prop("selected", true);
				$("#versionNumber").val(data.list.data.versionNumber);
				$("#downloadUrl").val(data.list.data.downloadUrl);
				$("#changeDesc").val(data.list.data.changeDesc);
				$("#state").find("option[value='"+data.list.data.state+"']").prop("selected", true);
				$("#tag").find("option[value='"+data.list.data.tag+"']").prop("selected", true);
				$("#popup").find("option[value='"+data.list.data.popup+"']").prop("selected", true);
				$("#beginTime").val(data.list.data.beginTime);
				$("#endTime").val(data.list.data.endTime);
				$("#remark").val(data.list.data.remark);
			},
			error: function(){
				//parent.layer.msg("网络请求异常,请常识重新登录" , {icon: 2});//提示信息
			},
			complete: function(){
				form.render(); //刷新全部
			} 
		});	
	}
}



// 关闭
function closeIfrname(){
	var  frameindex= parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
	parent.layer.close(frameindex);
}



