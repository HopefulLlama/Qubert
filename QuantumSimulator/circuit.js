function Circuit(qubitCount, stepCount){
    this.qubits = new Array();
    
    this.qubitCount = qubitCount;
    this.stepCount = stepCount;
    
    this.setQubitCount = setQubitCount;
    function setQubitCount(newQubitCount){
        var affectedQubits = new Array();
        var qubitsToDraw = new Array();
        affectedQubits.push(qubitsToDraw);
        var qubitsToRemove = new Array();
        affectedQubits.push(qubitsToRemove);
        this.qubitCount = newQubitCount;

        if (this.qubits.length < this.qubitCount) {
            for (var i = this.qubits.length; i < this.qubitCount; i++){
                this.qubits[i] = new Qubit(i, 0);
                qubitsToDraw.push(this.qubits[i]);
            }
        } else if (this.qubits.length > this.qubitCount) {
            var counter = this.qubits.length - this.qubitCount;
            for(counter; counter > 0; counter--){
                qubitsToRemove.push(this.qubits[this.qubits.length - counter]);
            }
            this.qubits.splice(this.qubitCount, this.qubits.length-this.qubitCount);
        }
        return affectedQubits;
    }

    this.setStepCount = setStepCount;
    function setStepCount(newStepCount){
        this.stepCount = newStepCount;
        var affectedSteps = new Array();
        var stepsToDraw = new Array();
        affectedSteps.push(stepsToDraw);
        var stepsToRemove = new Array();
        affectedSteps.push(stepsToRemove);
        
        for (var i = 0; i < this.qubits.length; i++) {
            if(this.qubits[i].steps.length < this.stepCount) {
                for (var j = this.qubits[i].steps.length; j < this.stepCount; j++){
                    this.qubits[i].steps[j] = new Step(j, this.qubits[i]);
                    stepsToDraw.push(this.qubits[i].steps[j]);
                }
            } else if (this.qubits[i].steps.length > this.stepCount) {
                var counter = this.qubits[i].steps.length - this.stepCount;
                for(counter; counter > 0; counter--){
                    stepsToRemove.push(this.qubits[i].steps[this.qubits[i].steps.length - counter]);
                    this.qubits[i].steps.splice(this.stepCount, this.qubits[i].steps.length - this.stepCount);
                }
            }
        }
        return affectedSteps;
    }
    
    this.setQubitCount(this.qubitCount);
    this.setStepCount(this.stepCount);
    
    this.getPossibleStates = getPossibleStates;
    function getPossibleStates(){
        var possibleStates = new Array();
        for (var i = 0; i<math.pow(2, this.qubitCount); i++){
            var temp = pad(i.toString(2), this.qubitCount, '0');
            possibleStates.push(temp);
        }
        return possibleStates;
    }
    
    this.getInitialAmplitudes = getInitialAmplitudes;
    function getInitialAmplitudes(){
        var possibleStates = this.getPossibleStates();
        var amplitudes = new Array();
        amplitudes.push(math.zeros(possibleStates.length, 1));
        amplitudes.push(math.zeros(possibleStates.length, 1));
        var initialState = "";
        this.qubits.forEach(function(qubit){
            initialState += qubit.startState;
        });
        possibleStates.forEach(function(possibleState){
            if(possibleState.match(initialState)){
                amplitudeIndex = possibleStates.indexOf(possibleState);
            }
        });
        amplitudes[0].subset(math.index(amplitudeIndex, 0), 1);
        return amplitudes;
    }
    
    this.gatherFunctionalGates = gatherFunctionalGates;
    function gatherFunctionalGates(){
        var functionalGates = new Array();
        for(var i = 0; i<this.stepCount; i++){
            for(var j = 0; j<this.qubitCount; j++){
                if(this.qubits[j].steps[i].gate != null){
                    if(this.qubits[j].steps[i].gate.name == "Connector" || (this.qubits[j].steps[i].gate.name == "Swap" && this.qubits[j].steps[i].gate.owner != null)){
                    } else {
                        functionalGates.push(this.qubits[j].steps[i].gate);
                    }
                }
            }
        }
        return functionalGates;
    }
}



function initialiseCircuit(){
    stepCount = parseInt(document.getElementById("steps").value);
    qubitCount = parseInt(document.getElementById("qubits").value);
    initialiseQubits(qubitCount);
    painter.drawCircuit();
}

function initialiseQubits(count){
    for(var i = 0; i < count; i++){
        qubits[i] = new Qubit(i, 0);
    }
}