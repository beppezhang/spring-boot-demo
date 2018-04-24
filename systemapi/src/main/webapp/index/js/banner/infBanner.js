function showTablePage(){
	var oTable1= $('#example-4').dataTable( {
			"bStateSave": false,//保存客户端搜索条件等状态  
			"sPaginationType": "full_numbers",//出现首页、尾页  
			"bAutoWidth": false,
			"bLengthChange": true, 
            "bDestroy":true,
            "bRetrieve": true,
            "bSort": false,// 表示整个表格不排序
            "aLengthMenu": [[10, 25, 50,100, -1], ["10条", "25条", "50条","100条", "所有"]],
			"language" : {//语言修改
				"lengthMenu" : "显示 _MENU_ 条记录",
				"zeroRecords": "没有找到记录",
				"info": "第 _PAGE_ 页 ( 总共 _PAGES_ 页 )",
                "infoEmpty": "无记录",
                "infoFiltered": "(从 _MAX_ 条记录过滤)",
                "sFirst": "首页",
                "sLast": "末页",
                "oPaginate": {  
                    "sFirst": "首页",  
                    "sPrevious": "上一页",  
                    "sNext": "下一页",  
                    "sLast": "末页"} ,
                "sSearch":"搜索"
              },
              "iDisplayLength": 10,
	    } );
	}



  	 

//查询
function query(){
//	var picNums=0;//计算图片数量
	var url=hostIp+"/infBanner/list.do";
	//获取datatable对象
	var table=$('#example-4').dataTable();
	if(table){// 因为第2次请求会出现上次的缓存，所以这里一定要
	    table.fnDestroy();
	}
	$("#example-4").html("");	
	var text="<table class='table table-bordered table-striped' id='example-4'>" +
			"<thead >" +
			"<tr>" +
				"<th style='width: 240px;'>图片</th>" +
				"<th>消息栏目名称</th>" +	
				
				"<th>跳转URL</th>" +
				"<th style='width: 180px;'>开始时间</th>" +
				"<th style='width: 180px;'>结束时间</th>" +
				"<th style='width: 130px;'>使用用户类别</th>" +	
				"<th style='width: 100px;'>排序值</th>" +
				"<th style='width: 130px;text-align: center;'>操作</th>" +
			"</tr>" +
			"</thead>" +
			"<tbody>" +
			"<tr id='tr_id'  >"
					+"<td><img alt='' src='' id='pic_one_img' height='200px;' width='200px;'> " +
							"<input type='file' name='pic' id='pic_id'/>" +
							"</td>"
					+"<td><input name='informationColumnName' id='informationColumnName' type='text' class='form-control error btn-radius'/></td>"
					+"<td><input name='columnUrl' id='columnUrl' type='text' class='form-control error btn-radius'/></td>"
					+"<td><input type='text' onfocus=\"WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})\" id='beginTime' name='beginTime' class='form-control error btn-radius'/></td>"
					
					+"<td><input type='text' onfocus=\"WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})\" id='endTime' name='endTime' class='form-control error btn-radius'/></td>"
					+"<td><select name='isUsers' id='isUsers' class='form-control error btn-radius'  >"
					+"<option value=''>请选择</option>" 
					+"<option value='1'>全部</option>" 
					+"<option value='2'>新用户</option>"
					+"<option value='3'>老用户</option>"
					+"</td>"
					+"<td><input name='serialNum' id='serialNum' type='text' onkeyup='clearNoNum(this)' maxLength='8' class='form-control error btn-radius'/></td>"
					+"<td>" 
					+" <button class='btn btn-success btn-radius' onclick='saves()'><i class='icon-pencil'></i>保存 </button>" +
					"</td>"  
					+"</tr>"; 
	$.ajax({
		url: url,
		method: 'post',
		dataType: 'json',
		success: function(data){
			 
			 $.each(data.data.data, function(k, v) {
				text+="<tr>"
					+"<td><input type='file' name='pic' id='pic"+k+"'/><img alt='' src='"+v.pic+"' id='pic"+k+"_img' height='200px;' width='200px;' /></td>"
					+"<td><input name='informationColumnName' id='informationColumnName"+k+"' type='text' value='"+v.informationColumnName+"' class='form-control error btn-radius'/></td>" 
					+"<td><input name='columnUrl' id='columnUrl"+k+"' type='text' value='"+v.columnUrl+"' class='form-control error btn-radius'/></td>"
					
					+"<td><input name='beginTime' id='beginTime"+k+"' type='text' value='"+v.beginTime.substring(0,19)+"' onfocus=\"WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})\"  class='form-control error btn-radius'/></td>"
					+"<td><input name='endTime' id='endTime"+k+"' type='text' value='"+v.endTime.substring(0,19)+"' onfocus=\"WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})\" class='form-control error btn-radius'/></td>";
				
					text+="<td><select class='form-control'  name='isUsers' id='isUsers"+k+"'>";
					if(v.isUsers == "1"){
						text+="<option value='1' selected='selected'>全部</option>";
						text+="<option value='2' >新用户</option>";
						text+="<option value='3' >老用户</option>" ;
					}else if(v.isUsers == "2"){
						text+="<option value='1' >全部</option>";
						text+="<option value='2' selected='selected'>新用户</option>";
						text+="<option value='3' >老用户</option>" ;
					}else if(v.isUsers == "3"){
						text+="<option value='1' >全部</option>";
						text+="<option value='2' >新用户</option>";
						text+="<option value='3' selected='selected'>老用户</option>" ;
					}else{
						text+="<option value=''  selected='selected'>请选择</option>";
						text+="<option value='1' >全部</option>";
						text+="<option value='2' >新用户</option>";
						text+="<option value='3' >老用户</option>" ;
					}
					text+="</select></td>";
					
					text+="<td><input name='serialNum' id='serialNum"+k+"' type='text' value='"+v.serialNum+"' onkeyup='clearNoNum(this)' maxLength='8' class='form-control error btn-radius'/></td>"
					+"<td>" 
					+"<a href='javascript:' " 
					+"onclick='update( \""+v.informationColumnId+"\",\"pic"+k+"\",\"informationColumnName"+k+"\",\"columnUrl"+k+"\",\"beginTime"+k+"\",\"endTime"+k+"\",\"serialNum"+k+"\",\""+k+"\" ,\"isUsers"+k+"\")' ><i class='icon-pencil'></i>修改</a>"
					+"<button class='btn btn-xs btn-danger' onclick='deleted(\""+v.informationColumnId+"\",\""+k+"\")' ><i class='icon-remove'></i>删除 </button></td>"  
					+"</tr>"
			});  
		},
		complete: function(){
			text+="</tbody></table>";
			$("#example-4").html(text);
			$("#tr_id").hide();// 隐藏tr
			showTablePage();
		}
	});
}

 //修改
