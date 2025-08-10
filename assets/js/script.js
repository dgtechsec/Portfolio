'use strict';

// Element seçicileri
const navLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');
const sidebar = document.querySelector('[data-sidebar]');
const sidebarBtn = document.querySelector('[data-sidebar-btn]');

// Sidebar (Kenar Çubuğu) fonksiyonu
if (sidebarBtn) {
  sidebarBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
  });
}

// Navigasyon linkleri ve sayfa geçişleri
if (navLinks.length > 0 && pages.length > 0) {
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const targetPage = link.dataset.targetPage;

      navLinks.forEach(item => item.classList.remove('active'));
      pages.forEach(item => item.classList.remove('active'));

      link.classList.add('active');

      const pageToShow = document.querySelector(`[data-page="${targetPage}"]`);
      if (pageToShow) {
        pageToShow.classList.add('active');
        window.scrollTo(0, 0);
      }
    });
  });
}

// Testimonials modal (referanslar pop-up'ı)
const testimonialsItem = document.querySelectorAll('[data-testimonials-item]');
const modalContainer = document.querySelector('[data-modal-container]');
const modalCloseBtn = document.querySelector('[data-modal-close-btn]');
const overlay = document.querySelector('[data-overlay]');

const modalImg = document.querySelector('[data-modal-img]');
const modalTitle = document.querySelector('[data-modal-title]');
const modalText = document.querySelector('[data-modal-text]');

const openTestimonialModal = function () {
  modalContainer.classList.add('active');
  overlay.classList.add('active');
}

const closeTestimonialModal = function () {
  modalContainer.classList.remove('active');
  overlay.classList.remove('active');
}

if (testimonialsItem.length > 0 && modalContainer && modalCloseBtn && overlay) {
  testimonialsItem.forEach(item => {
    item.addEventListener('click', function () {
      modalImg.src = this.querySelector('[data-testimonials-avatar]').src;
      modalImg.alt = this.querySelector('[data-testimonials-avatar]').alt;
      modalTitle.innerHTML = this.querySelector('[data-testimonials-title]').innerHTML;
      modalText.innerHTML = this.querySelector('[data-testimonials-text]').innerHTML;
      openTestimonialModal();
    });
  });

  modalCloseBtn.addEventListener('click', closeTestimonialModal);
  overlay.addEventListener('click', closeTestimonialModal);
}

// Custom select box ve filtreleme işlevselliği
const select = document.querySelector('[data-select]');
const selectItems = document.querySelectorAll('[data-select-item]');
const selectValue = document.querySelector('[data-select-value]');
const filterBtns = document.querySelectorAll('[data-filter-btn]'); 

