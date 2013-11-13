var db = window.openDatabase("Database", "1.0", "LOUT", 20000000);
var arr = new Array();
var chang = 0;
var student_count = 0;
var alert_flag = 0;

//Prompt user to save changes if he's moving without save
$(document).ready(function () {
    var countryVal;
    $("select").change(function () {
        var newVal = $(this).val();
        if (alert_flag == 0 && chang == 1) {
            if (!confirm("Do you want to proceed without saving changes?")) {
                alert_flag = 1;
                $(this).mobiscroll('setValue', [countryVal], true); //set back
                return; //abort!
            } else {
                chang = 0;
                indi();
            }
        }
        if (chang == 0) indi();
        alert_flag = 0;
        
        countryVal = newVal; //store new value for next time
    });
});

/* 
 * Enable back button press
 */
function ready() {
    document.addEventListener("backbutton", back, false);
}

/*
 * Redirect to selection page
 */
function back() {
    window.location = 'index.html';
}

/*
 * Fetch list of students and skills into dropdown and convert it to mobilscroller. If no skill is found, return to previous menu 
 */
function load() {
    /*document.getElementById('skill').innerHTML = '<option value="-1" disabled> Select a skill </option>';
    document.addEventListener("deviceready", ready, false);*/
   

   /* $('#skill').mobiscroll().select({
                    theme: 'android-ics',
                    display: 'inline',
                    inputClass: 'i-txt',
                    mode: 'scroller',
                    width: 220,       
					onBeforeShow: function (html,inst)
                });*/
    
    document.getElementById('name').innerHTML = '<option value="-1" disabled>Select Topic</option>';
    /*$('#name').mobiscroll().select({
                    theme: 'android-ics',
                    display: 'inline',
                    inputClass: 'i-txt',
                    mode: 'scroller',
                    width: 305,
					height: 140,
					onBeforeShow: function (html,inst)
                });*/
}

/*
 * Show Sql error
 */
function errorCB(err) {
    alert("Error processing SQL: " + err.message);
}

/*
 * Fetch list of indicators based on skill and display with box to select marks for it. If student marks were saved previously, set indicators accordingly.
 */
