var helpText = "";
var math = mathjs();
var matrixExpert = new MatrixExpert();
var qubitCount = 2;
var stepCount = 10;
var controller;

var pageNumber = 1;
var perPage = 10;
var pageLimit = 1;

window.onload=initialise;

function initialise(){
    controller = new Controller();
    
    var toolboxPaper = Raphael("toolboxDiv", 0, 0);
    var circuitPaper = Raphael("circuitry", 11*stepWidth, 2*stepHeight);
    controller.painter = new Painter(toolboxPaper, circuitPaper);
    initialiseToolbox();
    controller.circuit = new Circuit(qubitCount, stepCount);
    controller.circuit.qubits.forEach(function(qubit){
        controller.painter.drawQubit(qubit);
        qubit.steps.forEach(function(step){
            controller.painter.drawStep(step);
        });
    });
    
    displayPaginationOfCircuits(pageNumber, pageLimit);
    
    $('#evaluateMenuButton').click(function(){
        if(qubitCount > 9){
            $('#evaluateModal').modal('show');
        } else {
            controller.evaluate();
        }
    });
    
    $('#evaluateModalButton').click(function(){
        $('#evaluateModal').modal('hide');
        controller.evaluate();
    });
    
    $('#resetButton').click(function(){
        controller.reset();
        $('#resetModal').modal('hide');
    });
    
    $('#saveModal').on('show.bs.modal', function (e){
        $('#saveTextbox').val(controller.save());
    });
    
    $('#loadButton').click(function(){
        controller.load($('#loadTextbox').val());
        $('#loadModal').modal('hide');
    });
    
    $('#uploadButton').click(function(){
        controller.upload($('#uploadTextbox').val());
        $('#uploadModal').modal('hide');
    });
    
    $('#refreshModalButton').click(function(){
        displayPaginationOfCircuits(pageNumber, pageLimit);
    });
    
    $('#downloadModal').on('show.bs.modal', function (e){
        displayPaginationOfCircuits(pageNumber, pageLimit);
    });
    
    $('#downloadButton').click(function(){
        var radioButtonValue = $("input[name='circuitsRadios']:checked").val();
        if(radioButtonValue != ""){
            controller.download(radioButtonValue);    
        }
        $('#downloadModal').modal('hide');
    });
    
    $('#decrementQubit').click(function(e) {
        controller.decrementQubitCount();
        e.stopPropagation();
    });
    $('#qubitTextbox').blur(function(e){
        controller.changeQubitCount();
        e.stopPropagation();
    });
    $('#qubitTextbox').click(function(e){
        e.stopPropagation();
    });
    $('#incrementQubit').click(function(e) {
        controller.incrementQubitCount();
        e.stopPropagation();
    });
    
    $('#decrementStep').click(function(e) {
        controller.decrementStepCount();
        e.stopPropagation();
    });
    $('#stepTextbox').blur(function(e){
        controller.changeStepCount();
        e.stopPropagation();
    });
    $('#stepTextbox').click(function(e){
        e.stopPropagation();
    });
    $('#incrementStep').click(function(e) {
        controller.incrementStepCount();
        e.stopPropagation();
    });
    
   
}

function retrieveAndSetPageLimit(perPage){
     var data = new Object();
    data.perPage = perPage;
    $.post("count.php", data, function(response){
        pageLimit = response; 
    });
}

function retrievePageOfCircuits(pageNumber){
    var data = new Object();
    data.page = pageNumber;
    data.perPage = perPage;
    var requestPage = $.post("retrieve.php", data, function(response){
        var json = $.parseJSON(response);
        $('#circuit-list').empty();
        json.forEach(function(row){
            $('#circuit-list').append($('<div class="radio"> <label> <input type="radio" name="circuitsRadios" value="'+row._id.$id+'">'+row.name+'</label> </div>'));
        });
    });
}

function displayPaginationOfCircuits(page, limit){
    $('#circuit-pagination').empty();
    
    var lowerBound = page;
    for(var i = 0; i < 2; i++){
        if(lowerBound > 1){
            lowerBound--;
        }
    }
    
    var upperBound = page;
    for(i = 0; i < 2; i++){
        if(upperBound < limit){
            upperBound++;
        }
    }
    var html = "";
    html += '<ul class="pagination">';
    if(page > 1){
        html += '<li><a id="decrementCircuitPage" href="#">&laquo;</a></li>';
    } else {
        html += '<li class="disabled"><a id="decrementCircuitPage" href="#">&laquo;</a></li>';
    }
    for(i = lowerBound; i <= upperBound; i++){
        if(i == page){
            html += '<li class="active selectCircuitPage"><span>'+i+'<span class="sr-only">(current)</span></span></li>';
        } else {
            html += '<li><a href="#" class="selectCircuitPage">'+i+'</a></li>';
        }
    }
    if(page < limit){
        html += '<li><a id="incrementCircuitPage" href="#">&raquo;</a></li>';
    } else {
        html += '<li class="disabled"><a id="incrementCircuitPage" href="#">&raquo;</a></li>';
    }
    html +='</ul>';
    
    $('#circuit-pagination').append($(html));
    
    $('#decrementCircuitPage').click(function(){
        if(pageNumber>1){
            pageNumber--;
            displayPaginationOfCircuits(pageNumber, pageLimit);
        }
    });
    
    $('.selectCircuitPage').click(function(e){
        pageNumber=e.currentTarget.text;
        displayPaginationOfCircuits(pageNumber, pageLimit);
    });
    
    $('#incrementCircuitPage').click(function(){
        if(pageNumber < pageLimit){
            pageNumber++;
            displayPaginationOfCircuits(pageNumber, pageLimit);
        }
    });
    
    retrievePageOfCircuits(pageNumber);
    retrieveAndSetPageLimit(perPage);
}