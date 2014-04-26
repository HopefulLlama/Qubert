var testCircuit;
var testAmplitudes;

function initialiseBasicCircuit(){
    testCircuit = new Circuit(2,3);
    testAmplitudes = new Array();
    testAmplitudes.push(math.zeros(Math.pow(2, testCircuit.qubits.length), 1));
    testAmplitudes.push(math.zeros(Math.pow(2, testCircuit.qubits.length), 1));
}

function testCircuitEvaluator(testName, system, expected) {
    results.total++
    var actualAmplitudes = evaluateCircuit(system);
    if (String(actualAmplitudes) != String(expected)){
        results.bad++;
        console.log("    " + testName + ": Expected " + String(expected) + ", but was " + String(actualAmplitudes));
    } else {
        if(verbose){
            console.log("    " + testName + ": testCircuitEvaluator with " + String(system) + ", " + String(expected) + " passed.");
        }
    }
}

function testEmptyCircuit00(){
    var name = arguments.callee.name;
    initialiseBasicCircuit();
    
    testAmplitudes[0].subset(math.index(0, 0), 1);
    
    testCircuitEvaluator(name, testCircuit, testAmplitudes);
}

function testEmptyCircuit10(){
    var name = arguments.callee.name;
    initialiseBasicCircuit();
    
    testCircuit.qubits[0].startState = 1;
    testAmplitudes[0].subset(math.index(2, 0), 1)
    
    testCircuitEvaluator(name, testCircuit, testAmplitudes);
}

function testHadamard00(){
    var name = arguments.callee.name;
    initialiseBasicCircuit();
    
    testAmplitudes[0].subset(math.index(0, 0), (1/Math.sqrt(2)))
    testAmplitudes[0].subset(math.index(2, 0), (1/Math.sqrt(2)))
    testCircuit.qubits[0].steps[0].setGate("Hadamard");
    
    testCircuitEvaluator(name, testCircuit, testAmplitudes);
}

function testHadamard10(){
    var name = arguments.callee.name;
    initialiseBasicCircuit();
    
    testCircuit.qubits[0].startState = 1;
    testAmplitudes[0].subset(math.index(0, 0), (1/Math.sqrt(2)))
    testAmplitudes[0].subset(math.index(2, 0), -(1/Math.sqrt(2)))
    testCircuit.qubits[0].steps[0].setGate("Hadamard");

    testCircuitEvaluator(name, testCircuit, testAmplitudes); 
}

function testPauliX00(){
    var name = arguments.callee.name;
    initialiseBasicCircuit();
    
    testCircuit.qubits[0].steps[0].setGate("Pauli-X");
    testAmplitudes[0].subset(math.index(2, 0), 1);

    testCircuitEvaluator(name, testCircuit, testAmplitudes);
}

function testPauliX10(){
    var name = arguments.callee.name;
    initialiseBasicCircuit();
    
    testCircuit.qubits[0].startState = 1;
    testCircuit.qubits[0].steps[0].setGate("Pauli-X");
    testAmplitudes[0].subset(math.index(0, 0), 1);
    
    testCircuitEvaluator(name, testCircuit, testAmplitudes);
}

function testPauliY00(){
    var name = arguments.callee.name;
    initialiseBasicCircuit();
    
    testCircuit.qubits[0].steps[0].setGate("Pauli-Y");
    testAmplitudes[1].subset(math.index(2, 0), 1);
    
    testCircuitEvaluator(name, testCircuit, testAmplitudes);
}

function testPauliY10(){
    var name = arguments.callee.name;
    initialiseBasicCircuit();
    
    testCircuit.qubits[0].startState = 1;
    testCircuit.qubits[0].steps[0].setGate("Pauli-Y");
    testAmplitudes[1].subset(math.index(0, 0), -1);

    testCircuitEvaluator(name, testCircuit, testAmplitudes);
}

function testPauliZ00(){
    var name = arguments.callee.name;
    initialiseBasicCircuit();
    
    testAmplitudes[0].subset(math.index(0, 0), 1);
    testCircuit.qubits[0].steps[0].setGate("Pauli-Z");
    
    testCircuitEvaluator(name, testCircuit, testAmplitudes);
}

