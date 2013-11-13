/*var db = window.openDatabase("Database", "1.0", "LOUT", 20000000);
var task_li = new task_list();
var stud_task = new student_task();
var cho_subject = window.localStorage.getItem('subject');
var cho_standard = window.localStorage.getItem('standard');
var cho_term = window.localStorage.getItem('term');
var cho_test = window.localStorage.getItem('test');
var cho_school = window.localStorage.getItem('school_id');
var cho_class = window.localStorage.getItem('class');
var _class = window.localStorage.getItem('class_id');
var test_id = window.localStorage.getItem('test_id');
var cho_task_id = window.localStorage.getItem('task_id');
var fat = new fa_task();
var para = new parameter();
var topics = new topic();
var max_id = 0;
var id = '';*/

/*
 * fetch basic info of class, term, etc. Display divs of add new task and report
 * if task is in edit mode. Fetch parameters and topics and task if it is
 * already saved or in edit mode.
 */
function load() {
	document.addEventListener("deviceready", ready, false);

	fetch_info();
	if (localStorage.getItem("form_edit") == "1") {
		prefetch();
		$('#after_save').show();
	} else {
		task_fetch(null);
		topic_fetch(null);
	}
}

/*
 * fetch basic info from local storage.
 */
/*function fetch_info() {
	$('#cho_term').html(cho_term);
	$('#cho_test').html(cho_test);
	$('#cho_class').html(cho_class);
	$('#cho_subject').html(cho_subject);
	if (localStorage.getItem("form_edit") == "1") {
		fat.search('id="' + cho_task_id + '"', 'name', function(results) {
			if (results.length > 0)
				$('#cho_task').html("Task-" + results.item(0).name);
		});
	} else
		$('#cho_task').html("New Task");
}*/
/**
 * Enable back button and call back function when it is pressed.
 */
/*function ready() {
	document.addEventListener("backbutton", back, false);
}*/
/**
 * Send it back to selection page.
 */
/*function back() {
	window.location = "index.html";
}*/
/*
 * Display sql error
 */
function errorCB(err) {
	alert(err.message);
}

/*
 * Fetch list of tasks in dropdown
 */
function task_fetch(name) {
	document.getElementById('task').innerHTML = '';
	if (name == null)
		document.getElementById('task').innerHTML = '<option value="-1" selected>Select Task</option>';

	task_li.search("subject='" + cho_subject + "'", "name", function(results) {

		for ( var i = 0; i < results.length; i++) {
			if (name == results.item(i).name)
				document.getElementById('task').innerHTML += "<option value='" + results.item(i).name + "' selected>" + results.item(i).name + "</option>";
			else
				document.getElementById('task').innerHTML += "<option value='" + results.item(i).name + "'>" + results.item(i).name + "</option>";
		}
		document.getElementById('task').innerHTML += '<option value="-2">+ Add New</option>';
	});

}

/*
 * Fetch list of parameters in dropdown
 */
function para_fetch() {
	//document.getElementById('para_list').innerHTML = '';
	console.log("Its a Next Page::::::::::::::::::::::::","");
	document.writeln(" Apple \n Banana \n Orange \n Pine-Apple");
	/*document.writeln("Banana");
	document.writeln("Orange");
	document.writeln("Pine-Apple");*/
	/*if (tas != '-1' && tas != 2)
			$.pageslide({
				direction : 'right',
				href : 'target.html'
			});*/
		/*else
			alert('Please select task');
			$.pageslide.close();*/
			
	/*para.search("task='" + document.getElementById('task').value + "'", "name", function(results) {

		for ( var i = 0; i < results.length; i++) {
			document.getElementById('para_list').innerHTML += '<tr><td ontouchend="para_del(\'' + results.item(i).name + '\')" style="width:10%"><button style="float:left;background-color:#333;margin:0;padding:0" ><img src="../images/list-remove.png" width="34" height="34"></button></td><td  ontouchend="add(\'' + results.item(i).name + '\');">' + results.item(i).name + '</td></tr>';
		}
		document.getElementById('para_list').innerHTML += '<tr><td colspan="2"><button ontouchstart="add_para();" style="margin-top:20px;background-color: #8cb942; width:100%;float: left">Add</button></td></tr>';
		var tas = document.getElementById('task').value;
		if (tas != '-1' && tas != 2)
			$.pageslide({
				direction : 'right',
				href : '#modal'
			});
		else
			alert('Please select task');
			$.pageslide.close();
	});*/
}

