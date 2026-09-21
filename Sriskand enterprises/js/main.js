/**
 * Sri Skand Enterprises - Main Application Script
 * Handles navigation, mobile menu, dynamic config injection,
 * interactive quote form, gallery filtering, lightbox, and FAQ accordion.
 */

document.addEventListener('DOMContentLoaded', () => {
  initBusinessConfig();
  initNavbar();
  initProductEnquiries();
  initGallery();
  initLightbox();
  initFaqAccordion();
  initQuoteForm();
  initScrollAnimations();
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
});

/**
 * 1. Synchronize All Business Details from config.js
 */
function initBusinessConfig() {
  const config = window.BUSINESS_CONFIG || {};

  // Default WhatsApp link generator
  const getWhatsAppLink = (customText) => {
    const text = customText || config.whatsappDefaultMessage || "Hello Sriskand Enterprises, I am interested in UPVC windows/doors. I would like to get a quotation.";
    const cleanPhone = (config.whatsappRaw || "").replace(/[^0-9]/g, '');
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
  };

  // Default Call link generator
  const getCallLink = () => {
    const cleanPhone = (config.phoneRaw || config.phone || "").replace(/[^0-9+]/g, '');
    return `tel:${cleanPhone || '+91'}`;
  };

  // Update text placeholders
  document.querySelectorAll('[data-config="contactPerson"]').forEach(el => {
    el.textContent = config.contactPerson || 'Nithin CS';
  });
  document.querySelectorAll('[data-config="phone"]').forEach(el => {
    el.textContent = config.phone || '+91 82962 00628';
  });
  document.querySelectorAll('[data-config="whatsapp"]').forEach(el => {
    el.textContent = config.whatsapp || '+91 82962 00628';
  });
  document.querySelectorAll('[data-config="email"]').forEach(el => {
    el.textContent = config.email || 'Sriskandenterprises@gmail.com';
  });
  document.querySelectorAll('[data-config="address"]').forEach(el => {
    el.textContent = config.address?.full || 'VH44+QCJ SHREEMATI ELECTRICALS, Anjanapura 80 Feet Rd, Anjanapura 5th Block, Anjanapura Twp, Bengaluru, Karnataka 560062';
  });
  document.querySelectorAll('[data-config="workingHours"]').forEach(el => {
    el.textContent = config.workingHours || '9:00 AM - 6:00 PM (Mon - Sat)';
  });

  // Update dynamic links
  document.querySelectorAll('a[data-action="whatsapp"]').forEach(el => {
    el.setAttribute('href', getWhatsAppLink());
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener noreferrer');
  });

  document.querySelectorAll('a[data-action="call"]').forEach(el => {
    el.setAttribute('href', getCallLink());
  });

  document.querySelectorAll('a[data-action="email"]').forEach(el => {
    if (config.email && !config.email.includes('[ADD')) {
      el.setAttribute('href', `mailto:${config.email}`);
    } else {
      el.setAttribute('href', `mailto:info@sriskandenterprises.com`);
    }
  });

  document.querySelectorAll('a[data-action="directions"]').forEach(el => {
    el.setAttribute('href', config.googleMapsDirectionsUrl || '#');
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener noreferrer');
  });

  // Update Map iframe
  const mapIframe = document.getElementById('google-map-iframe');
  if (mapIframe && config.googleMapsEmbedUrl) {
    mapIframe.src = config.googleMapsEmbedUrl;
  }
}

/**
 * 2. Sticky Navbar & Mobile Navigation Drawer
 */
function initNavbar() {
  const navbar = document.getElementById('main-navbar');
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileBackdrop = document.getElementById('mobile-backdrop');
  const mobileClose = document.getElementById('mobile-drawer-close');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky navbar shadow on scroll
  const handleScroll = () => {
    if (window.scrollY > 20) {
      navbar?.classList.add('navbar-scrolled');
    } else {
      navbar?.classList.remove('navbar-scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Mobile menu open / close
  const openMenu = () => {
    mobileDrawer?.classList.remove('translate-x-full');
    mobileBackdrop?.classList.remove('opacity-0', 'pointer-events-none');
    document.body.classList.add('overflow-hidden');
  };

  const closeMenu = () => {
    mobileDrawer?.classList.add('translate-x-full');
    mobileBackdrop?.classList.add('opacity-0', 'pointer-events-none');
    document.body.classList.remove('overflow-hidden');
  };

  mobileToggle?.addEventListener('click', openMenu);
  mobileClose?.addEventListener('click', closeMenu);
  mobileBackdrop?.addEventListener('click', closeMenu);

  // Close mobile drawer when any link is clicked
  mobileDrawer?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // ScrollSpy for Active Links
  const sections = document.querySelectorAll('section[id]');
  const spyScroll = () => {
    const scrollY = window.pageYOffset + 120;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');
      const targetLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        targetLink?.classList.add('active');
      } else {
        targetLink?.classList.remove('active');
      }
    });
  };
  window.addEventListener('scroll', spyScroll, { passive: true });
}