function indi() {

    /*document.getElementById('comment').value = '';*/
    if (document.getElementById('skill').value == "-1") return;
    /*	if(document.getElementById('name').value == "-1"){
		alert('Please select Student');
		document.getElementById('skill').blackselectedIndex = -1;
		return;
	}*/
    for (var l = 0; l < 5; l++)
    arr[l] = 0;
    grade();
    document.getElementById('comment').value = '';
    var ski = document.getElementById("skill");
    var skill = ski.options[ski.selectedIndex].text;
    db.transaction(function (tx) {
        var di = new Array(5);
        var di_p = new Array(5);
        var di_c = new Array(5);
        var query = "SELECT * FROM student_skill WHERE student_id='" + document.getElementById('name').value + "' AND skill='" + document.getElementById('skill').value + "' AND standard=" + window.localStorage.getItem('standard') + " AND term='" + window.localStorage.getItem('term') + "'";
        console.log(query);
        tx.executeSql(query, [], function (tx, results) {
            if (results.rows.length > 0) {
                document.getElementById('grade').value = results.rows.item(0).grade;
                document.getElementById('avg').value = results.rows.item(0).avg;
                document.getElementById('comment').value = results.rows.item(0).comment;
                di[0] = results.rows.item(0).di_1;
                arr[0] = results.rows.item(0).di_1;
                arr[1] = results.rows.item(0).di_2;
                arr[2] = results.rows.item(0).di_3;
                arr[3] = results.rows.item(0).di_4;
                arr[4] = results.rows.item(0).di_5;
                di_p[0] = results.rows.item(0).di_1_p;
                di_c[0] = '';
                di[1] = results.rows.item(0).di_2;
                di_p[1] = results.rows.item(0).di_2_p;
                di_c[1] = '';
                di[2] = results.rows.item(0).di_3;
                di_p[2] = results.rows.item(0).di_3_p;
                di_c[2] = '';
                di[3] = results.rows.item(0).di_4;
                di_p[3] = results.rows.item(0).di_4_p;
                di_c[3] = '';
                di[4] = results.rows.item(0).di_5;
                di_p[4] = results.rows.item(0).di_5_p;
                di_c[4] = '';
                if (results.rows.item(0).di_1_p > 0) di_c[0] = "checked";
                if (results.rows.item(0).di_2_p > 0) di_c[1] = "checked";
                if (results.rows.item(0).di_3_p > 0) di_c[2] = "checked";
                if (results.rows.item(0).di_4_p > 0) di_c[3] = "checked";
                if (results.rows.item(0).di_5_p > 0) di_c[4] = "checked";
            } else {
                for (var i = 0; i < 5; i++) {
                    di[i] = 0;
                    di_p[i] = "-1";
                    di_c[i] = '';
                }
            }
        }, errorCB);
        var section = ski.options[ski.selectedIndex].getAttribute('section');
        var query = "SELECT distinct(indicator) FROM skill where section='" + section + "' and min_class<=" + window.localStorage.getItem('standard') + " AND max_class>=" + window.localStorage.getItem('standard');
        console.log(query);
        tx.executeSql(
        query, [], function (tx, results) {
            if (results.rows.length > 0) {
                window.localStorage.setItem('ind_len', results.rows.length);
                document.getElementById('indicator').innerHTML = '';
                for (var i = 0; i < results.rows.length; i++) {
                    var sel = '';
                    for (var j = 1; j <= 5; j++) {
                        if (di[i] == j) sel += '<div class="sel" style="color:#208EFF;" id="' + results.rows.item(i).indicator + '_' + j + '" selected="1" ontouchstart="tog(\'' + results.rows.item(i).indicator + '_' + j + '\', \'' + i + '\');">' + j + '</div>';
                        else sel += '<div class="sel" id="' + results.rows.item(i).indicator + '_' + j + '" selected="0" ontouchstart="tog(\'' + results.rows.item(i).indicator + '_' + j + '\', \'' + i + '\');">' + j + '</div>';
                    }
                    document.getElementById('indicator').innerHTML += '<tr><td style="width:60%;border-top: 1px solid darkgray;	border-bottom: 1px solid darkgray;"><input type="checkbox" id="' + i + '" sequence="' + di_p[i] + '" onClick="selected(\'' + results.rows.item(i).indicator + '\',' + i + ');" value="' + results.rows.item(i).indicator + '" ' + di_c[i] + '><label  for="' + i + '">' + results.rows.item(i).indicator + '</label></td><td style="width:20px"></td><td style="border-top: 1px solid darkgray;	border-bottom: 1px solid darkgray;">' + sel + '</td></tr>';
                }
            } else {
                alert("Skills not configured for selected class. Please contact Learning outcomes.");
                window.location = "inter.html";
            }
        }, errorCB);
    }, errorCB);
}

/*
 * Toggle function for indicator.
 */
function tog(sel, id) {
    chang = 1;
    if (document.getElementById(sel).getAttribute("selected") != '1') {
        var main = sel.substr(0, sel.length - 1);
        for (i = 1; i <= 5; i++)
        document.getElementById(main + i).style.color = 'gray';
        document.getElementById(sel).style.color = '#208EFF';
        document.getElementById(sel).setAttribute("selected", "1");
        arr[parseInt(id)] = parseInt(sel.substr(sel.length - 1, sel.length - 1));
    } else {
        document.getElementById(sel).style.color = 'gray';
        document.getElementById(sel).setAttribute("selected", "0");
        if (document.getElementById(id).checked) {
            document.getElementById(id).checked = false;
            selected(sel, id);
            document.getElementById('comment').value = '';
        }
        arr[parseInt(id)] = 0;
    }
    grade();
    if (document.getElementById(id).checked) comm();
}

/*
 * If indicator is selected to generate comment, check if marks are selected and after that set sequence flag. If more than 3 are selected, show error.
 */
