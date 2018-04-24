 
$(function() {

	// 获取一级菜单
		// 请求后台，加载一级菜单
		$.ajax({
			url: hostIp + "/menu/getMenu1.do",
			method: "post",
			dataType: "json",
			data: {
			},
			success: function(data){
				if(data.isNotMenu == "0"){
					layer.msg("你未有任何菜单权限，请联系管理员！", {icon: 5});
				}else{
					$.each(data.list, function(k, v){
						var ul = $("#ul_id");
						if(k == 0){
							ul.append("" +
								 		"<li class='layui-nav-item' id='li_id"+k+"' >" +
								 		"<a href='javascript:;' data-module-id="+v.menuId+">" +
								 		"<i class='fa fa-desktop' aria-hidden='true'></i>" +
								 		"<cite>"+ v.title +"</cite>" +
								 		"</a>" +
								 		"</li>");
						}else{
							ul.append("" +
							 		"<li class='layui-nav-item'>" +
							 		"<a href='javascript:;' data-module-id="+v.menuId+">" +
							 		"<i class='fa fa-users' aria-hidden='true'></i>" +
							 		"<cite>"+ v.title +"</cite>" +
							 		"</a>" +
							 		"</li>");
						}
					});
				}
			},
			error: function(){
				layer.msg("网络请求异常，请尝试重新登录！");
			},
			complete: function(){// ajax完成后处理
//				navbar.render();  // 重新渲染
			}
			
		});

});

 



layui.config({
	base: 'js/'
}).use(['element', 'layer', 'navbar', 'tab'], function() {
	var element = layui.element()
	$ = layui.jquery,
		layer = layui.layer,
		navbar = layui.navbar(),
		tab = layui.tab({
			elem: '.layout-nav-card', //设置选项卡容器
			contextMenu:true
		});
	//iframe自适应
	$(window).on('resize', function() {
		var $content = $('.layout-nav-card .layui-tab-content');
		$content.height($(this).height() - 165);
		$content.find('iframe').each(function() {
			$(this).height($content.height());
		});
	}).resize();

	var $menu = $('#menu');
	$menu.find('li.layui-nav-item').each(function(k, v) {
		var $this = $(this);
		//绑定一级导航的点击事件
		$this.on('click', function() {
			//获取设置的模块ID
			var id = $this.find('a').data('module-id');
			//根据模块ID来获取对应模块的信息
			var url = hostIp + "/menu/getLeftMenu.do?menuId="+id;
		 
			//设置navbar
			navbar.set({
				elem: '#side', //存在navbar数据的容器ID
				url: url
			});
			//渲染navbar
			navbar.render();
			//监听点击事件
			navbar.on('click(side)', function(data) {
				tab.tabAdd(data.field);
			});
		});	
		
		// 初始化页面，左侧菜单栏默认加载第一个1级菜单的数据
		if(k == 0){ 
			$("#li_id"+k).attr("class","layui-nav-item layui-this"); // 选中1级菜单
			//获取设置的模块ID
			var id = $this.find('a').data('module-id');
			//根据模块ID来获取对应模块的信息
			var url = hostIp + "/menu/getLeftMenu.do?menuId="+id;
		 
			//设置navbar
			navbar.set({
				elem: '#side', //存在navbar数据的容器ID
				url: url
			});
			//渲染navbar
			navbar.render();
			//监听点击事件
			navbar.on('click(side)', function(data) {
				tab.tabAdd(data.field);
			});
		}
		
	});
 

	$('.beg-layout-side-toggle').on('click', function() {
		var sideWidth = $('.beg-layout-side').width();
		if(sideWidth === 200) {
			$('.beg-layout-body').animate({
				left: '0'
			});
			$('.beg-layout-footer').animate({
				left: '0'
			});
			$('.beg-layout-side').animate({
				width: '0'
			});
		} else {
			$('.beg-layout-body').animate({
				left: '200px'
			});
			$('.beg-layout-footer').animate({
				left: '200px'
			});
			$('.beg-layout-side').animate({
				width: '200px'
			});
		}
	});
});