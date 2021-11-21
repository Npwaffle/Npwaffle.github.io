//Nicholas Park GUI Homework 4 Javascript
//document.getElementById("submit").onclick = function(){runTable()}; //When the submit button is clicked, run the code
$(document).ready(function(){ //when the DOM is ready

    $.validator.addMethod('MaxOf', function (value, element, param) { //add a rule to check if the maximum is greater than or equal to the minimum
        return this.optional(element) || parseInt(value) >= parseInt($(param).val());
    }, 'Maximum Number value is smaller than Minimum Number value');

    $("#form").validate({
        /*onfocusout: function(element){
            this.element(element);
        },*/
        onkeyup: false,     //force lazy validation, dont bombard user with errors while they are typing or before they try to generate
        onfocusout: false,  //force lazy validation, dont bombard user with errors while they are typing or before they try to generate
        rules:{
            hStart:{
                required: true, //require this value to be entered
                number: true, //require this value to be a number
                step: 1, //require this value to have no decimal place
            },
            hEnd:{
                required: true, //require this value to be entered
                number: true, //require this value to be a number
                step: 1, //require this value to have no decimal place
                MaxOf: '#hStart' //hEnd number must be maximum compared to hStart
            },
            vStart:{
                required: true, //require this value to be entered
                number: true, //require this value to be a number
                step: 1, //require this value to have no decimal place
            },
            vEnd:{
                required: true, //require this value to be entered
                number: true, //require this value to be a number
                step: 1, //require this value to have no decimal place
                MaxOf: '#vStart' //vEnd number must be maximum compared to vStart
            }
        },

        errorLabelContainer: "#debugger", //set the error container to the debugger div
        wrapper: "li", //put the errors in a list

        messages:{ //the error messages
            hStart:{
                required: 'Error at: Minimum Number[Row] : Please enter an integer',
                number: 'Error at: Minimum Number[Row] : The value must be a number (integer)',
                step: 'Error at: Minimum Number[Row] : The integer cannot have a decimal value'
            },
            hEnd:{
                required: 'Error at: Maximum Number[Row] : Please enter an integer',
                number: 'Error at: Maximum Number[Row] : The value must be a number (integer)',
                step: 'Error at: Maximum Number[Row] : The integer cannot have a decimal value',
                MaxOf: 'Error at: Maximum Number[Row] : Maximum Number cannot be smaller than Minimum Number'
            },
            vStart:{
                required: 'Error at: Minimum Number[Column] : Please enter an integer',
                number: 'Error at: Minimum Number[Column] : The value must be a number (integer)',
                step: 'Error at: Minimum Number[Column] : The integer cannot have a decimal value'
            },
            vEnd:{
                required: 'Error at: Maximum Number[Column] : Please enter an integer',
                number: 'Error at: Maximum Number[Column] : The value must be a number (integer)',
                step: 'Error at: Maximum Number[Column] : The integer cannot have a decimal value',
                MaxOf: 'Error at: Maximum Number[Column] : Maximum Number cannot be smaller than Minimum Number'
            }
        },

        submitHandler: function(){//this function is called when the submit button is pressed
            let hStart = parseInt(document.getElementById("hStart").value);   //read the string as an int
            let hEnd = parseInt(document.getElementById("hEnd").value);       //read the string as an int
            let vStart = parseInt(document.getElementById("vStart").value);   //read the string as an int
            let vEnd = parseInt(document.getElementById("vEnd").value);       //read the string as an int
            console.log(hStart);
            console.log(hEnd);
            console.log(vStart);
            console.log(vEnd);

            var tableDiv = document.getElementById('tableContainer'); //get the div for the table
            tableDiv.innerHTML = ""; //empty the table's div
            var output = "<table border='1' cellspacing='0'cellpadding='10'>" //create the soon to be table's output with some rudimentary css stuff
            output = output + "<tr>" + "<td>" + "</td>"; //open the top row and create an empty cell
            for(k = vStart; k < vEnd+1; k++){
                output = output + "<td>" + k + "</td>"; //create the top row
            }
            output = output + "</tr>";  //close the top row

            for(i = hStart; i < hEnd+1; i++){
                output = output + "<tr>" + "<td>" + i + "</td>"; //create the column header per row
                for(k = vStart; k < vEnd+1; k++){
                    output = output + "<td>" + i * k + "</td>"; //do multiplication and add result to cell
                }
                output = output + "</tr>"; //close the row
            }
            output = output + "</table>"; //close the table
            tableDiv.innerHTML = output; //place the table in the tabel div
        }
    });
});
//This is the old code from HW3
/*function runTable(){ //This is essentially the main/driver function for the multiplication table generator
    var debugDiv = document.getElementById('debugger'); //fetch the debug log div
    debugDiv.innerHTML =""; //clear the debug log div
    debugLog = "<h2>Debug Log:</h2><br>"; // create the debug log and populate it with the initial header
    let hStart = document.getElementById("hStart").valueAsNumber; //get input field value as a number
    if (isNaN(hStart)){  //if number is nan (i.e. field is not filled out OR something like 'e' was entered)
        hStart = -12; //default
        debugLog = debugLog + "<br>" + "Error: invalid input for Minimum Number [Row]"; //add error to debug log
    }
    else{
        hStart = Math.trunc(hStart); //if number has a decimal value, get rid of the decimal
    }

    let hEnd = document.getElementById("hEnd").valueAsNumber; //get input field value as a number
    if (isNaN(hEnd)){  //if number is nan (i.e. field is not filled out OR something like 'e' was entered)
        hEnd = 12; //default
        debugLog = debugLog + "<br>" + "Error: invalid input for Maximum Number [Row]"; //add error to debug log
    }
    else{
        hEnd = Math.trunc(hEnd); //if number has a decimal value, get rid of the decimal
    }

    let vStart = document.getElementById("vStart").valueAsNumber; //get input field value as a number
    if (isNaN(vStart)){  //if number is nan (i.e. field is not filled out OR something like 'e' was entered)
        vStart = -12; //default
        debugLog = debugLog + "<br>" + "Error: invalid input for Minimum Number [Column]"; //add error to debug log
    }
    else{
        vStart = Math.trunc(vStart); //if number has a decimal value, get rid of the decimal
    }

    let vEnd = document.getElementById("vEnd").valueAsNumber; //get input field value as a number
    if (isNaN(vEnd)){  //if number is nan (i.e. field is not filled out OR something like 'e' was entered)
        vEnd = 12; //default
        debugLog = debugLog + "<br>" + "Error: invalid input for Maximum Number [Column]"; //add error to debug log
    }
    else{
        vEnd = Math.trunc(vEnd); //if number has a decimal value, get rid of the decimal
    }

    if (vStart > vEnd){ // swap the start and end values in the event the start value is larger; whatever value is start should be the smaller/minimum value
        console.log("swapping vStart and vEnd");
        debugLog = debugLog + "<br>" + "Notice: Minimum Value for [Column] greater than Maximum Value"; //add error to debug log
        let x = vStart;
        vStart = vEnd;
        vEnd = x;
    }

    if (hStart > hEnd){ // swap the start and end values in the event the start value is larger; whatever value is start should be the smaller/minimum value
        console.log("swapping hStart and hEnd");
        debugLog = debugLog + "<br>" + "Notice: Minimum Value for [Row] greater than Maximum Value"; //add error to debug log
        let x = hStart;
        hStart = hEnd;
        hEnd = x;
    }
    //Print the values in console for debug purposes
    console.log(hStart);
    console.log(hEnd);
    console.log(vStart);
    console.log(vEnd);
    debugDiv.innerHTML = debugLog; //set the debug div's contents to the debug log
    
    var tableDiv = document.getElementById('tableContainer'); //get the div for the table
    tableDiv.innerHTML = ""; //empty the table's div
    var output = "<table border='1' cellspacing='0'cellpadding='10'>" //create the soon to be table's output with some rudimentary css stuff
    output = output + "<tr>" + "<td>" + "</td>"; //open the top row and create an empty cell
    for(k = vStart; k < vEnd+1; k++){
        output = output + "<td>" + k + "</td>"; //create the top row
    }
    output = output + "</tr>";  //close the top row

    for(i = hStart; i < hEnd+1; i++){
        output = output + "<tr>" + "<td>" + i + "</td>"; //create the column header per row
        for(k = vStart; k < vEnd+1; k++){
            output = output + "<td>" + i * k + "</td>"; //do multiplication and add result to cell
        }
        output = output + "</tr>"; //close the row
    }
    output = output + "</table>"; //close the table
    tableDiv.innerHTML = output; //place the table in the tabel div
}*/