function selected(sel, id) {
    if (arr[parseInt(id)] < 1) {
        alert("Please provide marks before selecting comment.");
        document.getElementById(id).checked = false;
        return;
    } else {
        chang = 1;
        if (document.getElementById(id).checked) {
            var order = 0;
            for (var i = 0; i < parseInt(window.localStorage.getItem('ind_len')); i++) {
                if (parseInt(document.getElementById(i).getAttribute("sequence")) > order) order = parseInt(document.getElementById(i).getAttribute("sequence"));
            }
            order++;
            if (order > 3) {
                alert("You may select upto a maximum of 3 indicators to display as a comment.");
                document.getElementById(id).checked = false;
                return;
            }
            document.getElementById(id).setAttribute("sequence", order);
        } else {
            for (var i = 0; i < parseInt(window.localStorage.getItem('ind_len')); i++) {
                if (parseInt(document.getElementById(i).getAttribute("sequence")) > parseInt(document.getElementById(id).getAttribute("sequence"))) {
                    document.getElementById(i).setAttribute("sequence", parseInt(document.getElementById(i).getAttribute("sequence")) - 1);
                }
            }
            document.getElementById(id).setAttribute("sequence", "-1");
        }
    }
    comm();
}

//Generate comment based on indicator selection sequence.
function comm() {
    document.getElementById('comment').value = '';
    for (var i = 1; i <= 5; i++) {
        for (var j = 0; j < parseInt(window.localStorage.getItem('ind_len')); j++) {
            (function (j, i) {
                if (document.getElementById(j).getAttribute('sequence') == i) {
                    db.transaction(

                    function (tx) {
                        var query = "SELECT * from student where id='" + document.getElementById('name').value + "'";
                        var gen = 'he';
                        var name = '';
                        tx.executeSql(query, [], function (tx, results) {
                            gen = results.rows.item(0).gender;
                            name = results.rows.item(0).name;
                        });
                        query = "SELECT * FROM skill where indicator='" + document.getElementById(j).value + "' AND skill='" + document.getElementById('skill').value + "' and score=" + arr[j];
                        console.log(query);
                        tx.executeSql(
                        query, [], function (tx, results) {
                            if (results.rows.length > 0) {
                                if (i < 4) {
                                    if (i == 1) document.getElementById('comment').value = name.split(' ')[0] + " " + results.rows.item(0).comment + " " + document.getElementById(j).value + ".";
                                    else document.getElementById('comment').value += " " + gen + " " + results.rows.item(0).comment + " " + document.getElementById(j).value + ".";
                                }
                            }
                        });
                    }, errorCB);
                }
            })(j, i);
        }
    }
    grade();
}

/*
 * Set grade based on average
 */
function grade() {
    var count = 0;
    var avg = 0;
    var grad = '-';
    var total = 0;
    for (var j = 0; j < parseInt(window.localStorage.getItem('ind_len')); j++) {
        if (arr[j] !== 0) {
            total = total + parseInt(arr[j]);
            count++;
        }
    }
    if (total > 0) {
        avg = total / count;
        avg = Math.round(avg * 10) / 10;
    }
    switch (true) {
        case avg > 4:
            grad = "A";
            break;
        case avg > 3 && avg <= 4:
            grad = "B";
            break;
        case avg > 2 && avg <= 3:
            grad = "C";
            break;
        case avg > 1 && avg <= 2:
            grad = "D";
            break;
        case avg > 0 && avg <= 1:
            grad = "E";
            break;
    }
    document.getElementById('avg').value = avg;
    document.getElementById('grade').value = grad;
}

/*
 * Save student marks and if already found, overwrite it.
 */
