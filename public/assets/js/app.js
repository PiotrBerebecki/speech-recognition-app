/* global SpeechRecognition: true */

console.clear();


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.interimResults = true;


let p = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild(p);


recognition.start();
recognition.addEventListener('end', recognition.start);


recognition.addEventListener('result', e => {
  const transcript = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('');

  p.textContent = transcript;

  if (e.results[0].isFinal) {
    p = document.createElement('p');
    words.appendChild(p);
  }

  autoScroll();
});


// Auto scroll only if required
let lastScrollHeight = document.body.scrollHeight;

function autoScroll() {
  if (document.body.scrollHeight > lastScrollHeight) {
    lastScrollHeight = document.body.scrollHeight;
    window.scrollTo(0,document.body.scrollHeight);
  }
}
