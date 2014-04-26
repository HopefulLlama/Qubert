var toolboxHeight = 60;
var toolboxWidth = 80;
var stepHeight = 40;
var stepWidth = 40;
var gateHeight = 30;
var gateWidth = 30;

function Painter(toolboxPaper, circuitPaper){
    this.toolboxPaper = toolboxPaper;
    this.circuitPaper = circuitPaper;
    
    /*
     *  Draw Tool Thing
     */
    this.drawTool = drawTool;
    function drawTool(tool, index){
        var xOffset = index * toolboxWidth;
        var yOffset = 0;
        tool.graphic.group = this.toolboxPaper.set();
        tool.graphic.lineLeft = this.toolboxPaper.path(["M", xOffset, yOffset+(toolboxHeight/10), "l", 0, toolboxHeight-((toolboxHeight/10)*2) ] );
        tool.graphic.group.push(tool.graphic.lineLeft);
        tool.graphic.outerBox = this.toolboxPaper.rect(xOffset, yOffset, toolboxWidth, toolboxHeight);
        tool.graphic.outerBox.attr({
            fill: "#DDDDDD",
            "stroke-this.width" : "0"
        });
        tool.graphic.outerBox.node.setAttribute("class", "raphaelGate");
        tool.graphic.group.push(tool.graphic.outerBox);
        
        tool.graphic.wire = this.toolboxPaper.path(["M", xOffset, yOffset+(toolboxHeight/2), "l", toolboxWidth, 0]);
        tool.graphic.group.push(tool.graphic.wire);
        
        tool.graphic.label = this.toolboxPaper.text(xOffset+(toolboxWidth/2), yOffset+(toolboxHeight-10), tool.gate.name);
        tool.graphic.label.attr({
            opacity: 0
        });
        tool.graphic.group.push(tool.graphic.label);
        if (tool.gate.name!="Wire"){
            tool.graphic.group.push(controller.painter.drawGate(tool.gate, toolboxWidth, toolboxHeight, xOffset, yOffset, toolboxPaper));
        }
        
        tool.graphic.group.click(
            function() {
                selectTool(index);
            }
        );
        
        tool.graphic.group.mouseover(
            function() {
                tool.graphic.highlight();
            }
        );
        tool.graphic.group.mouseout(
            function () {
                tool.graphic.unhighlight();
            }
        )
        return tool.graphic;
    }
    
    /*
     *  Draw Gate Thing
     */
    this.drawGate = drawGate;
    function drawGate(gate, width, height, xOffset, yOffset, raphael){
        if(gate.graphic.group != null){
            gate.graphic.group.forEach(function(element){
               element.remove(); 
            });
        }
        gate.graphic.group = raphael.set();
       
        var gateXOffset = xOffset + ((width - gateWidth)/2)
        var gateYOffset = yOffset + ((height - gateHeight)/2)
        
        gate.children.forEach(function(child){
            var connection = controller.painter.circuitPaper.path(["M", xOffset+(stepWidth/2), yOffset+(stepHeight/2), "L", xOffset+(stepWidth/2), child.step.qubit.id*stepHeight+(stepHeight/2) ]);
            gate.graphic.group.push(connection); 
        });
        
        if(gate.name == "Swap") {
            var line1 = raphael.path(["M", gateXOffset, gateYOffset, "l", gateWidth, gateHeight]);
            line1.attr({
                stroke: "#000000",
                "stroke-this.width" : "2", 
            });
            gate.graphic.group.push(line1);
            
            var line2 = raphael.path(["M", gateXOffset, gateYOffset+gateHeight, "l", gateWidth, -(gateHeight)]);
            
            line2.attr({
                stroke: "#000000",
                "stroke-this.width" : "2", 
            });
            gate.graphic.group.push(line2);
            
        } else if (gate.name == "Controlled Not") {
            var circle = raphael.circle(xOffset+width/2, yOffset+height/2, gateWidth/2);
            gate.graphic.group.push(circle);
            
            var verticalLine = raphael.path(["M", gateXOffset+gateWidth/2, gateYOffset, "l", 0, gateHeight]);
            verticalLine.attr({
                stroke: "#000000",
                "stroke-this.width" : "2", 
            });
            gate.graphic.group.push(verticalLine);
            
            var horizontalLine = raphael.path(["M", gateXOffset, gateYOffset+gateHeight/2, "l", gateWidth, 0]);
            horizontalLine.attr({
                stroke: "#000000",
                "stroke-this.width" : "2", 
            });
            gate.graphic.group.push(gate.horizontalLine);
            
        } else if (gate.name == "Connector") {
            var circle = raphael.circle(xOffset+width/2, yOffset+height/2, gateWidth/3);
            circle.attr({
                fill : '#000000'
            });
            gate.graphic.group.push(circle);
            
            var line = raphael.path(["M", gateXOffset+gateWidth/2, gateYOffset+gateHeight/2, "l", 0, this.height/4]);
            line.attr({
                stroke: "#000000",
                "stroke-this.width" : "2", 
            });
            gate.graphic.group.push(line);
            
        } else {
            var innerBox = raphael.rect(gateXOffset, gateYOffset, gateWidth, gateHeight);
            innerBox.attr({
                fill: "#DDDDDD",
                stroke: "#000000",
                "stroke-this.width" : "2", 
            });
            gate.graphic.group.push(innerBox);
            
            var label = raphael.text(gateXOffset+(gateWidth/2), gateYOffset+(gateHeight/2), gate.label);
            gate.graphic.group.push(label);
        }
        
        return gate.graphic.group;
    }
    
    /*
     *  Draw Qubit Thing
     */
    this.drawQubit = drawQubit;
    function drawQubit(qubit){
        if(qubit.graphic.group != null){
            qubit.graphic.group.forEach(function(element){
                element.remove();  
            });
        }
        qubit.graphic.group = this.circuitPaper.set();
        qubit.graphic.background = this.circuitPaper.rect(0, qubit.graphic.yOffset, stepWidth, stepHeight);
        qubit.graphic.background.attr({
            fill: "#EFEFEF",
            "stroke-width" : "0"
        });
        qubit.graphic.group.push(qubit.graphic.background);
        
        qubit.graphic.wire = this.circuitPaper.path(["M", (stepWidth/4)*3, qubit.graphic.yOffset+stepHeight/2, "l", stepWidth/4, 0 ]);
        qubit.graphic.group.push(qubit.graphic.wire);
        
        qubit.graphic.text = this.circuitPaper.text(stepWidth/3, qubit.graphic.yOffset+stepHeight/2, "|"+qubit.startState+") ");
        qubit.graphic.text.attr({
            "font-size": 16
        });
        qubit.graphic.group.push(qubit.graphic.text);
        
        qubit.graphic.group.mouseover(
            function() {
                qubit.graphic.highlight();
            }
        );
        
        qubit.graphic.group.mouseout(
            function() {
                qubit.graphic.unhighlight();
            }
        );
        
        qubit.graphic.group.click(
            function () {
                qubit.changeStartState();
                controller.painter.drawQubit(qubit);
            }
        );
        qubit.steps.forEach(function(step){
            controller.painter.drawStep(step); 
        });
        return qubit.graphic;
    }
    
    /* 
     * Draw Step Thing
     */
    this.drawStep = drawStep;
    function drawStep(step){
        if(step.graphic.group != null){
            step.graphic.group.forEach(function(element){
                element.remove(); 
            });
        }
        step.graphic.group = this.circuitPaper.set();
        step.graphic.background = this.circuitPaper.rect(step.graphic.xOffset, step.graphic.yOffset, stepWidth, stepHeight);
        step.graphic.background.attr({
            fill: "#EFEFEF",
            "stroke-width" : "0"
        });
        step.graphic.group.push(step.graphic.background);
        
        step.graphic.wire = this.circuitPaper.path(["M", step.graphic.xOffset, step.graphic.yOffset+stepHeight/2, "l", stepWidth, 0 ]);
        step.graphic.group.push(step.graphic.wire);
        
        if(step.gate != null){
            step.graphic.group.push(controller.painter.drawGate(step.gate, stepWidth, stepHeight, step.graphic.xOffset, step.graphic.yOffset, controller.painter.circuitPaper));
        }

        step.graphic.group.click(
            function() {
                step.setGate(selectedTool);
                controller.painter.drawStep(step);
                if(step.gate!=null){
                    if(step.gate.owner != null){
                        controller.painter.drawGate(step.gate.owner, stepWidth, stepHeight, step.gate.owner.step.graphic.xOffset, step.gate.owner.step.graphic.yOffset, controller.painter.circuitPaper);
                    }
                    step.gate.children.forEach(function(child){
                        controller.painter.drawGate(child, stepWidth, stepHeight, child.step.graphic.xOffset, child.step.graphic.yOffset, controller.painter.circuitPaper);
                    });
                }
                if(lastGate!=null){
                    controller.updateHelpText(false, "Place a child gate in-line with the gate just placed.");
                } else if (selectedTool == "Parent selector"){
                    controller.updateHelpText(false, "Select a parent for this gate.");
                } else {
                    controller.updateHelpText(true, selectedTool);
                }
            }
        );
        
        step.graphic.group.mouseover(
            function() {
                step.graphic.highlight();
            }
        );
        
        step.graphic.group.mouseout(
            function() {
                step.graphic.unhighlight();
            }
        );
        return step.graphic;
    } 
}