function update(informationColumnId, pic,informationColumnName, columnUrl, beginTime, endTime, serialNum, k, isUsers){
	var i=k;
	++i;
	if(confirm("确认要修改第"+(i)+"条吗？")){
		 //表单参数值
	 
		var columnUrl=$.trim($("#"+columnUrl).val());
		var informationColumnName=$.trim($("#"+informationColumnName).val());
		var serialNum=$("#"+serialNum).val();
		
		var beginTime=$("#"+beginTime).val();// 开始日期
		var endTime=$("#"+endTime).val();// 结束日期
		
		var isUsers = $("#"+isUsers).val();
		var checkStartTime=(beginTime == null || beginTime == '' ? false : true);
		var checkEndTime=(endTime == null || endTime == '' ? false : true);
		 	
		  
		 	if(checkStartTime && checkEndTime){
		 		var beginDate=new Date(beginTime);
		 		var endDate=new Date(endTime);
		 		if(beginDate.getTime()>endDate.getTime()){
		 			alert("开始日期不能大于结束日期！");
		 		return;
		 		}

			} 
		 	
		 	if(columnUrl == null || columnUrl==''){
				alert("请填写'跳转URL'！");
				return;
			}
			if (informationColumnName == null || informationColumnName == '') {
				alert("请填写'消息栏目名称'！");
				return;
			}
			if(beginTime == null || beginTime==''){
				alert("请选择'开始时间'！");
				return;
			}	
			if(endTime == null || endTime==''){
				alert("请填'结束时间'！");
				return;
			}
			
			if(isUsers == '' || isUsers == null){
				alert("请填写'使用用户类别'!");
				return ;
			}
			
			if(serialNum == null || serialNum==''){
				alert("请填写'排序值'！");
				return;
			}

	    
	    // 上传文件
  var pic2 = document.getElementById(pic).files[0]; // js 获取文件对象  
	    var FileController=hostIp+"/infBanner/save.do"; // 接收上传文件的后台地址   (请求地址)
	    var form = new FormData();   
	    form.append("informationColumnId", informationColumnId);// 主键id
	    form.append("informationColumnName", informationColumnName);
	    form.append("columnUrl", columnUrl);
	    form.append("beginTime", beginTime);
	    form.append("endTime", endTime);
	    form.append("serialNum", serialNum);
	    form.append("isUsers", isUsers);
	   
	    form.append("pics", pic2); // 上传的文件
	    
	    var xhr=null; // XMLHttpRequest 对象  
	    if (window.XMLHttpRequest){
	    	// code for all new browsers
	    	xmlhttp=new XMLHttpRequest();
	    }
	  	else if (window.ActiveXObject){
	  		// code for IE5 and IE6
	  		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	  	}
	    
	  	if (xmlhttp!=null)
	    {
	  	    xmlhttp.open("post", FileController, true);  // 第3个参数表示是否异步请求 
	  	    xmlhttp.send(form);// 提交参数
	  	    xmlhttp.onreadystatechange=sendata; // 当 XMLHttpRequest 对象的状态发生改变时，会触发此函数。状态从 0 (uninitialized) 到 4 (complete) 进行变化
	    }else{
	    	alert("Your browser does not support XMLHTTP.");
	    } 
	}
 }
 


