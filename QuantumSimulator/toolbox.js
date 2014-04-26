var selectedTool;
var lastGate;
var isChild;

var tools;
function initialiseToolbox(){
    // Set up the tools required in the tool box. This way we can see how large the SVG container needs to be.
    initTools();
    // Draw tools in toolbox;
    drawTools();
    selectTool(0);
}

function initTools(){
    tools = new Array();
    tools[0] = new Tool("Hadamard");
    tools[1] = new Tool("Pauli-X");
    tools[2] = new Tool("Pauli-Y");
    tools[3] = new Tool("Pauli-Z");
    tools[4] = new Tool("Pi/8 Phase Shift");
    tools[5] = new Tool("Pi/4 Phase Shift");
    tools[6] = new Tool("Pi/2 Phase Shift");
    tools[7] = new Tool("Square Root Not");
    tools[8] = new Tool("Swap");
    tools[9] = new Tool("Controlled Not");
    tools[10] = new Tool("Connector");
    tools[11] = new Tool("Wire");
    controller.painter.toolboxPaper.setSize(tools.length*toolboxWidth, toolboxHeight);
}

function selectTool(index){
    lastGate = null;
    for(var counter = 0; counter < tools.length; counter++){
        if(counter == index){
            tools[counter].selected = true;
            tools[counter].graphic.highlight();
            selectedTool = tools[counter].gate.name;
        } else {
            tools[counter].selected = false;
            tools[counter].graphic.unhighlight();
        }
    }
    controller.updateHelpText(true, selectedTool);
}

function drawTools(){
    for (var i = 0; i < tools.length; i++){
        controller.painter.drawTool(tools[i], i);
    }
}