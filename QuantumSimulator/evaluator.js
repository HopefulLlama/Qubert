function evaluateCircuit(system){
    var amplitudes = system.getInitialAmplitudes();
    var functionalGates = system.gatherFunctionalGates();
    functionalGates.forEach(function(gate){
        matrices = setUpMatrix(gate);
        temp0 = math.subtract(math.multiply(matrices[0], amplitudes[0]), math.multiply(matrices[1], amplitudes[1]));
        temp1 = math.add(math.multiply(matrices[0], amplitudes[1]), math.multiply(matrices[1], amplitudes[0]));
        amplitudes[0] = temp0;
        amplitudes[1] = temp1;
    });
    return amplitudes;
}


/* 
Taken from http://stackoverflow.com/questions/10073699/pad-a-number-with-leading-zeros-in-javascript?&session-id=ec83fe956e67506e1034b7f4ff8b92f9
Accessed: 03/04/2014
*/
function pad(n, width, z) {
    z = z || 0;
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

/*
 *  Adapted, with permission from http://www.davyw.com/quantum/static/quantum.js 
 *  Accessed: 06/04/2014
 */
function setUpControls(matrices){
    var length = matrices[0].size()[0];
    var tempMatrices = new Array();
    var matrix0 = math.eye(length*2);
    var matrix1 = math.zeros(length*2, length*2);
    for (var x = 0; x < length; x++) {
        for (var y = 0; y < length; y++) {
            matrix0.subset(math.index(x+length,y+length), matrices[0].subset(math.index(x,y)));
            matrix1.subset(math.index(x+length,y+length), matrices[1].subset(math.index(x,y)));
        }
    }
    tempMatrices.push(matrix0);
    tempMatrices.push(matrix1);
    return tempMatrices;
}

/*
 *  Adapted, with permission from http://www.davyw.com/quantum/static/quantum.js 
 *  Accessed: 06/04/2014
 */
function setUpMatrix(gate){
    var matrices = matrixExpert.getMatrix(gate.name);
    var counter = 0;
    // Accounting for the first child of swap being another swap
    if (gate.name == "Swap"){
        counter++;
    }
    for(counter = counter; counter < gate.children.length; counter++){
        matrices = setUpControls(matrices);
    }
    
    // Account for the child of a swap gate may be holding the connector
    if (gate.name == "Swap"){
        for(counter = 0; counter < gate.children[0].children.length; counter++){
            matrices = setUpControls(matrices);
        }
    }
    // Step 1 - set up matrix populated with zeros with the correct length to cover entire system
    var matrixLength = Math.pow(2, qubitCount);
    var tempMatrices = new Array();
    var tempMatrix0 = math.zeros(matrixLength, matrixLength);
    var tempMatrix1 = math.zeros(matrixLength, matrixLength);
    
    // Step 2 - sort two arrays; system.qubits which are being affected and those which are not
    var affectedQubits = new Array();
    affectedQubits.push(qubitCount-1 - gate.step.qubit.id);
    
    if(gate.name == "Swap"){
       affectedQubits.push(qubitCount-1 - gate.children[0].step.qubit.id);
    }
    
    var childrenGates = new Array();
    counter = 0;
    if(gate.name == "Swap"){
        counter++;
    }
    for(counter = counter; counter < gate.children.length; counter++){
        childrenGates.push(qubitCount-1 - gate.children[counter].step.qubit.id);
    }
    
    // Account for the child of a swap gate may be holding the connector
    if(gate.name == "Swap"){
        for(counter = 0; counter < gate.children[0].children.length; counter++){
            childrenGates.push(qubitCount-1 - gate.children[0].children[counter].step.qubit.id);
        }
    }
    
    childrenGates.sort(function(a,b){return a-b});
    affectedQubits = affectedQubits.concat(childrenGates);

    var notAffectedQubits = new Array();
    for(counter = 0; counter < qubitCount; counter++){
        if(affectedQubits.indexOf(counter) == -1){
            notAffectedQubits.push(counter);
        }
    }

    // Step 3 - Do not do anything if i and j differ from one another in their binary representation
    var i, j;
    i = matrixLength;
    var debugCounter = 0;

    while (i--) {
        j = matrixLength;
        while (j--) {
            counter = notAffectedQubits.length;
            var equal = true;
            while (counter--) {
                if ((i & (1 << notAffectedQubits[counter])) != (j & (1 << notAffectedQubits[counter]))){
                    equal = false;
                    break;
                }
            }
            // Step 4 - If they do not differ, calculate idash and jdash and transpose those onto i and j
            if (equal) {
                var idash = 0
                var jdash = 0;
                counter = affectedQubits.length;
                while (counter--) {
                    debugCounter++;
                    idash |= ((i & (1 << affectedQubits[counter])) >> affectedQubits[counter]) << counter;
                    jdash |= ((j & (1 << affectedQubits[counter])) >> affectedQubits[counter]) << counter;
                }
                tempMatrix0.subset(math.index(i,j), matrices[0].subset(math.index(idash,jdash)));
                tempMatrix1.subset(math.index(i,j), matrices[1].subset(math.index(idash,jdash)));
            }
        }
    }
    // Step 5 - return matrix
    tempMatrices.push(tempMatrix0);
    tempMatrices.push(tempMatrix1);
    return tempMatrices
}