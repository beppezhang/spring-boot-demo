layui.config({
	base : '../../js/'
});

// 预加载layui文件模块
layui.use('upload', function() {
	layui.upload({
		url : hostIp + '/banner/upload.do',
		elem : '#file_id' // 指定原始元素，默认直接查找class="layui-upload-file" ,这里指定id
		,
		method : 'post' // 上传接口url
		,
		success : function(res) { // 回调
			$("#LAY_demo_upload").attr("style", "block");// 显示图片
			LAY_demo_upload.src = res.url;
		}
	});

});

// 回显
$(function() {
	// 我们强烈推荐你在代码最外层把需要用到的模块先加载
	layui.use([ 'layer', 'form', 'element' ],
			function() {
				var layer = layui.layer, form = layui.form(), element = layui
						.element();
				form.render(); // 刷新全部

				// 监听radio单选
				form.on('radio(radio_filter)', function(data) {
					form.render(); // 重新渲染
				});

				// 监听submit提交事件
				form.on('submit(save)', function(data) {
					// 保存
					save(data);
					return false;// 阻止跳转页面，只有保存成功时才跳转
				});

			});

	var id = getQueryString("id");
	var find = getQueryString("find");
	if (find == 1) { // 预览，将”保存“，”预览“2个按钮取消
		$("#save_bt").attr("style", "display:none");//
		$("#closeIframe").attr("style", "display:none");// 
	}
	$.ajax({
		url : hostIp + "/banner/getEntityById.do",
		method : "post",
		dataType : "json",
		data : {
			bannerId : id
		},
		success : function(data) {
			var platform = data.list.bootDiagramObject.platform// 回显单选框
			if (platform == 1) {
				$("#level_id3").attr("checked", "checked");
			} else if (platform == 2) {
				$("#level_id2").attr("checked", "checked");
			} else if (platform == 3) {
				$("#level_id1").attr("checked", "checked");
			}

			var alertPage = data.list.bootDiagramObject.alertPage// 回显下拉框
			if (alertPage == 1) { // 回显选中
				$("#select0").attr("selected", "selected");
			} else if (selectType == 2) {
				$("#select1").attr("selected", "selected");
			} else if (selectType == 3) {
				$("#select2").attr("selected", "selected");
			} else if (selectType == 4) {
				$("#select3").attr("selected", "selected");
			} 
			var userGroup = data.list.bootDiagramObject.userGroup// 回显下拉框
			if (userGroup == 1) { // 回显选中
				$("#select0").attr("selected", "selected");
			} else if (selectType == 2) {
				$("#select1").attr("selected", "selected");
			} else if (selectType == 3) {
				$("#select2").attr("selected", "selected");
			} else if (selectType == 4) {
				$("#select3").attr("selected", "selected");
			} 
			$("#title").val(data.list.bootDiagramObject.title);
			$("#excuteTime").val(data.list.bootDiagramObject.excuteTime);
			$("#bannerId").val(data.list.bootDiagramObject.bannerId);
			$("#url").val(data.list.bootDiagramObject.url);
			$("#startTime").val(data.list.bootDiagramObject.startTime.substring(0, 19));
			$("#endTime").val(	data.list.bootDiagramObject.endTime.substring(0, 19));
			$("#serialNum").val(data.list.bootDiagramObject.serialNum);
			$("#platform").val(data.list.bootDiagramObject.platform);
			$("#appVersion").val(data.list.bootDiagramObject.appVersion);
			if (data.list.bootDiagramObject.image != ''	&& data.list.bootDiagramObject.image != null) {
				$("#LAY_demo_upload").attr("style", "block");// 显示图片
			}
			$("#LAY_demo_upload").attr("src", data.list.bootDiagramObject.image);// 图片url
		},
		error : function() {
			alert("系统异常,请常识重新登录！");
		}
	});
});

// 关闭
function closeIfrname() {
	// layer.closeAll();
	var frameindex = parent.layer.getFrameIndex(window.name); // 先得到当前iframe层的索引
	parent.layer.close(frameindex);
}

// 保存
function save(form) {
	var bannerId = form.field.bannerId;
	var image = $("#LAY_demo_upload").attr("src");// 图片url
	var url = form.field.url;
	var excuteTime = form.field.excuteTime;
	var platform = form.field.platform;// 保存单选框的选中的值
	var startTime = form.field.startTime;
	var title = form.field.title;
	var appVersion = form.field.appVersion;
	var endTime = form.field.endTime;
	var serialNum = form.field.serialNum;
	
	var userGroup = form.field.userGroup;
	var alertPage = form.field.alertPage;
	

	if (userGroup == null || userGroup == '') {
		alert("请填写用户群标识！");
		return;
	}

	if (excuteTime == null || excuteTime == '') {
		alert("请填写多少秒弹一次！");
		return;
	}
	if (platform == null || platform == '') {
		alert("请填写多少秒弹一次！");
		return;
	}

	if (alertPage == null || alertPage == '') {
		alert("请填写弹出界面！");
		return;
	}
	if (appVersion == null || appVersion == '') {
		alert("请填写版本号！");
		return;
	}

	if (image == null || image == '') {
		alert("请上传图片！");
		return;
	}

	if (url == null || url == '') {
		alert("请填写app端url！");
		return;
	}

	if (serialNum == null || serialNum == '') {
		alert("请填写排序值！");
		return;
	}
	if (startTime == null || startTime == '') {
		alert("请填写开始时间！");
		return;
	}
	if (endTime == null || endTime == '') {
		alert("请填写结束时间！");
		return;
	}

	var checkBeginTime = (startTime == null || startTime == '' ? false : true);
	var checkEndTimed = (endTime == null || endTime == '' ? false : true);
	if (checkBeginTime && checkEndTimed) {
		var beginDate = new Date(startTime);
		var endDate = new Date(endTime);
		if (beginDate.getTime() > endDate.getTime()) {
			alert("启动图开始时间不能大于结束时间！");
			return;
		}
	}

	var frameindex = parent.layer.getFrameIndex(window.name); // 先得到当前iframe层的索引
	$.ajax({
		url : hostIp + "/banner/saveBanner.do",
		method : 'post',
		dataType : 'json',
		data : {
			bannerId : bannerId,
			image : image,
			url : url,
			excuteTime:excuteTime,
			platform : platform,
			startTime : startTime,
			title:title,
			endTime : endTime,
			serialNum : serialNum,
			appVersion : appVersion,
			userGroup : userGroup,
			alertPage : alertPage
		
		},
		success : function(obj) {
			if (obj.code == "2001" || obj.code == "4001") {
				layer.msg(obj.message, {
					icon : 1
				});// 成功提示信息
				$("#save_bt").attr("style", "display:none");// 按钮隐藏
				// 延迟一秒后跳转页面
				setTimeout(function() {
					closeIfrname();
					parent.location.href = hostIpHtml
							+ "/index/views/banner/banner.html";// 跳转页面
				}, 1000)
			} else {
				layer.msg(obj.message, {
					icon : 2
				});// 成功提示信息
			}
		},
		error : function() {
			alert("获取数据失败，请尝试重新登陆！");
		},
		complete : function() {
			// parent.layer.close(frameindex);
			// location.reload(); //刷新，关闭

		}

	});

}
