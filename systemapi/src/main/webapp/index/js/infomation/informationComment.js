function showTablePage(){
	var oTable1= $('#example-4').dataTable( {
			"order": [[ 3, "desc" ]],//跟数组下标一样，第一列从0开始，这里表格初始化时，第四列默认降序
			"bStateSave": true,//保存客户端搜索条件等状态  
			"sPaginationType": "full_numbers",//出现首页、尾页  
			"bAutoWidth": false,
			"bLengthChange": true, 
            "bDestroy":true,
            "bRetrieve": true,
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

$(function(){
	query();
})

  

//修改状态
function updateState(informationCommentId, state, informationId){
	var stateStr=(state=="开启"?"关闭":"开启");
	if(confirm("确认要"+stateStr+"吗?")){
		var stateMsg=stateStr;
		stateStr=(state=="开启"?0:1);
		var url=hostIp+"/informationComment/updateState.do";
		$.ajax({
			url: url,
			method: 'post',
			dataType: 'json',
			data: {
				informationCommentId: informationCommentId,
				state: stateStr,
				informationId: informationId
			},
			success: function(data){
//				alert(data);
				if(data.code == "4001"){
					alert((data.message=="修改成功" ? stateMsg+"成功" : stateMsg+"失败"));
					window.location.href=hostIpHtml+"/index/views/information/information_comment_list.html?informationId="+informationId+"&title="+title;
				}else{
					alert(stateMsg+"失败");
				}
				
			}
		});
	}
}
 
// 返回
function historysGo(){
	window.location.href=hostIpHtml+"/index/views/information/information_list.html";
}

var title="";
//查询
function query(){
	var informationId=getQueryString("informationId");//获取id
	title=getQueryString("title");//获取id
	$("#commentTitle").html(decodeURIComponent(title));
	var nickname=$("#nickname").val();
	var url=hostIp+"/informationComment/list.do?currentPage=1";
	//获取datatable对象
	var table=$('#example-4').dataTable();
	if(table){// 因为第2次请求会出现上次的缓存，所以这里一定要
	    table.fnDestroy();
	}
	
	$("#tab").html("");	
	var  text=
	"<table class='table table-bordered table-striped' id='example-4'>"
	+"<thead><tr><th class='no-sorting' style='width: 240px;' >用户昵称</th>"
	+"<th style='width: 240px;'>用户角色</th><th >内容   &nbsp;&nbsp;&nbsp;</th>"
	+"<th style='width: 240px;'>回复对象</th><th >被回复内容</th>"
	+"<th class='no-sorting' width='180px;' >发表时间</th><th class='no-sorting' width='100px;' >状态</th><th class='no-sorting' width='100px;' >操作</th>"
	+"</thead><tbody>";
	$.ajax({
		url: url,
		method: 'post',
		dataType: 'json',
		data:{
			informationId: informationId,
			nickname: nickname
		},
		success: function(data){
			 $.each(data.data.data, function(k, v) {
				var userRole=(v.userRole.length > 0 ? v.userRole : "普通用户");
				text+="<tr>"
						+"<td>"+v.nickname+"</td>"
						+"<td>"+userRole+"</td>"
//						+"<td>"+v.commentContent +"</td>"
						+"<td  style='overflow:hidden;white-space:nowrap;text-overflow:ellipsis;width:200px;'><a href='javascript:' title='"+v.commentContent+"'>"+v.commentContent +"</a></td>"
						+"<td>"+v.replyNickname+"</td>"
						+"<td  style='overflow:hidden;white-space:nowrap;text-overflow:ellipsis;width:200px;'><a href='javascript:' title='"+v.fatherContent+"'>"+v.fatherContent +"</a></td>"
						+"<td>"+v.createTime.substring(0,19) +"</td>"
						+"<td><a href='javascript:' onclick='updateState(\""+v.informationCommentId+"\",\""+v.state+"\", \""+v.informationId+"\")'>"+v.state +"</a></td>"
						+"<td><div style='float:left;width:33%;'><a href='"+hostIpHtml+"/index/views/information/information_comment.html?informationCommentId="+v.informationCommentId+"&informationId="+v.informationId+"&postmanId="+v.postmanId+"&fatherContent="+v.commentContent+"&title="+decodeURIComponent(title)+"'  ><i class=''></i>回复</a></div></td>"
						+"</tr>"
			});  
		},
		complete: function(XMLHttpRequest, textStatus){
			text+="</tbody></table>";
			$("#tab").html(text);
			showTablePage();
		}
	});
	
}

/// 以键值对的方式读取URL字符串
/// 例如 http://192.168.1.211/JcySoft6.0_changzhi/Vacation.htm?id=1&action=add
function getQueryString(key)
{
var value = "";
///获取当前页面的URL
var sURL = window.document.URL;        
///URL中是否包含查询字符串
if (sURL.indexOf("?") > 0)
{
  //分解URL,第二的元素为完整的查询字符串
  //即arrayParams[1]的值为【id=1&action=2】
  var arrayParams = sURL.split("?");
  //分解查询字符串
  //arrayURLParams[0]的值为【id=1 】
  //arrayURLParams[2]的值为【action=add】
  var arrayURLParams = arrayParams[1].split("&");

  //遍历分解后的键值对
  for (var i = 0; i < arrayURLParams.length; i++)
  {
//分解一个键值对
var sParam = arrayURLParams[i].split("=");
if ((sParam[0] == key) && (sParam[1] != ""))
{
   //找到匹配的的键,且值不为空
   value = sParam[1];
   break;
}
  }
}
return value;
}

//保存
function saves(){
var informationId=$("#informationId").val();
var title=$("#title").val();
var contentType=$("#contentType").val();
var content=$("#content").val();
var url=hostIp+"/information/save.do";
$.ajax({
	url: url,
	method: 'post',
	dataType: 'json',
	data:{title:""+$.trim($("[name='title']").val())+"", 
		contentType:""+$("[name='contentType']").val()+"",
		informationId:""+$("[name='informationId']").val()+"",
		content:""+$("[name='content']").val()+""
		},
	success: function(data){
		if(data.code == "200"){
			alert(data.message);
			window.location.href=hostIpHtml+"/pages/index/information_list.html";
		}else{
			alert(data.message);
		}
		
	}
});
} 

	
