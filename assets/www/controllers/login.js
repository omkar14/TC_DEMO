var sch = new school();
var log = new login();
var cl = new _class();
var tst = new test();
var teach = new teacher();
var stu = new student();
var que = new question();
var mar = new marks();
var ski = new skill();
var stu_ski = new student_skill();
var para = new parameter();
var fat = new fa_task();
var task = new task_list();
var topics = new topic();
var stu_task = new student_task();
var fatest = new fa_test();
var que_mark = new question_marker();
var que_top = new que_topic();
var que_typ = new que_type();
var que_skl = new que_skill();

/* create all tables
 * 
 */
function load() {
	document.addEventListener("deviceready", ready, false);
/*	var db = window.openDatabase("Database", "1.0", "LOUT", 20000000);
	db.transaction(function(tx){tx.executeSql("Drop table task_list;");});*/
	
	if(localStorage.getItem('username') !== null && localStorage.getItem('password') !== null){
		document.getElementById('user').value = localStorage.getItem('username');
		document.getElementById('pass').value = localStorage.getItem('password');
	}
	
	sch.create();
	cl.create();	
	tst.create();	
	log.create();	
	teach.create();	
	stu.create();	
	que.create();	
	mar.create();	
	ski.create();	
	stu_ski.create();
	para.create();
	fat.create();
	task.create();
	topics.create();
	stu_task.create();
	fatest.create();
	que_mark.create();
	que_top.create();
	que_typ.create();
	que_skl.create();
	
	log.remove("name='admin'");
	log.insert('admin', 'changeme', 'admin', 'common');
}
/**
 * Enable back button and call back function when it is pressed.
 */
function ready() {
	document.addEventListener("backbutton", back, false);
}
/*
 * Call querydb function
 */
function verify() {
	
	if(document.getElementById('save').checked == true){
		localStorage.setItem('username',document.getElementById('user').value);
		localStorage.setItem('password',document.getElementById('pass').value);
	}
	
	document.getElementById("error").innerHTML = '';
	queryDB();
}
/**
 * Check for login credentials. If correct, redirect to selection page if teacher after storing data, else to admin page 
 */
function queryDB() {
	log.search( "name='" + document.getElementById("user").value + "' and pwd='" + document.getElementById("pass").value + "'",'*', function (results) {
		
		if (results.length > 0) {
			window.localStorage.setItem('teacher', results.item(0).id);
			window.localStorage.setItem('role', results.item(0).role);
			sch.search('name="' + results.item(0).school_id + '"','*',function (results) {
				if (results.length > 0) {
					window.localStorage.setItem('school_id', results.item(0).id);
					window.localStorage.setItem('school', results.item(0).name);
				}
			});
			if (results.item(0).role == 'Teacher') 
				window.location = "inter.html";
			else 
				window.location = "admin.html"
		}
		else {
			document.getElementById("error").innerHTML = document.getElementById("error").innerHTML + "Incorrect username or password";
			document.getElementById("user").value = "";
			document.getElementById("pass").value = "";
		}
	});
}
/**
 * Exit app.
 */
function back() {
	navigator.app.exitApp();
}