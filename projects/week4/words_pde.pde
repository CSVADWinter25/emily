import controlP5.*;
ControlP5 cp5;





// PVectors store 2 or 3 dimensional vectors


String[] words = {"aaaaaa", "can you hear me?", "aaa", "i'm freaking out", "BAD"};
String currentWord;

float slowdown = 100000;

float noiseAmount = 0;
int textsize = 12;
int transparency = 10;


color currentColor;

PVector acceleration;
PVector velocity; // velocity is the integral of acceleration
PVector position; // position is the integral of velocity

void setup() {
  size(500, 500);
  position = new PVector(width/2, height/2); // initial position
  velocity = new PVector(0,0); // initial velocity
  currentWord = words[int(random(words.length))];
  currentColor = color(0, 0, 255, random(0,255));
  
    cp5 = new ControlP5(this);



  cp5.addSlider("textsize")
    .setPosition(10, 10)
    .setRange(0, 255)
    .setLabel("big or small");
    ;

  cp5.addSlider("transparency")
    .setPosition(10, 25)
    .setRange(1, 40)
    .setLabel("tail or no tail");
    ;


  cp5.addSlider("noiseAmount")
    .setPosition(10, 40)
    .setRange(0.0, .07)
    .setLabel("noise amount");
    ; 
    
    
     cp5.addSlider("slowdown")
    .setPosition(10, 55)
    .setRange(0, 10)
    .setLabel("slow down");
    ; 
    
    
    cp5.addBang("imfeelinglucky")
     .setValue(0)
     .setPosition(10,75)
     .setSize(150,10)
     .setLabel("i'm feeling lucky");
     ;
  
  
  
  
}

void draw() {
  fill(0, transparency); // frame blur trick
  rect(0, 0, width, height);
  
  acceleration = new PVector(noise(frameCount * noiseAmount) - 0.5, noise(frameCount * 0.05 + 100000) - 0.5); // create random acceleration vector
  acceleration.normalize(); // normalize the acceleration vector to unit magnitude
  acceleration.mult(slowdown); // scale acceleration vector to random magnitude
  velocity.add(acceleration); // integrate to calculate new velocity vector
  velocity.limit(slowdown); // contrain velocity to maximum magnitude of 2 to prevent wild behavior
  position.add(velocity); // integrate to calculation new position 
  
  // draw the behavior
  noStroke();
  fill(currentColor);
   textSize(textsize); 
   text(currentWord, position.x, position.y);


// offscreen wrapping (toroidal space)
  if (position.x > width + 5) {
    currentWord = words[int(random(words.length))];
    position.x = -5;
  }
  if (position.x < -5) {
    currentWord = words[int(random(words.length))];
    position.x = width + 5;
  }
  if (position.y > height + 5) {
    currentWord = words[int(random(words.length))];
    position.y = -5;
  }
  if (position.y < -5) {
    currentWord = words[int(random(words.length))];
    position.y = height + 5;
  }
}

public void imfeelinglucky(int theValue) {
  
  currentColor = color(random(0,255), random(0,255), random(0,255), 255);
  
  textsize = int(random(0, 255));       
  transparency = int(random(1, 40));      
  noiseAmount = random(0.0, 0.07);  
  slowdown = random(0, 10); 
  

  cp5.getController("textsize").setValue(textsize);
  cp5.getController("transparency").setValue(transparency);
  cp5.getController("noiseAmount").setValue(noiseAmount);
   cp5.getController("slowdown").setValue(slowdown);
  
  
}
