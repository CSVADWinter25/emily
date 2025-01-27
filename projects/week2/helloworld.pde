color[] colors = new color[100];
int dW = 20;
int dH = 20;

char[] letter1 = {'h', 'e', 'l', 'l', 'o'};

char[] backgroundletter = {'w','o','r','l','d'};

color c;

char letter;

void setup() {
  size(200, 200);
  background(255, 255, 255);
  noStroke();

  for (int i = 0; i < 100; i++) {
    float r = random(255);
    float g = random(255);
    float b = random(255);
    colors[i] = color(r, g, b);
  }

  for (int x = 0; x < width/dW; x++) {
    for (int y = 0; y < height/dH; y++) {
      
      if (random(9) > 0.5) {
        c = color(0, 0, 255, 19);
        textSize(12);
       letter = backgroundletter[(x + y) % backgroundletter.length];
      } else {
        c = colors[int(random(100))];
        textSize(random(10, 25));
        letter = letter1[(x + y) % letter1.length];
      }
      drawCell(x * dW, y * dH, c);
    }
  }
}


void drawCell(float x, float y, color c) {
  pushMatrix(); // saves the current coordinate system to the stack (enables controlling the scope of matrix transformations)
  translate(x+dW/2, y+dH/2); // translates the origin of the coordinate system to a new position
  fill(c);
  text(letter, 0, 0); // draws the rectangle at the origin of the rotated coordinate system (rW/2, y+rH/2)
  popMatrix();
}
