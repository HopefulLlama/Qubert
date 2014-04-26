console.log("Beginning unit tests...");
var verbose = false;

var results = {
    total: 0,
    bad: 0
};

testEmptyCircuit00();
testEmptyCircuit10();
testHadamard00();
testHadamard10();
testPauliX00();
testPauliX10();
testPauliY00();
testPauliY10();
testPauliZ00();
testPauliZ10();
testPi800();
testPi810();
testPi400();
testPi410();
testPi200();
testPi210();
testSquareRootNot00();
testSquareRootNot10();
testSwap00();
testSwap10();
testControlledNot00();
testControlledNot10();
testBellState00();

console.log("Of " + results.total + " tests, " +
    results.bad + " failed, " +
    (results.total - results.bad) + " passed.");