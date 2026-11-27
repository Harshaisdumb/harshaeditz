/* ==========================================================================
   MINIMAL PORTFOLIO - JAVASCRIPT CONTROLLERS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initFilters();
  initKeyboardListeners();
});

// Mobile Navigation Toggle
function initNavigation() {
  const toggleBtn = document.getElementById('mobileToggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    // Close mobile menu on clicking any navigation link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }
}

// Category Filter Handling for Videos & Thumbnails
function initFilters() {
  // Video Filters
  const videoFilterBtns = document.querySelectorAll('#videoFilters .filter-btn');
  const videoCards = document.querySelectorAll('#videoGrid .project-card');

  videoFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      videoFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      videoCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Thumbnail Filters
  const thumbFilterBtns = document.querySelectorAll('#thumbFilters .filter-btn');
  const thumbCards = document.querySelectorAll('#thumbGrid .thumb-card');

  thumbFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      thumbFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      thumbCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// Video Modal Handlers
function openVideoModal(videoUrl) {
  const modal = document.getElementById('videoModal');
  const iframe = document.getElementById('videoIframe');
  
  if (modal && iframe) {
    iframe.src = videoUrl;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }
}

function closeVideoModal() {
  const modal = document.getElementById('videoModal');
  const iframe = document.getElementById('videoIframe');
  
  if (modal && iframe) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    iframe.src = ''; // Stop video playback immediately
    document.body.style.overflow = '';
  }
}

// Thumbnail Lightbox Handlers
function openLightbox(imageUrl, title, subtitle) {
  const modal = document.getElementById('imageLightbox');
  const img = document.getElementById('lightboxImg');
  const titleEl = document.getElementById('lightboxTitle');
  const subtitleEl = document.getElementById('lightboxSubtitle');

  if (modal && img) {
    img.src = imageUrl;
    if (titleEl) titleEl.textContent = title || '';
    if (subtitleEl) subtitleEl.textContent = subtitle || '';

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
}

function closeLightbox() {
  const modal = document.getElementById('imageLightbox');
  const img = document.getElementById('lightboxImg');

  if (modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    if (img) img.src = '';
    document.body.style.overflow = '';
  }
}

// Global Keyboard Shortcut (ESC to close any active modal)
function initKeyboardListeners() {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeVideoModal();
      closeLightbox();
    }
  });
}

// Contact Form Handler (Supports Web3Forms Email, Supabase, or Local Feedback)
async function handleFormSubmit(e) {
  e.preventDefault();
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  const submitBtn = form.querySelector('.submit-btn');

  // Visual submission feedback
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending inquiry...';

  // 1. Web3Forms Email Delivery (Active when key is set in index.html)
  const accessKeyInput = document.getElementById('web3formsKey');
  const accessKey = accessKeyInput ? accessKeyInput.value : '';

  if (accessKey && accessKey !== 'YOUR_ACCESS_KEY_HERE') {
    try {
      const formData = new FormData(form);
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });
      const result = await res.json();

      if (result.success) {
        status.className = 'form-status success';
        status.textContent = '✓ Thank you! Your inquiry was emailed to me. I will get back to you within 24 hours.';
        form.reset();
      } else {
        throw new Error(result.message || 'Submission error');
      }
    } catch (err) {
      status.className = 'form-status';
      status.style.color = '#ef4444';
      status.textContent = 'Notice: ' + err.message;
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Project Inquiry';
    }
    return;
  }

  // 2. Optional Supabase Integration:
  const SUPABASE_CONFIG = {
    url: '', // e.g. 'https://xyzcompany.supabase.co'
    anonKey: '' // e.g. 'eyJhbGciOi...'
  };

  if (SUPABASE_CONFIG.url && SUPABASE_CONFIG.anonKey && window.supabase) {
    try {
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const service = document.getElementById('service').value;
      const message = document.getElementById('message').value;

      const client = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
      const { data, error } = await client
        .from('inquiries')
        .insert([{ name, email, service, message }]);

      if (error) throw error;

      status.className = 'form-status success';
      status.textContent = '✓ Thank you! Your inquiry was saved to Supabase. I will get back to you within 24 hours.';
      form.reset();
    } catch (err) {
      console.error('Supabase error:', err);
      status.className = 'form-status';
      status.style.color = '#ef4444';
      status.textContent = 'Notice: Could not reach Supabase (' + err.message + '). Check project credentials.';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Project Inquiry';
    }
  } else {
    // 3. Default demo feedback when no key is set yet
    setTimeout(() => {
      status.className = 'form-status success';
      status.textContent = '✓ Thank you! Your message has been sent. I will get back to you within 24 hours.';
      form.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Project Inquiry';
    }, 800);
  }
}
