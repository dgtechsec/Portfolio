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

// Proje öğelerini filtreleme için yeni bir sabit tanımlandı
const projectItems = document.querySelectorAll('[data-filter-item]');

// Projeleri filtreleme fonksiyonu
const filterItems = function (category) {
  // Translate the category to its internal key if it's in Turkish
  let categoryKey = '';
  // Simple mapping for demonstration. In a real app, you'd translate the button text.
  if (category === 'Tümü' || category === 'All') {
    categoryKey = 'all';
  } else if (category === 'Siber Güvenlik' || category === 'Cyber Security') {
    categoryKey = 'siberguvenlik';
  } else if (category === 'Yazılım' || category === 'Software') {
    categoryKey = 'yazilim';
  } else if (category === 'Ağ Sistemleri' || category === 'Network') {
    categoryKey = 'agsistemleri';
  }

  projectItems.forEach(item => {
    if (categoryKey === 'all' || item.dataset.category === categoryKey) {
      item.classList.add('active'); 
    } else {
      item.classList.remove('active');
    }
  });
};


if (select && selectItems.length > 0 && selectValue && filterBtns.length > 0) {
  select.addEventListener('click', function () {
    this.classList.toggle('active');
  });

  selectItems.forEach(item => {
    item.addEventListener('click', function () {
      let selectedText = this.innerText;
      selectValue.innerText = selectedText;
      select.classList.remove('active');
      filterItems(selectedText); 
    });
  });

  // Filtre butonları için olay dinleyicileri
  filterBtns.forEach(button => {
    button.addEventListener('click', function () {
      // Tüm filtre butonlarından 'active' sınıfını kaldır
      filterBtns.forEach(btn => btn.classList.remove('active'));
      // Tıklanan butona 'active' sınıfını ekle
      this.classList.add('active');
      // Butonun içindeki metni al ve filtreleme fonksiyonuna gönder
      filterItems(this.innerText); 
    });
  });
}

// Sayfa yüklendiğinde tüm projelerin görünmesini sağla
document.addEventListener('DOMContentLoaded', () => {
    filterItems('Tümü'); // Başlangıçta tüm projeleri göster (Türkçe varsayılan)
});

// Contact form validation (İletişim formu doğrulama)
const form = document.querySelector('[data-form]');
const formInputs = document.querySelectorAll('[data-form-input]');
const formBtn = document.querySelector('[data-form-btn]');

if (form && formInputs.length > 0 && formBtn) {
  formInputs.forEach(input => {
    input.addEventListener('input', function () {
      if (form.checkValidity()) {
        formBtn.removeAttribute('disabled');
      } else {
        formBtn.setAttribute('disabled', '');
      }
    });
  });
}

// Language Switcher (Dil Değiştirme)
const langButtons = document.querySelectorAll('.lang-button');
const htmlElement = document.querySelector('html');


const updateContent = (lang) => {
  htmlElement.setAttribute('lang', lang);

  // Update elements with data-translation-key
  document.querySelectorAll('[data-translation-key]').forEach(element => {
    const key = element.dataset.translationKey;
    if (translations[lang][key]) {
      element.innerHTML = translations[lang][key];
    }
  });

  // Update placeholder attributes with data-translation-placeholder-key
  document.querySelectorAll('[data-translation-placeholder-key]').forEach(element => {
    const key = element.dataset.translationPlaceholderKey;
    if (translations[lang][key]) {
      element.setAttribute('placeholder', translations[lang][key]);
    }
  });
};

langButtons.forEach(button => {
  button.addEventListener('click', () => {
    langButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    updateContent(button.dataset.lang);
  });
});

// Set initial language based on browser preference or default to Turkish
const userLang = navigator.language.startsWith('en') ? 'en' : 'tr';
updateContent(userLang);
// Set the active button on load
document.querySelector(`.lang-button[data-lang="${userLang}"]`).classList.add('active');