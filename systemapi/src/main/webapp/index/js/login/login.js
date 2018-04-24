			layui.config({
				base: 'js/'
			});
		
			// 初始化
			$(function(){
				getList();
			})

			function getList(){
				layui.use(['layer','upload','paging', 'form'], function() {
					var $ = layui.jquery,
						paging = layui.paging(),
						layerTips = parent.layer === undefined ? layui.layer : parent.layer, //获取父窗口的layer对象
						layer = layui.layer, //获取当前窗口的layer对象
						form = layui.form();
					
					//自定义验证规则
					  form.verify({
						  userName: function(value){
					      if(value.length < 1){
					        return '请填写登录帐号';
					      }
					    },
					    password: function(value){
					    	if(value.length < 1){
						        return '请输入密码';
						     }
					    }
					  });
					
					
					form.on('submit(login)', function(data){
						var url = hostIp+"/login/ajaxLogin.do";
						$.ajax({
							url: url,
							method: "post",
							data: {
								userName: data.field.userName,
								password: data.field.password
							 
							},
							success:function(obj){
								if(obj.code == "200"){
									layer.msg("登录成功" , {icon: 1});//成功提示信息
									// 延迟一秒后跳转页面
									setTimeout(function(){
										parent.location.href = hostIpHtml + "/index/index.html";// 跳转页面
									},1000)
								}else{
									layer.msg("帐号或密码不正确" , {icon: 2});//失败提示信息
								}
							},
							error: function(){
								layer.msg("网络请求异常，请稍后再试！" , {icon: 2});//失败提示信息
							}
						});
						return false;// 阻止跳转页面，只有保存成功时才跳转
					});
				});
			}	 
			
 			