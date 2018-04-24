			layui.config({
				base: '../../js/' 
			});
			
			// 初始化
			$(function(){
				getList();
			});
			// 搜索
			//$('#search').on('click', function() {
			//	getList();
			//});
			

			/**新增  start*/
			$('#add').on('click', function() {
				layer.open({
					  type: 2,
					  title: '新增',// 设置false表示不显示
					  closeBtn: 1, //0：不显示关闭按钮
					  shade: 0.4, //遮罩透明度
					  area: ['740px', '515px'],
					  skin: 'layui-layer-rim', //加上边框
					  fixed: false, //不固定
					  maxmin: true, // 允许屏幕最小化
//					  anim: 2,
					  content: ['app_audit_add.html'] //iframe的url，no代表不显示滚动条
					});
			});
			/**新增     end*/
			
			
			function getList(){
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
	//                     url: 'datas/laytpl_laypage_data.json?v=' + new Date().getTime(), //地址
						url: hostIp + "/appAudit/getAppAudit.do?v=" + new Date().getTime(),// 请求服务器的url
						elem: '#content', //内容容器
						params: { //发送到服务端的参数
							//appType: appType,
							//versionNumber:versionNum
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
										  content: ['app_audit_add.html?appAuditId='+$(this).data('id')] //iframe的url，no代表不显示滚动条
										});
								});
							});
							
							
							
							//绑定所有'删除'按钮事件						
							$('#content').children('tr').each(function() {
								var $that = $(this);
								$that.children('td:last-child').children('a[data-opt=del]').on('click', function() {
									if(confirm('确定要删除吗')){ 
									// ajax 请求后台
										$.ajax({
											url : hostIp + "/appAudit/delete.do",
											method : 'post',
											dataType : 'json',
											data: {
												appAuditId: $(this).data('id') // 传到后台的参数，子窗口的form表单
											},
											success : function(data) {
												if (data.code == "3001") {
													layerTips.msg(data.message);// 提示信息
												} else {
													layerTips.msg(data.message);// 提示信息
												}
											},
											error: function(){
												parent.layer.alert("请求网络异常，请尝试重新登录！");
											},
											complete: function(){
												location.reload(); //刷新
											}
										});
									  }
									  return false;
								});
							});


							//绑定所有 除第一个td 外 其它'td'悬浮效果
							$('#content').children('tr').each(function() {
								var $that = $(this);
								$that.children('td:not(:eq(0))').on('mouseenter', function() {
									//if (this.offsetWidth < this.scrollWidth) {
										var that = this;
										var text = $(this).text();
										layer.tips(text, that,{
											tips: 1,
											time: 2000
										});
									//}
								});
							});
							
						}
					});
	                // 初始化加载init     end!
	                
					
				});
			}	 
			
 			
 			