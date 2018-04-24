
	// zTree需要的json格式
// 	[
// 		{ id:1, pId:0, name:"随意勾选 1", open:true},
// 		{ id:11, pId:1, name:"随意勾选 1-1", open:true},
// 		{ id:111, pId:11, name:"随意勾选 1-1-1"},
// 		{ id:112, pId:11, name:"随意勾选 1-1-2"},
// 		{ id:12, pId:1, name:"随意勾选 1-2", open:true},
// 		{ id:121, pId:12, name:"随意勾选 1-2-1"},
// 		{ id:122, pId:12, name:"随意勾选 1-2-2"},
// 		{ id:2, pId:0, name:"随意勾选 2", checked:true, open:true},
// 		{ id:21, pId:2, name:"随意勾选 2-1"},
// 		{ id:22, pId:2, name:"随意勾选 2-2", open:true},
// 		{ id:221, pId:22, name:"随意勾选 2-2-1", checked:true},
// 		{ id:222, pId:22, name:"随意勾选 2-2-2"},
// 		{ id:23, pId:2, name:"随意勾选 2-3"}
// 	]
	
		/**全局变量	**/
		// 存放所有选中的节点值
		var noteVal = "";
		var roleId = getQueryString("roleId");
	 
	 
		// zTree参数配置，可参考官方api： http://www.treejs.cn/v3/api.php
		var setting = {
			check: {
				enable: true
			},
			data: {
				simpleData: {
					enable: true
				}
			}
//			,
//			callback: { // 回调函数
//				onCheck: zTreeOnCheck   // 点击事件
//			}
		};
  
		
	// 初始化加载树
		$(function(){
			$.ajax({
				url: hostIp + "/role/getTree.do",
				method: "post",
				dateType: "json",
				data: {
					roleId: roleId
				},
				success: function(obj){
					$.fn.zTree.init($("#treeDemo"), setting, obj);
				},
				error: function(){
					alert("网络请求异常，请尝试重现登录！");
				},
				complete: function(){
					
				}
			});
			
			
			// 加载layui 
			getList();
			
			//回显角色名称
			getfind();
			
		})
		 
	
	// 获取所有选择的节点的id值
	// 参数说明： treeId，对应 zTree 的 treeId，便于用户操控,String
	//treeNodeJSON,被勾选 或 取消勾选的节点 JSON 数据对象 , json
//		 function zTreeOnCheck(e,treeId,treeNode){
//	            var treeObj = $.fn.zTree.getZTreeObj("treeDemo"),
//	            nodes = treeObj.getCheckedNodes(true);
//	            noteVal = "";
//	            for(var i=0;i<nodes.length;i++){
//// 	            	noteVal += nodes[i].name + ",";
//// 		            alert(nodes[i].id); //获取选中节点的值
//	            	noteVal += nodes[i].id + ",";
//	     		}
//		 }
		 
		
		
		function getList(){
		//我们强烈推荐你在代码最外层把需要用到的模块先加载
			layui.use(['layer', 'form', 'element'], function(){
				  var layer = layui.layer
				  ,form = layui.form()
				  ,element = layui.element();
				  form.render(); //刷新全部
				 
				  // 监听submit提交事件	start
				  form.on('submit(save)', function(data){
					  
					  // 获取所有节点所有选中的值
					  var treeObj = $.fn.zTree.getZTreeObj("treeDemo"),
			            nodes = treeObj.getCheckedNodes(true);
			            noteVal = "";
			            for(var i=0;i<nodes.length;i++){
			            	noteVal += nodes[i].id + ",";
			     		}
			            
					  // 请求服务器操作
						$.ajax({
							url: hostIp + "/role/saveTree.do",
							method: "post",
							data: {
								roleId: roleId,// id
								noteVal: noteVal	// 所有树节点选中的值
							},
							success:function(obj){
								if(obj.code == "2001"){
									layer.msg(obj.message , {icon: 1});//成功提示信息
									$("#save_bt").attr("style", "display:none");//保存按钮隐藏
									// 延迟一秒后跳转页面
									setTimeout(function(){
										closeIfrname();
										parent.location.href = hostIpHtml + "/index/views/role/role_list.html";// 跳转页面
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

			});
		}
		
		
		// 关闭
		function closeIfrname(){
//			layer.closeAll();
			var  frameindex= parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
			parent.layer.close(frameindex);
		}
		
		
		

		// 回显角色名称
		function getfind(){
			if(roleId != null && roleId != ''){
				$.ajax({
					url : hostIp + "/role/getEntityById.do",
					method: "post",
					dataType:"json",
					data: {
						roleId: roleId
					},
					success: function(obj){
						$("#roleName").html("当前角色名称：" + obj.list.roleObject.roleName);//角色名称
					},
					error: function(){
						parent.layer.msg("网络请求异常,请常识重新登录" , {icon: 2});//提示信息
					},
					complete: function(){
//						form.render(); //刷新全部
					} 
				});	
			}
		}
		
	