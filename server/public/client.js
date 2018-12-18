class Employee{
    constructor(firstIn, lastIn, idIn, titleIn, annSalIn ){
        this.firstName = firstIn;
        this.lastName = lastIn;
        this.ID = idIn;
        this.title = titleIn;
        this.annSal = annSalIn;
    }
} //end Employee class

let monthlyTotal = 0; 
let roster = [];
 
//Jquery
 $(document).ready(function(){

    //listens for submit
    $('#submit').on('click', function(){
    
        //save values
        let first = $('#firstIn').val();
        let last = $('#lastIn').val();
        let ID = $('#idIn').val();
        let title = $('#titleIn').val();
        let annSal = $('#annSalIn').val();

        newEmployee(first, last, ID, title, annSal);

        //empty fields
        $('#firstIn').val('');
        $('#lastIn').val('');
        $('#idIn').val('');
        $('#titleIn').val('');
        $('#annSalIn').val('');

        //add row to table
        $('#tableBody').append('<tr><td><button class="removeButton">X</button></td><td>' +first+ '</td><td>' +last+ '</td><td class ="empID">'+ID+'</td><td>'+title+'</td><td>'+annSal+'</td></tr>');

        addToMonthlyTotal(annSal);

        //Update Total Monthly on DOM
        $('#totalMonthlyExpenditure').html(monthlyTotal);
        if( monthlyTotal > 20000){
            $('#totalMonthlyExpenditure').css('background-color', 'red');
        }
        // console.log(first, last, ID, title, annSal);

    });// end submit
    
    //remove a row
    $('#employeeTable').on('click', '.removeButton', killRow);

 });

// adds the monthly salary from an annual salary to total expenses
 let addToMonthlyTotal = function(indvAnnSal){
     indvMonthSal = Number(indvAnnSal) / 12;
     monthlyTotal += indvMonthSal;
 }

 // subtracts the monthly salary from an annual salary to total expenses
 let subtractFromMonthlyTotal = function(indvAnnSal){
     indvMonthSal = Number(indvAnnSal) / 12;
     monthlyTotal -= indvMonthSal;
 }

 //Deletes this row of the table
 let killRow = function(){

    const delID = $(this).parent().siblings('.empID').text();
    console.log('delID: '+delID);

    let indexDel = -1;

    for(let i = 0; i < roster.length; i++){
        // console.log(roster[i].ID);
        if (roster[i].ID == delID) {
            indexDel = i;
            break;
        }
    }

    console.log('employee to remove ' + roster[indexDel].firstName);
    subtractFromMonthlyTotal(roster[indexDel].annSal);
    roster.splice(indexDel,1);

    //Update Total Monthly on DOM
    $('#totalMonthlyExpenditure').html(monthlyTotal);
    if( monthlyTotal < 20000){
       $('#totalMonthlyExpenditure').css('background-color', 'white');
    }

     $(this).parent().parent().remove();
     console.log('kill row');
 }// end killRow

 // Adds new employee to roster
 function newEmployee( first, last, ID, title, annSal ){
    console.log( 'in newEmployee:',first, last, ID, title, annSal );
    roster.push( new Employee( first, last, ID, title, annSal ) );
    // console.log(roster);
    return true;
  } // end newEmployee
