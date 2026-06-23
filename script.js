// script.js - Basic calculator with keyboard support and realtime preview
const expressionEl = document.getElementById('expression');
const previewEl = document.getElementById('preview');
const buttons = document.querySelectorAll('.btn');

let expr = '';

function updateDisplay(){
  expressionEl.textContent = expr || '0';
  updatePreview();
}

function sanitizeForEval(input){
  // Replace unicode operator symbols
  return input.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-').replace(/%/g, '/100');
}

function safeEvaluate(input){
  // Only allow numbers, operators, parentheses, decimal, space
  const transformed = sanitizeForEval(input);
  if(!/^[0-9+\-*/().\s]+$/.test(transformed)) return null;
  try{
    // Use Function instead of eval for slight sandboxing
    // eslint-disable-next-line no-new-func
    const fn = new Function('return ' + transformed);
    const result = fn();
    if(typeof result === 'number' && isFinite(result)) return result;
    return null;
  }catch(e){
    return null;
  }
}

function updatePreview(){
  const val = safeEvaluate(expr);
  if(val === null){
    previewEl.textContent = '';
  }else{
    // limit to 10 significant digits
    previewEl.textContent = formatNumber(val);
  }
}

function formatNumber(n){
  if(Math.abs(n) > 1e12) return n.toExponential(6);
  return parseFloat(Math.round((n + Number.EPSILON) * 1e10) / 1e10).toString();
}

function append(value){
  // Prevent leading zeros like 00
  if(expr === '0' && /[0-9]/.test(value)) expr = value;
  else expr += value;
  updateDisplay();
}

function clearAll(){ expr = ''; updateDisplay(); }
function backspace(){ expr = expr.slice(0,-1); updateDisplay(); }

function calculate(){
  const val = safeEvaluate(expr);
  if(val === null) {
    // keep the expression but indicate error briefly
    flashError();
    return;
  }
  expr = formatNumber(val);
  updateDisplay();
}

function flashError(){
  previewEl.textContent = 'Error';
  setTimeout(updatePreview, 800);
}

buttons.forEach(btn => {
  btn.addEventListener('click', ()=>{
    const v = btn.getAttribute('data-value');
    const action = btn.getAttribute('data-action');
    if(action === 'clear') clearAll();
    else if(action === 'back') backspace();
    else if(action === 'equals') calculate();
    else if(v) append(v);
  });
});

// Keyboard support
window.addEventListener('keydown', (e)=>{
  const key = e.key;
  if(/^[0-9]$/.test(key)){
    append(key);
    e.preventDefault();
    return;
  }
  if(key === '.') { append('.'); e.preventDefault(); return; }
  if(key === '+'|| key === '-'|| key === '*'|| key === '/') { append(key); e.preventDefault(); return; }
  if(key === 'Enter' || key === '=') { calculate(); e.preventDefault(); return; }
  if(key === 'Backspace'){ backspace(); e.preventDefault(); return; }
  if(key === 'Escape'){ clearAll(); e.preventDefault(); return; }
  // support unicode operators from numpad or copy-paste
  if(key === '×') { append('×'); e.preventDefault(); return; }
  if(key === '÷') { append('÷'); e.preventDefault(); return; }
});

// Initialize
clearAll();