/*
 * Fetch list of topic in dropdown
 */
function topic_fetch(name) {
	document.getElementById('topic').innerHTML = '';
	if (name == null)
		document.getElementById('topic').innerHTML = '<option value="-1" selected>Select Topic</option>';
	topics.search("subject='" + cho_subject + "' AND class_id='" + _class + "' and term='" + cho_term + "'", "name", function(results) {

		for ( var i = 0; i < results.length; i++) {
			if (name == results.item(i).name)
				document.getElementById('topic').innerHTML += '<option value="' + results.item(i).name + '" selected>' + results.item(i).name + '</option>';
			else
				document.getElementById('topic').innerHTML += '<option value="' + results.item(i).name + '" >' + results.item(i).name + '</option>';
		}
		document.getElementById('topic').innerHTML += '<option value="-2">+ Add New</option>';
	});
}

/*
 * Fetch list of tasks in dropdown
 */
function task_add() {
	var name = prompt("Please Enter Task Name");
	if (name !== "" && name !== " " && name !== null) {
		task_li.search("subject='" + cho_subject + "' and name='" + name + "'", 'COUNT(*) as tot', function(results) {
			if (parseInt(results.item(0).tot) === 0) {
				task_li.insert(cho_subject, name);
				task_fetch(null);
			} else {
				alert("Entry already exists!");
			}
		});
	}
}

/*
 * prompt from user for parameter and save it. Add it to selected parameter
 * table. Fetch list again.
 */
function add_para() {
	var name = prompt("Please Enter Parameter Name");
	var task = document.getElementById('task').value;
	if (name !== "" && name !== " " && name !== null) {
		para.search("task='" + task + "' and name='" + name + "'", "COUNT(*) as tot", function(results) {
			if (parseInt(results.item(0).tot) === 0) {
				para.insert(task, name);
				document.getElementById('para_list').innerHTML += '<tr><td ontouchend="para_del(\'' + name + '\')" style="width:10%"><button style="float:left;background-color:#333;margin:0;padding:0" ><img src="../images/list-remove.png" width="34" height="34"></button></td><td ontouchstart="add(\'' + name + '\');">' + name + '</td></tr>';
				add(name);
			} else {
				alert("Entry already exists!");
			}
		});
	}
	para_fetch();
	$.pageslide.close();
	$.pageslide();
}

/*
 * prompt for new topic name, save it and fetch list.
 */
function add_topic() {
	var name = prompt("Please Enter Topic Name");
	if (name !== "" && name !== " " && name !== null) {
		topics.search("subject='" + cho_subject + "' and name='" + name + "' and class_id='" + _class + "'", "COUNT(*) as tot", function(results) {
			if (parseInt(results.item(0).tot) === 0) {
				topics.insert(cho_term, _class, cho_subject, name, cho_school);
				topic_fetch(null);
				document.getElementById('topic').selectedIndex = document.getElementById('topic').options.length - 1;
			} else {
				alert("Entry already exists!");
			}
		});
	}
}

/*
 * Add selected parameter from pane to table.
 */
function add(name) {
	if ($('#sel tr').length >= 10) {
		alert("Only 10 parameters allowed");
		return;
	}
	
	name1 = name.replace(/[^a-zA-Z 0-9]+/g, '').replace(/\s+/g, "");
	console.log(name1);
	if ($('#' + name1).length === 0) {
		var inner = "<tr id='" + name1 + "' style='height:45px;'>" + "<td ontouchstart='js:if(confirm(\"Do you want to remove this parameter?\")){ var elem = $(\"#" + name1 + "\").remove();tot();}'><img src='../images/list-remove.png' width='34' height='34'></td>" + "<td style='font-size:20px'>" + name + "</td>" + "<td ontouchend='dec(\"#" + name1 + "_val\");' style='width:70px;text-align:left;'><img src='../images/sub.png' width='30' style='background-color: #00c8c8; border-radius: 40px'></td>" + "<td><input type='number' value='0' id='" + name1 + "_val' onkeyup='validate(\"" + name1 + "_val\");'></td>" + "<td ontouchend='inc(\"#" + name1 + "_val\");' style='width:70px;text-align:right;'><img src='../images/new.png' width='30' style='background-color: #00c8c8; border-radius: 40px'></td></tr>";
		
		document.getElementById('sel').innerHTML += inner;
	} else
		alert("Element already exists!");
}

