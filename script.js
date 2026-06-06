/* ===== Navbar scroll & toggle ===== */
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

/* ===== Counter Animation ===== */
const animateCounters = () => {
  const counters = document.querySelectorAll('.stat-num');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'), 10);
    if (isNaN(target)) return;
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) * (1 - progress);
      counter.textContent = Math.floor(eased * target);
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }
    requestAnimationFrame(update);
  });
};

/* ===== Counter 自动触发 ===== */
document.addEventListener('DOMContentLoaded', () => {
  animateCounters();
});

/* ===== Scroll Animations ===== */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.feature-column, .case-card, .step, .fade-up').forEach(el => {
  observer.observe(el);
});

/* ===== CTA Form (formsubmit.co) ===== */
const ctaForm = document.getElementById('ctaForm');
const ctaSubmitBtn = document.getElementById('ctaSubmitBtn');
const ctaSuccess = document.getElementById('ctaSuccess');

ctaForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  ctaSubmitBtn.disabled = true;
  ctaSubmitBtn.textContent = '提交中...';

  const formData = new FormData(ctaForm);

  try {
    const response = await fetch('https://formsubmit.co/ajax/1321839811@qq.com', {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    });
    const result = await response.json();
    if (result.success === 'true' || result.success === true) {
      ctaForm.style.display = 'none';
      ctaSuccess.style.display = 'block';
    } else {
      alert('提交失败，请稍后重试或直接加微信 jijie556677');
      ctaSubmitBtn.disabled = false;
      ctaSubmitBtn.textContent = '立即获取免费诊断 →';
    }
  } catch (err) {
    alert('网络错误，请稍后重试或直接加微信 jijie556677');
    ctaSubmitBtn.disabled = false;
    ctaSubmitBtn.textContent = '立即获取免费诊断 →';
  }
});
