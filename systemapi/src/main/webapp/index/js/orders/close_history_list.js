			layui.config({
				base: '../../js/' 
			});

			var userPhoneNum="",excode="",direction="",tradeTimeBegin="",tradeTimeEnd="";

			// 初始化
			$(function(){
				getList();
			});
			// 搜索
			$('#search').on('click', function() {
				userPhoneNum=$("#userPhoneNum").val();
				excode=$("#excode").val();
				direction=$("#direction").val();
				tradeTimeBegin=$("#tradeTimeBegin").val();
				tradeTimeEnd=$("#tradeTimeEnd").val();
				getList();

			});

			// 搜索
			$('#export').on('click', function() {
				userPhoneNum=$("#userPhoneNum").val();
				excode=$("#excode").val();
				direction=$("#direction").val();
				tradeTimeBegin=$("#tradeTimeBegin").val();
				tradeTimeEnd=$("#tradeTimeEnd").val();
				exportExcel();

			});
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
						url: hostIp + "/closeHistory/getList.do",// 请求服务器的url
						elem: '#content', //内容容器
						params: { //发送到服务端的参数
							userPhoneNum:userPhoneNum,
							excode:excode,
							direction:direction,
							tradeTimeBegin:tradeTimeBegin,
							tradeTimeEnd:tradeTimeEnd
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
			function exportExcel(){
				var form = $("#form");
				form.attr('target', '');
				form.attr('method', 'post');
				form.attr('action', hostIp + "/closeHistory/exportExcel.do");
				// 提交
				form.submit();
			}
			
 			
 			