function testPauliZ10(){
    var name = arguments.callee.name;
    initialiseBasicCircuit();
    
    testCircuit.qubits[0].startState = 1;
    testCircuit.qubits[0].steps[0].setGate("Pauli-Z");
    testAmplitudes[0].subset(math.index(2, 0), -1);
 
    testCircuitEvaluator(name, testCircuit, testAmplitudes);
}

function testPi800(){
    var name = arguments.callee.name;
    initialiseBasicCircuit();
    
    testCircuit.qubits[0].steps[0].setGate("Hadamard");
    testCircuit.qubits[0].steps[1].setGate("Pi/8 Phase Shift");
    testCircuit.qubits[0].steps[2].setGate("Hadamard");
    testAmplitudes[0].subset(math.index(0, 0), 0.9619397662556431);
    testAmplitudes[0].subset(math.index(2, 0), 0.03806023374435663);
    testAmplitudes[1].subset(math.index(0, 0), 0.19134171618254484);
    testAmplitudes[1].subset(math.index(2, 0), -0.19134171618254484);
    
    testCircuitEvaluator(name, testCircuit, testAmplitudes);
}

function testPi810(){
    var name = arguments.callee.name;
    initialiseBasicCircuit();
    
    testCircuit.qubits[0].startState = 1;
    testCircuit.qubits[0].steps[0].setGate("Hadamard");
    testCircuit.qubits[0].steps[1].setGate("Pi/8 Phase Shift");
    testCircuit.qubits[0].steps[2].setGate("Hadamard");
    testAmplitudes[0].subset(math.index(0, 0), 0.03806023374435663);
    testAmplitudes[0].subset(math.index(2, 0), 0.9619397662556431);
    testAmplitudes[1].subset(math.index(0, 0), -0.19134171618254484);
    testAmplitudes[1].subset(math.index(2, 0), 0.19134171618254484);
    
    testCircuitEvaluator(name, testCircuit, testAmplitudes);
}

function testPi400(){
    var name = arguments.callee.name;
    initialiseBasicCircuit();
    
    testCircuit.qubits[0].steps[0].setGate("Hadamard");
    testCircuit.qubits[0].steps[1].setGate("Pi/4 Phase Shift");
    testCircuit.qubits[0].steps[2].setGate("Hadamard");
    testAmplitudes[0].subset(math.index(0, 0), 0.8535533905932735);
    testAmplitudes[0].subset(math.index(2, 0), 0.1464466094067262);
    testAmplitudes[1].subset(math.index(0, 0), 0.3535533905932737);
    testAmplitudes[1].subset(math.index(2, 0), -0.3535533905932737);
    
    testCircuitEvaluator(name, testCircuit, testAmplitudes);
}

function testPi410(){
    var name = arguments.callee.name;
    initialiseBasicCircuit();
    
    testCircuit.qubits[0].startState = 1;
    testCircuit.qubits[0].steps[0].setGate("Hadamard");
    testCircuit.qubits[0].steps[1].setGate("Pi/4 Phase Shift");
    testCircuit.qubits[0].steps[2].setGate("Hadamard");
    testAmplitudes[0].subset(math.index(0, 0), 0.1464466094067262);
    testAmplitudes[0].subset(math.index(2, 0), 0.8535533905932735);
    testAmplitudes[1].subset(math.index(0, 0), -0.3535533905932737);
    testAmplitudes[1].subset(math.index(2, 0), 0.3535533905932737);
    
    testCircuitEvaluator(name, testCircuit, testAmplitudes);
}

function testPi200(){
    var name = arguments.callee.name;
    initialiseBasicCircuit();
    
    testCircuit.qubits[0].steps[0].setGate("Hadamard");
    testCircuit.qubits[0].steps[1].setGate("Pi/2 Phase Shift");
    testCircuit.qubits[0].steps[2].setGate("Hadamard");
    testAmplitudes[0].subset(math.index(0, 0), 0.4999999999999999);
    testAmplitudes[0].subset(math.index(2, 0), 0.4999999999999999);
    testAmplitudes[1].subset(math.index(0, 0), 0.4999999999999999);
    testAmplitudes[1].subset(math.index(2, 0), -0.4999999999999999);
    
    testCircuitEvaluator(name, testCircuit, testAmplitudes);
}