function submit() {
    if (document.getElementById('skill').value == "-1") {
        alert("Nothing to Save. No skills selected.");
        return false;
    }
    if (document.getElementById('comment').value == '') {
        alert("Please select atleast one indicator.");
        return false;
    }
    if (document.getElementById('avg').value == '0') {
        alert("Please select marks for this skill.");
        return false;
    }
    db.transaction(

    function (tx) {
        var stu_id = document.getElementById('name').value;
        var ski = document.getElementById("skill");
        var skill = ski.value;
        var section = ski.options[ski.selectedIndex].getAttribute('section');
        var sch = window.localStorage.getItem('school_id');
        var di = new Array(5);
        var di_p = new Array(5);
        var term = window.localStorage.getItem('term');
        var standard = window.localStorage.getItem('standard');
        for (var i = 0; i < 5; i++) {
            di[i] = 0;
            di_p[i] = -1;
        }
        for (var j = 0; j < parseInt(window.localStorage.getItem('ind_len')); j++) {
            if (arr[j] !== 0) di[j] = arr[j];
            else di[j] = 0;
            di_p[j] = document.getElementById(j).getAttribute('sequence');
        }
        var comment = document.getElementById('comment').value;
        var avg = document.getElementById('avg').value;
        var grade = document.getElementById('grade').value;
        var flag = 0;
        var query = "SELECT * FROM student_skill WHERE student_id='" + stu_id + "' AND section='" + section + "' AND standard=" + standard + " AND term='" + term + "'";
        console.log(query);
        tx.executeSql(
        query, [], function (tx, results) {
            if (results.rows.length > 0) {
                if (confirm("Do you want to overwrite existing entry?")) {
                    tx.executeSql("DELETE FROM student_skill WHERE student_id='" + stu_id + "' AND section='" + section + "' AND standard=" + standard + " AND term='" + term + "'");
                    flag = 1;
                }
            } else flag = 1;
            if (flag == 1) {
                var query = "INSERT INTO student_skill values ('" + new Date().getTime() + "', '" + stu_id + "','" + skill + "','" + section + "'," + di[0] + "," + di_p[0] + "," + di[1] + "," + di_p[1] + "," + di[2] + "," + di_p[2] + "," + di[3] + "," + di_p[3] + "," + di[4] + "," + di_p[4] + ",'" + grade + "'," + avg + ",'" + comment + "','" + sch + "'," + standard + ",'" + term + "',1," + new Date().getTime() + ")";
                console.log(query);
                tx.executeSql(query);
                percentage();
                alert("Done. Proceed ahead by changing the student or skill.");
                chang = 0;
            }
        });
    }, errorCB);
    return true;
}

/*
 * Set percentage circles based on saved marks,
 */
