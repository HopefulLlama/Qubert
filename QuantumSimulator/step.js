function Step(id, qubit, gate){
    this.id = id;
    this.gate = gate;
    this.qubit = qubit;
    
    this.graphic = new StepGraphic(this);

    this.setGate = setGate;
    function setGate(gateName){
        var step = this;
        var oldGate = this.gate;
        switch(gateName){
            case "Swap":
                if(lastGate!=null){
                    if(this.id == lastGate.step.id){
                        this.gate = new Gate(gateName, this);
                        this.gate.owner = lastGate;
                        lastGate.children.push(this.gate);
                        lastGate=null;
                    } else {
                        alert("The child element should be placed in-line with its owner on a different qubit.");
                    }
                } else {
                    this.gate = new Gate(gateName, this);
                    this.gate.owner = null;
                    lastGate = this.gate;
                }
                break;
            case "Controlled Not":
                this.gate = new Gate(gateName, this);
                this.gate.constructionComplete = false;
                lastGate = this.gate;
                selectedTool = "Connector";
                break;
            case "Connector":
                if(lastGate == null){
                    this.gate = new Gate(gateName, this);                    
                    lastGate = this.gate;
                    selectedTool = "Parent Selector";
                } else {
                    if(this.id == lastGate.step.id){
                        this.gate = new Gate(gateName, this);
                        this.gate.owner = lastGate;
                        lastGate.children.push(this.gate);
                    } else {
                        alert("The child element should be placed in-line with its owner on a different qubit.");
                    }
                }
                break;
            case "Parent Selector":
                if(this.id == lastGate.step.id){
                    if(this.gate.name != "Wire"){
                        this.gate.children.push(lastGate);
                        lastGate.owner = this.gate;
                        selectedTool = "Connector";
                        lastGate = null;
                    }
                } else {
                   alert("Parent gate should be placed in-line with the connector");
                }
                break;
            case "Wire":
                if(this.gate != null){
                    if(this.gate.owner != null) {
                        this.gate.owner = null;
                    }
                    this.gate.children = null;
                    this.gate = null;
                }
                break;
            default:
                this.gate = new Gate(gateName, this);
                break;
        }
        spliceChildFromOwner(oldGate);
    }
}

function spliceChildFromOwner(gate){
    if(gate != null){
        if(gate.parent != null){
            var index = gate.parent.children.indexOf(gate);
            gate.parent.children.splice(index, 1);
        }
    }
}

function StepGraphic(step){
    this.xOffset = (step.id+1)*stepWidth;
    this.yOffset = (step.qubit.id)*stepHeight;
    
    this.group;
    this.background;
    this.wire;

    this.highlight = highlight;
    function highlight(){
        this.background.attr({
            fill: "#999999"
        });
    }
    
    this.unhighlight = unhighlight;
    function unhighlight(){
        this.background.attr({
            fill: "#EFEFEF"
        })
    }
}