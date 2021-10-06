function displayCode(id){
		switch(id){
			case 'system':
				var t = `var \tversion  = 1.0,\r\thttp \t = 'http://',\r\tserver \t = 'ec2-18-232-184-59.compute-1.amazonaws.com',\r\tport \t = ':8777',\r\ttoken \t = '${token}',\r\tsession  = '${session}',\r\tusername = '${username}',\r\tpassword = '${password? `******` : ``}';\n`;
				document.getElementById('system').innerHTML = PR.prettyPrintOne(t);
			break;
			case 'login':
				step = 2;
				var t = `$.ajax({\r\turl: '<span class="highlighted">${http}</span><span class="highlighted">${server}</span>/SASLogon/oauth/token',\r\ttype: 'POST',\r\tasync: false,\r\ttimeout: 15000,\r\tdata: 'grant_type=password&username=<span class="highlighted">${username}</span>&password=<span class="highlighted">${password?`******`:``}</span>',\r\tbeforeSend: function(xhr) {\r\t\txhr.setRequestHeader('Authorization','Basic c2FzLmVjOg==');\r\t},\r\tsuccess: function(response) {\r\t\ttoken = response.access_token;\r\t}\r});\r`;
				document.getElementById('code').innerHTML = PR.prettyPrintOne(t);
				document.getElementById('response').innerHTML = PR.prettyPrintOne(JSON.stringify(result,null,4));
				 $('#step1').slideUp(), $('#step2').show();
			break;
			case 'session':
				step = 3;
				var t = `$.ajax({\r\turl: '<span class="highlighted">${http}</span><span class="highlighted">${server}</span><span class="highlighted">${port}</span>/cas/sessions/',\r\ttype:'POST',\r\tasync: false,\r\ttimeout:15000,\r\tdata:'',\r\tbeforeSend:function(xhr) {\r\t\txhr.setRequestHeader('Authorization', 'bearer <span class="highlighted">${token}</span>');\r\t\txhr.setRequestHeader('Content-Type','application/json');\r\t},\r\tsuccess:function(response) {\r\t\tsession = response.session;\r\t}\r});\r`;
				document.getElementById('code').innerHTML = PR.prettyPrintOne(t);
				document.getElementById('response').innerHTML = PR.prettyPrintOne(JSON.stringify(result,null,4));
				
				$('#step2').slideUp(),$('#step3').show();
			break;
			case '3':
			case 3:
				step = 4;
				var actionName = document.getElementById('act').value;
				var actionScript = document.getElementById('actScript').innerHTML;
				var t = `$.ajax({\r\turl: '<span class="highlighted">${http}</span><span class="highlighted">${server}</span><span class="highlighted">${port}</span>/cas/sessions/<span class="highlighted">${session}</span>/actions/<span class="highlighted">${actionName}</span>',\r\ttype:'POST',\r\tasync: false,\r\ttimeout:15000,\r\tdata:'{${actionScript}}',\r\tbeforeSend:function(xhr) {\r\t\txhr.setRequestHeader('Authorization','bearer <span class="highlighted">${token}</span>');\r\t\txhr.setRequestHeader('Content-Type','application/json');\r\t},\r\tsuccess:function(response) {\r\t\tresult = response;\r\t}\r});\r`;
				document.getElementById('code').innerHTML = PR.prettyPrintOne(t);
				document.getElementById('response').innerHTML = PR.prettyPrintOne(JSON.stringify(result,null,4));
				document.getElementById('act').value = 'image.loadImages';
				document.getElementById('actScript').innerHTML = '"path":"http://ec2-18-232-184-59.compute-1.amazonaws.com:7001/upload/demo01/images/apple.jpg","decode":"False","pathIsList":"False","labelLevels":"-1","recurse":"True","casout":{"caslib":"AI","name":"'+username+'_imgs_ajax","compress":"True","replication":"0","replace":"True"}';
				document.getElementById('actButton').innerHTML = 'Load Images';
				$('#step3').slideDown();
			break;
			case '4':
			case 4:
				step = 5;
				var actionName = document.getElementById('act').value;
				var actionScript = document.getElementById('actScript').innerHTML;
				var t = `$.ajax({\r\turl: '<span class="highlighted">${http}</span><span class="highlighted">${server}</span><span class="highlighted">${port}</span>/cas/sessions/<span class="highlighted">${session}</span>/actions/<span class="highlighted">${actionName}</span>',\r\ttype:'POST',\r\tasync: false,\r\ttimeout:15000,\r\tdata:'{${actionScript}}',\r\tbeforeSend:function(xhr) {\r\t\txhr.setRequestHeader('Authorization','bearer <span class="highlighted">${token}</span>');\r\t\txhr.setRequestHeader('Content-Type','application/json');\r\t},\r\tsuccess:function(response) {\r\t\tresult = response;\r\t}\r});\r`;
				document.getElementById('code').innerHTML = PR.prettyPrintOne(t);
				document.getElementById('response').innerHTML = PR.prettyPrintOne(JSON.stringify(result,null,4));
				document.getElementById('act').value = 'image.processImages';
				document.getElementById('actScript').innerHTML = '"casout":{"caslib":"AI","name":"'+username+'_imgsOut_ajax"},"imageFunctions":[{"functionOptions":{"functiontype":"RESIZE","width":28,"height":28}},{"functionOptions":{"functionType":"SOBEL", "delta":0, "dx":2, "dy":2, "kernelsize":150, "scale":2}}],"table":{"caslib":"AI","name":"'+username+'_imgs_ajax"}';
				document.getElementById('actButton').innerHTML = 'Resize Images';
				$('#step3').slideDown();
			break;
			case '5':
			case 5:
				step = 6;
				var actionName = document.getElementById('act').value;
				var actionScript = document.getElementById('actScript').innerHTML;
				var t = `$.ajax({\r\turl: '<span class="highlighted">${http}</span><span class="highlighted">${server}</span><span class="highlighted">${port}</span>/cas/sessions/<span class="highlighted">${session}</span>/actions/<span class="highlighted">${actionName}</span>',\r\ttype:'POST',\r\tasync: false,\r\ttimeout:15000,\r\tdata:'{${actionScript}}',\r\tbeforeSend:function(xhr) {\r\t\txhr.setRequestHeader('Authorization','bearer <span class="highlighted">${token}</span>');\r\t\txhr.setRequestHeader('Content-Type','application/json');\r\t},\r\tsuccess:function(response) {\r\t\tresult = response;\r\t}\r});\r`;
				document.getElementById('code').innerHTML = PR.prettyPrintOne(t);
				document.getElementById('response').innerHTML = PR.prettyPrintOne(JSON.stringify(result,null,4));
				document.getElementById('act').value = 'image.fetchImages';
				document.getElementById('actScript').innerHTML = '"imageTable":{"caslib":"AI","name":"'+username+'_imgsOut_ajax"}';
				document.getElementById('actButton').innerHTML = 'Fetch Images';
				$('#step3').slideDown();
			break;
			case '6':
			case 6:
				step = 7;
				var actionName = document.getElementById('act').value;
				var actionScript = document.getElementById('actScript').innerHTML;
				var t = `$.ajax({\r\turl: '<span class="highlighted">${http}</span><span class="highlighted">${server}</span><span class="highlighted">${port}</span>/cas/sessions/<span class="highlighted">${session}</span>/actions/<span class="highlighted">${actionName}</span>',\r\ttype:'POST',\r\tasync: false,\r\ttimeout:15000,\r\tdata:'{${actionScript}}',\r\tbeforeSend:function(xhr) {\r\t\txhr.setRequestHeader('Authorization','bearer <span class="highlighted">${token}</span>');\r\t\txhr.setRequestHeader('Content-Type','application/json');\r\t},\r\tsuccess:function(response) {\r\t\tresult = response;\r\t}\r});\r`;
				document.getElementById('code').innerHTML = PR.prettyPrintOne(t);
				document.getElementById('response').innerHTML = PR.prettyPrintOne(JSON.stringify(result,null,4));
				document.getElementById('image_result').innerHTML = '<img src="data:image/jpeg;base64,'+result.results.Images.rows[0][1].data+'" /><br/><br/>';
				document.getElementById('act').value = 'table.dropTable';
				document.getElementById('actScript').innerHTML = '"caslib":"AI","name":"'+username+'_imgsOut_ajax"';
				document.getElementById('actButton').innerHTML = 'Drop Table';
				$('#step3').slideDown();
			break;
			case '7':
			case 7:
				step = 8;
				var actionName = document.getElementById('act').value;
				var actionScript = document.getElementById('actScript').innerHTML;
				var t = `$.ajax({\r\turl: '<span class="highlighted">${http}</span><span class="highlighted">${server}</span><span class="highlighted">${port}</span>/cas/sessions/<span class="highlighted">${session}</span>/actions/<span class="highlighted">${actionName}</span>',\r\ttype:'POST',\r\tasync: false,\r\ttimeout:15000,\r\tdata:'{${actionScript}}',\r\tbeforeSend:function(xhr) {\r\t\txhr.setRequestHeader('Authorization','bearer <span class="highlighted">${token}</span>');\r\t\txhr.setRequestHeader('Content-Type','application/json');\r\t},\r\tsuccess:function(response) {\r\t\tresult = response;\r\t}\r});\r`;
				document.getElementById('code').innerHTML = PR.prettyPrintOne(t);
				document.getElementById('response').innerHTML = PR.prettyPrintOne(JSON.stringify(result,null,4));
				$('#step3').slideUp(),$('#step4').show();
			break;
			case 'dropSession':
				var t = `$.ajax({\r\turl: '<span class="highlighted">${http}</span><span class="highlighted">${server}</span><span class="highlighted">${port}</span>/cas/sessions/<span class="highlighted">${session}</span>/<span class="highlighted">terminate</span>',\r\ttype:'POST',\r\tasync: false,\r\ttimeout:15000,\r\tdata:'',\r\tbeforeSend:function(xhr) {\r\t\txhr.setRequestHeader('Authorization', 'bearer <span class="highlighted">${token}</span>');\r\t\txhr.setRequestHeader('Content-Type','application/json');\r\t},\r\tsuccess:function(response) {\r\t\tsession = response.session;\r\t}\r});\r`;
				document.getElementById('code').innerHTML = PR.prettyPrintOne(t);
				document.getElementById('response').innerHTML = PR.prettyPrintOne(JSON.stringify(result,null,4));
				
				$('#step4').slideUp(),$('#step5').show();
			break;		
			default: console.log('displayCode();');
		}
	}
	window.onbeforeunload = function(){
		cas.dropSession();
	}
	displayCode('system');