// 初始化加载
$(function(){
	query();
})

//删除
function deleted(informationColumnId, k){
	var i=k;
	++i;
	if(confirm("确认要删除第"+i+"条吗？")){
		var url=hostIp+"/infBanner/delete.do";
		$.ajax({
			url: url,
			method: 'post',
			dataType: 'json',
			data: {
				informationColumnId: informationColumnId
			},
			success: function(data){
				if(data.code == "200"){
					alert("删除成功");
					window.location.href=hostIpHtml+"/index/views/banner/banner_list.html";
				}else{
					alert(data.message);
				}
				
			}
		});
	}
}
 
// 显示tr
function addForm(){
	$("#tr_id").show();
}


//保存
function saves(){

    //表单参数值
	var columnUrl=$.trim($("#columnUrl").val());
	var serialNum=$("#serialNum").val();
	
	var beginTime=$("#beginTime").val();// 开始日期
	var endTime=$("#endTime").val();// 结束日期
	var isUsers=$("#isUsers").val();// 1：全部，2：新用户，3：老用户 
	 
	var checkStartTime=(beginTime == null || beginTime == '' ? false : true);
	var checkEndTime=(endTime == null || endTime == '' ? false : true);
	var informationColumnName=$.trim($("#informationColumnName").val());
	
	if(checkStartTime && checkEndTime){
 		var beginDate=new Date(beginTime);
 		var endDate=new Date(endTime);
 		if(beginDate.getTime()>endDate.getTime()){
 			alert("开始日期不能大于结束日期！");
 		return;
 		}

	} 
 	if(columnUrl == null || columnUrl==''){
		alert("请填写'跳转URL'！");
		return;
	}
	if (informationColumnName == null || informationColumnName == '') {
		alert("请填写'消息栏目名称'！");
		return;
	}
	if(beginTime == null || beginTime==''){
		alert("请选择'开始时间'！");
		return;
	}	
	if(endTime == null || endTime==''){
		alert("请填'结束时间'！");
		return;
	}
	
	if(isUsers == '' || isUsers == null){
		alert("请填写'使用用户类别'!");
		return ;
	}
	
	if(serialNum == null || serialNum==''){
		alert("请填写'排序值'！");
		return;
	}
	 	
    // 上传文件
    var pic = document.getElementById("pic_id").files[0]; // js 获取文件对象  
//    if(pic == null || pic==''||pic==undefined ){
//		alert("请上传图片！");
//		return;
//	}
    var FileController=hostIp+"/infBanner/save.do"; // 接收上传文件的后台地址   (请求地址)
    // FormData 对象     //可以增加表单数据  
    var form = new FormData();   
    form.append("columnUrl", columnUrl);
    form.append("beginTime", beginTime);
    form.append("endTime", endTime);
    form.append("serialNum", serialNum);  
    form.append("pics", pic); // 上传的文件
    form.append("informationColumnName", informationColumnName);
    form.append("isUsers", isUsers);
    
    
    var xhr=null; // XMLHttpRequest 对象  
    if (window.XMLHttpRequest){
    	// code for all new browsers
    	xmlhttp=new XMLHttpRequest();
    }
  	else if (window.ActiveXObject){
  		// code for IE5 and IE6
  		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  	}
    
  	if (xmlhttp!=null)
    {
  	    xmlhttp.open("post", FileController, true);  // 第3个参数表示是否异步请求 
  	    xmlhttp.send(form);// 提交参数
  	    xmlhttp.onreadystatechange=sendata; // 当 XMLHttpRequest 对象的状态发生改变时，会触发此函数。状态从 0 (uninitialized) 到 4 (complete) 进行变化
    }else{
    	alert("Your browser does not support XMLHTTP.");
    }
   
}  

//xmlhttprequest 返回状态
	function sendata(){
		if (xmlhttp.readyState==4){
			// 4 = "loaded"
//			alert("加载中...");
		  if (xmlhttp.status==200){ //200 = OK
//			  alert(xmlhttp.responseText);
			  var jsons=JSON.parse(xmlhttp.responseText);// 返回的字符串转换成json格式
			  if(jsons.code == "4001" || jsons.code == "2001"){
				  alert(jsons.message);  
				 
				  window.location.href=hostIpHtml+"/index/views/banner/banner_list.html";
			  }else{
				  alert(jsons.message);
			  }
		  }else{
			  alert("Problem retrieving XML data");
		    }
		}
	}
