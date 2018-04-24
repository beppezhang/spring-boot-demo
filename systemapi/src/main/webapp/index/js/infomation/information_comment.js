function showTablePage(){
	var oTable1= $('#example-4').dataTable( {
			"order": [[ 4, "desc" ]],//跟数组下标一样，第一列从0开始，这里表格初始化时，第4列默认降序
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
var title="",informationId="";
$(function(){
	var fatherContent=getQueryString("fatherContent");//获取id
	$("#fatherContent").html(decodeURIComponent(fatherContent));
	title=getQueryString("title");//获取id
	informationId=getQueryString("informationId");//获取id
})

// 返回
function historysGo(){
	window.location.href=hostIpHtml+""+"/index/views/information/information_comment_list.html?informationId="+informationId+"&title="+decodeURIComponent(title)+"";
}

//发帖子
function save(){
 
	//var informationId=getQueryString("informationId");//获取id
	var informationCommentId=getQueryString("informationCommentId");//获取id
	var postmanId=getQueryString("postmanId");//获取id
	var commentContent=$("#commentContent").val();// 内容
	if(commentContent == null || commentContent==''){
		alert("请填写评论内容！");
		return;
	}
	 
	//alert(sort);
 
	var url= hostIp+"/informationComment/saveInformationReplyComment.do";
	$.ajax({
		url: url,
		method: 'post',
		dataType: 'json',
		data: {
			informationId:informationId,		 
			commentContent:commentContent,
			informationCommentId:informationCommentId,
			postmanId:postmanId
		},
		success: function(data){
			if(data.code == "200"){
				alert(data.message);
				window.location.href=hostIpHtml+""+"/index/views/information/information_comment_list.html?informationId="+informationId+"&title="+decodeURIComponent(title)+"";
			}else{
				alert(data.message);
			}
			
		}
	});
}  

 
 
 