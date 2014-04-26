function Gate(name){
    this.step = null;
    
    this.name = name;
    this.label = setLabel(name);
    this.graphic = new GateGraphic();
    this.children = new Array();
}

function Gate(name, step){
    this.step = step;
    
    this.name = name;
    this.label = setLabel(name);
    this.graphic = new GateGraphic();
    this.children = new Array();
}

function Gate(name, step, owner){
    this.step = step; 
    
    this.name = name;
    this.label = setLabel(name);
    this.graphic = new GateGraphic();
    this.owner = owner;
    this.children = new Array();
}

function GateGraphic(){
    this.group;
}

function setLabel(name){
    switch(name){
        case "Hadamard":
            return "H";
        case "Pauli-X":
            return "X";
        case "Pauli-Y":
            return "Y";
        case "Pauli-Z":
            return "Z";
        case "Pi/8 Phase Shift":
            return "Pi/8";
        case "Pi/4 Phase Shift":
            return "Pi/4";
        case "Pi/2 Phase Shift":
            return "Pi/2";
        case "Square Root Not":
            return "srN";    
        default:
            return "";
    }
}