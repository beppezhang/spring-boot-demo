layui.config({
	base: '../../js/'
});

// 初始化
$(function(){
	var remark = $("#remark").val();
	getList(null,null,null,remark);
})

// 搜索
$('#search').on('click', function() {
	var phoneType = $("#phoneType").val();
	var createStartTime = $("#createStartTime").val();
	var createEndTime = $("#createEndTime").val();
	var remark = $("#remark").val();
	getList(phoneType, createStartTime, createEndTime, remark);

	//导出excel
	$("#exportExcel").on("click", exportList);
});


// Q清空
$('#clear').on('click', function() {
 	$("#phoneType").val("");
 	$("#createStartTime").val("");
	$("#createEndTime").val("");
	$("#remark").val("CK_XNSUDAI001");
	$(".layui-anim-upbit").find("dd[lay-value='CK_XNSUDAI001']").addClass("layui-this");
	$(".layui-anim-upbit").find("dd[lay-value='CK_BOC001']").removeClass("layui-this");
	$(".layui-unselect").val("拍拍信")
});


// 导出excel报表
var exportList = function() {
	var phoneType = $("#phoneType").val();
	var createStartTime = $("#createStartTime").val();
	var createEndTime = $("#createEndTime").val();
	var remark = $("#remark").val();
	var vo = "?phoneType=" + phoneType+"&createStartTime="+createStartTime+"&createEndTime="+createEndTime+"&remark="+remark;
	location.href = hostIp +"/statisticalChannel/exportNewGuestStatisticalChannel.do"+vo;
};

/**
 * 加载列表
 */
function getList(phoneType, createStartTime, createEndTime, remark){
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
			url: hostIp + "/statisticalChannel/getNewGuestStatisticalChannel.do?v=" + new Date().getTime(),// 请求服务器的url
			elem: '#content', //内容容器
			params: { //发送到服务端的参数
				phoneType : phoneType,
				createStartTime : createStartTime,
				createEndTime : createEndTime,
				remark : remark
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
			},
		});
		// 初始化加载init     end!
	});
}