function percentage() {
    var seconda = 0;
    var secondb = 0;
    var secondc = 0;
    var secondd = 0;
    var thirda = 0;
    var thirdb = 0;
    db.transaction(function (tx) {
        var query = "SELECT count(*) as tot,section FROM student_skill WHERE standard='" + window.localStorage.getItem('standard') + "' AND term='" + window.localStorage.getItem('term') + "' AND school_id='" + window.localStorage.getItem('school_id') + "' AND student_id IN (SELECT id from student WHERE class_id='" + window.localStorage.getItem("class_id") + "' AND school_id='" + window.localStorage.getItem('school_id') + "') GROUP BY section";
        console.log(query);
        tx.executeSql(query, [], function (tx, results) {
            for (var i = 0; i < results.rows.length; i++) {
                console.log(results.rows.item(i).section + " " + results.rows.item(i).tot);
                switch (results.rows.item(i).section.toUpperCase()) {
                case '2A1'	: seconda = seconda +  parseInt(results.rows.item(i).tot);break;
				case '2A2' 	: seconda = seconda +  parseInt(results.rows.item(i).tot);break;
				case '2A3'	: seconda = seconda +  parseInt(results.rows.item(i).tot);break;
				case '2A4'	: seconda = seconda +  parseInt(results.rows.item(i).tot);break;
				case '2A5'	: seconda = seconda +  parseInt(results.rows.item(i).tot);break;
				case '2A6'	: seconda = seconda +  parseInt(results.rows.item(i).tot);break;
				case '2A7'	: seconda = seconda +  parseInt(results.rows.item(i).tot);break;
				case '2A8'	: seconda = seconda +  parseInt(results.rows.item(i).tot);break;
				case '2A9'	: seconda = seconda +  parseInt(results.rows.item(i).tot);break;
				case '2A10'	: seconda = seconda +  parseInt(results.rows.item(i).tot);break;
				case '2B' 	: secondb += parseInt(results.rows.item(i).tot);break;
				case '2D1' 	: secondd = secondd + parseInt(results.rows.item(i).tot);break;
				case '2D2' 	: secondd = secondd + parseInt(results.rows.item(i).tot);break;
				case '2D3' 	: secondd = secondd + parseInt(results.rows.item(i).tot);break;
				case '2D4' 	: secondd = secondd + parseInt(results.rows.item(i).tot);break;
				case '3B1' 	: thirdb = thirdb + parseInt(results.rows.item(i).tot);break;
				case '3B2'	: thirdb = thirdb + parseInt(results.rows.item(i).tot);break;
                }
            }
            console.log(student_count);
            if (parseInt(window.localStorage.getItem('standard')) > 5 && parseInt(window.localStorage.getItem('standard')) < 9) 
            	var total = parseInt(seconda * 100 / (student_count * 10));
            else 
            	var total = parseInt(seconda * 100 / (student_count * 3));
            if (total >= 100) {
                total = 99.9;
            }
            $("#2A").val(total).trigger('change');
            $("#2A").val('2A');
            console.log('2a - ' + total);
            
            var total = parseInt(secondb * 100 / (student_count));
            if (total >= 100) {
                total = 99.9;
            }
            console.log(secondb);
            console.log(student_count);
            $("#2B").val(total).trigger('change');
            $("#2B").val('2B');
            console.log('2b - ' + total);
            
            var query  = "SELECT student_id FROM student_skill where section like '2C%' AND standard='" + window.localStorage.getItem('standard') + "' AND term='" + window.localStorage.getItem('term') + "' AND school_id='" + window.localStorage.getItem('school_id') + "' AND student_id IN (SELECT id from student WHERE class_id='" + window.localStorage.getItem("class_id") + "' AND school_id='" + window.localStorage.getItem('school_id') + "') GROUP BY student_id HAVING count(*)>=1";
            tx.executeSql(query,[],function(tx,results){
            	if(results.rows.length>0){
	            	var total = parseInt(results.rows.length)*100/student_count;
	            	console.log(results.rows.length);
	            	console.log(student_count);
	            	if (total >= 100) {
	                    total = 99.9;
	                }
            	}
            	else total = 0;
                $("#2C").val(total).trigger('change');
                $("#2C").val('2C');
                console.log('2c - ' + total);
            },errorCB);
            
            var total = parseInt(secondd * 100 / (student_count * 4));
            if (total >= 100) {
                total = 99.9;
            }
            $("#2D").val(total).trigger('change');
            $("#2D").val('2D');
            console.log('2d - ' + total);
            
            var query  = "SELECT student_id as tot FROM student_skill where section like '3A%' AND standard='" + window.localStorage.getItem('standard') + "' AND term='" + window.localStorage.getItem('term') + "' AND school_id='" + window.localStorage.getItem('school_id') + "' AND student_id IN (SELECT id from student WHERE class_id='" + window.localStorage.getItem("class_id") + "' AND school_id='" + window.localStorage.getItem('school_id') + "') GROUP BY student_id HAVING count(*)>=2";
            tx.executeSql(query,[],function(tx,results){
            	if(results.rows.length>0){
	            	var total = parseInt(results.rows.length)*100/student_count;
	            	console.log(results.rows.length);
	            	console.log(student_count);
	            	if (total >= 100) {
	                    total = 99.9;
	                }
            	}
            	else total=0;
                $("#3A").val(total).trigger('change');
                $("#3A").val('3A');
                console.log('3a - ' + total);
            },errorCB);
                      
            var total = parseInt(thirdb * 100 / (student_count * 2));
            if (total >= 100) {
                total = 99.9;
            }
            $("#3B").val(total).trigger('change');
            $("#3B").val('3B');
            console.log('3b - ' + total);
        }, errorCB);
   
        
    }, errorCB);
}