/**
 * 3. Product Cards "Enquire Now" Handler
 * Pre-selects the product in the quote form and scrolls smoothly
 */
function initProductEnquiries() {
  const enquireButtons = document.querySelectorAll('.product-enquire-btn');
  const productSelect = document.getElementById('product-required');
  const quoteSection = document.getElementById('quote');

  enquireButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const productType = btn.getAttribute('data-product') || 'UPVC Windows';

      if (productSelect) {
        productSelect.value = productType;
      }

      if (quoteSection) {
        quoteSection.scrollIntoView({ behavior: 'smooth' });
        // Subtle visual highlight on the form
        const formContainer = document.getElementById('quote-form-container');
        if (formContainer) {
          formContainer.classList.add('ring-2', 'ring-[#0B1B3D]');
          setTimeout(() => {
            formContainer.classList.remove('ring-2', 'ring-[#0B1B3D]');
          }, 1800);
        }
        // Focus first field
        document.getElementById('full-name')?.focus();
      }
    });
  });
}

/**
 * 4. Gallery Category Filter
 */
function initGallery() {
  const tabs = document.querySelectorAll('.gallery-tab');
  const items = document.querySelectorAll('.gallery-item');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Toggle active styling
      tabs.forEach(t => t.classList.remove('active', 'bg-[#0B1B3D]', 'text-white'));
      tabs.forEach(t => t.classList.add('bg-slate-100', 'text-slate-700'));
      
      tab.classList.add('active', 'bg-[#0B1B3D]', 'text-white');
      tab.classList.remove('bg-slate-100', 'text-slate-700');

      const filter = tab.getAttribute('data-filter');

      items.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filter === 'all' || itemCategory === filter) {
          item.style.display = 'block';
          item.classList.add('animate-fade-up');
        } else {
          item.style.display = 'none';
          item.classList.remove('animate-fade-up');
        }
      });
    });
  });
}

/**
 * 5. Gallery Lightbox Modal
 */
function initLightbox() {
  const modal = document.getElementById('lightbox-modal');
  const modalImg = document.getElementById('lightbox-image');
  const modalTitle = document.getElementById('lightbox-title');
  const modalDesc = document.getElementById('lightbox-desc');
  const closeBtn = document.getElementById('lightbox-close');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (!modal || !modalImg) return;

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.getAttribute('data-title') || 'UPVC Architectural Project';
      const desc = item.getAttribute('data-desc') || 'Sri Skand Enterprises Installation';

      if (img) {
        modalImg.src = img.src;
        modalImg.alt = img.alt || title;
      }
      if (modalTitle) modalTitle.textContent = title;
      if (modalDesc) modalDesc.textContent = desc;

      modal.classList.add('active');
      document.body.classList.add('overflow-hidden');
    });
  });

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.classList.remove('overflow-hidden');
  };

  closeBtn?.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/**
 * 6. FAQ Accordion
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    const content = item.querySelector('.faq-content');

    header?.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all other items for neat accordion behavior
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('open');
          const otherContent = otherItem.querySelector('.faq-content');
          if (otherContent) otherContent.style.maxHeight = null;
        }
      });

      // Toggle current item
      if (!isOpen) {
        item.classList.add('open');
        content.style.maxHeight = content.scrollHeight + 30 + 'px';
      } else {
        item.classList.remove('open');
        content.style.maxHeight = null;
      }
    });
  });

  // Open first item by default
  if (faqItems.length > 0) {
    const firstItem = faqItems[0];
    const firstContent = firstItem.querySelector('.faq-content');
    firstItem.classList.add('open');
    if (firstContent) firstContent.style.maxHeight = firstContent.scrollHeight + 30 + 'px';
  }
}

/**
 * 7. Lead Generation / Free Quote Form Handler
 */
