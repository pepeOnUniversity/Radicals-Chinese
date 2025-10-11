// Global variables
let radicals = [];
let currentQuiz = {
    questions: [],
    currentIndex: 0,
    score: 0,
    selectedAnswer: null
};
let currentModal = null;

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    loadRadicals();
    setupEventListeners();
    showSection('home'); // Default to home section
});

// Load radicals from JSON file
async function loadRadicals() {
    try {
        console.log('Loading radicals from radicals.json...');
        const response = await fetch('radicals.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        radicals = await response.json();
        console.log('Radicals loaded successfully:', radicals.length, 'items');
        console.log('Radicals with images:', radicals.filter(r => r.image).length);
        displayRadicals(radicals);
        hideLoading();
    } catch (error) {
        console.error('Error loading radicals:', error);
        hideLoading();
        showError('Failed to load radicals data. Please check that radicals.json exists.');
    }
}

// Setup event listeners
function setupEventListeners() {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });

    // Search functionality
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        if (query === '') {
            displayRadicals(radicals);
        } else {
            const filtered = radicals.filter(radical => 
                radical.hanzi.toLowerCase().includes(query) ||
                radical.name.toLowerCase().includes(query) ||
                radical.meaning.toLowerCase().includes(query) ||
                radical.pinyin.toLowerCase().includes(query)
            );
            displayRadicals(filtered);
        }
    });

    // Close modal when clicking outside
    document.getElementById('radical-modal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });

    // Close mobile menu when clicking navigation items
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.getElementById('mobile-menu').classList.add('hidden');
        });
    });
}

// Navigation functions
function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.section-content').forEach(section => {
        section.classList.add('hidden');
    });

    // Show selected section
    document.getElementById(`${sectionName}-section`).classList.remove('hidden');

    // Update nav button states
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('text-indigo-600');
        btn.classList.add('text-gray-700');
    });

    // Highlight current nav button
    document.querySelectorAll('.nav-btn').forEach(btn => {
        if (btn.textContent.toLowerCase() === sectionName || 
            (sectionName === 'home' && btn.textContent === 'Home') ||
            (sectionName === 'radicals' && btn.textContent === 'Radicals') ||
            (sectionName === 'quiz' && btn.textContent === 'Quiz')) {
            btn.classList.add('text-indigo-600');
            btn.classList.remove('text-gray-700');
        }
    });

    // Reset quiz when navigating to quiz section
    if (sectionName === 'quiz') {
        resetQuiz();
    }
}

