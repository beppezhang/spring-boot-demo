			layui.config({
				base: '../../js/' 
			});
 			var url =  hostIp + "/banner/getAllbanner.do?v=" + new Date().getTime();// 请求服务器的url
			// 初始化
			$(function(){
				getList(0);
			})
			

//			// 条件搜索
//$('#search').on('click', function() {
//	var tgPlanId = $("#tgPlanId").val();
//	var title = $("#title").val();
//	var advisers = $("#advisers").val();
//	var  company = $("#company").val();
//	
//	getList(tgPlanId,title,advisers,company, 1);
//});
//			
			
			
			var onlineState = 0;//初始为已上线状态
			// 按状态搜索
			function get(data){
 				if(data == 0 ){
					$("#get0").attr("class", "layui-btn layui-btn-mini layui-btn-normal");
					$("#get1").attr("class", "layui-btn layui-btn-mini");
					$("#get2").attr("class", "layui-btn layui-btn-mini");			
				}else if(data == 1){
					$("#get0").attr("class", "layui-btn layui-btn-mini");
					$("#get1").attr("class", "layui-btn layui-btn-mini layui-btn-normal");
					$("#get2").attr("class", "layui-btn layui-btn-mini");				
				}else if(data == 2){
					$("#get0").attr("class", "layui-btn layui-btn-mini");
					$("#get1").attr("class", "layui-btn layui-btn-mini");
					$("#get2").attr("class", "layui-btn layui-btn-mini layui-btn-normal");
				}
				 
 			
 				onlineState = data;//把data值赋给全局变量onlineState
 			
 				$.ajax({
 					url: url,
 					method: 'post',
 					dataType: 'json',
 					data:{
 						onlineState: data
 					},
 					success: function(data){
 						getList(onlineState);
 					}
 				});
				
			}
			 
			function getList(onlineState){
				layui.use(['paging', 'layer', 'form', 'element'], function() {
					var $ = layui.jquery,
						paging = layui.paging(),
						layerTips = parent.layer === undefined ? layui.layer : parent.layer, //获取父窗口的layer对象
						layer = layui.layer, //获取当前窗口的layer对象
						form = layui.form(),
						element = layui.element();
 					// 页面初始化加载		start
	                paging.init({
	                    openWait: true,
						url: hostIp + "/banner/getAllbanner.do?v=" + new Date().getTime(),
						elem: '#content', //内容容器
						params: { //发送到服务端的参数
							t: Math.random(),
//							bootDiagramId:bootDiagramId,
							onlineState:onlineState
						},
						type: 'post',
						tempElem: '#tpl', //模块容器
						pageConfig: { //分页参数配置
							elem: '#paged', //分页容器
							pageSize: 10 //分页大小，当前页面显示的条数
						}, 
						success: function() { //渲染成功的回调
	//						alert('渲染成功');
						},
						fail: function(msg) { //获取数据失败的回调
							layer.msg("获取数据失败！");
						},
						complate: function() { //完成的回调
							//alert('处理完成');
							//重新渲染复选框
							form.render('checkbox');
							form.on('checkbox(allselector)', function(data) {
								var elem = data.elem;
								$('#content').children('tr').each(function() {
									var $that = $(this);
									//全选或反选
									$that.children('td').eq(0).children('input[type=checkbox]')[0].checked = elem.checked;
									form.render('checkbox');
								});
							});
	
							//绑定所有'编辑'按钮事件						
							$('#content').children('tr').each(function() {
								var $that = $(this);
								$that.children('td:last-child').children('a[data-opt=edit]').on('click', function() {
									 
									layer.open({
										  type: 2,
										  title: '编辑',// 设置false表示不显示
										  closeBtn: 1, //不显示关闭按钮
										  shade: 0.4, //遮罩透明度
										  area: ['740px', '515px'],
										  skin: 'layui-layer-rim', //加上边框
										  fixed: false, //不固定
										  maxmin: true, // 允许屏幕最小化
	//									  offset: 'rb', //右下角弹出
	//									  time: 2000, //2秒后自动关闭
										  anim: 2,
										  content: ['banner_edit.html?id='+$(this).data('id')], //iframe的url，no代表不显示滚动条
										});
								});
	
							});
							
							
							 
							
							
							
							//绑定所有'预览'按钮事件						
							$('#content').children('tr').each(function() {
								var $that = $(this);
								$that.children('td:last-child').children('a[data-opt=find]').on('click', function() {
									layer.open({
										  type: 2,
										  title: '预览',// 设置false表示不显示
										  closeBtn: 1, //不显示关闭按钮
										  shade: 0.4, //遮罩透明度
										  area: ['740px', '515px'],
										  skin: 'layui-layer-rim', //加上边框
										  btn: ['取消'],
										  fixed: false, //不固定
										  maxmin: true, // 允许屏幕最小化
	//									  offset: 'rb', //右下角弹出
	//									  time: 2000, //2秒后自动关闭
										  anim: 2,
										  content: ['banner_edit.html?find=1&id='+$(this).data('id')], //iframe的url，no代表不显示滚动条
										});
								});
	
							});
							

							//绑定所有'删除'按钮事件						
							$('#content').children('tr').each(function() {
								var $that = $(this);
								$that.children('td:last-child').children('a[data-opt=del]').on('click', function() {
									if(confirm('确定要删除吗?')){ //只有当点击confirm框的确定时，该层才会关闭
									// ajax 请求后台
										$.ajax({
											url : hostIp + "/banner/delete.do",
											method : 'post',
											dataType : 'json',
											data: {
												bannerId: $(this).data('id'), // 传到后台的参数，子窗口的form表单
											},
											success : function(data) {
												if(data.code == "200"){
													layerTips.msg(data.message);// 提示信息
												}else{
													layerTips.msg(data.message);// 提示信息
												}
											},
											error: function(){
												alert("获取数据失败，请尝试重新登陆！");
											},
											complete: function(){
												location.reload(); //刷新
											}
										});
									  }
									  return false; 
	 							});

							});
							
							
						},
					});
	                // 初始化加载init     end!
	                
			 
	
					
					/**新增  start*/
					$('#add').on('click', function() {
						layer.open({
							  type: 2,
							  title: '新增弹窗',// 设置false表示不显示
							  closeBtn: 1, //0：不显示关闭按钮
							  shade: 0.4, //遮罩透明度
							  area: ['740px', '615px'],
							  skin: 'layui-layer-rim', //加上边框
							  fixed: false, //不固定
							  maxmin: true, // 允许屏幕最小化
//							  anim: 2,
							  content: ['banner_edit.html'], //iframe的url，no代表不显示滚动条
							});
					});
					/**新增     end*/
					
				});
			 	 
			}
 			
 			