/*
 * Save the task to database.
 */
function submit() {
	var topics = document.getElementById('topic').value;
	var tasks = document.getElementById('task').value;

	if (tasks == "-1" || tasks == "-2") {
		alert("Please Select Task");
		return;
	}
	if ($('#sel tr').length == 0) {
		alert('No Parameters Provided!');
		return;
	}
	var i = 0;
	var para = new Array();
	var para_m = new Array();
	var flag = 0;
	$('#sel tr').each(function() {
		var $tds = $(this).find('td');
		if ($tds.length != 0) {
			para[i] = $tds.eq(1).html();
			para_m[i++] = $tds.eq(3).children('input').val();
			if ($tds.eq(3).children('input').val() == "0") {
				flag++;
			}

		}
	});
	if (flag > 0) {
		alert(flag + " entries have 0 marks. Cannot save.")
		return;
	}
	for (i; i < 10; i++) {
		para[i] = "-";
		para_m[i] = "-1"
	}
	var proc = document.getElementById('proc').innerHTML;
	var comment = document.getElementById('comment').checked;

	if (localStorage.getItem('form_edit') == "1") {
		if (!confirm("Altering task will delete data of marks which you filled for this task. Do you want to continue?"))
			return;
		fat.remove('id="' + id + '"');
		stud_task.remove('task_id="' + id + '"');
	}

	fat.search("subject='" + cho_subject + "' AND school_id='" + cho_school + "' AND class='" + _class + "' AND term='" + cho_term + "' AND test_id='" + test_id + "'", 'MAX(name) as max', function(results) {
		if (max_id == 0)
			max_id = (parseInt(results.item(0).max) + 1) || 1;
		fat.insert(max_id, para[0], para_m[0], para[1], para_m[1], para[2], para_m[2], para[3], para_m[3], para[4], para_m[4], para[5], para_m[5], para[6], para_m[6], para[7], para_m[7], para[8], para_m[8], para[9], para_m[9], proc, comment, cho_subject, cho_school, _class, topics, tasks, cho_term, test_id);
		alert("Task Saved");
		fat.search('dt=(SELECT MAX(dt) from fa_task)', 'id', function(results) {
			localStorage.setItem('task_id', results.item(0).id);
			cho_task_id = results.item(0).id;
			localStorage.setItem("form_edit", "1");
			fetch_info();
			$('#after_save').show();
		});
	});
}

/*
 * Redirect to student_fa after task is saved.
 */
function redire() {
	var topics = document.getElementById('topic').value;
	var tasks = document.getElementById('task').value;
	if (localStorage.getItem('form_edit') == "1") {
		window.location = 'student_fa.html';
		return;
	}
	fat.search("subject='" + cho_subject + "' AND school_id='" + cho_school + "' AND class='" + _class + "' AND topic='" + topics + "' AND task='" + tasks + "' AND term='" + cho_term + "' AND test_id='" + test_id + "'", 'id', function(results) {
		if (results.length > 0) {
			window.localStorage.setItem('task_id', results.item(0).id);
			window.location = 'student_fa.html';
		} else {
			alert('Task not saved!');
		}
	});
}

/*
 * validate numeric field for decimal points
 */
function validate(name) {
	if (document.getElementById(name).value.indexOf("0") == 0 && document.getElementById(name).value.length > 1 && document.getElementById(name).value.indexOf(".") == -1)
		document.getElementById(name).value = document.getElementById(name).value.substring(1, document.getElementById(name).value.length);

	if (document.getElementById(name).value == "")
		document.getElementById(name).value = "0";

	if (document.getElementById(name).value.length - document.getElementById(name).value.indexOf(".") > 3 && document.getElementById(name).value.indexOf(".") != -1)
		document.getElementById(name).value = document.getElementById(name).value.substring(0, document.getElementById(name).value.length - 1);
	$('#'+name).attr('value',$('#'+name).val());
	tot();
}

/*
 * Prefetch data from db if task is in edit mode.
 */
