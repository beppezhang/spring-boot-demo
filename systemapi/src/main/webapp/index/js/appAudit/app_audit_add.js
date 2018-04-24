layui.config({
	base: '../../js/'
});

//初始化加载 start
$(function(){
	$("#close").click(function(){
		closeIfrname();
	});

	//我们强烈推荐你在代码最外层把需要用到的模块先加载
	layui.use(['layer', 'form', 'element'], function(){
		  var layer = layui.layer
		  ,form = layui.form()
		  ,element = layui.element();
		  form.render(); //刷新全部


		 //自定义验证规则
		  form.verify({
			  //downloadValidCode: function(value){
				//  var appType=$("#appType").val();
				//  if(appType==0){
				//	  if(value.length < 1){
				//		  return '请输入MD5校验码';
				//	  }
				//  }
              //},
			  //verifyEndDate:function(value){
				//  if(value.length==0){
				//	  return '必填项不能为空';
				//  }else{
				//	  var beginTime=$("#beginTime").val();
				//	  var beginDate=new Date(beginTime);
				//	  var endDate=new Date(value);
				//	  if(beginDate.getTime() > endDate.getTime()){
				//		  return '开始日期不能大于结束日期！';
				//	  }
				//  }
			  //}

		  });

		form.on('select(test)', function(data){
			$("#marketName").val($("#"+data.elem.id).find("option:selected").text());
		});

		  // 监听submit提交事件	start
		  form.on('submit(save)', function(data){
				var url = hostIp+"/appAudit/save.do";
				$.ajax({
					url: url,
					method: "post",
					data : $("#appForms").serialize(),
					success:function(obj){
						if(obj.code == "2001" || obj.code == "4001"){
							layer.msg(obj.message , {icon: 1});//成功提示信息
							$("#save_bt").attr("style", "display:none");//保存按钮隐藏
							// 延迟一秒后跳转页面
							setTimeout(function(){
								closeIfrname();
								parent.location.href = hostIpHtml + "/index/views/appAudit/app_audit_list.html";// 跳转页面
							},1000)
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
		var appAuditId = getQueryString("appAuditId");
		if(appAuditId!=null && appAuditId != ''){
			getFind(appAuditId, form);
			$("#appType").attr("disabled","disabled");
			$("#marketCode").attr("disabled","disabled");
			$("#versionNumber").attr("disabled","disabled");
		}

   });
});
//初始化加载  end!


//回显
	function getFind(appAuditId, form){
		if(appAuditId != null && appAuditId != ''){
			$.ajax({
				url : hostIp + "/appAudit/getEntityById.do",
				method: "post",
				dataType:"json",
				data: {
					appAuditId: appAuditId
				},
				success: function(data){
					$("#appAuditId").val(data.list.data.appAuditId);// id
					$("#appType").find("option[value='"+data.list.data.appType+"']").prop("selected", true);
					$("#marketCode").find("option[value='"+data.list.data.marketCode+"']").prop("selected", true);
					$("#marketName").val(data.list.data.marketName);
					$("#versionNumber").val(data.list.data.versionNumber);
					$("#isCheck").find("option[value='"+data.list.data.isCheck+"']").prop("selected", true);

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




