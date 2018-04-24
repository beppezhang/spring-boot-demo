			layui.config({
				base: '../../js/' 
			});
			
			// 初始化
			$(function(){
				getList();
			})
			
			// 搜索
			 function sel() {
				getList();
			};
			
			function getList(){
				var idCard = $("#idCard").val();
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
						url: hostIp + " ?v=" + new Date().getTime(),// 请求服务器的url
						elem: '#content', //内容容器
						params: { 
							idCard :idCard
						},
						type: 'post',
						tempElem: '#tpl', //模块容器
						pageConfig: { //分页参数配置
							elem: '#paged', //分页容器
							pageSize: 15 //分页大小，当前页面显示的条数
						},
						success: function() { //渲染成功的回
						},
						fail: function(msg) { //获取数据失败的回调
							layer.msg("获取数据失败！");
						},
						complate: function() { //完成的回调
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
	
						},
					});
					
				});
			}	 
			
 			
 			