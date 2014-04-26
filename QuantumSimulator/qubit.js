function Qubit(id, startState){
    this.id = id;
    this.startState = startState;
    
    this.steps = new Array();
    for(var i = 0; i < stepCount; i++){
        this.steps[i] = new Step(i, this, null);
    }
    
    this.changeStartState = changeStartState;
    function changeStartState(){
        var qubit = this;
        if(qubit.startState == 0){
            qubit.startState = 1;
        } else {
            qubit.startState = 0;
        }
    }
    
    this.graphic = new QubitGraphic(this);
}

function QubitGraphic(qubit){
    this.group;
    
    this.yOffset = qubit.id * stepHeight;
    this.background;
    this.wire;
    this.text;
    
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