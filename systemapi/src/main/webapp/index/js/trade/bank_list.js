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
              "iDisplayLength": 10
	    } );
	}



  	 

//查询
function query(){
//	var picNums=0;//计算图片数量
	var url=hostIp+"/tradeBank/list.do";
	//获取datatable对象
	var table=$('#example-4').dataTable();
	if(table){// 因为第2次请求会出现上次的缓存，所以这里一定要
	    table.fnDestroy();
	}
	$("#example-4").html("");	
	var text="<table class='table table-bordered table-striped' id='example-4'>" +
			"<thead >" +
			"<tr>" +
				"<th >银行名称</th>" +
				"<th>银行代码</th>" +
				"<th>ICON名称</th>" +
				"<th style='width: 180px;'>是否置顶</th>" +
				"<th style='width: 180px;'>是否删除</th>" +
				"<th style='width: 130px;text-align: center;'>操作</th>" +
			"</tr>" +
			"</thead>" +
			"<tbody>" +
			"<tr id='tr_id'  >"
					+"<td><input name='bankName' id='bankName' type='text' class='form-control error btn-radius'/></td>"
					+"<td><input name='bankCode' id='bankCode' type='text' class='form-control error btn-radius'/></td>"
					+"<td><img alt='' src='' id='bank_icon_img' height='200px;' width='200px;'> " +
					"<input type='file' name='bankIcon' id='bank_icon'/>" +
					"</td>"
					+"<td><select name='top' id='top' class='form-control error btn-radius'  >"
					+"<option value=''>请选择</option>" 
					+"<option value='0'>否</option>"
					+"<option value='1'>是</option>"
					+"</td>"
					+"<td><select name='delFlag' id='delFlag' class='form-control error btn-radius'  >"
					+"<option value=''>请选择</option>"
					+"<option value='0'>否</option>"
					+"<option value='1'>是</option>"
					+"</td>"
					+"<td>"
					+" <button class='btn btn-success btn-radius' onclick='saves()'><i class='icon-pencil'></i>保存 </button>" +
					"</td>"  
					+"</tr>"; 
	$.ajax({
		url: url,
		method: 'post',
		dataType: 'json',
		success: function(data){
			 
			 $.each(data.list.list, function(k, v) {
				text+="<tr>"
					+"<td><input name='bankName' id='bankName"+k+"' type='text' value='"+v.bankName+"' class='form-control error btn-radius'/></td>"
					+"<td><input name='bankCode' id='bankCode"+k+"' type='text' value='"+v.bankCode+"' class='form-control error btn-radius'/></td>"
					+"<td><input type='file' name='bankIcon' id='bankIcon"+k+"'/><img alt='' src='"+v.bankIcon+"' id='bankIcon"+k+"_img' height='200px;' width='200px;' /></td>";

					text+="<td><select class='form-control'  name='top' id='top"+k+"'>";
					if(v.top == "0"){
						text+="<option value='0' selected='selected'>否</option>";
						text+="<option value='1' >是</option>";
					}else if(v.top == "1"){
						text+="<option value='0' >否</option>";
						text+="<option value='1' selected='selected'>是</option>";
					}
					text+="</select></td>";
				    text+="<td><select class='form-control'  name='delFlag' id='delFlag"+k+"'>";
					 if(v.delFlag == "0"){
						 text+="<option value='0' selected='selected'>否</option>";
						 text+="<option value='1' >是</option>";
					 }else if(v.delFlag == "1"){
						 text+="<option value='0' >否</option>";
						 text+="<option value='1' selected='selected'>是</option>";
					 }
					 text+="</select></td>";
				 text+="<td>"
					+"<a href='javascript:' " 
					+"onclick='update( \""+v.bankId+"\",\"bankIcon"+k+"\",\"bankName"+k+"\",\"bankCode"+k+"\",\"top"+k+"\",\"delFlag"+k+"\",\""+k+"\" )' ><i class='icon-pencil'></i>修改</a>"
					+"</td>"
					+"</tr>"
			});  //<button class='btn btn-xs btn-danger' onclick='deleted(\""+v.bankId+"\",\""+k+"\")' ><i class='icon-remove'></i>删除 </button>
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
function update(bankId, bankIcon,bankName, bankCode, top, delFlag, k){
	var i=k;
	++i;
	if(confirm("确认要修改第"+(i)+"条吗？")){
		 //表单参数值
	 
		var bankName=$.trim($("#"+bankName).val());
		var bankCode=$.trim($("#"+bankCode).val());
		var top=$("#"+top).val();
		
		var delFlag=$("#"+delFlag).val();// 开始日期

		if(bankName == null || bankName==''){
			alert("请填写'银行名称'！");
			return;
		}
		if (bankCode == null || bankCode == '') {
			alert("请填写'银行代码'！");
			return;
		}
		if(top == null || top==''){
			alert("请选择'是否置顶'！");
			return;
		}
		if(delFlag == null || delFlag==''){
			alert("请选择'是否删除'！");
			return;
		}
	    // 上传文件
		var pic2 = document.getElementById(bankIcon).files[0]; // js 获取文件对象
	    var FileController=hostIp+"/tradeBank/save.do"; // 接收上传文件的后台地址   (请求地址)
	    var form = new FormData();   
	    form.append("bankId", bankId);// 主键id
		form.append("bankName", bankName);
		form.append("bankCode", bankCode);
		form.append("top", top);
		form.append("delFlag", delFlag);
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
function deleted(bankId, k){
	var i=k;
	++i;
	if(confirm("确认要删除第"+i+"条吗？")){
		var url=hostIp+"/tradeBank/delete.do";
		$.ajax({
			url: url,
			method: 'post',
			dataType: 'json',
			data: {
				bankId: bankId
			},
			success: function(data){
				if(data.code == "200"){
					alert("删除成功");
					window.location.href=hostIpHtml+"/index/views/trade/bank_list.html";
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

function redisRefresh(){
	$('#loading').modal('show');
	$.ajax({
		url: hostIp+"/tradeBank/redisRefresh.do",
		method: 'post',
		dataType: 'json',
		data: {},
		success: function(data){
			if(data.code == "200"){
				alert("刷新成功！");
				$('#loading').modal('hide');
			}else{
				alert(data.message);
				$('#loading').modal('hide');
			}

		}
	});
}


//保存
function saves(){

    //表单参数值
	//var columnUrl=$.trim($("#columnUrl").val());
	var bankName=$("#bankName").val();
	var bankCode=$("#bankCode").val();
	
	var top=$("#top").val();// 开始日期
	var delFlag=$("#delFlag").val();// 结束日期

 	if(bankName == null || bankName==''){
		alert("请填写'银行名称'！");
		return;
	}
	if (bankCode == null || bankCode == '') {
		alert("请填写'银行代码'！");
		return;
	}
	if(top == null || top==''){
		alert("请选择'是否置顶'！");
		return;
	}	
	if(delFlag == null || delFlag==''){
		alert("请选择'是否删除'！");
		return;
	}
	
    // 上传文件
    var pic = document.getElementById("bank_icon").files[0]; // js 获取文件对象
    if(pic == null || pic==''||pic==undefined ){
		alert("请上传图片！");
		return;
	}
    var FileController=hostIp+"/tradeBank/save.do"; // 接收上传文件的后台地址   (请求地址)
    // FormData 对象     //可以增加表单数据  
    var form = new FormData();   
    form.append("bankName", bankName);
    form.append("bankCode", bankCode);
    form.append("top", top);
    form.append("delFlag", delFlag);
    form.append("pics", pic); // 上传的文件

    
    
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
				 
				  window.location.href=hostIpHtml+"/index/views/trade/bank_list.html";
			  }else{
				  alert(jsons.message);
			  }
		  }else{
			  alert("Problem retrieving XML data");
		    }
		}
	}
