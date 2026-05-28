const siteData = window.siteData || {};

let bookingConfig = {};

const setText = (id, value) => {
  const element = document.getElementById(id);
  if (!element || typeof value !== 'string' || !value.trim()) return;
  element.textContent = value;
};

const setAttr = (id, attribute, value) => {
  const element = document.getElementById(id);
  if (!element || typeof value !== 'string' || !value.trim()) return;
  element.setAttribute(attribute, value);
};

const setOptionalParagraph = (id, value) => {
  const element = document.getElementById(id);
  if (!element) return;

  if (typeof value === 'string' && value.trim()) {
    element.hidden = false;
    element.textContent = value;
    return;
  }

  element.hidden = true;
};

const sanitizePhone = (phone) => String(phone || '').replace(/\D/g, '');

const buildWhatsAppUrl = (phone, message) => {
  const sanitizedPhone = sanitizePhone(phone);
  if (!sanitizedPhone) return '#';
  return `https://wa.me/${sanitizedPhone}?text=${encodeURIComponent(message || '')}`;
};

const parseCounterData = (rawValue) => {
  const text = String(rawValue || '').trim();
  const match = text.match(/([+-]?\d+(?:[.,]\d+)?)/);
  if (!match) return null;

  const numberText = match[1];
  const numeric = Number.parseFloat(numberText.replace(',', '.'));
  if (Number.isNaN(numeric)) return null;

  const index = match.index || 0;
  const decimals = (numberText.split(/[.,]/)[1] || '').length;

  return {
    prefix: text.slice(0, index),
    suffix: text.slice(index + numberText.length),
    target: numeric,
    decimals
  };
};

const applyCardAnimation = (element, index = 0) => {
  if (!element) return;
  element.classList.add('card-animate');
  element.style.transitionDelay = `${Math.min(index, 6) * 70}ms`;
};

const renderSocialProof = (items) => {
  const container = document.getElementById('proof-grid');
  if (!container || !Array.isArray(items)) return;

  container.innerHTML = '';
  items.forEach((item, index) => {
    const card = document.createElement('article');
    const title = document.createElement('h2');
    const description = document.createElement('p');

    const counterData = parseCounterData(item.value);
    if (counterData) {
      title.dataset.counterTarget = String(counterData.target);
      title.dataset.counterPrefix = counterData.prefix;
      title.dataset.counterSuffix = counterData.suffix;
      title.dataset.counterDecimals = String(counterData.decimals);
      title.textContent = `${counterData.prefix}0${counterData.suffix}`;
    } else {
      title.textContent = item.value || '';
    }

    description.textContent = item.label || '';
    applyCardAnimation(card, index);

    card.append(title, description);
    container.appendChild(card);
  });
};

const renderAboutList = (items) => {
  const container = document.getElementById('about-list');
  if (!container || !Array.isArray(items)) return;

  container.innerHTML = '';
  items.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    container.appendChild(li);
  });
};

const renderServices = (items) => {
  const container = document.getElementById('services-grid');
  if (!container || !Array.isArray(items)) return;

  container.innerHTML = '';
  items.forEach((item, index) => {
    const card = document.createElement('article');
    const title = document.createElement('h3');
    const text = document.createElement('p');

    card.className = 'service-card';
    title.textContent = item.name || '';
    text.textContent = item.benefit || '';
    applyCardAnimation(card, index);

    card.append(title, text);
    container.appendChild(card);
  });
};

const renderHowItWorks = (items) => {
  const container = document.getElementById('steps-grid');
  if (!container || !Array.isArray(items)) return;

  container.innerHTML = '';
  items.forEach((item, index) => {
    const card = document.createElement('article');
    const number = document.createElement('span');
    const title = document.createElement('h3');
    const text = document.createElement('p');

    card.className = 'step-card';
    number.className = 'step-number';
    number.textContent = String(index + 1);
    title.textContent = item.title || '';
    text.textContent = item.description || '';
    applyCardAnimation(card, index);

    card.append(number, title, text);
    container.appendChild(card);
  });
};

const renderConversionCards = (items) => {
  const container = document.getElementById('conversion-cards');
  if (!container || !Array.isArray(items)) return;

  container.innerHTML = '';
  items.forEach((item, index) => {
    const card = document.createElement('article');
    card.className = 'conversion-card';
    card.textContent = item;
    applyCardAnimation(card, index);
    container.appendChild(card);
  });
};