// Display radicals in grid
function displayRadicals(radicalsToShow) {
    const grid = document.getElementById('radicals-grid');
    const noResults = document.getElementById('no-results');

    if (radicalsToShow.length === 0) {
        grid.innerHTML = '';
        noResults.classList.remove('hidden');
        return;
    }

    noResults.classList.add('hidden');
    
    grid.innerHTML = radicalsToShow.map(radical => `
        <div class="bg-white rounded-xl shadow-sm p-6 card-hover cursor-pointer transition-all duration-300 animate-fade-in radical-card" 
             onclick="showRadicalDetails(${radical.id})">
            <div class="radical-card-content">
                <!-- Image or placeholder section -->
                <div class="radical-header">
                    ${radical.image ? `
                        <div class="radical-image-container">
                            <img src="${radical.image}" 
                                 alt="${radical.name} radical" 
                                 class="radical-image" 
                                 loading="lazy"
                                 onload="console.log('Image loaded successfully for radical: ${radical.hanzi}')"
                                 onerror="console.warn('Image failed to load for radical: ${radical.hanzi}', this.src); this.style.display='none';" />
                        </div>
                    ` : `
                        <div class="radical-image-container">
                            <!-- Empty space for alignment -->
                        </div>
                    `}
                </div>
                
                <!-- Main content section -->
                <div class="radical-body">
                    <div class="hanzi-large mb-4 text-gray-900">${radical.hanzi}</div>
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">${radical.name}</h3>
                    <p class="text-gray-600 mb-1">
                        <span class="font-medium">Pinyin:</span> ${radical.pinyin}
                    </p>
                    <p class="text-gray-600">
                        <span class="font-medium">Meaning:</span> ${radical.meaning}
                    </p>
                </div>
                
                <!-- Footer section -->
                <div class="radical-footer">
                    <div class="pt-4 border-t border-gray-100">
                        <p class="text-sm text-gray-500">Click for examples →</p>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Show radical details in modal
function showRadicalDetails(radicalId) {
    const radical = radicals.find(r => r.id === radicalId);
    if (!radical) return;

    currentModal = radical;
    
    // Update modal content
    document.getElementById('modal-hanzi').textContent = radical.hanzi;
    document.getElementById('modal-name').textContent = radical.name;
    document.getElementById('modal-pinyin').textContent = radical.pinyin;
    document.getElementById('modal-meaning').textContent = radical.meaning;
    
    // Update modal image if available
    const modalImage = document.getElementById('modal-image');
    if (radical.image) {
        modalImage.src = radical.image;
        modalImage.alt = radical.name + ' radical';
        modalImage.classList.remove('hidden');
    } else {
        modalImage.classList.add('hidden');
    }
    
    // Update examples
    const examplesContainer = document.getElementById('modal-examples');
    examplesContainer.innerHTML = radical.examples.map(example => 
        `<span class="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-lg text-lg font-medium">${example}</span>`
    ).join('');
    
    // Show modal
    document.getElementById('radical-modal').classList.remove('hidden');
    
    // Add animation
    setTimeout(() => {
        document.querySelector('#radical-modal .bg-white').classList.add('animate-fade-in');
    }, 10);
}

// Close modal
function closeModal() {
    document.getElementById('radical-modal').classList.add('hidden');
    currentModal = null;
}

// Text-to-speech for pinyin
function speakPinyin() {
    if (!currentModal) return;
    
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(currentModal.pinyin);
        utterance.lang = 'zh-CN';
        utterance.rate = 0.8;
        utterance.pitch = 1;
        
        // Try to use a Chinese voice if available
        const voices = speechSynthesis.getVoices();
        const chineseVoice = voices.find(voice => 
            voice.lang.includes('zh') || voice.lang.includes('cmn')
        );
        
        if (chineseVoice) {
            utterance.voice = chineseVoice;
        }
        
        speechSynthesis.speak(utterance);
    } else {
        alert('Speech synthesis is not supported in your browser.');
    }
}

// Quiz functions
function resetQuiz() {
    // Show start screen, hide questions and results
    document.getElementById('quiz-start').classList.remove('hidden');
    document.getElementById('quiz-questions').classList.add('hidden');
    document.getElementById('quiz-results').classList.add('hidden');
    
    // Reset quiz state
    currentQuiz = {
        questions: [],
        currentIndex: 0,
        score: 0,
        selectedAnswer: null
    };
}

function startQuiz() {
    if (radicals.length === 0) {
        alert('Please wait for radicals to load before starting the quiz.');
        return;
    }

    // Generate 10 random questions
    const shuffled = [...radicals].sort(() => Math.random() - 0.5);
    currentQuiz.questions = shuffled.slice(0, Math.min(10, radicals.length));
    currentQuiz.currentIndex = 0;
    currentQuiz.score = 0;
    currentQuiz.selectedAnswer = null;

    // Show quiz questions screen
    document.getElementById('quiz-start').classList.add('hidden');
    document.getElementById('quiz-questions').classList.remove('hidden');
    document.getElementById('quiz-results').classList.add('hidden');

    // Load first question
    loadQuestion();
}

function loadQuestion() {
    const question = currentQuiz.questions[currentQuiz.currentIndex];
    if (!question) return;

    // Update progress
    document.getElementById('current-question').textContent = currentQuiz.currentIndex + 1;
    document.getElementById('current-score').textContent = currentQuiz.score;
    document.getElementById('progress-bar').style.width = `${((currentQuiz.currentIndex + 1) / 10) * 100}%`;

    // Update question display
    document.getElementById('question-hanzi').textContent = question.hanzi;

    // Generate wrong answers
    const wrongAnswers = radicals
        .filter(r => r.id !== question.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(r => r.meaning);

    // Create options array and shuffle
    const options = [question.meaning, ...wrongAnswers].sort(() => Math.random() - 0.5);

    // Display options
    const optionsContainer = document.getElementById('quiz-options');
    optionsContainer.innerHTML = options.map((option, index) => `
        <button 
            class="quiz-option p-4 border-2 border-gray-300 rounded-lg text-left hover:border-indigo-500 transition-all"
            onclick="selectAnswer('${option}', this)"
        >
            ${option}
        </button>
    `).join('');

    // Hide next button
    document.getElementById('next-btn').classList.add('hidden');
    currentQuiz.selectedAnswer = null;
}

function selectAnswer(answer, buttonElement) {
    if (currentQuiz.selectedAnswer !== null) return; // Already answered

    currentQuiz.selectedAnswer = answer;
    const correctAnswer = currentQuiz.questions[currentQuiz.currentIndex].meaning;

    // Update button styles
    document.querySelectorAll('.quiz-option').forEach(btn => {
        btn.disabled = true;
        const btnAnswer = btn.textContent.trim();
        
        if (btnAnswer === correctAnswer) {
            btn.classList.add('correct');
        } else if (btn === buttonElement && btnAnswer !== correctAnswer) {
            btn.classList.add('incorrect');
        } else if (btnAnswer !== correctAnswer) {
            btn.style.opacity = '0.6';
        }
    });

    // Update score
    if (answer === correctAnswer) {
        currentQuiz.score++;
        document.getElementById('current-score').textContent = currentQuiz.score;
    }

    // Show next button
    document.getElementById('next-btn').classList.remove('hidden');
}

function nextQuestion() {
    currentQuiz.currentIndex++;
    
    if (currentQuiz.currentIndex >= currentQuiz.questions.length) {
        showQuizResults();
    } else {
        loadQuestion();
    }
}

function showQuizResults() {
    // Hide questions screen
    document.getElementById('quiz-questions').classList.add('hidden');
    
    // Show results screen
    document.getElementById('quiz-results').classList.remove('hidden');

    // Update results content
    const score = currentQuiz.score;
    const total = currentQuiz.questions.length;
    const percentage = Math.round((score / total) * 100);

    document.getElementById('final-score').textContent = `${score}/${total}`;

    // Update emoji and message based on score
    const resultsEmoji = document.getElementById('results-emoji');
    const scoreMessage = document.getElementById('score-message');

    if (percentage >= 90) {
        resultsEmoji.textContent = '🏆';
        scoreMessage.textContent = 'Outstanding! You\'re a Chinese radicals master!';
    } else if (percentage >= 80) {
        resultsEmoji.textContent = '🎉';
        scoreMessage.textContent = 'Excellent work! You have a great understanding of Chinese radicals.';
    } else if (percentage >= 70) {
        resultsEmoji.textContent = '👏';
        scoreMessage.textContent = 'Good job! You\'re making solid progress with Chinese radicals.';
    } else if (percentage >= 60) {
        resultsEmoji.textContent = '👍';
        scoreMessage.textContent = 'Not bad! Keep studying to improve your radical knowledge.';
    } else {
        resultsEmoji.textContent = '📚';
        scoreMessage.textContent = 'Keep practicing! Review the radicals and try again.';
    }
}

// Utility functions
function hideLoading() {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.classList.add('hidden');
    }
}

function showError(message) {
    const grid = document.getElementById('radicals-grid');
    if (grid) {
        grid.innerHTML = `
            <div class="col-span-full text-center py-12">
                <div class="text-4xl mb-4">❌</div>
                <h3 class="text-xl font-semibold text-gray-900 mb-2">Error Loading Data</h3>
                <p class="text-gray-600">${message}</p>
            </div>
        `;
    }
}

// Ensure voices are loaded for speech synthesis
window.speechSynthesis.onvoiceschanged = function() {
    // This event fires when voices are loaded
};

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    // Close modal with Escape key
    if (e.key === 'Escape' && !document.getElementById('radical-modal').classList.contains('hidden')) {
        closeModal();
    }
    
    // Navigation with number keys
    if (e.key >= '1' && e.key <= '3') {
        const sections = ['home', 'radicals', 'quiz'];
        const index = parseInt(e.key) - 1;
        if (sections[index]) {
            showSection(sections[index]);
        }
    }
});

// Add some extra animations and polish
function addPolishEffects() {
    // Add stagger animation to cards
    const cards = document.querySelectorAll('.card-hover');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Add pulse effect to call-to-action buttons
    const ctaButtons = document.querySelectorAll('.gradient-bg');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Initialize polish effects when DOM is ready
document.addEventListener('DOMContentLoaded', addPolishEffects);

// Service worker registration for offline capability (optional enhancement)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // We're not implementing a full service worker here, but this is where you would register one
        // for offline functionality
    });
}