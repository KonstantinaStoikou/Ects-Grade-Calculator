var table = document.getElementById("table");
var gradeSpan = document.getElementById("grade");

//calculate degree grade when clicking on calculate button
document.getElementById("calculate-button").addEventListener("click", function(){

    var totalGrade = 0;
    var sumOfEcts = 0;

    //get values from ects and grades and fill arrays respectively
    var ects = $("tr").find("td:nth-child(2)").toArray();
    var grades = $("tr").find("td:nth-child(3)").toArray();

    for (var i = 0; i < ects.length - 1; i++) {
        totalGrade += Number(ects[i].textContent) * Number(grades[i].textContent);
        sumOfEcts += Number(ects[i].textContent);
    }

    //degree grade is based on the type: sum(ects(i)*grade(i)) / sum(ects)
    totalGrade = totalGrade / sumOfEcts;

    //round degree grade to 2 digits
    gradeSpan.innerHTML = totalGrade.toFixed(2);

    window.localStorage.degree = gradeSpan.innerHTML; //store
});

var courseInput = document.querySelector('[name="course"]').value;
var ectsInput = document.querySelector('[name="ects"]').value;
var gradeInput = document.querySelector('[name="grade"]').value;


//to add row when filling form and pressing enter
$("#form").keypress(function(event) {
    if (event.which === 13 && $("input").is(":focus")) {    //enter pressed and one input is pressed
        var course = document.getElementsByName("course")[0].value;
        var ects = document.getElementsByName("ects")[0].value;
        var grade = document.getElementsByName("grade")[0].value;
        if (course === "") {
            $("input[name=course]").addClass("placeholder-color");
            return;
        } else {
            $("input[name=course]").removeClass("placeholder-color");
        }

        if (ects === "") {
            $("input[name=ects]").addClass("placeholder-color");
            return;
        } else {
            $("input[name=ects]").removeClass("placeholder-color");
        }

        if (grade === "") {
            $("input[name=grade]").addClass("placeholder-color");
            return;
        }
        else {
            $("input[name=grade]").removeClass("placeholder-color");
        }
        if (grade > 10 || grade < 5) {
            $("input[name=grade]").addClass("input-color");
            return;
        }
        else {
            $("input[name=grade]").removeClass("input-color");
        }
        $("input").val("");     // empty text from inputs
        $("<tr><td><span class=\"elem\"><i class=\"far fa-times-circle\"></i></span><span class=\"course\" contenteditable=\"true\" spellcheck=\"false\">" + course + "</span></td><td contenteditable=\"true\" >" + ects + "</td><td contenteditable=\"true\">" + grade + "</td></tr>").insertBefore($("#new-course"));
    }
});

//to delete row when clicking on x icon
$("#table").on("click", ".elem", function(event) {
    $(this).parent().parent().fadeOut(function() {
        //after fadeout the td element is removed
        $(this).remove();    //this in here refers to the parent's parent (td) and not the span
    });

    event.stopPropagation();
});

//store table when closing or refreshing tab
$(window).on("unload", function(e) {
    window.localStorage.rows = table.innerHTML; //store
});

// localStorage.clear();
getValues();

//allow only integers for ects
$("input[name=ects]").on("keypress keyup blur",function (event) {
    $(this).val($(this).val().replace(/[^\d].+/, ""));
    if ((event.which < 48 || event.which > 57)) {
        event.preventDefault();
    }
});

//allow only floats for grades
$("input[name=grade]").on("keypress keyup blur",function (event) {
    //this.value = this.value.replace(/[^0-9\.]/g,'');
    $(this).val($(this).val().replace(/[^0-9\.]/g,''));
        if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
            event.preventDefault();
        }
});

//FUNCTIONS

//recovers table row data stored in local storage
function getValues() {
    var storedValues = window.localStorage.rows;
    var degreeGrade = window.localStorage.degree;
    if(storedValues) {
      table.innerHTML = storedValues;
    }
    if(degreeGrade) {
      gradeSpan.innerHTML = degreeGrade;
    }
}
