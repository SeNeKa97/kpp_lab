var table;
var tr;
$(document).ready(function () {
    table = document.getElementById("data");

    tr = table.getElementsByTagName("tr");
})



function filter(option) {
    if(option=="ALL") {
        for (i = 0; i < tr.length; i++) {
            tr[i].style.display = "";
        }
    }else if (option=="PRESENT"){
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[2];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf("ДА") > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }else if (option=="ABSENT"){
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[2];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf("ДА") > -1) {
                    tr[i].style.display = "none";
                } else {
                    tr[i].style.display = "";
                }
            }
        }
    }

    // Loop through all table rows, and hide those who don't match the search query

}

function myFunction() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");


}