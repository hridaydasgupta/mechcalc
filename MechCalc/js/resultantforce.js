let forces = [];
        
    function addForces() {
        const forceCount = parseInt(document.getElementById('force-count').value);
        const forcesDiv = document.getElementById('forces');
        forcesDiv.innerHTML = '';
        
            for (let i = 0; i < forceCount; i++) {
                const forceInput = document.createElement('div');
                forceInput.innerHTML = `
                    <div class="card-body p-3">
                        <div class="row">
                            <div class="col-12 col-md-6  mb-sm-3">
                                <div class="bg-info d-flex force-label-input justify-content-between align-items-center text-white rounded">
                                    <label for="force-${i}-magnitude" class="text-nowrap m-0 ml-1">Force ${i + 1} Magnitude : </label>
                                    <input type="number" class="form-control form-control-sm ml-2 ml-sm-3" id="force-${i}-magnitude" value="10">
                                </div>
                            </div>
                            <div class="col-12 col-md-6 my-2 my-sm-0  mb-sm-3">
                                <div class="bg-info d-flex force-label-input justify-content-between align-items-center text-white rounded">
                                    <label for="force-${i}-angle" class="text-nowrap m-0 ml-1">Force ${i + 1} Angle (°) : </label>
                                    <input type="number" class="form-control form-control-sm ml-2 ml-sm-3" id="force-${i}-angle" value="45">
                                </div>
                            </div>
                            <div class="col-md-2 col-6 pr-sm-1">
                                <button class="btn btn-light btn-sm btn-block axis-button" id="force-${i}-x-axis" onclick="chooseAxis('x', ${i})">X-axis</button>
                            </div>
                            <div class="col-md-2 col-6 pl-sm-1">
                                <button class="btn btn-light btn-sm btn-block axis-button" id="force-${i}-y-axis" onclick="chooseAxis('y', ${i})">Y-axis</button>
                            </div>
                            <div class="col-md-2 col-3 mt-2 mt-sm-0 pr-1"><button class="btn btn-light btn-sm btn-block quadrant-button" id="force-${i}-q1" onclick="chooseQuadrant(1, ${i})">Quad 1</button></div>
                            <div class="col-md-2 col-3 mt-2 mt-sm-0 px-1"><button class="btn btn-light btn-sm btn-block quadrant-button" id="force-${i}-q2" onclick="chooseQuadrant(2, ${i})">Quad 2</button></div>
                            <div class="col-md-2 col-3 mt-2 mt-sm-0 px-1"><button class="btn btn-light btn-sm btn-block quadrant-button" id="force-${i}-q3" onclick="chooseQuadrant(3, ${i})">Quad 3</button></div>
                            <div class="col-md-2 col-3 mt-2 mt-sm-0 pl-1"><button class="btn btn-light btn-sm btn-block quadrant-button" id="force-${i}-q4" onclick="chooseQuadrant(4, ${i})">Quad 4</button></div>
                        </div>
                    </div>
        `;
                    forcesDiv.appendChild(forceInput);
                    document.getElementById(`force-${i}-x-axis`).classList.add('selected');
                    document.getElementById(`force-${i}-q1`).classList.add('selected');
                    document.querySelector("#forces").classList.add("showForces");
                    document.querySelector("#result").classList.remove("showResult");
            }
    }
        
    function chooseAxis(newAxis, forceIndex) {
        const xAxisButton = document.getElementById(`force-${forceIndex}-x-axis`);
        const yAxisButton = document.getElementById(`force-${forceIndex}-y-axis`);
        
        if (newAxis == 'x') {
            xAxisButton.classList.add('selected');
            yAxisButton.classList.remove('selected');
        } else {
            yAxisButton.classList.add('selected');
            xAxisButton.classList.remove('selected');
        }
        
        forces[forceIndex] = { ...forces[forceIndex], axis: newAxis };
    }
        
    function chooseQuadrant(quadrant, forceIndex) {
        for (let q = 1; q <= 4; q++) {
            document.getElementById(`force-${forceIndex}-q${q}`).classList.remove('selected');
        }
        document.getElementById(`force-${forceIndex}-q${quadrant}`).classList.add('selected');
        
        forces[forceIndex] = { ...forces[forceIndex], quadrant: quadrant };
    }

    function formatNumber(num) {
        const rounded = parseFloat(num.toFixed(2));
        return Number.isInteger(rounded) ? rounded.toString() : rounded.toFixed(2).replace(/\.?0+$/, "");
    }


        
    function calculateResultant() {
        forces = [];
        const forceCount = parseInt(document.getElementById('force-count').value);
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = '';
        
        let fxSteps = "∑Fx  = ";
        let fySteps = "∑Fy = ";
        
        let resultantX = 0;
        let resultantY = 0;
        
        for (let i = 0; i < forceCount; i++) {
            const magnitude = formatNumber(parseFloat(document.getElementById(`force-${i}-magnitude`).value));
            const angle = parseFloat(document.getElementById(`force-${i}-angle`).value);
            const axis = document.getElementById(`force-${i}-x-axis`).classList.contains('selected') ? 'x' : 'y';
            let quadrant = 1;
        
            for (let q = 1; q <= 4; q++) {
                if (document.getElementById(`force-${i}-q${q}`).classList.contains('selected')) {
                    quadrant = q;
                    break;
                }
            }
        
            let adjustedAngle = formatNumber(axis === 'y' ? 90 - angle : angle);
            let x = magnitude * Math.cos(adjustedAngle * Math.PI / 180);
            let y = magnitude * Math.sin(adjustedAngle * Math.PI / 180);
    
            if (quadrant == 2 || quadrant == 3) {
                x = -x;
                fxSteps += `${i < 0 ? " - " : " - "}${magnitude} * cos(${adjustedAngle}°)`;
            } else {
                fxSteps += `${i > 0 ? " + " : ""}${magnitude} * cos(${adjustedAngle}°)`;
            }
            if (quadrant === 3 || quadrant === 4) {
                y = -y;
                fySteps += `${i < 0 ? " - " : " - "}${magnitude} * sin(${adjustedAngle}°)`;
            } else {
                fySteps += `${i > 0 ? " + " : ""}${magnitude} * sin(${adjustedAngle}°)`;
            }
        
            resultantX += x;
            resultantY += y;
        }
        
        const resultantMagnitude = formatNumber(Math.sqrt(resultantX ** 2 + resultantY ** 2));
        const resultantAngle = formatNumber(Math.atan2(Math.abs(resultantY), Math.abs(resultantX)) * 180 / Math.PI);
        
      let epsilon = 0.001; // Threshold to handle floating-point inaccuracies
let resultantQuadrant = 'The resultant force lies ';

if (Math.abs(resultantX) < epsilon && Math.abs(resultantY) < epsilon) {
    resultantQuadrant = "There is no resultant force. <br>The system is in equilibrium";
} else if (resultantX > epsilon && resultantY > epsilon) {
    resultantQuadrant += "in Quadrant 1";
} else if (resultantX < -epsilon && resultantY > epsilon) {
    resultantQuadrant += "in Quadrant 2";
} else if (resultantX < -epsilon && resultantY < -epsilon) {
    resultantQuadrant += "in Quadrant 3";
} else if (resultantX > epsilon && resultantY < -epsilon) {
    resultantQuadrant += "in Quadrant 4";
} else if (Math.abs(resultantY) < epsilon) {
    resultantQuadrant += (resultantX > 0) ? "on Positive X-axis" : "on Negative X-axis";
} else if (Math.abs(resultantX) < epsilon) {
    resultantQuadrant += (resultantY > 0) ? "on Positive Y-axis" : "on Negative Y-axis";
}

        let xComponentText = `∑Fx = ${formatNumber(resultantX)} N`;
        if(Math.abs(resultantX) > 0.001){
            xComponentText += `<br>∑Fx = ${Math.abs(formatNumber(resultantX))} N ${resultantX >= 0 ? "( → )" : "( ← )"}<br>`;
        }
        
        let yComponentText = `∑Fy = ${formatNumber(resultantY)} N`;
        if(Math.abs(resultantY) > 0.001){
            yComponentText += `<br>∑Fy = ${Math.abs(formatNumber(resultantY))} N ${resultantY >= 0 ? "( ↑ )" : "( ↓ )"}`;
        }

        let canvasHTML;
if (resultantX === 0 && resultantY === 0) {
    canvasHTML = ' ';
}else{
  canvasHTML = `
   <canvas id="resultantCanvas" width="300" height="300" 
      style="border:1px solid #ccc; display:block; margin:auto; margin-top:20px;">
    </canvas>`;
}

        resultDiv.innerHTML = `
        <div class="card-body p-3">
            <h5>Resultant of Coplanar Force System Calculation Steps: </h5>
            <p>${fxSteps} <br>${xComponentText}</p>
            <p>${fySteps} <br>${yComponentText}</p>
            <p class="text-nowrap">\\( Formula: \\)</p>
            <div class="latex-formula">
            <p class="text-nowrap">\\( R = \\sqrt{(\\sum Fx)^2 + (\\sum Fy)^2} \\)</p>
            <p class="text-nowrap">\\( R = \\sqrt{(${formatNumber(resultantX)})^2 + (${formatNumber(resultantY)})^2} \\)</p>
            </div>
            <p class="text-nowrap">\\( R = ${resultantMagnitude} \\text{ N} \\)</p>
            <p>\\( Formula: \\)<br>\\( θ = \\tan^{-1}\\left( \\frac{\\sum Fy}{\\sum Fx} \\right) \\)</p>
            <p class="text-nowrap">\\( θ = \\tan^{-1}\\left( \\frac{${Math.abs(formatNumber(resultantY))}}{${Math.abs(formatNumber(resultantX))}} \\right) \\)<br>
            \\( θ = ${resultantAngle}^\\circ \\)</p>
            <p class="mb-2">${resultantQuadrant}.</p>
            ${canvasHTML}
        </div>
        `;
    MathJax.typeset();
    document.querySelector("#result").classList.add("showResult");
    
if(resultantX === 0 && resultantY ===0){
    return;
}else{
const canvas = document.getElementById("resultantCanvas");
const ctx    = canvas.getContext("2d");
ctx.clearRect(0, 0, canvas.width, canvas.height);

const w = canvas.width, h = canvas.height;
const pad          = 40;     
const axisLength   = 200;    
const resultLength =  180;   
const arcRadius    =  50;    


let originX, originY;

if (resultantX > 0 && resultantY > 0) {            
  originX = pad;        originY = h - pad;
} else if (resultantX < 0 && resultantY > 0) {     
  originX = w - pad;    originY = h - pad;
} else if (resultantX < 0 && resultantY < 0) {    
  originX = w - pad;    originY = pad;
} else if (resultantX > 0 && resultantY < 0) {    
  originX = pad;        originY = pad;
} else if (resultantX !== 0 && resultantY === 0) {
  originX = (resultantX > 0) ? pad : w - pad;
  originY = h - pad;
} else if (resultantY !== 0 && resultantX === 0) { 
  originX = pad;
  originY = (resultantY > 0) ? h - pad : pad;
}


const xDir = (resultantX >= 0) ?  1 : -1;   
const yDir = (resultantY >= 0) ? -1 :  1;  

const angleRad    = Math.atan2(resultantY,  resultantX);
const canvasAngle = Math.atan2(-resultantY, resultantX);

ctx.strokeStyle = ctx.fillStyle = "black";
ctx.lineWidth   = 2;

ctx.beginPath();
ctx.moveTo(originX, originY);
ctx.lineTo(originX + axisLength * xDir, originY);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(originX + axisLength * xDir, originY);
ctx.lineTo(originX + axisLength * xDir - 6 * xDir, originY - 5);
ctx.lineTo(originX + axisLength * xDir - 6 * xDir, originY + 5);
ctx.closePath(); ctx.fill();
ctx.fillText("X", originX + axisLength * xDir + 8 * xDir, originY + 12);

ctx.beginPath();
ctx.moveTo(originX, originY);
ctx.lineTo(originX, originY + axisLength * yDir);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(originX, originY + axisLength * yDir);
ctx.lineTo(originX - 5, originY + axisLength * yDir - 6 * yDir);
ctx.lineTo(originX + 5, originY + axisLength * yDir - 6 * yDir);
ctx.closePath(); ctx.fill();
ctx.fillText("Y",
             originX - 15,
             originY + axisLength * yDir + (yDir === -1 ? -5 : 18));

const endX = originX + resultLength * Math.cos(angleRad);
const endY = originY - resultLength * Math.sin(angleRad); // canvas Y inverted

ctx.strokeStyle = "blue";
ctx.fillStyle   = "blue";
ctx.lineWidth   = 2;
ctx.beginPath();
ctx.moveTo(originX, originY);
ctx.lineTo(endX, endY);
ctx.stroke();

/* arrow‑head */
const head = 10;
ctx.beginPath();
ctx.moveTo(endX, endY);
ctx.lineTo(endX - head * Math.cos(angleRad - Math.PI / 6),
           endY + head * Math.sin(angleRad - Math.PI / 6));
ctx.lineTo(endX - head * Math.cos(angleRad + Math.PI / 6),
           endY + head * Math.sin(angleRad + Math.PI / 6));
ctx.closePath(); ctx.fill();

/* labels */
ctx.fillStyle = "blue";
ctx.font = "14px Arial";
let rLabelX = endX;
let rLabelY = endY; 
let rOffsetY = 0;

if (Math.abs(resultantAngle) < 20) {
  rOffsetY = (resultantY >= 0) ? -40 : 40;
}else if(resultantX > 0 && resultantY > 0){
    rLabelX += 10;
    rLabelY -= 10;
}else if(resultantX < 0 && resultantY > 0){
    rLabelX -= 10;
    rLabelY -= 10;
}else if(resultantX > 0 && resultantY < 0){
    rLabelX += 10;
    rLabelY += 10;
}
else if (resultantX < 0 && resultantY < 0) {   // Q3
  rLabelX -= 85;
  rLabelY += 20;
}
ctx.fillText(`R = ${resultantMagnitude} N`, rLabelX, rLabelY + rOffsetY);

ctx.strokeStyle = "blue";
ctx.fillStyle   = "blue";
ctx.lineWidth   = 1.5;

const arcStart = (resultantX >= 0) ? 0 : Math.PI;

let theta = canvasAngle;
if (theta < 0) theta += 2 * Math.PI;

let delta = theta - arcStart;
if (delta < 0) delta += 2 * Math.PI;
const anticlk = delta > Math.PI;

ctx.beginPath();
ctx.arc(originX, originY, arcRadius, arcStart, theta, anticlk);
ctx.stroke();

const mid = anticlk
  ? arcStart - (2 * Math.PI - delta) / 2
  : arcStart + delta / 2;

let labelX = originX + (arcRadius + 10) * Math.cos(mid);
let labelY = originY + (arcRadius + 10) * Math.sin(mid);

if (resultantX < 0) {
  labelX -= 60; 
}

let thetaOffsetY = 0;

if (resultantAngle < 20) {
  thetaOffsetY = (resultantY >= 0) ? -35 : 50;
}else if(resultantY < 0 && resultantAngle > 20.001){
    thetaOffsetY = 5;
}
ctx.fillText(`θ = ${resultantAngle}°`, labelX, labelY + thetaOffsetY);
}
}