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



  	 




 

//刷新
function refresh(){
	var type=$("#type").val();
	if(type == '' || type == null){
		alert("请选择要刷新的内容类型！");
		return false;
	}
	$('#loading').modal('show');
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
				$('#loading').modal('hide');
			}else{
				alert(data.message);
				$('#loading').modal('hide');
			}
		},
		error:function(){
			alert("程序异常，请联系管理员！");
			$('#loading').modal('hide');
		}
	});
}
 

