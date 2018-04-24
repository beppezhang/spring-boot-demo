layui.config({
	base: '../../js/'
});

//初始化加载 start
$(function(){
	$("#close").click(function(){
		closeIfrname();
	});
	//我们强烈推荐你在代码最外层把需要用到的模块先加载
	layui.use(['layer','upload', 'form', 'element'], function(){
		  var layer = layui.layer
		  ,form = layui.form()
		  ,element = layui.element();
		var upload = layui.upload;
		  form.render(); //刷新全部


		 //自定义验证规则
		  form.verify({
			  downloadValidCode: function(value){
				  var appType=$("#appType").val();
				  if(appType==0){
					  if(value.length < 1){
						  return '请输入MD5校验码';
					  }
				  }
		      },
			  patchVersion: function(value){
				  var changeProperties=$("#changeProperties").val();
				  if(changeProperties==2){
					  if(value.length < 1){
						  return '必填项不能为空';
					  }
				  }
			  },
			  verifyEndDate:function(value){
				  if(value.length==0){
					  return '必填项不能为空';
				  }else{
					  var beginTime=$("#beginTime").val();
					  var beginDate=new Date(beginTime);
					  var endDate=new Date(value);
					  if(beginDate.getTime() > endDate.getTime()){
						  return '开始日期不能大于结束日期！';
					  }
				  }
			  }

		  });
		form.on('select(checkChangeProperties)', function(data){
			//如果选择热更新
			if(data.value == '2'){
				$("#patchVersionNumberDiv").css('display','block');
				$("#fileDiv").css('display','block');
				//$("#downloadUrlDiv").css('display','none');
				//$("#downloadValidCodeDiv").css('display','none');
				//$(".layui-upload-icon").html("<i class='layui-icon'></i>上传文件");
			}else{
				$("#patchVersionNumberDiv").css('display','none');
				$("#fileDiv").css('display','none');
				$("#downloadUrl").val("");
				$("#downloadValidCode").val("");
				$('#downloadUrl').removeAttr("readonly");//去除input元素的readonly属性 　　
				$('#downloadValidCode').removeAttr("readonly");//去除input元素的readonly属性 　　
			}
		});
		var loadIndex = undefined;




		layui.upload({
			elem: '#file_id' //绑定元素
			,url: hostIp+"/appVersion/uploadFile.do"
			,title: '请选择补丁包'
			,ext: 'apk'
			,type:'file'
			,before:function(){
				loadIndex = layer.load(2);
			}
			,success: function(res, input){
				if (loadIndex !== undefined) {
					layer.close(loadIndex); //关闭等待层
				}
				//alert(res.list.data.appPatchVersionPath+"---"+res.list.data.downloadValidCode);
				$("#downloadUrl").val(res.list.data.appPatchVersionPath);
				$("#downloadValidCode").val(res.list.data.downloadValidCode);
				$('#downloadUrl').attr("readonly","readonly")//将input元素设置为readonly 　　
				$('#downloadValidCode').attr("readonly","readonly")//将input元素设置为readonly 　　
			}
		});

		// 监听submit提交事件	start
		  form.on('submit(save)', function(data){
				var url = hostIp+"/appVersion/save.do";
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
								parent.location.href = hostIpHtml + "/index/views/appVersion/app_version_list.html";// 跳转页面
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
		var appVersionId = getQueryString("appVersionId");
		if(appVersionId!=null && appVersionId != ''){
			getFind(appVersionId, form);
		}

   });

});
//初始化加载  end!


//回显
	function getFind(appVersionId, form){
		if(appVersionId != null && appVersionId != ''){
			$.ajax({
				url : hostIp + "/appVersion/getEntityById.do",
				method: "post",
				dataType:"json",
				data: {
					appVersionId: appVersionId
				},
				success: function(data){
					$("#appVersionId").val(data.list.data.appVersionId);// id
					$("#appType").find("option[value='"+data.list.data.appType+"']").prop("selected", true);
					$("#changeProperties").find("option[value='"+data.list.data.changeProperties+"']").prop("selected", true);
					$("#versionNumber").val(data.list.data.versionNumber);
					$("#downloadUrl").val(data.list.data.downloadUrl);
					$("#changeDesc").val(data.list.data.changeDesc);
					$("#downloadValidCode").val(data.list.data.downloadValidCode);
					$("#popup").find("option[value='"+data.list.data.popup+"']").prop("selected", true);
					$("#beginTime").val(data.list.data.beginTime);
					$("#endTime").val(data.list.data.endTime);
					$("#remark").val(data.list.data.remark);
					if(data.list.data.changeProperties == 2){
						$("#patchVersionNumberDiv").css('display','block');
						$("#fileDiv").css('display','block');
						$("#patchVersionNumber").val(data.list.data.patchVersionNumber);
						$('#downloadUrl').attr("readonly","readonly")//将input元素设置为readonly 　　
						$('#downloadValidCode').attr("readonly","readonly")//将input元素设置为readonly 　　
					}
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

function closeIfrname(){
	var  frameindex= parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
	parent.layer.close(frameindex);
	return;
}



