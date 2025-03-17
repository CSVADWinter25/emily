
// seperate 1. series of prints abcdef 
// one for overall average of fonts 
// one for overall class fonts //mini-prints for classmates 



// larger stretch goals svg to ttf 

// seperated stretch goal create my own GUI // i don't really like the quicksettings one 


let c;

let fontList = [
  { name: "Arial", file: "ARIAL.TTF" },
  { name: "Times New Roman", file: "times-new-roman.ttf" },
  { name: "Georgia", file: "georgia.ttf" },
  { name: "Roboto", file: "roboto.ttf" },
  { name: "Helvetica", file: "Helvetica.ttf" },
  { name: "PT Serif", file: "PTSerif-Regular.ttf" }
];


let fontMap = {};
let fontWeights = {};

// Our line-wrapped data
// linesData = [ { words: [ { xOffset, letters: [ { points: [ {x,y}, ... ] } ] } ] } ]
let linesData = [];


let params = {
  text: "a b c d e f g h i j k l m n o p q r s t u v w x y z",
  fontSize: 200,
  letterSpacing: 50,
  swirlAmp: 14,
  swirlFreq: 0.14,
  widthScale: 1.14,
  heightScale: 1.48,
  strokeThickness: 1.4
};


const measuringFontName = "Arial";
let measuringFont;

const margin = 50;    
let maxLineWidth;  

function preload() {
  for (let f of fontList) {
    fontMap[f.name] = loadFont(f.file);
  }
}

function setup() {
  let c = createCanvas(1600, 1200); 
  background(255,255,255);
  c.parent("canvasContainer"); 
  noLoop();


  for (let f of fontList) {
    if (f.name === "Arial") {
      fontWeights[f.name] = 200;
    } if  (f.name === "Times New Roman") {
      fontWeights[f.name] = 48;
    }
    else {
      fontWeights[f.name] = 0;
    }
  }

  measuringFont = fontMap[measuringFontName];
  maxLineWidth = width - margin*2;


  let gui = QuickSettings.create(1250, 20, "make a font (scroll)");
  
    gui.setWidth(200);
    gui.setHeight(130);
  
  gui.addText("text", params.text, (val) => {
    params.text = val || "";
    buildLinesData();
  });
  gui.addRange("font size", 20, 300, params.fontSize, 1, (val) => {
    params.fontSize = val;
    buildLinesData();
  });
  gui.addRange("letter spacing", 0, 100, params.letterSpacing, 1, (val) => {
    params.letterSpacing = val;
    buildLinesData();
  });
  gui.addRange("swirl Amp", -30, 30, params.swirlAmp, 1, (val) => {
    params.swirlAmp = val;
    redraw();
  });
  gui.addRange("swirl freq", 0.01, 0.2, params.swirlFreq, 0.01, (val) => {
    params.swirlFreq = val;
    redraw();
  });
  gui.addRange("width scale", 0.5, 2, params.widthScale, 0.01, (val) => {
    params.widthScale = val;
    redraw();
  });
  gui.addRange("height scale", 0.5, 2, params.heightScale, 0.01, (val) => {
    params.heightScale = val;
    redraw();
  });
  for (let f of fontList) {
    gui.addRange(f.name + " weight", 0, 200, fontWeights[f.name], 1, (val) => {
      fontWeights[f.name] = val;
      buildLinesData();
    });
  }
  gui.addRange("stroke Weight", 0.5, 5, params.strokeThickness, 0.1, (val) => {
    params.strokeThickness = val;
    redraw();
  });

  gui.addButton("save as SVG", () => {
    saveAsSVG();
  });

  buildLinesData();
}

// build the line-wrapped data
function buildLinesData() {
  linesData = [];
  if (!measuringFont) {
    redraw();
    return;
  }
  textFont(measuringFont);
  textSize(params.fontSize);

  let rawLines = params.text.split("\n");
  for (let rawLine of rawLines) {
    let words = rawLine.split(" ");
    let lineWords = [];
    let currentX = 0;

    for (let w of words) {
      let wWidth = measureWordWidth(w);
      if (currentX + wWidth > maxLineWidth && lineWords.length > 0) {
        // push the current line
        linesData.push({ words: lineWords });
        lineWords = [];
        currentX = 0;
      }
      let wordData = buildWordData(w);
      wordData.xOffset = currentX;
      lineWords.push(wordData);
      currentX += wWidth;
    }
    if (lineWords.length > 0) {
      linesData.push({ words: lineWords });
    }
  }
  redraw();
}