const renderDifferentials = (items) => {
  const container = document.getElementById('differentials-grid');
  if (!container || !Array.isArray(items)) return;

  container.innerHTML = '';
  items.forEach((item, index) => {
    const card = document.createElement('article');
    const title = document.createElement('h3');
    const text = document.createElement('p');

    title.textContent = item.title || '';
    text.textContent = item.description || '';
    applyCardAnimation(card, index);

    card.append(title, text);
    container.appendChild(card);
  });
};

const renderGallery = (items) => {
  const container = document.getElementById('gallery-grid');
  if (!container || !Array.isArray(items)) return;

  container.innerHTML = '';
  items.forEach((item, index) => {
    const card = document.createElement('article');
    const image = document.createElement('img');
    const overlay = document.createElement('span');

    card.className = 'gallery-card';
    image.src = item.src || '';
    image.alt = item.alt || `Imagem de galeria ${index + 1}`;
    image.loading = 'lazy';
    overlay.className = 'gallery-overlay';
    overlay.textContent = item.overlay || 'Resultado real';
    applyCardAnimation(card, index);

    card.append(image, overlay);
    container.appendChild(card);
  });
};

const renderTestimonials = (items) => {
  const container = document.getElementById('testimonials-grid');
  if (!container || !Array.isArray(items)) return;

  container.innerHTML = '';
  items.forEach((item, index) => {
    const card = document.createElement('article');
    const stars = document.createElement('span');
    const text = document.createElement('p');
    const service = document.createElement('span');
    const author = document.createElement('h3');

    stars.className = 'testimonial-stars';
    stars.textContent = item.stars || '★★★★★';
    text.textContent = item.text || '';
    service.className = 'testimonial-service';
    service.textContent = item.service || 'Atendimento';
    author.textContent = item.author || '';
    applyCardAnimation(card, index);

    card.append(stars, text, service, author);
    container.appendChild(card);
  });
};

const applySeo = (seo, colors) => {
  if (seo?.title) {
    document.title = seo.title;
  }

  const descriptionMeta = document.querySelector('meta[name="description"]');
  if (descriptionMeta && seo?.description) {
    descriptionMeta.setAttribute('content', seo.description);
  }

  const ogTitleMeta = document.getElementById('og-title-meta');
  if (ogTitleMeta && seo?.ogTitle) {
    ogTitleMeta.setAttribute('content', seo.ogTitle);
  }

  const ogDescriptionMeta = document.getElementById('og-description-meta');
  if (ogDescriptionMeta && seo?.ogDescription) {
    ogDescriptionMeta.setAttribute('content', seo.ogDescription);
  }

  const themeColorMeta = document.getElementById('theme-color-meta');
  const themeColor = seo?.themeColor || colors?.themeColor;
  if (themeColorMeta && themeColor) {
    themeColorMeta.setAttribute('content', themeColor);
  }
};

const applyColors = (colors) => {
  if (!colors || typeof colors !== 'object') return;

  const colorMap = {
    bg: '--bg',
    surface: '--surface',
    surfaceSoft: '--surface-soft',
    surfaceStrong: '--surface-strong',
    text: '--text',
    textSoft: '--text-soft',
    primary: '--primary',
    primaryDark: '--primary-dark',
    accent: '--accent',
    line: '--line',
    backgroundTop: '--bg-top',
    backgroundBottom: '--bg-bottom'
  };

  Object.entries(colorMap).forEach(([key, cssVariable]) => {
    if (typeof colors[key] === 'string' && colors[key].trim()) {
      document.documentElement.style.setProperty(cssVariable, colors[key]);
    }
  });
};

const applyWhatsAppLinks = (contact, whatsappMessages) => {
  const phone = contact?.whatsapp || '';
  const defaultMessage =
    whatsappMessages?.default || contact?.whatsappDefaultMessage || 'Oi, vim pelo site e quero atendimento.';

  document.querySelectorAll('.js-whatsapp-link').forEach((link) => {
    const messageKey = link.dataset.whatsappMessage;
    const message = whatsappMessages?.[messageKey] || defaultMessage;
    link.setAttribute('href', buildWhatsAppUrl(phone, message));
  });
};

