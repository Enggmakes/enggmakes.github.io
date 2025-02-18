
const textInput = document.getElementById('customText');
const fontSelect = document.getElementById('fontSelect');
const colorPicker = document.getElementById('colorPicker');
const canvas = document.getElementById('neonCanvas');
const priceDisplay = document.getElementById('price');
const ctx = canvas.getContext('2d');

const pricePerLetter = 150;


function drawNeonText() {
  const text = textInput.value || '';
  const font = fontSelect.value;
  const color = colorPicker.value;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  
  ctx.font = `70px ${font}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

 
  ctx.shadowColor = color;
  ctx.shadowBlur = 5;
  ctx.fillStyle = color;


  ctx.fillText(text, canvas.width / 2, canvas.height / 2);

  const textLength = text.replace(/\s/g, '').length; 
  const totalPrice = textLength * pricePerLetter;
  priceDisplay.textContent = totalPrice;
}
textInput.addEventListener('input', drawNeonText);
fontSelect.addEventListener('change', drawNeonText);
colorPicker.addEventListener('input', drawNeonText);
drawNeonText();
function setFormData() {
  document.getElementById('formText').value = document.getElementById('customText').value;
  document.getElementById('formFont').value = document.getElementById('fontSelect').value;
  document.getElementById('formColor').value = document.getElementById('colorPicker').value;
  document.getElementById('formPrice').value = document.getElementById('price').textContent;
}
