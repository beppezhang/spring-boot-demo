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
		  
		  // 监听radio单选
		  form.on('radio(radio_filter)', function(data){
			  parentTree(data.value,form, "");
			  form.render(); //重新渲染
		  });  
		  
		 //自定义验证规则
		  form.verify({
		    title: function(value){
		      if(value.length < 1){
		        return '菜单名称至少得输入啊';
		      }
		    }
//		    href: function(value){
//		    	if(value.length < 1){
//			        return 'url不能为空';
//			     }
//		    }
		  });
		  
		  // 监听submit提交事件
		  form.on('submit(save)', function(data){
			  	// 选择的非一级菜单，那么必须选择父菜单
				if(data.field.level !='' && data.field.level != null && data.field.level != "1" ){
					if(data.field.parentId == '' || data.field.parentId == null){ 
						layer.msg("请选择父菜单！" , {icon: 5});//提示信息
						return false;
					}
				}
				
				if((data.field.href == "" || data.field.href == null) &&   data.field.level == "3" ){
						layer.msg("请填写url！" , {icon: 5});//提示信息
						return false;
				}
				
				var parentId = "";
				if(data.field.level == "1"){// 如果是一级菜单，给parentid赋值默认为0 （0：一级菜单）
					parentId = "0";
				}
				
				var url = hostIp+"/menu/save.do";
				$.ajax({
					url: url,
					method: "post",
					data: {
						menuId: data.field.menuId,// id
						level: data.field.level,// 等级
						title: data.field.title, // 菜单名称
						parentId: (parentId == '' || parentId == null ? data.field.parentId : parentId),// 父类菜单 
						href: data.field.href,// url
						icon: "&#xe63c;", // 暂时所有菜单都默认一个图标，后期再做成页面可选的
						remark: data.field.remark // 备注
					},
					success:function(obj){
						if(obj.code == "2001" || obj.code == "4001"){
							layer.msg(obj.message , {icon: 1});//成功提示信息
							$("#save_bt").attr("style", "display:none");//按钮隐藏
							// 延迟一秒后跳转页面
							setTimeout(function(){
								closeIfrname();
								parent.location.href = hostIpHtml + "/index/views/menu/menu_list.html";// 跳转页面
							},1000)
						}else{
							layer.msg(obj.message , {icon: 2});//成功提示信息
						}
					},
					error: function(){
						layer.msg("网络请求异常，请尝试重新登陆！" , {icon: 2});//失败提示信息
					}
				});
				return false;// 阻止跳转页面，只有保存成功时才跳转
		  });
		  
		  //监听select
		  form.on('select(select)', function(data){
			  
		  });      
	
  // 获取radio'菜单类型'选中的值
	var level = $("input[name='level']:checked").val();// 
	
	// 回显
	var menuId = getQueryString("menuId");
	var find = getQueryString("find");
	if(find == 1){  // 预览，将”保存“，”预览“2个按钮取消
		$("#save_bt").attr("style", "display:none");//保存按钮
		$("#off_bt").attr("style", "display:none");// 取消按钮
	}

	
	// 加载select
	if(menuId == '' || menuId == null ){
		parentTree(level,form, "");// 加载父菜单下拉框
	}
	

	if(menuId != null && menuId != ''){// 回显
		getfind(menuId, form);// 回显
	} 

   });
	
});
//初始化加载  end!


// 回显
function getfind(menuId, form){
	if(menuId != null && menuId != ''){
		$.ajax({
			url : hostIp + "/menu/getObjectById.do",
			method: "post",
			dataType:"json",
			data: {
				menuId: menuId
			},
			success: function(data){
				 
				if(data.list.menuObject.level == 1){ // 选中一级菜单
					$("input[name='level']").eq(2).attr("checked","checked");
				}else if(data.list.menuObject.level == 2){// 选中2级菜单
					$("input[name='level']").eq(1).attr("checked","checked");
				}else{// 选中3级菜单
					$("input[name='level']").eq(0).attr("checked","checked");
				}
				parentTree(data.list.menuObject.level, form, data.list.menuObject.parentId); // 刷新select
				 
				$("#title").val(data.list.menuObject.title); // 菜单名称
				$("#menuId").val(data.list.menuObject.menuId);// id
				
				$("#href").val(data.list.menuObject.href);// url
				$("#remark").val(data.list.menuObject.remark);// 备注
				$("#parentId").val(data.list.menuObject.parentId);// parentId
			},
			error: function(){
				parent.layer.msg("网络请求异常,请常识重新登录" , {icon: 2});//提示信息
//				alert("系统异常,请常识重新登录！");
			},
			complete: function(){
				form.render(); //刷新全部
			} 
		});	
	}
}



// 关闭
function closeIfrname(){
//	layer.closeAll();
	var  frameindex= parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
	parent.layer.close(frameindex);
}




// 加载父菜单下拉框
function parentTree(level,form, parentId){
	
	if(level == "2" || level == "3"){// 如果选择2级菜单，就需要将所有的1级菜单加载， 如果选择3级菜单，只是将2级的加载出来
		$("#parent_div").attr("class", "layui-form-item"); // 显示父菜单（还原样式）
		$("#select_parentId option[value!='']").remove();
		//加载下拉框
		$.ajax({
			url : hostIp + "/menu/listSelectAll.do",
			method: "post",
			dataType: "json",
			data: {
				level: (level == "2" ? 1 : 2)   // 如果选择2级菜单，就需要将所有的1级菜单加载， 如果选择3级菜单，只是将2级的加载出来
			},
			success: function(data){
//				var sel_obj = $("#select_parentId");
				
				$.each(data.list, function(k, v){
//					parent.layer.msg(v.title);
					if(parentId == v.menuId){ // 回显选中
						$("#select_parentId").append("<option selected=selected value='"+v.menuId+"'>"+v.title+"</option>");
					}else{ 
						$("#select_parentId").append("<option  value='"+v.menuId+"'>"+v.title+"</option>");
					}
				});
				
				
			},
			error: function(){ 
				parent.layer.msg("网络请求异常，请尝试重新登录！" , {icon: 2});//提示信息
			},
			complete: function(){
				form.render(); //刷新全部
			}
		});
	}else if(level == "1"){// 1级菜单
		$("#parent_div").attr("class", "layui-hide"); // 隐藏父菜单
	} 
}

 
