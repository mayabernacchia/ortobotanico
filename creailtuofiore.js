let canvas;
const radius = 10;
const dotDiam = 10;

let topLft;
let topRgt;
let btmLft;
let btmRgt;

let pickerTopLft;
let pickerTopRgt;
let pickerBtmLft;
let pickerBtmRgt;

let areEdgesActive = false;

function setup() {
    // here goes the code executed just once
    canvas = createCanvas(600, 600);
    canvas.parent('sketch-holder');

    bgClr = color(29, 18, 62);
    background(bgClr);

    noStroke();
    createUI();
}

function createColorPickerWithLabel(hexColor, wrapper, label) {
    let container = createDiv();
    container.parent(wrapper);
    container.attribute('class', 'text-center');

    picker = createColorPicker(color(hexColor));
    picker.parent(container);

    labelP = createP(label);
    labelP.attribute('class', 'font-mono');
    labelP.parent(container);

    return picker;
}

function createUI() {
    uiWrapper = createDiv();
    uiWrapper.parent('sketch-holder');
    uiWrapper.attribute('class', 'flex flex-row justify-between mt-4');

    pickerTopLft = createColorPickerWithLabel('rgba(161, 130, 230, 0.5)', uiWrapper);
    pickerTopRgt = createColorPickerWithLabel('rgba(61, 215, 235, 0.5)', uiWrapper);
    pickerBtmLft = createColorPickerWithLabel('rgba(245, 162, 28, 0.5)', uiWrapper);
    pickerBtmRgt = createColorPickerWithLabel('rgba(244, 184, 222, 0.53)', uiWrapper);
}

function draw() {
    let xFactor = mouseX/width;
    let yFactor = mouseY/height;

    topLft = pickerTopLft.color();
    topRgt = pickerTopRgt.color();
    btmLft = pickerBtmLft.color();
    btmRgt = pickerBtmRgt.color();

    let lftClr = lerpColor(topLft, btmLft, yFactor);
    let rgtClr = lerpColor(topRgt, btmRgt, yFactor);

    pointerClr = lerpColor(lftClr, rgtClr, xFactor);
    fill(pointerClr);
    
    ellipse(mouseX, mouseY, radius*2, radius*2);
    ellipse(width-mouseX, mouseY, radius*2, radius*2);
    ellipse(mouseX, height-mouseY, radius*2, radius*2);
    ellipse(width-mouseX, height-mouseY, radius*2, radius*2);

    if (areEdgesActive) {
        fill(lerpColor(topLft, topRgt, xFactor));
        ellipse(mouseX, 0, dotDiam);

        fill(rgtClr);
        ellipse(width, mouseY, dotDiam);

        fill(lerpColor(btmLft, btmRgt, xFactor));
        ellipse(mouseX, height, dotDiam);

        fill(lftClr);
        ellipse(0, mouseY, dotDiam);
    }


    
}

function keyTyped() {
    if (key === 'i') {
        areEdgesActive = !areEdgesActive;
    } else if (key === ' ') {
        background(bgClr);
    } else if (key === 's') {
    save('ortobotanico.png');
  }
}

