function Tool(gate){
    this.selected = false;
    this.gate = new Gate(gate);
    this.graphic = new toolGraphic(this);
}

function toolGraphic(tool){
    this.tool = tool;
    this.group;
    this.lineLeft;
    this.outerBox;
    this.wire;
    this.label;
    
    this.highlight = highlight;
    function highlight(){
        this.outerBox.attr({ 
            fill: '#EFEFEF'
        })
        this.label.attr({
           opacity: 1
        });
    }
    
    this.unhighlight = unhighlight;
    function unhighlight(){
        if(!tool.selected){
            this.outerBox.attr({
                fill: '#DDDDDD'
            });
            this.label.attr({
                opacity: 0
            });
        }
    }
}