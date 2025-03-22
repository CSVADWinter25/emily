## Final Project Readme


[i can make fonts? right, right, right.](https://editor.p5js.org/sneaky-felix/sketches/_zUjbcgRY)


This project asks quite a few questions: like how are fonts born? And what happens when we stretch the conditions of typographic life?

A major influence for this project is Font Gauntlet by Dinamo. Its playful, clean interface allows designers to explore variable fonts. The way Font Gauntlet visualizes complexity without overwhelming the user became a guiding inspiration for how this tool might eventually look and feel.

Another conceptual influence is Camille Utterback’s Text Rain, an interactive installation where falling letters respond to users’ bodies in space. This work repositions language as something physical, reactive, and poetic. It opened up the idea that type could be dynamic and situational, again, not just a visual form, but rather an experience.

The goal for my project was to create a typographic sandbox. In this case, an interactive, web-based space where users could blend and manipulate existing fonts in real time. Rather than designing a single, polished typeface, this project seeks to build a system where type is alive and unstable. Letterforms are allowed to morph, blur, deform, and sometimes fall apart entirely. Through the combination of multiple font sources and user-controlled parameters, the project explores what exists along the spectrum between readable and unreadable, between design and deformation.

At a foundational level, the project set out to:

→ Build a system that allows users to average and blend a group of fonts

→ Allow users to upload their own fonts into the system

→ Provide sliders or controls for adjusting how much each font influences the final output

→ Offer basic parametric control over typographic anatomy (e.g., x-height, width, spacing)


The final result is a browser-based interactive tool that lets users select from a preloaded group of ~10 fonts and adjust their influence on the generated output. Users can upload their own fonts and manually determine how much each one contributes to the blended result. The system also provides sliders for manipulating typographic features such as width, height, and spacing.

Using p5.js, the prototype leverages the textToPoints() function to convert text into editable points for visual transformation. In cases where more control is needed, opentype.js could be implemented to access raw glyph data and manipulate it directly. I however did not do it, because it became far more difficult and complicated than I anticipated. 

I generally was pleased and interested in how the generated letterforms were formed. There was a large range: some are surprisingly legible and I could see them being used at a trendy coffee shop in Silverlake, while others I have entirely no idea if it is a P or a Q. I quite like that the system does not attempt to preserve the correctness of type, but rather invites users to explore and break it. The goal does not always have to be something functional. it’s to give users the ability to ask, what if?

I’d like to add that this project faced a variety of technical problems. Some of the key limitations included:

→ Lack of deep understanding of opentype.js. Everytime I tried to add this in I felt like I’d completely lost the funkiness and weirdness averaging I was getting with textToPoint()

→ Default GUI limitations: The project currently uses QuickSettings.js to create the GUI sliders and controls. While this library is functional, it doesn’t reflect the visual personality of the project. The generated letterforms are odd and novel, but the interface feels rigid and generic. I wish I’d had more time to really play with the GUI and make it feel more playful and experimental.


Overall, I see this project not as a finished piece but as a prototype. Obviously, there are a lot of (in the future) that have already been mentioned but I think the biggest one i’d like to see implemented is a public archive of user-generated letterforms. 


here is an alphabet poster composed of a variety of generations / iterations from the site itself. (will update with better poster)

<img width="425" alt="Screenshot 2025-03-22 at 00 14 15" src="https://github.com/user-attachments/assets/50c8f105-13a3-46d3-aec1-885c9fd371c6" />

