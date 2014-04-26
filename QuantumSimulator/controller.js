function Controller(){
    this.circuit;
    this.painter;
    
    this.updateHelpText = updateHelpText;
    function updateHelpText(standard, text){
        if(standard){
            document.getElementById("help").innerHTML = "Selected tool: " + text + " Gate";
        } else {
            document.getElementById("help").innerHTML = text;
        }
    }
    
    this.reset = reset;
    function reset(){
        qubitCount = 2;
        stepCount = 10;
        $('#qubitTextbox').val(qubitCount);
        $('#stepTextbox').val(stepCount);
        controller.circuit = new Circuit();
        controller.updateQubitCount();
        controller.updateStepCount();
        controller.updateEvaluationText("");
    }
    
    this.save = save;
    function save(){
        var json = saveCircuit(this.circuit);
        return json;
    }
    
    this.load = load;
    function load(json){
        var newCircuit = loadCircuit(json);
        controller.setUpLoadedCircuit(newCircuit);
    }
    
    this.setUpLoadedCircuit = setUpLoadedCircuit;
    function setUpLoadedCircuit(newCircuit){
        if(newCircuit != null){
            controller.painter.circuitPaper.clear();
            controller.circuit = newCircuit;
            
            qubitCount = controller.circuit.qubits.length;
            stepCount = controller.circuit.qubits[0].steps.length;
            controller.updateQubitCount();
            controller.updateStepCount();
            
            controller.circuit.qubits.forEach(function(qubit){
                controller.painter.drawQubit(qubit); 
            });
        } else {
            alert("Something went wrong! Perhaps the string has been corrupted.");
        }
    }
    
    this.upload = upload;
    function upload(name){
        if(name != null && name != ""){
            var json = saveCircuit(this.circuit);
            var data = new Object();
            data.name = name;
            data.json = json;
            jQuery.ajax({
                type: "POST",
                url: "upload.php",
                data: data, 
                cache: false,
                success: function(response){
                }
            });
        }
    }
    
    this.download = download;
    function download(id){
        if(id != null && id != ""){
            var data = new Object();
            data.id = id;
            $.post("download.php", data, function(response){
                    if(response != "error" && response != ""){
                        var document = $.parseJSON(response);
                        var newCircuit = loadCircuit(document[0].json);
                        controller.setUpLoadedCircuit(newCircuit);
                        return true;
                    } else {
                        return false;
                    }
                }
            );
        }
    }
    
    this.evaluate = evaluate;
    function evaluate(){
        var startTime = performance.now();
        var amplitudes = evaluateCircuit(this.circuit);
        var possibleStates = this.circuit.getPossibleStates();
        var html = "<table>";
        for(var i = 0; i < possibleStates.length; i++){
            var probability = ((Math.abs(math.square(amplitudes[0].subset(math.index(i, 0)))) + Math.abs(math.square(amplitudes[1].subset(math.index(i, 0))))) * 100).toFixed(2);
            html += "<tr><td>" + possibleStates[i] + ": </td><td>" + probability + "%</td></tr>";
        }
        
        var endTime = performance.now();
        var duration = endTime - startTime;
        
        html += "<tr></tr><tr><td>Time: </td><td>" +duration.toFixed(3)+"ms</td></tr></table>";
        updateEvaluationText(html);
    }
    
    this.updateEvaluationText = updateEvaluationText;
    function updateEvaluationText(text){
        document.getElementById("evaluation").innerHTML = text;
    }
    
    this.updateQubitCount = updateQubitCount;
    function updateQubitCount(){
        $('#qubitTextbox').val(qubitCount);
        this.painter.circuitPaper.setSize((stepCount+1)*stepWidth, qubitCount*stepHeight);
        var affectedQubits = this.circuit.setQubitCount(qubitCount);
        affectedQubits[0].forEach(function(qubit){
           controller.painter.drawQubit(qubit); 
        });
        affectedQubits[1].forEach(function(qubit){
            qubit.steps.forEach(function(step){
                step.graphic.group.forEach(function(element){
                    element.remove(); 
                });
            });
            qubit.graphic.group.forEach(function(element){
                element.remove(); 
            }); 
        });
    }
    
    this.updateStepCount = updateStepCount;
    function updateStepCount(){
        document.getElementById("stepTextbox").value = stepCount;
        this.painter.circuitPaper.setSize((stepCount+1)*stepWidth, qubitCount*stepHeight);
        var affectedSteps = this.circuit.setStepCount(stepCount);
        affectedSteps[0].forEach(function(step){
            controller.painter.drawStep(step);
        });
        affectedSteps[1].forEach(function(step){
            step.graphic.group.forEach(function(element){
                element.remove();   
            });
        });
    
    }
    
    this.decrementQubitCount = decrementQubitCount;
    function decrementQubitCount(){
        if(qubitCount>1){
            qubitCount--;
            controller.updateQubitCount();
        }
    }
    
    this.changeQubitCount = changeQubitCount;
    function changeQubitCount(){
        temp = document.getElementById("qubitTextbox").value;
        if (temp == qubitCount) {
            // Do nothing to save some processing;
        } else if ((temp > 0) && (temp % 1 == 0)){
            qubitCount = parseInt(temp);
            controller.updateQubitCount();
        } else {
            document.getElementById("qubitTextbox").focus();
            alert("Please enter an integer value higher than 0.");
        }
    }
    
    this.incrementQubitCount = incrementQubitCount;
    function incrementQubitCount(){
        qubitCount++;
        controller.updateQubitCount();
    }
    
    this.decrementStepCount = decrementStepCount;
    function decrementStepCount(){
        if(stepCount>1){
            stepCount--;
            controller.updateStepCount();
        }
    }
    
    this.changeStepCount = changeStepCount;
    function changeStepCount(){
        temp = document.getElementById("stepTextbox").value;
        if (temp == stepCount) {
            // Do nothing to save some processing;
        } else if ((temp > 0) && (temp % 1 == 0)){
            stepCount = parseInt(temp);
            controller.updateStepCount();
        } else {
            document.getElementById("stepTextbox").focus();
            alert("Please enter an integer value higher than 0.");
        }
    }
    
    this.incrementStepCount = incrementStepCount;
    function incrementStepCount(){
        stepCount++;
        controller.updateStepCount();
    }
}