function initQuoteForm() {
  const form = document.getElementById('quote-form');
  const successModal = document.getElementById('quote-success-modal');
  const closeSuccessBtn = document.getElementById('quote-success-close');
  const sendWhatsAppBtn = document.getElementById('quote-send-whatsapp');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Form field values
    const name = document.getElementById('full-name')?.value.trim() || '';
    const phone = document.getElementById('phone-number')?.value.trim() || '';
    const email = document.getElementById('email-address')?.value.trim() || '';
    const location = document.getElementById('project-location')?.value.trim() || '';
    const product = document.getElementById('product-required')?.value || 'UPVC Windows';
    const quantity = document.getElementById('quantity')?.value.trim() || 'Not specified';
    const message = document.getElementById('customer-message')?.value.trim() || '';

    // Validate essential fields
    if (!name || !phone || !location) {
      alert('Please fill in your Name, Phone Number, and Location.');
      return;
    }

    // Phone validation (at least 8 digits)
    const phoneDigits = phone.replace(/[^0-9]/g, '');
    if (phoneDigits.length < 8) {
      alert('Please enter a valid phone number.');
      return;
    }

    // Generate clean, executive WhatsApp Quotation Request
    const leadLines = [
      "Hello Sri Skand Enterprises,",
      "",
      "I would like to request a quotation for UPVC fenestration for my project. Below are my requirements:",
      "",
      "*QUOTATION REQUEST | SRI SKAND ENTERPRISES*",
      "----------------------------------------",
      `• *Client Name:* ${name}`,
      `• *Contact Number:* ${phone}`,
      `• *Project Location:* ${location}`,
      `• *Product Required:* ${product}`
    ];

    if (quantity && quantity.toLowerCase() !== 'not specified' && quantity.trim().length > 0) {
      leadLines.push(`• *Estimated Quantity:* ${quantity}`);
    }

    if (email && email.trim().length > 0) {
      leadLines.push(`• *Email Address:* ${email}`);
    }

    if (message && message.trim().length > 0) {
      leadLines.push(`• *Project Notes:* ${message}`);
    }

    leadLines.push("----------------------------------------");
    leadLines.push("");
    leadLines.push("Kindly share available profile options, pricing details, and let me know the schedule for a site measurement.");
    leadLines.push("");
    leadLines.push("Thank you!");

    const formattedLeadText = leadLines.join("\n");

    const config = window.BUSINESS_CONFIG || {};
    const cleanWhatsApp = (config.whatsappRaw || '918296200628').replace(/[^0-9]/g, '');
    const whatsappUrl = `https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(formattedLeadText)}`;

    // Set button for instant WhatsApp forwarding
    if (sendWhatsAppBtn) {
      sendWhatsAppBtn.href = whatsappUrl;
      sendWhatsAppBtn.target = '_blank';
    }

    // Auto-open WhatsApp in a new tab for seamless user experience
    try {
      window.open(whatsappUrl, '_blank');
    } catch (err) {
      console.log('WhatsApp auto-open blocked by popup setting, fallback button active in modal.');
    }

    // Display formatted quote inquiry summary in modal
    const summaryEl = document.getElementById('quote-summary-details');
    if (summaryEl) {
      summaryEl.innerHTML = `
        <div class="text-left bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm space-y-2">
          <div class="flex justify-between border-b border-slate-200/80 pb-1.5">
            <span class="text-slate-500 font-medium">Customer:</span>
            <span class="font-bold text-brand-navy">${escapeHtml(name)}</span>
          </div>
          <div class="flex justify-between border-b border-slate-200/80 pb-1.5">
            <span class="text-slate-500 font-medium">Phone:</span>
            <span class="font-semibold text-brand-navy">${escapeHtml(phone)}</span>
          </div>
          <div class="flex justify-between border-b border-slate-200/80 pb-1.5">
            <span class="text-slate-500 font-medium">Location:</span>
            <span class="font-semibold text-slate-700">${escapeHtml(location)}</span>
          </div>
          <div class="flex justify-between border-b border-slate-200/80 pb-1.5">
            <span class="text-slate-500 font-medium">Requirement:</span>
            <span class="font-semibold text-brand-navy">${escapeHtml(product)}</span>
          </div>
          ${quantity && quantity.toLowerCase() !== 'not specified' && quantity.trim() ? `
          <div class="flex justify-between border-b border-slate-200/80 pb-1.5">
            <span class="text-slate-500 font-medium">Quantity:</span>
            <span class="font-semibold text-slate-700">${escapeHtml(quantity)}</span>
          </div>` : ''}
          ${email && email.trim() ? `
          <div class="flex justify-between border-b border-slate-200/80 pb-1.5">
            <span class="text-slate-500 font-medium">Email:</span>
            <span class="font-semibold text-slate-700">${escapeHtml(email)}</span>
          </div>` : ''}
          ${message && message.trim() ? `
          <div class="pt-1 text-xs text-slate-600">
            <span class="text-slate-500 font-medium block mb-0.5">Project Notes:</span>
            <p class="italic bg-white p-2 rounded border border-slate-200 text-slate-700">${escapeHtml(message)}</p>
          </div>` : ''}
        </div>
      `;
    }

    // Show professional success modal
    if (successModal) {
      successModal.classList.remove('hidden');
      successModal.classList.add('flex');
    }

    // Reset the form
    form.reset();
  });

  closeSuccessBtn?.addEventListener('click', () => {
    successModal?.classList.add('hidden');
    successModal?.classList.remove('flex');
  });

  successModal?.addEventListener('click', (e) => {
    if (e.target === successModal) {
      successModal.classList.add('hidden');
      successModal.classList.remove('flex');
    }
  });
}

/**
 * 8. Scroll Reveal Animations (Lightweight Intersection Observer)
 */
function initScrollAnimations() {
  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-up');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    observer.observe(el);
  });
}

// Utility: HTML Escape for safe rendering
function escapeHtml(string) {
  return String(string)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