// measure a word's width with measuringFont + letterSpacing
function measureWordWidth(word) {
  let wWidth = 0;
  for (let i = 0; i < word.length; i++) {
    let c = word[i];
    wWidth += textWidth(c) + params.letterSpacing;
  }
  return wWidth;
}

// build data for a single word => array of letters => array of swirl points
function buildWordData(word) {
  let letters = [];
  let xPos = 0;
  for (let i = 0; i < word.length; i++) {
    let c = word[i];
    let letterPts = buildLetterPoints(c, xPos);
    letters.push({ points: letterPts });
    let lw = textWidth(c) + params.letterSpacing;
    xPos += lw;
  }
  return { letters };
}

// weighted average of letter c across all fonts with weight>0
function buildLetterPoints(c, xPos) {
  let sumWeight = 0;
  for (let f of fontList) {
    sumWeight += fontWeights[f.name];
  }
  if (sumWeight <= 0) return [];

  // gather points from each font
  let arrays = [];
  let maxCount = 0;
  for (let f of fontList) {
    let w = fontWeights[f.name];
    if (w > 0) {
      let p5Font = fontMap[f.name];
      let arr = p5Font.textToPoints(c, xPos, 0, params.fontSize, { sampleFactor: 0.2 });
      arrays.push({ weight: w, pts: arr });
      if (arr.length > maxCount) maxCount = arr.length;
    }
  }

  let finalPts = [];
  for (let i = 0; i < maxCount; i++) {
    let sumX = 0, sumY = 0, totalW = 0;
    for (let obj of arrays) {
      if (i < obj.pts.length) {
        sumX += obj.pts[i].x * obj.weight;
        sumY += obj.pts[i].y * obj.weight;
        totalW += obj.weight;
      }
    }
    if (totalW > 0) {
      finalPts.push({ x: sumX/totalW, y: sumY/totalW });
    }
  }
  return finalPts;
  
}




function draw() {
  background(255);
  stroke(0, 0, 255);
  strokeWeight(params.strokeThickness);
  noFill();

  // bounding box measure pass
  let minX = Infinity, maxX = -Infinity;
  let minY = Infinity, maxY = -Infinity;

  //  measure swirl bounding box
  for (let lIndex = 0; lIndex < linesData.length; lIndex++) {
    let line = linesData[lIndex];
    let lineY = lIndex * (params.fontSize * 1.2);
    for (let w of line.words) {
      let wordX = w.xOffset;
      for (let letter of w.letters) {
        for (let p of letter.points) {
          // swirl
          let sx = p.x * params.widthScale + sin(p.y * params.swirlFreq) * params.swirlAmp;
          let sy = p.y * params.heightScale + cos(p.x * params.swirlFreq) * params.swirlAmp;
          // then shift by lineY, wordX
          sx += wordX;
          sy += lineY;

          if (sx < minX) minX = sx;
          if (sx > maxX) maxX = sx;
          if (sy < minY) minY = sy;
          if (sy > maxY) maxY = sy;
        }
      }
    }
  }


  if (minX === Infinity) return;

  
  let extraMargin = 50;
  let xShift = margin - minX;
  let yShift = margin - minY;

  
  push();
  translate(xShift, yShift);

  for (let lIndex = 0; lIndex < linesData.length; lIndex++) {
    let line = linesData[lIndex];
    let lineY = lIndex * (params.fontSize * 1.2);
    for (let w of line.words) {
      let wordX = w.xOffset;
      // draw each letter
      for (let letter of w.letters) {
        beginShape();
        for (let p of letter.points) {
          let sx = p.x * params.widthScale + sin(p.y * params.swirlFreq) * params.swirlAmp;
          let sy = p.y * params.heightScale + cos(p.x * params.swirlFreq) * params.swirlAmp;
          sx += wordX;
          sy += lineY;
          vertex(sx, sy);
        }
        endShape();
      }
    }
  }

  pop();

  
  
}


