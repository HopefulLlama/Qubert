function MatrixExpert(){
    this.hadamard = new Array();
    var matrix = math.multiply( (1/math.sqrt(2)), math.matrix([[1, 1], [1, -1]]));
    this.hadamard.push(matrix);
    matrix = math.zeros(2,2);
    this.hadamard.push(matrix);
    
    this.pauliX = new Array();
    matrix = math.matrix([[0, 1], [1, 0]]);
    this.pauliX.push(matrix);
    matrix = math.zeros(2,2);
    this.pauliX.push(matrix);
    
    this.pauliY = new Array();
    matrix = math.zeros(2,2);
    this.pauliY.push(matrix);
    matrix = math.matrix([[0, -1], [1, 0]]);
    this.pauliY.push(matrix);
    
    this.pauliZ = new Array();
    matrix = math.matrix([[1, 0], [0, -1]]);
    this.pauliZ.push(matrix);
    matrix = math.zeros(2,2);
    this.pauliZ.push(matrix);

    this.pi8 = new Array();
    matrix = math.matrix([[1, 0], [0, Math.cos(Math.PI / 8)]]);
    this.pi8.push(matrix);
    matrix = math.matrix([[0, 0], [0, Math.sin(Math.PI / 8)]]);
    this.pi8.push(matrix);
    
    this.pi4 = new Array();
    matrix = math.matrix([[1, 0], [0, Math.cos(Math.PI / 4)]]);
    this.pi4.push(matrix);
    matrix = math.matrix([[0, 0], [0, Math.sin(Math.PI / 4)]]);
    this.pi4.push(matrix);
    
    this.pi2 = new Array();
    matrix = math.matrix([[1, 0], [0, Math.cos(Math.PI / 2)]]);
    this.pi2.push(matrix);
    matrix = math.matrix([[0, 0], [0, Math.sin(Math.PI / 2)]]);
    this.pi2.push(matrix);

    this.squareRootNot = new Array();
    var matrix = math.multiply( (1/math.sqrt(2)), math.matrix([[1, 1], [-1, 1]]));
    this.squareRootNot.push(matrix);
    matrix = math.zeros(2,2);
    this.squareRootNot.push(matrix);

    this.swap = new Array();
    matrix = math.matrix([[1, 0, 0 ,0], [0, 0, 1,0 ], [0, 1, 0, 0], [0, 0, 0, 1]]);
    this.swap.push(matrix);
    matrix = math.zeros(4, 4);
    this.swap.push(matrix);

    this.cnot = new Array();
    matrix = math.matrix([[0, 1], [1, 0]]);
    this.cnot.push(matrix);
    matrix = math.zeros(2, 2);
    this.cnot.push(matrix);
    
    this.getMatrix = getMatrix;
    function getMatrix(gateName){
        switch(gateName){
            case "Hadamard":
                return math.clone(this.hadamard);
                break;
            case "Pauli-X":
                return math.clone(this.pauliX);
                break;
            case "Pauli-Y":
                return math.clone(this.pauliY);
                break;
            case "Pauli-Z":
                return math.clone(this.pauliZ);
                break;
            case "Pi/8 Phase Shift":
                return math.clone(this.pi8);
                break;
            case "Pi/4 Phase Shift":
                return math.clone(this.pi4);
                break;
            case "Pi/2 Phase Shift":
                return math.clone(this.pi2);
                break;
            case "Square Root Not":
                return math.clone(this.squareRootNot);
                break;
            case "Swap":
                return math.clone(this.swap);
                break;
            case "Controlled Not":
                return math.clone(this.cnot);
                break;
        }
    }
}