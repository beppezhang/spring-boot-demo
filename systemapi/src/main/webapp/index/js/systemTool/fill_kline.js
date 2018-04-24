function showTablePage(){
	//var oTable1= $('#example-4').dataTable( {
	//		"bStateSave": false,//保存客户端搜索条件等状态
	//		"sPaginationType": "full_numbers",//出现首页、尾页
	//		"bAutoWidth": false,
	//		"bLengthChange": true,
     //       "bDestroy":true,
     //       "bRetrieve": true,
     //       "bSort": false,// 表示整个表格不排序
     //       "aLengthMenu": [[10, 25, 50,100, -1], ["10条", "25条", "50条","100条", "所有"]],
	//		"language" : {//语言修改
	//			"lengthMenu" : "显示 _MENU_ 条记录",
	//			"zeroRecords": "没有找到记录",
	//			"info": "第 _PAGE_ 页 ( 总共 _PAGES_ 页 )",
     //           "infoEmpty": "无记录",
     //           "infoFiltered": "(从 _MAX_ 条记录过滤)",
     //           "sFirst": "首页",
     //           "sLast": "末页",
     //           "oPaginate": {
     //               "sFirst": "首页",
     //               "sPrevious": "上一页",
     //               "sNext": "下一页",
     //               "sLast": "末页"} ,
     //           "sSearch":"搜索"
     //         },
     //         "iDisplayLength": 10,
	//    } );
	}





function initExCode(){
	var url=hostIp+"/fillkline/selectAllExcode.do";
	$.ajax({
		url: url,
		method: 'post',
		dataType: 'json',
		data: {

		},
		success: function(data){
			if(data.code == "200"){
				var excode = document.getElementById("excode");
				excode.options.length = 0;
				excode.options.add(new Option("请选择交易所", ""));
				for (var i = 0; i < data.data.data.length; i++) {
					excode.options.add(new Option(
						data.data.data[i].value,
						data.data.data[i].value));
				}
			}else{
				alert(data.message);
			}

		}
	});
}

// 初始化加载
$(function(){
	initExCode();
})

function getGoodsByExCode(){
	var exCode=$("#excode").val();
	var url=hostIp+"/fillkline/selectCodeByExcode.do";
	$.ajax({
		url: url,
		method: 'post',
		dataType: 'json',
		data: {
			excode:exCode
		},
		success: function(data){
			if(data.code == "200"){
				var code = document.getElementById("code");
				code.options.length = 0;
				code.options.add(new Option("请选择商品", ""));
				for (var i = 0; i < data.data.data.length; i++) {
					code.options.add(new Option(
						data.data.data[i].text,
						data.data.data[i].value));
				}
			}else{
				alert(data.message);
			}

		}
	});
}
function fillKLines(){
	var klineType = $("#klineTypeId").val();
	var excodeType = $("#excode").val();
	var codeType = $("#code").val();
	var startTime=$("#registerTime").val();
	var endTime=$("#registerTimeEnd").val();

	if(klineType == null || klineType == ''){
		alert("请选择K线类型！");
		return false;
	}
	if(excodeType == null || excodeType == ''){
		alert("请选择交易所！");
		return false;
	}
	if(codeType == null || codeType == ''){
		alert("请选择商品！");
		return false;
	}
	if(startTime == null || startTime == ''){
		alert("请选择开始时间！");
		return false;
	}
	if(endTime == null || endTime == ''){
		alert("请选择结束时间！");
		return false;
	}
	$('#loading').modal('show');

	$.ajax({
		type: "post",
		url : hostIp+"/fillkline/click.do",
		data : {klineType:klineType,excode:excodeType,code:codeType,startTime:startTime,endTime:endTime},
		dataType : 'json',
		success : function(data) {
			if (data.code) {
				alert("执行成功！");
				$('#loading').modal('hide');
			}else{
				alert("执行失败！");
				$('#loading').modal('hide');
			}
		},
		error:function(){
			alert("程序异常，请联系管理员！");
			$('#loading').modal('hide');
		}
	});

}

 

//删除
function refresh(){
	var type=$("#type").val();
	if(type == '' || type == null){
		alert("请选择要刷新的内容类型！");
	}
	var url=hostIp+"/systemTool/redisRefresh.do";
	$.ajax({
		url: url,
		method: 'post',
		dataType: 'json',
		data: {
			typeId: type
		},
		success: function(data){
			if(data.code == "200"){
				alert("刷新成功！");
				window.location.href=hostIpHtml+"/index/views/systemTool/redis_refresh.html";
			}else{
				alert(data.message);
			}

		}
	});
}
 

