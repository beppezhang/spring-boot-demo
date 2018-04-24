$(function(){
			var informationId=getQueryString("informationId");//获取id
			var type=getQueryString("type");//1：新版，2：旧版
			$("#type_id").val(type);// 放到隐藏域
			if(type == "2"){// 旧版
				$("#describeContent_div").hide();// 描述内容隐藏
				$("#homePic_id").hide();// 首页展示图片隐藏
			}
			if(informationId != null || informationId !=""){
				$.ajax({
					url :  hostIp+"/information/Find.do",
					method : 'post',
					dataType : 'json',
					data : {
						informationId : informationId
					},
					success : function(data) {
						$("#informationId").val(data.list.beginnersObject.informationId);
						$("#title").val(data.list.beginnersObject.title);
						$("#contentType").val(data.list.beginnersObject.contentType);

						//6个图片
						$("#pic_one_img").attr("src",data.list.beginnersObject.picOne);
						 $("#pic_two_img").attr("src",data.list.beginnersObject.picTwo);
						 $("#pic_three_img").attr("src",data.list.beginnersObject.picThree);
						 //
						 $("#pic_four_img").attr("src",data.list.beginnersObject.picFour);
						 $("#pic_five_img").attr("src",data.list.beginnersObject.picFive);
						 $("#pic_six_img").attr("src",data.list.beginnersObject.picSix);

						$("#type_id").val(data.list.beginnersObject.type);
						/*if(data.list.beginnersObject.type == "2"){// 旧版
						 $("#describeContent_div").hide();// 描述内容隐藏
						 $("#homePic_id").hide();// 首页展示图片隐藏
						 }*/
						$("#describeContent").val(data.list.beginnersObject.describeContent);
						$("#homePic_img").attr("src",data.list.beginnersObject.homePic);


						$("#tempContent").val(data.list.beginnersObject.content);// 需要先赋值给页面的隐藏域里，然后在富文本初始化的时候，回显已保存的内容
						myEditor.ready(function(){   //启动富文本编辑前，提前加载
							myEditor.setContent($("#tempContent").val());
						});
					}
				});
			}
	});

// 返回
function historysGo(){
	window.location.href=hostIpHtml+"/index/views/information/information_list.html";
}


// 保存数据并且保存图片
function UpladFile() {  
	
    //表单参数值
    var informationId=$("#informationId").val();
	var title=$("#title").val();// 标题
	var contentType=$("#contentType").val();// 文章类型
	
	var content=myEditor.getContent();// 内容
	var type=$("#type_id").val();// 1：新版，2：旧版
	var describeContent = $.trim($("#describeContent").val());// 描述内容
	
	var homePic2 = document.getElementById("homePic").files[0]; // 首页展示图片
	var homePic_check= (homePic2==null || homePic2 == '' || homePic2=='undefined');// 首页展示图片
	if(title == null || title==''){
		alert("请填写标题！");
		return;
	}
	if(contentType == null || contentType == ''){
		alert("请选择消息类型！");
		return;
	}
	if(content == null || content == ''){
		alert("请填写内容类型！");
		return;
	}
	
	
	
	if(type == '1'  ){
		if((describeContent == '' || describeContent == null)){
			alert("请填写描述内容！");
			return;
		}
		
		if(homePic_check && (informationId == null || informationId == '')){ // 新增时，必须上传图片
    		alert("请上传'首页展示图片'!");
    		return ;
    	}
	}
    
    // 上传文件
    var pic_one = document.getElementById("pic_one").files[0]; // js 获取文件对象
    var pic_two = document.getElementById("pic_two").files[0]; // js 获取文件对象  
    var pic_three = document.getElementById("pic_three").files[0]; // js 获取文件对象  
    
    var pic_four = document.getElementById("pic_four").files[0]; // js 获取文件对象  
    var pic_five = document.getElementById("pic_five").files[0]; // js 获取文件对象  
    var pic_six = document.getElementById("pic_six").files[0]; // js 获取文件对象
    
    
    var pic_one_check= (pic_one==null || pic_one == '' || pic_one=='undefined');
    var pic_two_check= (pic_two==null || pic_two == '' || pic_two=='undefined');
    var pic_three_check= (pic_three==null || pic_three == '' || pic_three=='undefined');
    
    var pic_four_check= (pic_four==null || pic_four == '' || pic_four=='undefined');
    var pic_five_check= (pic_five==null || pic_five == '' || pic_five=='undefined');
    var pic_six_check= (pic_six==null || pic_six == '' || pic_six=='undefined');
    
 
    if((informationId == null || informationId == '') && type == '2'){// 旧版，在6张图片中必须选一张，否则APP首页展示不好看，新版就没这个限制
    	
	    if(pic_one_check && pic_two_check && pic_three_check && pic_four_check && pic_five_check && pic_six_check){
	    	alert("请至少上传一张图片！");
	    	return;
	    }
    }
    
    
    
    var FileController=hostIp+"/information/save.do"; // 接收上传文件的后台地址   (请求地址)
    // FormData 对象     //可以增加表单数据  
    var form = new FormData(); 
    form.append("homePic2", homePic2); // 首页展示图片
//    form.append("isUpload", "1");// 区分是否上传图片
    form.append("informationId", informationId);
    form.append("title", title);
    form.append("contentType", contentType);
    form.append("content", content);
    
    form.append("pic_one", pic_one); // 上传的文件
    form.append("pic_two", pic_two);
    form.append("pic_three", pic_three);

    form.append("pic_four", pic_four);
    form.append("pic_five", pic_five);
    form.append("pic_six", pic_six);
    
   
    
    form.append("type", type);// 1:新版，2：旧版
    form.append("describeContent", describeContent);// 描述内容
    
    
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

// xmlhttprequest 返回状态
function sendata(){
	if (xmlhttp.readyState==4){
		// 4 = "loaded"
//		alert("加载中...");
		$("#button_save").attr("disabled", "disabled");// 提交状态，按钮不可用
	  if (xmlhttp.status==200){ //200 = OK
		  var jsons=JSON.parse(xmlhttp.responseText);// 返回的字符串转换成json格式
		  if(jsons.code == "4001" || jsons.code == "2001"){
			  $("#button_save").attr("disabled", "disabled");// 提交状态，按钮不可用
			  alert(jsons.message);
			  window.location.href=hostIpHtml+"/index/views/information/information_list.html";
		  }else{
			  alert(jsons.message);
			  $("#button_save").removeAttr("disabled");// 提交状态，按钮可用
		  }
	  }else{
		  alert("Problem retrieving XML data");
		  $("#button_save").removeAttr("disabled");// 提交状态，按钮可用
	    }
	}
}



  
