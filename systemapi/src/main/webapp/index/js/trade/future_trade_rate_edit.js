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


		  });

		form.on('select(setexName)', function(data){
			var obj=data.elem;
			var index=obj.selectedIndex;
			var text=obj.options[index].text;
			$("#exname").val(text);
		});
		form.on('select(setProductName)',function(data){
			var obj=data.elem;
			var index=obj.selectedIndex;
			var text=obj.options[index].text;
			$("#productName").val(text);
		});
		// 监听submit提交事件	start
		  form.on('submit(save)', function(data){
				var url = hostIp+"/futureTradeRate/save.do";
				$.ajax({
					url: url,
					method: "post",
					data : $("#addForms").serialize(),
					success:function(obj){
						if(obj.code == "2001" || obj.code == "4001"){
							layer.msg(obj.message , {icon: 1});//成功提示信息
							$("#save_bt").attr("style", "display:none");//保存按钮隐藏
							// 延迟一秒后跳转页面
							setTimeout(function(){
								closeIfrname();
								parent.location.href = hostIpHtml + "/index/views/trade/future_trade_rate_list.html";// 跳转页面
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
		var id = getQueryString("id");
		if(id!=null && id != ''){
			getFind(id, form);
		}

   });

});
//初始化加载  end!


//回显
	function getFind(id, form){
		if(id != null && id != ''){
			$.ajax({
				url : hostIp + "/futureTradeRate/getEntityById.do",
				method: "post",
				dataType:"json",
				data: {
					id: id
				},
				success: function(data){
					$("#id").val(data.list.data.id);// id
					$("#excode").find("option[value='"+data.list.data.excode+"']").prop("selected", true);
					$("#exname").val(data.list.data.exname);
					$("#productId").find("option[value='"+data.list.data.productId+"']").prop("selected", true);
					$("#productName").val(data.list.data.productName);
					$("#unit").val(data.list.data.unit);
					$("#minPriceMovement").val(data.list.data.minPriceMovement);
					$("#marginRate").val(data.list.data.marginRate);
					$("#commissionRate").val(data.list.data.commissionRate);
					$("#closeTodayRate").val(data.list.data.closeTodayRate);
					$("#closeYestodayRate").val(data.list.data.closeYestodayRate);
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

function closeIfrname(){
	var  frameindex= parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
	parent.layer.close(frameindex);
	return;
}



