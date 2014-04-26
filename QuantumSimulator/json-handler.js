function saveCircuit(system){
    var jsonArray = new Array();
    
    var startingState = "";
    system.qubits.forEach(function(qubit){
        startingState += qubit.startState; 
    });
    
    jsonArray.push(startingState);
    
    var functionalGates = system.gatherFunctionalGates();
    functionalGates.forEach(function(gate){
        var jsonGate = new Array();
        jsonGate.push(gate.name);
        jsonGate.push(gate.step.qubit.id);
        jsonGate.push(gate.step.id);
        var children = new Array();
        jsonGate.push(children);
        gate.children.forEach(function(child){
            var jsonChildGate = new Array();
            jsonChildGate.push(child.name);
            jsonChildGate.push(child.step.qubit.id);
            jsonChildGate.push(child.step.id);
            children.push(jsonChildGate);
        });
        jsonArray.push(jsonGate);
    });
    
    var json = JSON.stringify(jsonArray);
    return json;
}

function loadCircuit(json){
    try{
        var array = JSON.parse(json);
        
        var stepCount = 1;
        array.forEach(function(item){
            if(item[2] != null){
                if(stepCount < item[2]+1){
                    stepCount = item[2]+1;
                }
            }
        });
        
        var newCircuit = new Circuit(array[0].length, stepCount);
        for(var i = 0; i < array[0].length; i++){
            newCircuit.qubits[i].startState = array[0].charAt(i);
        }
        array.forEach(function(item){
            if(item instanceof Array){
                // then it's a gate
                var gate = new Gate(item[0]);
                newCircuit.qubits[item[1]].steps[item[2]].gate = gate;
                gate.step = newCircuit.qubits[item[1]].steps[item[2]]
                if(item[3].length > 0){
                    // then it has children
                    item[3].forEach(function(childItem){
                        var childGate = new Gate(childItem[0]);
                        newCircuit.qubits[childItem[1]].steps[childItem[2]].gate = childGate;
                        childGate.step = newCircuit.qubits[childItem[1]].steps[childItem[2]]
                        childGate.owner = gate;
                        gate.children.push(childGate);
                    });
                }
            }
        });
        return newCircuit;
    } catch(error){
        console.log(error)
        return null;
    }
}