const applySiteData = (data) => {
  if (!data || typeof data !== 'object') return;

  applyColors(data.colors);
  applySeo(data.seo, data.colors);

  const brandName = data.brand?.name;
  const city = data.brand?.city || '';
  const neighborhood = data.brand?.neighborhood || '';
  const locationParts = [neighborhood, city].filter(Boolean);
  const defaultHeroKicker = locationParts.length
    ? `Atendimento em ${neighborhood}${city ? ` • ${city}` : ''}`
    : 'Atendimento local';
  const defaultLocationTitle = locationParts.length
    ? `Atendimento em ${locationParts.join(', ')}`
    : 'Atendimento perto de você';

  setText('brand-mark', data.brand?.logoInitials);
  setText('brand-name', brandName);
  setText('brand-subtitle', data.brand?.subtitle);
  setText('footer-brand', brandName);

  if (brandName) {
    setAttr('brand-link', 'aria-label', `Página inicial ${brandName}`);
  }

  setText('nav-whatsapp-cta', data.navigation?.navWhatsappCtaText);

  setText('hero-kicker', data.hero?.kicker || defaultHeroKicker);
  setText('hero-premium-badge', data.hero?.premiumBadgeText);
  setText('hero-title', data.hero?.headline);
  setText('hero-text', data.hero?.text);
  setText('hero-whatsapp-cta', data.hero?.whatsappCtaText);
  setText('hero-secondary-cta', data.hero?.secondaryCtaText);
  setText('hero-whatsapp-inline', data.hero?.inlineWhatsappText);
  setText('hero-rating', data.hero?.ratingText);
  setText('hero-reviews', data.hero?.reviewsText);
  setText('hero-proof-note', data.hero?.socialNote);
  setText('hero-booking-kicker', data.hero?.bookingPreview?.kicker);
  setText('hero-booking-title', data.hero?.bookingPreview?.title);
  setText('hero-booking-slot', data.hero?.bookingPreview?.slot);
  setText('hero-booking-note', data.hero?.bookingPreview?.note);
  setText('hero-media-stamp', data.hero?.mediaStamp);

  if (data.hero?.ratingAriaLabel) {
    setAttr('hero-rating', 'aria-label', data.hero.ratingAriaLabel);
  }

  setAttr('hero-main-image', 'src', data.hero?.imageMain?.src);
  setAttr('hero-main-image', 'alt', data.hero?.imageMain?.alt);
  setAttr('hero-secondary-image', 'src', data.hero?.imageSecondary?.src);
  setAttr('hero-secondary-image', 'alt', data.hero?.imageSecondary?.alt);

  renderSocialProof(data.socialProof);

  setText('about-kicker', data.about?.kicker);
  setText('about-title', data.about?.title);
  setOptionalParagraph('about-text-1', data.about?.paragraphs?.[0]);
  setOptionalParagraph('about-text-2', data.about?.paragraphs?.[1]);
  setText('about-card-title', data.about?.cardTitle);
  renderAboutList(data.about?.cardList);

  setText('services-kicker', data.services?.kicker);
  setText('services-title', data.services?.title);
  setText('services-whatsapp-cta', data.services?.ctaText);
  renderServices(data.services?.items);

  setText('steps-kicker', data.steps?.kicker);
  setText('steps-title', data.steps?.title);
  setText('steps-subtitle', data.steps?.subtitle);
  renderHowItWorks(data.steps?.items);

  setText('differentials-kicker', data.differentials?.kicker);
  setText('differentials-title', data.differentials?.title);
  renderDifferentials(data.differentials?.items);

  setText('conversion-title', data.conversion?.title);
  setText('conversion-text', data.conversion?.text);
  renderConversionCards(data.conversion?.items);

  setText('gallery-kicker', data.gallery?.kicker);
  setText('gallery-title', data.gallery?.title);
  setText('instagram-cta', data.gallery?.instagramCtaText);
  renderGallery(data.gallery?.images);

  setText('testimonials-kicker', data.testimonials?.kicker);
  setText('testimonials-title', data.testimonials?.title);
  renderTestimonials(data.testimonials?.items);

  setText('location-kicker', data.location?.kicker);
  setText('location-title', data.location?.title || defaultLocationTitle);
  setText('location-address', data.contact?.address);
  setText('location-hours', data.contact?.hours);
  setText('location-whatsapp-display', data.contact?.whatsappDisplay);
  setText('maps-link', data.location?.mapsCtaText);
  setText('location-whatsapp-cta', data.location?.whatsappCtaText);

  setAttr('maps-link', 'href', data.contact?.googleMapsLink);
  setAttr('location-iframe', 'src', data.contact?.mapEmbedLink);
  setAttr('location-iframe', 'title', data.contact?.mapTitle);

  setText('final-kicker', data.finalCta?.kicker);
  setText('final-title', data.finalCta?.title);
  setText('final-text', data.finalCta?.text);
  setText('final-schedule-cta', data.finalCta?.scheduleButtonText);
  setText('final-whatsapp-cta', data.finalCta?.whatsappButtonText || data.finalCta?.buttonText);

  setText('booking-kicker', data.booking?.kicker);
  setText('booking-title', data.booking?.title);
  setText('booking-text', data.booking?.text);
  setText('booking-submit', data.booking?.buttonText);

  setText('whatsapp-float-label', data.floatingWhatsapp?.label);
  if (data.floatingWhatsapp?.ariaLabel) {
    setAttr('whatsapp-float', 'aria-label', data.floatingWhatsapp.ariaLabel);
  }

  setAttr('instagram-cta', 'href', data.contact?.instagram);
  setAttr('footer-instagram-link', 'href', data.contact?.instagram);

  bookingConfig = {
    phone: data.contact?.whatsapp || '',
    services:
      data.booking?.services ||
      (Array.isArray(data.services?.items) ? data.services.items.slice(0, 3).map((item) => item.name) : []),
    times: data.booking?.times || [],
    messageTemplate: data.booking?.whatsappMessageTemplate || '',
    firstAvailableDay: data.booking?.firstAvailableDay || 0
  };

  applyWhatsAppLinks(data.contact, data.whatsappMessages);
};

