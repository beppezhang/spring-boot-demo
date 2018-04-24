function showTablePage(){
	var oTable1= $('#example-4').dataTable( {
			"order": [[ 4, "desc" ]],//跟数组下标一样，第一列从0开始，这里表格初始化时，第5列默认降序
			"bStateSave": true,//保存客户端搜索条件等状态  ,需求需要，不要改动
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


//去掉所有指定特殊字符串
function toTxt(str) { 
var RexStr = /\<|\>|\"|\'|\&/g 
str = str.replace(RexStr, function(MatchStr) { 
   switch (MatchStr) { 
   case "<": 
       return " "; 
       break; 
   case ">": 
       return " "; 
       break; 
   case "\"": 
       return " "; 
       break; 
   case "'": 
       return "'"; 
       break; 
   case "&": 
       return "&"; 
       break; 
   default: 
       break; 
   } 
}) 
return str; 
} 

/**
 * 这里去掉'全选;和‘取消全选’按钮的原因：datatables插件在分页的情况下，全选会默认跳转到第一页，所以这里只提供手动勾选
 * 
// 全选
function checkboxAll(){
//	$("input[name='checkbox']").attr("checked",true);// 全选 
//	$("#checkboxAllFalse_div").show();//显示反选div
//	$("#checkboxAll_div").hide();//隐藏全选div
	$('input:checkbox').each(function() {
	    $(this).prop('checked', true);// 1.6后jqery， 推荐使用prop方法
	});
}

//取消全选
function checkboxAllFalse(){
//	$("input[name='checkbox']").removeAttr("checked");// 取消全选
//	$("input[name='checkbox']").attr("checked", false);// 全选 
//	$("#checkboxAllFalse_div").hide();//隐藏反选div
//	$("#checkboxAll_div").show();//显示全选div
	
	$('input:checkbox').each(function () {
        $(this).prop('checked',false);// 1.6后jqery， 推荐使用prop方法
	});
}
 **/

// 多选框删除
function delAllCheckbox(){
	
	var obj=document.getElementsByName('checkbox1'); //选择所有name="'checkbox1'"的对象，返回数组
	//取到对象数组后，我们来循环检测它是不是被选中 
	var s='';
	for(var i=0; i<obj.length; i++){
		if(obj[i].checked) 
		s+=obj[i].value+',';//如果选中，将value添加到变量s中 
	}
	//那么现在来检测s的值就知道选中的复选框的值了
	if(s=='' || s == null){
		alert('你还没有选择任何内容！');
		return ;
	}
	
	if(confirm("确定删除已勾选的消息？")){
		var url = hostIp+"/information/deleteAll.do";
		
		$.ajax({
			url: url,
			method: 'post',
			dataType: 'json',
			data:{
				deleStr : s
			},
			success:function(data){
				if(data.code == "3001"){
					alert(data.message);
					window.location.href=hostIpHtml+"/index/views/information/information_list.html";
				}else{
					alert(data.message);
				}
			},
			error:function(){
				aalert("请求超时！请重新登陆！");
			}
			
			
		});
	}
	
	
}
 


//查询
function query(url){
	
	var picNums=0;//计算图片数量
	var title=$("#title").val();
	var content=$("#content").val();
	var registerTime=$("#registerTime").val();
	var registerTimeEnd=$("#registerTimeEnd").val();
	
	if(url == null || url==''){// 默认为查询list
		url=hostIp+"/information/list.do";
	}
	//获取datatable对象
	var table=$('#example-4').dataTable();
	if(table){// 因为第2次请求会出现上次的缓存，所以这里一定要
	    table.fnDestroy();
	}
	
	$("#example-4").html("");	
	var text="<table  id='example-4' >" +
			"<thead >" +
			"<tr>" +
				"<th width='70px;'>" +
//				"<div id='checkboxAll_div'><input type='button' value='全选' onclick='checkboxAll()'    class='btn btn-xs btn-default' /></div>" +
//				"<div id='checkboxAllFalse_div'   ><input type='button' value='取消全选'   onclick='checkboxAllFalse();'   class='btn btn-xs btn-default' /></div>" +
				"</th>" +
//				"<th width='90px;'>类型</th>" +
				"<th width='120px;'>昵称</th>" +
				"<th width='120px;'>角色</th>" +
				
				
				"<th width='70px;' >状态</th>" +
				"<th width='150px;'>发表时间</th>" +
				"<th width='200px;'>标题</th>" +
				"<th width='200px;'>描述内容</th>" +
				"<th  >内容</th>" +
				
				"<th width='80px;'>图片数量</th>" +
				"<th width='60px;' >点赞数</th>" +
				"<th width='60px;' >评论数</th>" +
				"<th width='200px;'>操作</th>" +
			"</tr>" +
			"</thead>" +
			"<tbody>"; 
	$.ajax({
		url: url,
		method: 'post',
		dataType: 'json',
		data : {
			title : title,
			content : content,
			registerTime : registerTime,
			registerTimeEnd: registerTimeEnd
		},
		success: function(data){
			
			 $.each(data.list.list, function(k, v) {
				 
				 var htmlContent = toTxt(v.content);// 去掉特殊字符串
//				 alert(toTxt("<>"));
				 var topstr1="";// 置顶文字显示
				 var startTopNumber="";// 置顶状态
//				 alert(v.topState);
				 if(v.topState=="1"){
					 
					 topstr1+="取消置顶";
					 startTopNumber="0";
					 
				 }else{
					 topstr1+="置顶";
					 startTopNumber="1";
				 }
				
				 //计算图片数量
				(v.picOne!=null && v.picOne!='')? ++picNums : picNums;
				(v.picTwo!=null && v.picTwo!='')? ++picNums : picNums;
				(v.picThree!=null && v.picThree!='')? ++picNums : picNums;

				(v.picFour!=null && v.picFour!='')? ++picNums : picNums;
				(v.picFive!=null && v.picFive!='')? ++picNums : picNums;
				(v.picSix!=null && v.picSix!='')? ++picNums : picNums;
				(v.homePic!=null && v.homePic!='')? ++picNums : picNums;
				var types=(v.type == 1 ? "新版" : "旧版");
				text+="<tr>"
					+"<td ><input type='checkbox' name='checkbox1' value='"+v.informationId+"' /></td>"
//					+"<td >"+ types +"</td>"
					+"<td align='center'>"+v.nickname+"</td>"
					+"<td>"+v.userRole+"</td>"
					
					+"<td><a href='javascript:' onclick='updateState(\""+v.informationId+"\",\""+v.state+"\")'>"+v.state +"</a></td>"
					+"<td>"+v.registerTime.substring(0, 19) +"</td>"
					+"<td style='overflow:hidden;white-space:nowrap;text-overflow:ellipsis;width:150px;' ><a href='javascript:' title='"+v.title+"'>"+v.title +"</a></td>"
					+"<td style='overflow:hidden;white-space:nowrap;text-overflow:ellipsis;width:150px;' ><a href='javascript:' title='"+v.describeContent+"'>"+v.describeContent +"</a></td>"
					+"<td  style='overflow:hidden;white-space:nowrap;text-overflow:ellipsis;width:150px;'><a href='javascript:' title='"+htmlContent+"'>"+htmlContent +"</a></td>"
					
					+"<td  >"+picNums+"</td>"
					+"<td>"+v.praiseCounts +"</td>"
					+"<td><a href='"+hostIpHtml+"/index/views/information/information_comment_list.html?informationId="+v.informationId+"&title="+v.title+"'  >" +
							""+v.commentNum +"</a></td>"
							
					+"<td>" 
					+"<div >" 
					+"<div style='float:right;width:33.3%;'><button class='btn btn-xs btn-danger' onclick='deleted(\""+v.informationId+"\")' ><i class='icon-remove'></i>删除 </button></div>" 
					+"<div style='float:right;width:33.3%;'><a href='"+hostIpHtml+"/index/views/information/information_add.html?informationId="+v.informationId+"'  ><i class='icon-pencil'></i>预览</a></div>"
					+"<div style='float:right;width:33.3%;'><input name='' type='button' value='"+topstr1+"' class='btn btn-xs btn-default' onclick='updateTopState(\""+v.informationId+"\", \""+startTopNumber+"\", \""+topstr1+"\")'/></div>"
					+"</div>" 
					+"</td>" 
					+"</tr>"
					picNums=0;// 图片数量，每循环一轮都清零
//				 alert(topstr);
			});  
		},
		complete: function(){
			text+="</tbody></table>";
			$("#example-4").html(text);
			showTablePage();
		}
	});
}


$(function(){
	query("");
})





//删除
function deleted(id){
	if(confirm("确认要删除吗？")){
		var url=hostIp+"/information/delete.do?informationId="+id;
		$.ajax({
			url: url,
			method: 'post',
			dataType: 'json',
			success: function(data){
				if(data.code == "3001"){
					alert(data.message);
					window.location.href=hostIpHtml+"/index/views/information/information_list.html";
				}else{
					alert(data.message);
				}
				
			}
		});
	}
}

//置顶
function updateTopState(id, topState, stateStr){
	if(confirm("确认要"+stateStr+"吗？")){
		var url=hostIp+"/information/updateTopState.do";
		$.ajax({
			url: url,
			method: 'post',
			dataType: 'json',
			data:{
				informationId: id,
				topState: topState
			},
			success: function(data){
//				alert(data);
				if(data.code == "4001"){
//					alert((data.message=="修改成功" ? "操作成功" : "操作失败"));
					alert("操作成功");
					window.location.href=hostIpHtml+"/index/views/information/information_list.html";
				}else{
					alert("操作失败！");
				}
				
			}
		});
	}
}

//修改状态
function updateState(id, state){
	var stateStr=(state=="开启"?"关闭":"开启");
	if(confirm("确认要"+stateStr+"吗?")){
		var stateMsg=stateStr;
		stateStr=(state=="开启"?0:1);
		var url=hostIp+"/information/updateState.do?informationId="+id+"&state="+stateStr;
		$.ajax({
			url: url,
			method: 'post',
			dataType: 'json',
			success: function(data){
//				alert(data);
				if(data.code == "4001"){
					alert((data.message=="修改成功" ? stateMsg+"成功" : stateMsg+"失败"));
					window.location.href=hostIpHtml+"/index/views/information/information_list.html";
				}else{
					alert(stateMsg+"失败");
				}
				
			}
		});
	}
}

 