function prefetch() {
	fat.search("id='" + window.localStorage.getItem("task_id") + "'", "*", function(results) {
		if (results.length > 0) {
			var para = new Array();
			var para_m = new Array();
			para[0] = results.item(0).para1;
			para_m[0] = results.item(0).para1_m;
			para[1] = results.item(0).para2;
			para_m[1] = results.item(0).para2_m;
			para[2] = results.item(0).para3;
			para_m[2] = results.item(0).para3_m;
			para[3] = results.item(0).para4;
			para_m[3] = results.item(0).para4_m;
			para[4] = results.item(0).para5;
			para_m[4] = results.item(0).para5_m;
			para[5] = results.item(0).para6;
			para_m[5] = results.item(0).para6_m;
			para[6] = results.item(0).para7;
			para_m[6] = results.item(0).para7_m;
			para[7] = results.item(0).para8;
			para_m[7] = results.item(0).para8_m;
			para[8] = results.item(0).para9;
			para_m[8] = results.item(0).para9_m;
			para[9] = results.item(0).para10;
			para_m[9] = results.item(0).para10_m;

			for ( var i = 0; i < 10; i++) {
				if (para[i] != "-") {
					var name1 = para[i].replace(/[^a-zA-Z 0-9]+/g, '').replace(/\s+/g, "");
					var name = para[i];
					document.getElementById('sel').innerHTML += "<tr id='" + name1 + "' style='height:45px;'>" + "<td ontouchstart='js:if(confirm(\"Do you want to remove this parameter?\")){ var elem = $(\"#" + name1 + "\").remove();tot();}'><img src='../images/list-remove.png' width='34' height='34'></td>" + "<td style='font-size:20px'>" + name + "</td>" + "<td ontouchend='dec(\"#" + name1 + "_val\");' style='width:70px;text-align:left;'><img src='../images/sub.png' width='30' style='background-color: #00c8c8; border-radius: 40px'></td>" + "<td><input type='number' value='" + para_m[i] + "' id='" + name1 + "_val' onkeyup='validate(\"" + name1 + "_val\");'></td>" + "<td ontouchend='inc(\"#" + name1 + "_val\");' style='width:70px;text-align:right;'><img src='../images/new.png' width='30' style='background-color: #00c8c8; border-radius: 40px'></td></tr>";
				}
			}
			max_id = parseInt(results.item(0).name);
			id = results.item(0).id;
			document.getElementById('proc').value = results.item(0).proc;
			if (results.item(0).comment == "true")
				document.getElementById('comment').checked = true;
			task_fetch(results.item(0).task);
			topic_fetch(results.item(0).topic);
			tot();
		}
	});
}

/*
 * Prompt for procedure name and save it in div.
 */
function proc() {
	var procedure = prompt("Enter Procedure Name", document.getElementById('proc').innerHTML);
	if (procedure == "" || procedure == " " || procedure == null)
		return;
	else
		document.getElementById('proc').innerHTML = procedure;
}

/*
 * Decrement value in input field.
 */
function dec(name) {
	if (parseFloat($(name).val()) - 1 < 0) {
		$(name).val("0");
		$(name).attr('value',$(name).val());
		tot();
		return;
	}
	$(name).val(parseFloat($(name).val()) - 1);
	$(name).attr('value',$(name).val());
	tot();
}
/*
 * Decrement value in input field.
 */
function inc(name) {
	$(name).val(parseFloat($(name).val()) + 1);
	$(name).attr('value',$(name).val());
	tot();
}

/*
 * get total.
 */
function tot() {
	var count = 0;
	var inputs = document.getElementById('sel').getElementsByTagName('input');
	for ( var i = 0; i < inputs.length; i++) {
		count += parseFloat(inputs[i].value);
	}
	count = Math.round(count * 100) / 100;
	document.getElementById('total_marks').innerHTML = count;
}

/*
 * Delete parameter after confirmation
 */
function para_del(name) {
	if (confirm("Do you want to delete this parameter?")) {
		para.remove("task='" + document.getElementById('task').value + "' and name='" + name + "'");
		para_fetch();
		$('#' + name.replace(/[^a-zA-Z 0-9]+/g, '').replace(/\s+/g, "")).remove();
		tot();
	}
}

/*
 * If new topic to be added, call add_topic
 */
function topic_selected() {
	if ($('#topic').val() == "-2") {
		add_topic();
	}
}

/*
 * If new task to be added, call add_task
 */
function task_selected() {
	if ($('#task').val() == "-2") {
		task_add();
	} else {
		$('#sel').html('');
		document.getElementById('total_marks').innerHTML = "0";
	}
}