applySiteData(siteData);

const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('primary-menu');
const siteHeader = document.querySelector('.site-header');
const year = document.getElementById('current-year');
const navLinks = nav ? nav.querySelectorAll('a') : [];
const revealTargets = document.querySelectorAll('.section-reveal, .card-animate');
const counterNodes = document.querySelectorAll('[data-counter-target]');
const openSchedulerButtons = document.querySelectorAll('.js-open-scheduler');
const bookingModal = document.getElementById('booking-modal');
const bookingForm = document.getElementById('booking-form');
const bookingService = document.getElementById('booking-service');
const bookingDay = document.getElementById('booking-day');
const bookingTime = document.getElementById('booking-time');
const bookingName = document.getElementById('booking-name');
const bookingSummary = document.getElementById('booking-summary');
const bookingClose = document.getElementById('booking-close');

const fallbackSvg =
  'data:image/svg+xml;charset=UTF-8,' +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800'>" +
      "<defs><linearGradient id='g' x1='0%' y1='0%' x2='100%' y2='100%'>" +
      "<stop offset='0%' stop-color='%23f4dbe3'/><stop offset='100%' stop-color='%23f8edf1'/>" +
      "</linearGradient></defs>" +
      "<rect width='1200' height='800' fill='url(%23g)'/>" +
      "<text x='50%' y='50%' text-anchor='middle' fill='%23915a71' font-family='Manrope, Arial, sans-serif' font-size='42'>Imagem indisponível</text>" +
    '</svg>'
  );

const formatCounterValue = (value, decimals) =>
  new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value);

const animateCounter = (element) => {
  if (!element || element.dataset.counterDone === 'true') return;

  const target = Number.parseFloat(element.dataset.counterTarget || '0');
  const prefix = element.dataset.counterPrefix || '';
  const suffix = element.dataset.counterSuffix || '';
  const decimals = Number.parseInt(element.dataset.counterDecimals || '0', 10);
  const duration = 1400;
  const startTime = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - (1 - progress) * (1 - progress);
    const current = target * eased;

    element.textContent = `${prefix}${formatCounterValue(current, decimals)}${suffix}`;

    if (progress < 1) {
      window.requestAnimationFrame(tick);
      return;
    }

    element.textContent = `${prefix}${formatCounterValue(target, decimals)}${suffix}`;
    element.dataset.counterDone = 'true';
  };

  window.requestAnimationFrame(tick);
};

const toLocalIsoDate = (date) => {
  const timezoneOffset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - timezoneOffset).toISOString().slice(0, 10);
};

const formatDateForMessage = (isoDate) => {
  if (!isoDate) return '';
  const date = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(date.getTime())) return isoDate;
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date);
};

const setBookingMinDate = () => {
  if (!bookingDay) return;

  const minDate = new Date();
  const offsetDays = Number.parseInt(bookingConfig.firstAvailableDay || 0, 10);
  if (offsetDays > 0) {
    minDate.setDate(minDate.getDate() + offsetDays);
  }

  bookingDay.min = toLocalIsoDate(minDate);
  if (!bookingDay.value) {
    bookingDay.value = bookingDay.min;
  }

  updateBookingSummary();
};

const populateBookingSelects = () => {
  if (!bookingService || !bookingTime) return;

  const services = bookingConfig.services?.length
    ? bookingConfig.services
    : ['Alongamento em gel', 'Manicure completa', 'Design de sobrancelhas'];
  const times = bookingConfig.times?.length ? bookingConfig.times : ['09:00', '10:30', '13:30', '15:00', '17:00'];

  bookingService.innerHTML = '';
  services.forEach((service) => {
    const option = document.createElement('option');
    option.value = service;
    option.textContent = service;
    bookingService.appendChild(option);
  });

  bookingTime.innerHTML = '';
  times.forEach((time) => {
    const option = document.createElement('option');
    option.value = time;
    option.textContent = time;
    bookingTime.appendChild(option);
  });

  updateBookingSummary();
};

