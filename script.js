// Optional: Smooth scroll enhancements or animations
console.log("Portfolio ready!");

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
  hamburger.classList.remove('active');
  navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 100) {
    navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
  } else {
    navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    navbar.style.boxShadow = 'none';
  }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= (sectionTop - 200)) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.project-card, .skill-category, .contact-item');
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';
  
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    setTimeout(() => {
      typeWriter(heroTitle, originalText, 80);
    }, 500);
  }
});

// Project card hover effects
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-8px) scale(1.02)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// Skill item hover effects
document.querySelectorAll('.skill-item').forEach(item => {
  item.addEventListener('mouseenter', function() {
    this.style.transform = 'translateX(5px) scale(1.05)';
  });
  
  item.addEventListener('mouseleave', function() {
    this.style.transform = 'translateX(0) scale(1)';
  });
});

// Contact item hover effects
document.querySelectorAll('.contact-item').forEach(item => {
  item.addEventListener('mouseenter', function() {
    this.style.transform = 'translateX(5px)';
    this.style.borderColor = 'var(--primary-color)';
  });
  
  item.addEventListener('mouseleave', function() {
    this.style.transform = 'translateX(0)';
    this.style.borderColor = 'var(--border-color)';
  });
});

// Button click effects
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', function(e) {
    // Create ripple effect
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
  .btn {
    position: relative;
    overflow: hidden;
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  .nav-link.active {
    color: var(--primary-color) !important;
  }
  
  .nav-link.active::after {
    width: 100% !important;
  }
`;
document.head.appendChild(style);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  if (hero) {
    const rate = scrolled * -0.5;
    hero.style.transform = `translateY(${rate}px)`;
  }
});

// Loading animation
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});

// ASMR Ambient Sound Generator
class ASMRAmbientGenerator {
  constructor() {
    this.audioContext = null;
    this.isPlaying = false;
    this.oscillators = [];
    this.gainNodes = [];
    this.noiseBuffer = null;
    this.masterGain = null;
    this.init();
  }

  async init() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.masterGain = this.audioContext.createGain();
      this.masterGain.connect(this.audioContext.destination);
      this.masterGain.gain.setValueAtTime(0.15, this.audioContext.currentTime); // Very quiet
      
      console.log('ASMR Audio Context initialized successfully');
      this.createNoiseBuffer();
      this.startAmbientSounds();
    } catch (error) {
      console.log('Web Audio API not supported:', error);
    }
  }

  createNoiseBuffer() {
    const bufferSize = this.audioContext.sampleRate * 2;
    this.noiseBuffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
    const output = this.noiseBuffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
  }

  createSpaceAmbient() {
    // Deep space drone
    const oscillator1 = this.audioContext.createOscillator();
    const gain1 = this.audioContext.createGain();
    
    oscillator1.type = 'sine';
    oscillator1.frequency.setValueAtTime(40, this.audioContext.currentTime);
    oscillator1.frequency.exponentialRampToValueAtTime(45, this.audioContext.currentTime + 8);
    
    gain1.gain.setValueAtTime(0, this.audioContext.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.3, this.audioContext.currentTime + 2);
    
    oscillator1.connect(gain1);
    gain1.connect(this.masterGain);
    
    this.oscillators.push(oscillator1);
    this.gainNodes.push(gain1);
    
    return oscillator1;
  }

  createWhiteNoise() {
    const noise = this.audioContext.createBufferSource();
    const noiseGain = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();
    
    noise.buffer = this.noiseBuffer;
    noise.loop = true;
    
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(200, this.audioContext.currentTime);
    
    noiseGain.gain.setValueAtTime(0.1, this.audioContext.currentTime);
    
    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.masterGain);
    
    this.gainNodes.push(noiseGain);
    
    return noise;
  }

  createSubtleTones() {
    // Gentle harmonic tones
    const frequencies = [110, 165, 220, 330];
    
    frequencies.forEach((freq, index) => {
      setTimeout(() => {
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.audioContext.currentTime);
        
        gain.gain.setValueAtTime(0, this.audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.05, this.audioContext.currentTime + 3);
        
        // Subtle frequency modulation
        setInterval(() => {
          if (osc.frequency) {
            const variation = (Math.random() - 0.5) * 2;
            osc.frequency.setValueAtTime(freq + variation, this.audioContext.currentTime);
          }
        }, 5000 + Math.random() * 3000);
        
        osc.connect(gain);
        gain.connect(this.masterGain);
        
        this.oscillators.push(osc);
        this.gainNodes.push(gain);
        
        osc.start();
      }, index * 2000);
    });
  }

  startAmbientSounds() {
    if (this.isPlaying) return;
    
    // Deep space ambient
    const ambient = this.createSpaceAmbient();
    ambient.start();
    
    // Subtle white noise (like distant spacecraft hum)
    const noise = this.createWhiteNoise();
    noise.start();
    
    // Gentle harmonic tones
    this.createSubtleTones();
    
    this.isPlaying = true;
  }

  stop() {
    this.oscillators.forEach(osc => {
      try {
        osc.stop();
      } catch (e) {}
    });
    this.oscillators = [];
    this.gainNodes = [];
    this.isPlaying = false;
  }

  setVolume(volume) {
    if (this.masterGain) {
      this.masterGain.gain.setValueAtTime(volume * 0.15, this.audioContext.currentTime);
    }
  }

  // Test function to verify audio is working
  testAudio() {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
      console.log('Audio context resumed');
    }
    
    // Create a simple test tone
    const testOsc = this.audioContext.createOscillator();
    const testGain = this.audioContext.createGain();
    
    testOsc.frequency.setValueAtTime(440, this.audioContext.currentTime); // A4 note
    testGain.gain.setValueAtTime(0.1, this.audioContext.currentTime);
    testGain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 1);
    
    testOsc.connect(testGain);
    testGain.connect(this.audioContext.destination);
    
    testOsc.start();
    testOsc.stop(this.audioContext.currentTime + 1);
    
    console.log('ASMR test tone played');
  }
}

// Background Music Functionality
document.addEventListener('DOMContentLoaded', () => {
  const musicToggle = document.getElementById('musicToggle');
  const backgroundMusic = document.getElementById('backgroundMusic');
  let isPlaying = false;
  let asmrGenerator = null;

  // Initialize ASMR ambient sounds after user interaction
  let asmrInitialized = false;
  
  // Function to initialize ASMR after user interaction
  function initializeASMR() {
    if (!asmrInitialized) {
      asmrGenerator = new ASMRAmbientGenerator();
      asmrInitialized = true;
      
      // Test audio after a short delay
      setTimeout(() => {
        if (asmrGenerator) {
          asmrGenerator.testAudio();
        }
      }, 500);
    }
  }

  // Initialize ASMR on first user interaction
  document.addEventListener('click', initializeASMR, { once: true });
  document.addEventListener('keydown', initializeASMR, { once: true });
  document.addEventListener('scroll', initializeASMR, { once: true });

  // Set initial volume
  backgroundMusic.volume = 0.3;

  musicToggle.addEventListener('click', () => {
    // Initialize ASMR if not already done
    if (!asmrInitialized) {
      initializeASMR();
    }

    if (isPlaying) {
      // Pause music and ASMR
      backgroundMusic.pause();
      if (asmrGenerator) {
        asmrGenerator.stop();
      }
      musicToggle.classList.remove('playing');
      musicToggle.innerHTML = '<i class="fas fa-music"></i>';
      musicToggle.title = 'Play Ambient Music';
      isPlaying = false;
    } else {
      // Try to play background music first, fallback to ASMR ambient
      backgroundMusic.play().then(() => {
        musicToggle.classList.add('playing');
        musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
        musicToggle.title = 'Pause Music (ASMR Ambient Active)';
        isPlaying = true;
      }).catch(error => {
        console.log('Background music failed, using ASMR ambient:', error);
        // Fallback to ASMR ambient if music file not found
        if (asmrGenerator) {
          asmrGenerator.startAmbientSounds();
        } else {
          // If ASMR not initialized, initialize it now
          initializeASMR();
          setTimeout(() => {
            if (asmrGenerator) {
              asmrGenerator.startAmbientSounds();
            }
          }, 100);
        }
        musicToggle.classList.add('playing');
        musicToggle.innerHTML = '<i class="fas fa-volume-down"></i>';
        musicToggle.title = 'ASMR Ambient Playing - Click to Stop';
        isPlaying = true;
      });
    }
  });

  // Handle audio events
  backgroundMusic.addEventListener('ended', () => {
    musicToggle.classList.remove('playing');
    musicToggle.innerHTML = '<i class="fas fa-music"></i>';
    musicToggle.title = 'Play Background Music';
    isPlaying = false;
  });

  backgroundMusic.addEventListener('error', () => {
    musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
    musicToggle.title = 'Audio file not found - Please add interstellar-theme.mp3';
    musicToggle.style.color = 'var(--text-muted)';
  });

  // Volume control with scroll wheel (optional)
  musicToggle.addEventListener('wheel', (e) => {
    e.preventDefault();
    
    let newVolume;
    if (e.deltaY < 0) {
      // Scroll up - increase volume
      newVolume = Math.min(backgroundMusic.volume + 0.1, 1);
    } else {
      // Scroll down - decrease volume
      newVolume = Math.max(backgroundMusic.volume - 0.1, 0);
    }
    
    backgroundMusic.volume = newVolume;
    
    // Also adjust ASMR volume
    if (asmrGenerator) {
      asmrGenerator.setVolume(newVolume);
    }
    
    // Visual feedback for volume change
    const volumePercent = Math.round(newVolume * 100);
    musicToggle.title = `Volume: ${volumePercent}% (${isPlaying ? 'Playing' : 'Paused'})`;
  });

  // Show ASMR ready indicator
  setTimeout(() => {
    if (!asmrInitialized) {
      musicToggle.title = 'Click to Start ASMR Ambient Music';
      // Subtle visual hint that ASMR is available
      musicToggle.style.borderColor = 'var(--accent-color)';
      musicToggle.style.color = 'var(--accent-color)';
      
      // Reset after 5 seconds
      setTimeout(() => {
        musicToggle.style.borderColor = '';
        musicToggle.style.color = '';
        musicToggle.title = 'Play Ambient Music';
      }, 5000);
    }
  }, 2000);
});