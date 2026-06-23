# HorizonTechX Calculator

A simple, responsive calculator built with HTML, CSS, and JavaScript. Features:

- Basic arithmetic: addition (+), subtraction (−), multiplication (×), division (÷)
- Real-time preview of results as you type
- Clear (C) and backspace (⌫) functions
- Keyboard support: numbers, + - * /, Enter to evaluate, Backspace to delete, Esc to clear
- Responsive layout and polished styling

Files
- index.html — app UI
- styles.css — styling
- script.js — logic and keyboard handlers

How to use
1. Clone or open the repository in your browser:

   https://github.com/pooja-12572/HorizonTechX_ProjectName

2. Open `index.html` in a browser or serve with a static server (recommended):

   python -m http.server 8000
   open http://localhost:8000

Development notes
- Expression evaluation uses a restricted runtime (Function) and a whitelist regex to avoid arbitrary code execution. This is acceptable for a simple frontend calculator demo but not for untrusted server-side code execution.

Improvements you can add
- Parentheses matching helper and input validation UI
- Advanced operations (sin, cos, power)
- Theme toggle, animations, or accessibility enhancements

License
MIT
