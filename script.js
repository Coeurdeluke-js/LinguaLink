const englishWordInput = document.getElementById('englishWord');
const addWordBtn = document.getElementById('addWordBtn');
const wordsList = document.getElementById('wordsList');
const flashcard = document.getElementById('flashcard');
const translationInput = document.getElementById('translationInput');
const rememberBtn = document.getElementById('rememberBtn');
const forgetBtn = document.getElementById('forgetBtn');
const flashcardsOverlay = document.getElementById('flashcardsOverlay');

let words = [];
let currentWordIndex = 0;

async function translateWord(word) {
    // Reemplaza con tu API de traducción o lógica de traducción
    // Aquí usamos un ejemplo simulado con un diccionario
    const translations = {
        'hello': 'hola',
        'goodbye': 'adiós',
        'cat': 'gato',
        'dog': 'perro'
    };
    return translations[word.toLowerCase()] || 'Traducción no encontrada';
}

async function addWord() {
    const word = englishWordInput.value.trim();
    if (word) {
        const translation = await translateWord(word);
        words.push({ english: word, translation: translation, remembered: false });
        englishWordInput.value = '';
        renderWords();
    }
}

function renderWords() {
    wordsList.innerHTML = '';
    words.forEach(word => {
        const li = document.createElement('li');
        li.textContent = `${word.english} - ${word.translation}`;
        wordsList.appendChild(li);
    });
}

function showFlashcard() {
    if (words.length > 0) {
        flashcard.textContent = words[currentWordIndex].english;
        translationInput.value = '';
        flashcardsOverlay.style.display = 'flex';
        flashcards.classList.add('show');
    } else {
        flashcard.textContent = 'Agrega palabras para repasar.';
    }
}

function nextFlashcard(remembered) {
    if (words.length > 0) {
        const translated = translationInput.value.trim().toLowerCase() === words[currentWordIndex].translation.toLowerCase();
        words[currentWordIndex].remembered = remembered && translated;
        flashcardsOverlay.style.display = 'none';
        flashcards.classList.remove('show');
        currentWordIndex = (currentWordIndex + 1) % words.length;
        showFlashcard();
    }
}

addWordBtn.addEventListener('click', addWord);
rememberBtn.addEventListener('click', () => nextFlashcard(true));
forgetBtn.addEventListener('click', () => nextFlashcard(false));

// Iniciar el repaso automáticamente al cargar la página
if (words.length > 0) {
    showFlashcard();
}

const modal = document.getElementById('modal');
const logo = document.querySelector('.logo');
const linguaLink = document.getElementById('linguaLink');

window.addEventListener('load', () => {
    // Fade in del logo
    logo.classList.add('visible');

    // Esperar 1 segundo para fade in de LinguaLink
    setTimeout(() => {
        linguaLink.classList.add('visible');
    }, 1000);

    // Esperar 3 segundos para fade out del logo y LinguaLink
    setTimeout(() => {
        logo.classList.remove('visible');
        linguaLink.classList.remove('visible');

        // Esperar 1 segundo para fade out del modal
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 1000);
    }, 3000);
});

const introModal = document.getElementById('introModal');
const closeIntroModal = document.getElementById('closeIntroModal');

closeIntroModal.addEventListener('click', () => {
    introModal.style.display = 'none';
    // Aquí puedes iniciar el fade in del modal con el logo si lo deseas
});

// El modal con el logo se mostrará después de cerrar el modal de introducción
window.addEventListener('load', () => {
    setTimeout(() => {
        modal.classList.add('visible'); // Iniciar fade in del logo
        setTimeout(() => {
            linguaLink.classList.add('visible'); // Iniciar fade in de LinguaLink
            setTimeout(() => {
                logo.classList.remove('visible');
                linguaLink.classList.remove('visible');
                setTimeout(() => {
                    modal.classList.add('hidden');
                }, 1000);
            }, 3000);
        }, 1000);
    }, 1000);
});
