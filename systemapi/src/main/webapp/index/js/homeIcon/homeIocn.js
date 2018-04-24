function showTablePage(){
	var oTable1= $('#example-4').dataTable( {
			"order": [[ 6, "desc" ]],//跟数组下标一样，第一列从0开始，这里表格初始化时，第5列默认降序
			"bStateSave": false,//保存客户端搜索条件等状态  
			"sPaginationType": "full_numbers",//出现首页、尾页  
			"bAutoWidth": false,
			"bLengthChange": true, 
            "bDestroy":false,
            "bRetrieve": true,
            "aLengthMenu": [[10, 25, 50,100, -1], ["10条", "25条", "50条","100条", "所有"]],
            "deferRender": true, //当处理大数据时，延迟渲染数据，有效提高Datatables处理能力
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
	var url=hostIp+"/homeIcon/list.do";
	//获取datatable对象
	var table=$('#example-4').dataTable();
	if(table){// 因为第2次请求会出现上次的缓存，所以这里一定要
	    table.fnDestroy();
	}
	$("#example-4").html("");
	
	
	var text="<table class='table table-bordered table-striped' id='example-4'>" +
			"<thead >" +
			"<tr>" +
				"<th style='width: 240px;'>ICON配图</th>" +
				"<th>标题</th>" +
				"<th style='width: 130px;'>标题缩写英文(大写)</th>" +
				"<th>是否跳转H5页面</th>" +
				"<th>跳转URL</th>" +
				"<th style='width: 180px;'>开始时间</th>" +
				
				"<th style='width: 180px;'>结束时间</th>" +
				"<th style='width: 130px;'>使用用户类别</th>" +
				"<th style='width: 100px;'>排序值</th>" +
				"<th style='width: 120px;'>操作</th>" +
			"</tr>" +
			"</thead>" +
			"<tbody>" +
			"<tr id='tr_id'  >"
					+"<td><img alt='' src='' id='pic_one_img' height='200px;' width='200px;'> " +
							"<input type='file' name='pic_one' id='pic_one'/>" +
							"</td>"
					+"<td><input name='title' id='title' type='text' class='form-control error btn-radius'/></td>"
					+"<td><input name='titleCode' id='titleCode' type='text' class='form-control error btn-radius'/></td>"
					+"<td><select name='isH5' id='isH5' class='form-control error btn-radius' onchange=\"getIsH5(this.value, 'url')\"  >" +
					"<option value=''>请选择</option>" +
					"<option value='1'>是</option>" +
					"<option value='0'>否</option>" 
					+"</td>"
					+"<td><input name='url' id='url' type='text' class='form-control error btn-radius' disabled='true'/></td>"
					+"<td><input   type='text' onfocus=\"WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})\" id='startTime' name='startTime'  class='form-control error btn-radius' /></td>"
					
					+"<td><input   type='text' onfocus=\"WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})\" id='endTime' name='endTime'  class='form-control error btn-radius' /></td>"
					+"<td><select name='isUsers' id='isUsers' class='form-control error btn-radius'  >"
					+"<option value=''>请选择</option>" 
					+"<option value='1'>全部</option>" 
					+"<option value='2'>新用户</option>"
					+"<option value='3'>老用户</option>" 
					+"</td>"
					+"<td><input name='sort' id='sort' type='text' onkeyup='clearNoNum(this)' maxLength='8' class='form-control error btn-radius'/></td>"
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
					+"<td><input type='file' name='pic_one' id='pic_one"+k+"'/><img alt='' src='"+v.image+"' id='pic_one_img' height='200px;' width='200px;'  /></td>"
					+"<td><input name='title' id='title"+k+"' type='text' value='"+v.title+"' class='form-control error btn-radius'/></td>"
					+"<td><input name='titleCode' id='titleCode"+k+"' type='text' value='"+v.titleCode+"' class='form-control error btn-radius'/></td>";
					
					text+="<td><select class='form-control'  name='isH5' id='isH5"+k+"' onchange=\"getIsH5(this.value, 'url"+k+"')\" >";
					if(v.isH5 == "1"){
						text+="<option value='1' selected='selected'>是</option>";
						text+="<option  value='0'>否</option>" ;
					}else{
						text+="<option value='1'>是</option>";
						text+="<option  value='0' selected='selected'>否</option>" ;
					}
					text+="</select></td>";
						
					if(v.isH5 != "1"){ // 跳转到原生，url文本框置灰
						text+="<td><input name='url' id='url"+k+"' type='text' value='"+v.url+"' class='form-control error btn-radius' disabled='true' /></td>";
					}else{
						text+="<td><input name='url' id='url"+k+"' type='text' value='"+v.url+"' class='form-control error btn-radius'/></td>";
					}
					
					text+="<td><input name='startTime' id='startTime"+k+"' type='text' value='"+v.startTime.substring(0,19)+"' onfocus=\"WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})\"  class='form-control error btn-radius' /></td>"
					+"<td><input name='endTime' id='endTime"+k+"' type='text' value='"+v.endTime.substring(0,19)+"' onfocus=\"WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})\"  class='form-control error btn-radius'/></td>";
					
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
					
					
					text +="<td><input name='sort' id='sort"+k+"' type='text' value='"+v.sort+"' onkeyup='clearNoNum(this)' maxLength='8'  class='form-control error btn-radius'/></td>"
					+"<td>" 
					+"<a href='javascript:' " 
					+"onclick='update(\""+v.homeIconId+"\",\"pic_one"+k+"\",\"title"+k+"\",\"url"+k+"\",\"startTime"+k+"\",\"endTime"+k+"\",\"sort"+k+"\",\""+k+"\",\"titleCode"+k+"\",\"isH5"+k+"\",\"isUsers"+k+"\"  )'><i class='icon-pencil'></i>修改</a>"
					+"<button class='btn btn-xs btn-danger' onclick='deleted(\""+v.homeIconId+"\",\""+k+"\")' ><i class='icon-remove'></i>删除 </button></td>"  
					+"</tr>";
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

//根据‘是否跳转H5页面’选择，是否置灰url文本框
function getIsH5(data, url_id){
	if(data != "1"){// 跳转到H5页面
		$("#"+url_id).attr('disabled', 'true');
	}else{
		$("#"+url_id).removeAttr("disabled");
	}
}


//修改
function update(id, pic_ones_update, title, url, startTime, endTime, sort, k, titleCode, isH5, isUsers){
	var i=k;
	++i;
	if(confirm("确认要修改第"+(i)+"条吗？")){
		 //表单参数值
		var title=$.trim($("#"+title).val());
		var url=$.trim($("#"+url).val());
		
		var sort=$("#"+sort).val();
		var titleCode= $("#"+titleCode).val();
		var isH5= $("#"+isH5).val();
		var isUsers= $("#"+isUsers).val();
		
		var financeTime=$("#"+startTime).val();;// 开始日期
		var financeTimeEnd=$("#"+endTime).val();// 结束日期
		var checkFinanceTime=(financeTime == null || financeTime == '' ? false : true);
		var checkFinanceTimeEnd=(financeTimeEnd == null || financeTimeEnd == '' ? false : true);
	//	
		if(title == null || title== ""){
			alert("请填写'标题'！");
			return ;
		}
		
		if(titleCode==null || titleCode==""){
			alert("请填写'标题缩写英文(大写)'！");
			return ;
		}
		
		 
		
		if(isH5=='1'){
			if(url == null || url == ""){
				alert("请填写'跳转url'！");
				return;
			}
		}
		
		if(!checkFinanceTime){
			alert("请选择'开始日期'！");
			return;
		}
		if(!checkFinanceTimeEnd){
			alert("请选择'结束日期'！");
			return;
		}
		
		
		if(checkFinanceTime && checkFinanceTimeEnd){
			var beginDate=new Date(financeTime);
			var endDate=new Date(financeTimeEnd);
			if(beginDate.getTime() > endDate.getTime()){
				alert("开始日期不能大于结束日期！");
				return;
			}
		}
		
		if(isUsers == '' || isUsers == null){
			alert("请选择'使用用户类别'！");
			return ;
		}
		
		if(sort == null || sort == ""){
			alert("请填写'排序值'！");
			return ;
		}
	    // 上传文件
	    var pic_one = document.getElementById(pic_ones_update).files[0]; // js 获取文件对象
	    var FileController=hostIp+"/homeIcon/save.do"; // 接收上传文件的后台地址   (请求地址)
	    // FormData 对象     //可以增加表单数据  
	    var form = new FormData();   
	//    form.append("isUpload", "1");// 区分是否上传图片
	    form.append("title", title);
	    form.append("url", url);
	    form.append("startTime", financeTime);
	    form.append("endTime", financeTimeEnd);
	    form.append("sort", sort);
	    form.append("homeIconId", id);// 主键id
	    form.append("pic_one", pic_one); // 上传的文件
	    form.append("titleCode", titleCode); 
	    form.append("isH5", isH5); 
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
 }




// 初始化加载
$(function(){
	query();
})

//删除
function deleted(id, k){
	var i=k;
	++i;
	if(confirm("确认要删除第"+i+"条吗？")){
		var url=hostIp+"/homeIcon/delete.do";
		$.ajax({
			url: url,
			method: 'post',
			dataType: 'json',
			data: {
				homeIconId: id
			},
			success: function(data){
				if(data.code == "3001"){
					alert(data.message);
					window.location.href=hostIpHtml+"/index/views/homeIcon/homeIcon_list.html";
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
	var title=$.trim($("#title").val());
	var url=$.trim($("#url").val());
	var sort=$("#sort").val();
	
	var financeTime=$("#startTime").val();// 开始日期
	var financeTimeEnd=$("#endTime").val();// 结束日期
	
	var titleCode=$.trim($("#titleCode").val());
	var isH5=$("#isH5").val();
	var isUsers =  $("#isUsers").val();// 使用用户类别，1：全部，2：新用户，3：老用户
	
	var checkFinanceTime=(financeTime == null || financeTime == '' ? false : true);
	var checkFinanceTimeEnd=(financeTimeEnd == null || financeTimeEnd == '' ? false : true);

	
	if(title == null || title== ""){
		alert("请填写'标题'！");
		return ;
	}
	
	if(titleCode==null || titleCode==""){
		alert("请填写'标题缩写英文(大写)'！");
		return ;
	}
	
	if(isH5 == null || isH5 == ''){
		alert("请选择'是否跳转H5页面'！");
		return ;
	}
	
	if(isH5=='1'){
		if(url == null || url == ""){
			alert("请填写'跳转url'！");
			return;
		}
	}  
	
	if(!checkFinanceTime){
		alert("请选择'开始日期'！");
		return;
	}
	if(!checkFinanceTimeEnd){
		alert("请选择'结束日期'！");
		return;
	}
	
	
	if(checkFinanceTime && checkFinanceTimeEnd){
		var beginDate=new Date(financeTime);
		var endDate=new Date(financeTimeEnd);
		if(beginDate.getTime() > endDate.getTime()){
			alert("开始日期不能大于结束日期！");
			return;
		}
	}
	
	if(isUsers == '' || isUsers == null){
		alert("请填写'使用用户类别'!");
		return ;
	}
	
	if(sort == null || sort == ""){
		alert("请填写'排序值'！");
		return ;
	}
	
	
    
    // 上传文件
    var pic_one = document.getElementById("pic_one").files[0]; // js 获取文件对象  
    if(pic_one == null || pic_one == '' || pic_one == undefined){
    	alert("请选择上传文件");
    	return;
    }
    
    var FileController=hostIp+"/homeIcon/save.do"; // 接收上传文件的后台地址   (请求地址)
    // FormData 对象     //可以增加表单数据  
    var form = new FormData();   
//    form.append("isUpload", "1");// 区分是否上传图片
    form.append("title", title);
    form.append("url", url);
    form.append("startTime", financeTime);
    form.append("endTime", financeTimeEnd);
    form.append("sort", sort);
    form.append("titleCode", titleCode);
    
    form.append("pic_one", pic_one); // 上传的文件
    form.append("isH5", isH5); 
    form.append("isUsers", isUsers);
    
//    alert(pic_one);
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
				 
				  window.location.href=hostIpHtml+"/index/views/homeIcon/homeIcon_list.html";
			  }else{
				  alert(jsons.message);
			  }
		  }else{
			  alert("Problem retrieving XML data");
		    }
		}
	}
