## Project Proposal 

i can make fonts? right, right, right. 

this project investigates how are fonts born? and more radically: what happens when we stretch the conditions of typographic life?

a major conceptual and visual influence is [Font Gauntlet by Dinamo](https://fontgauntlet.com/)—a playful interface that allows designers to explore and visualize the font's they've created. it offers a framework for thinking about real-time typographic manipulation in a GUI format that is incredibly intuitive and clean (at least to me) 

another grounding influence is camille utterback’s [Text Rain](https://camilleutterback.com/projects/text-rain/), which reimagines language as something physically interactive and responsive—bringing the body into conversation with text. within this, it becomes clear how generative systems can expand our knowledge of text. 


at its core, this project is a typographic sandbox. it allows users to explore how letterforms can be averaged, blended, and pushed—structurally and stylistically—through a parametric interface that follows the anatomy of type.

--> users can select a preloaded set of ~10 fonts.
--> users can add their own font. 
--> users can manually adjust how much influence each font has on the generated result.

--> users can play with typographic features (height, width, spacing, etc) for more manipulation.


the aim of the project is to allow room for readibility and abstraction. this project invites users to move along a spectrum from legible to abstract, embracing moments when language begins to fall apart or become something else entirely.

in this way, the project isn't just for casual play (it totally can be). rather, it's positioned as a speculative tool for type designers, artists, and anyone interested in the boundaries of letterform legibility and aesthetic logic.

**primary implementation challenges**
-->  creating a technical framework to interpolate font outlines while maintaining consistent structure across glyphs.
1. texttopoints will work for now
2. opentype.js (can read glpyh data) 

**primary design challenges**
--> building a GUI that invites users: clean, simple, minimalstic. 
1. perhaps stretch goal build my own gui? 


**ideas for evaluating project success**
--> ideally, this project values exploration over outcome. meaning, does the tool invite meaningful experimentation? do type designers find unexpected value, inspiration, or critique in the distortions and blends?

--> ideally, user's have agency. meaning, can users intuitively manipulate parameters and feel somewhat in control of the typographic behavior?


**sketches or reference materials**

as mentioned before, Font Gauntlet is a huge inspiration as a tool for GUI (sliders, controls, buttons, etc) 

here are a few reference photos of Font Gauntlet 
--> <img width="257" alt="Screenshot 2025-03-22 at 00 03 28" src="https://github.com/user-attachments/assets/6a2f2948-7918-480d-8d59-55081192bc3e" />
--> <img width="1131" alt="Screenshot 2025-03-22 at 00 04 15" src="https://github.com/user-attachments/assets/a640e494-3b3c-47d7-8387-a5e8c7fa93a4" />
--> <img width="1130" alt="Screenshot 2025-03-22 at 00 04 44" src="https://github.com/user-attachments/assets/4530fdf4-16ed-43b1-884f-e07ad045fce8" />


few references on typographic anatomy diagrams
--> ![Anatomy-of-Typography](https://github.com/user-attachments/assets/0dbe458d-6b6d-48e8-86f1-0c4e55148934)




few references of early generations produced 
--> <img width="633" alt="Screenshot 2025-03-03 at 16 52 02" src="https://github.com/user-attachments/assets/6d232f0f-1507-48d8-a106-d837d57277ee" />