function testPi210(){
    var name = arguments.callee.name;
    initialiseBasicCircuit();
    
    testCircuit.qubits[0].startState = 1;
    testCircuit.qubits[0].steps[0].setGate("Hadamard");
    testCircuit.qubits[0].steps[1].setGate("Pi/2 Phase Shift");
    testCircuit.qubits[0].steps[2].setGate("Hadamard");
    testAmplitudes[0].subset(math.index(0, 0), 0.4999999999999999);
    testAmplitudes[0].subset(math.index(2, 0), 0.4999999999999999);
    testAmplitudes[1].subset(math.index(0, 0), -0.4999999999999999);
    testAmplitudes[1].subset(math.index(2, 0), 0.4999999999999999);
    
    testCircuitEvaluator(name, testCircuit, testAmplitudes);
}

function testSquareRootNot00(){
    var name = arguments.callee.name;
    initialiseBasicCircuit();
    
    testAmplitudes[0].subset(math.index(0, 0), (1/Math.sqrt(2)))
    testAmplitudes[0].subset(math.index(2, 0), -(1/Math.sqrt(2)))
    testCircuit.qubits[0].steps[0].setGate("Square Root Not");
    
    testCircuitEvaluator(name, testCircuit, testAmplitudes);
}

function testSquareRootNot10(){
    var name = arguments.callee.name;
    initialiseBasicCircuit();
    
    testCircuit.qubits[0].startState = 1;
    testAmplitudes[0].subset(math.index(0, 0), (1/Math.sqrt(2)))
    testAmplitudes[0].subset(math.index(2, 0), (1/Math.sqrt(2)))
    testCircuit.qubits[0].steps[0].setGate("Square Root Not");

    testCircuitEvaluator(name, testCircuit, testAmplitudes); 
}

function testSwap00(){
    var name = arguments.callee.name;
    initialiseBasicCircuit();
    
    testCircuit.qubits[0].steps[0].setGate("Swap");
    testCircuit.qubits[1].steps[0].setGate("Swap");
    testAmplitudes[0].subset(math.index(0, 0), 1);
    
    testCircuitEvaluator(name, testCircuit, testAmplitudes);
}

function testSwap10(){
    var name = arguments.callee.name;
    initialiseBasicCircuit();
    
    testCircuit.qubits[0].startState = 1;
    testCircuit.qubits[0].steps[0].setGate("Swap");
    testCircuit.qubits[1].steps[0].setGate("Swap");
    testAmplitudes[0].subset(math.index(1, 0), 1);
    
    testCircuitEvaluator(name, testCircuit, testAmplitudes);
}

function testControlledNot00(){
    var name = arguments.callee.name;
    initialiseBasicCircuit();
    
    testCircuit.qubits[1].steps[0].setGate("Controlled Not");
    testCircuit.qubits[0].steps[0].setGate("Connector");
    testAmplitudes[0].subset(math.index(0, 0), 1);

    testCircuitEvaluator(name, testCircuit, testAmplitudes);
}

function testControlledNot10(){
    var name = arguments.callee.name;
    initialiseBasicCircuit();
    
    testCircuit.qubits[0].startState = 1;
    testCircuit.qubits[1].steps[0].setGate("Controlled Not");
    testCircuit.qubits[0].steps[0].setGate("Connector");
    testAmplitudes[0].subset(math.index(3, 0), 1);

    testCircuitEvaluator(name, testCircuit, testAmplitudes);
}

function testBellState00(){
    var name = arguments.callee.name;
    initialiseBasicCircuit();
    
    testCircuit.qubits[0].steps[0].setGate("Hadamard");
    testCircuit.qubits[1].steps[1].setGate("Controlled Not");
    testCircuit.qubits[0].steps[1].setGate("Connector");
    testAmplitudes[0].subset(math.index(0, 0), (1/Math.sqrt(2)));
    testAmplitudes[0].subset(math.index(3, 0), (1/Math.sqrt(2)));

    testCircuitEvaluator(name, testCircuit, testAmplitudes);    
}