const updateBookingSummary = () => {
  if (!bookingSummary) return;

  const service = bookingService?.value || '-';
  const day = bookingDay?.value ? formatDateForMessage(bookingDay.value) : '-';
  const time = bookingTime?.value || '-';
  bookingSummary.textContent = `Resumo do agendamento: ${service} • ${day} • ${time}`;
};

const openBookingModal = () => {
  if (!bookingModal) return;
  bookingModal.hidden = false;
  bookingModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  setBookingMinDate();
  window.setTimeout(() => {
    bookingName?.focus();
  }, 30);
};

const closeBookingModal = () => {
  if (!bookingModal) return;
  bookingModal.hidden = true;
  bookingModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

const buildBookingMessage = ({ name, service, day, time }) => {
  const formattedDate = formatDateForMessage(day);
  const template = bookingConfig.messageTemplate;
  if (typeof template === 'string' && template.trim()) {
    return template
      .replace('{{nome}}', name)
      .replace('{{servico}}', service)
      .replace('{{serviço}}', service)
      .replace('{{dia}}', formattedDate)
      .replace('{{horario}}', time)
      .replace('{{horário}}', time);
  }

  return `Oi, meu nome é ${name}. Quero agendar ${service} para o dia ${formattedDate} às ${time}.`;
};

if (year) {
  year.textContent = new Date().getFullYear();
}

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', (event) => {
    if (!nav.classList.contains('open')) return;
    if (event.target instanceof Node && !nav.contains(event.target) && !menuToggle.contains(event.target)) {
      nav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('open')) {
      nav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.focus();
    }
  });
}

if (siteHeader) {
  const syncHeaderState = () => {
    siteHeader.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  syncHeaderState();
  window.addEventListener('scroll', syncHeaderState, { passive: true });
}

populateBookingSelects();
setBookingMinDate();

[bookingService, bookingDay, bookingTime].forEach((field) => {
  field?.addEventListener('change', updateBookingSummary);
});

openSchedulerButtons.forEach((button) => {
  button.addEventListener('click', openBookingModal);
});

if (bookingClose) {
  bookingClose.addEventListener('click', closeBookingModal);
}

if (bookingModal) {
  bookingModal.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (target.dataset.closeBooking === 'true') {
      closeBookingModal();
    }
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && bookingModal && !bookingModal.hidden) {
    closeBookingModal();
  }
});

if (bookingForm) {
  bookingForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const payload = {
      name: bookingName?.value?.trim() || '',
      service: bookingService?.value || '',
      day: bookingDay?.value || '',
      time: bookingTime?.value || ''
    };

    if (!payload.name || !payload.service || !payload.day || !payload.time) {
      bookingForm.reportValidity();
      return;
    }

    const message = buildBookingMessage(payload);
    const url = buildWhatsAppUrl(bookingConfig.phone, message);
    if (url === '#') return;

    window.open(url, '_blank', 'noopener,noreferrer');
    bookingForm.reset();
    setBookingMinDate();
    closeBookingModal();
  });
}

document.querySelectorAll('img').forEach((img) => {
  img.addEventListener('error', () => {
    if (img.dataset.fallbackApplied === 'true') return;
    img.dataset.fallbackApplied = 'true';
    img.classList.add('image-fallback');
    img.onerror = null;
    img.src = fallbackSvg;
    img.classList.remove('image-fallback');
  });
});

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(
    (entries, targetObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          targetObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  revealTargets.forEach((element) => {
    revealObserver.observe(element);
  });

  const counterObserver = new IntersectionObserver(
    (entries, targetObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          targetObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.45
    }
  );

  counterNodes.forEach((counter) => {
    counterObserver.observe(counter);
  });
} else {
  revealTargets.forEach((element) => {
    if (element.classList.contains('section-reveal')) {
      element.classList.add('no-animate');
      return;
    }
    element.classList.add('is-visible');
  });

  counterNodes.forEach((counter) => {
    const prefix = counter.dataset.counterPrefix || '';
    const suffix = counter.dataset.counterSuffix || '';
    const decimals = Number.parseInt(counter.dataset.counterDecimals || '0', 10);
    const target = Number.parseFloat(counter.dataset.counterTarget || '0');
    counter.textContent = `${prefix}${formatCounterValue(target, decimals)}${suffix}`;
  });
}
