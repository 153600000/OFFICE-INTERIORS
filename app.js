// Office Interiors - Toqri-Inspired Interactive Application Logic

// App State
let currentCategory = 'all';
let currentPriceRange = 'all';
let filterGradeAOnly = false;
let currentSearch = '';
let currentSort = 'featured';
let cart = JSON.parse(localStorage.getItem('oi_cart') || '[]');
let wishlist = JSON.parse(localStorage.getItem('oi_wishlist') || '[]');
let heroSlideIndex = 0;
let heroTimer = null;

// Modal Scroll Lock helper
function setBodyScrollLock(isLocked) {
  if (isLocked) {
    document.body.classList.add('overflow-hidden');
  } else {
    // Only remove if no other drawer/backdrop is open
    const openBackdrops = document.querySelectorAll('.drawer-backdrop.open, .modal-backdrop.open');
    if (openBackdrops.length === 0) {
      document.body.classList.remove('overflow-hidden');
    }
  }
}

// Global Keyboard Accessibility (Close modals/drawers on Escape)
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeAllModalsAndDrawers();
  }
});

function closeAllModalsAndDrawers() {
  document.getElementById('cartBackdrop')?.classList.remove('open');
  document.getElementById('cartDrawer')?.classList.remove('open');
  document.getElementById('wishlistBackdrop')?.classList.remove('open');
  document.getElementById('wishlistDrawer')?.classList.remove('open');
  document.getElementById('orderModalBackdrop')?.classList.remove('open');
  document.getElementById('quickViewBackdrop')?.classList.remove('open');
  document.getElementById('resellBackdrop')?.classList.remove('open');
  document.getElementById('mobileDrawerBackdrop')?.classList.remove('open');
  document.getElementById('mobileDrawer')?.classList.remove('open');
  setBodyScrollLock(false);
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  initHeroSlider();
  initDealCountdown();
  renderProducts();
  renderReviews();
  renderBlogs();
  updateCartUI();
  updateWishlistUI();
  initSearch();
  initHeaderScroll();
  initBackToTop();
});

// ==========================================
// 1. Hero Slider
// ==========================================
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  if (!slides.length) return;

  function showSlide(index) {
    slides.forEach((s, idx) => {
      s.classList.toggle('active', idx === index);
    });

    const dot0 = document.getElementById('slideDot0');
    const dot1 = document.getElementById('slideDot1');
    if (dot0 && dot1) {
      if (index === 0) {
        dot0.className = 'w-10 h-2.5 rounded-full bg-emerald-400 transition-all duration-300';
        dot1.className = 'w-3 h-2.5 rounded-full bg-white/40 hover:bg-white/70 transition-all duration-300';
      } else {
        dot0.className = 'w-3 h-2.5 rounded-full bg-white/40 hover:bg-white/70 transition-all duration-300';
        dot1.className = 'w-10 h-2.5 rounded-full bg-emerald-400 transition-all duration-300';
      }
    }
    heroSlideIndex = index;
  }

  window.setSlide = function(index) {
    showSlide(index);
    resetHeroTimer();
  };

  function nextSlide() {
    const nextIdx = (heroSlideIndex + 1) % slides.length;
    showSlide(nextIdx);
  }

  function resetHeroTimer() {
    clearInterval(heroTimer);
    heroTimer = setInterval(nextSlide, 7000);
  }

  resetHeroTimer();
}

// ==========================================
// 2. Deal of the Week Countdown Timer (Persistent Across Refreshes)
// ==========================================
function initDealCountdown() {
  // Store persistent deadline so it doesn't jump on every refresh
  let storedDeadline = localStorage.getItem('oi_deal_deadline');
  let endTime;

  if (storedDeadline && Number(storedDeadline) > Date.now()) {
    endTime = new Date(Number(storedDeadline));
  } else {
    endTime = new Date();
    endTime.setDate(endTime.getDate() + 3);
    endTime.setHours(endTime.getHours() + 14);
    endTime.setMinutes(endTime.getMinutes() + 28);
    localStorage.setItem('oi_deal_deadline', endTime.getTime().toString());
  }

  const daysEl = document.getElementById('dealDays');
  const hoursEl = document.getElementById('dealHours');
  const minsEl = document.getElementById('dealMins');
  const secsEl = document.getElementById('dealSecs');

  function update() {
    const now = Date.now();
    const diff = endTime.getTime() - now;

    if (diff <= 0) {
      // Automatically roll over for the next weekly batch
      const nextEnd = new Date();
      nextEnd.setDate(nextEnd.getDate() + 4);
      localStorage.setItem('oi_deal_deadline', nextEnd.getTime().toString());
      endTime = nextEnd;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = String(Math.max(0, d)).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(Math.max(0, h)).padStart(2, '0');
    if (minsEl) minsEl.textContent = String(Math.max(0, m)).padStart(2, '0');
    if (secsEl) secsEl.textContent = String(Math.max(0, s)).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

// ==========================================
// 3. Search & Filter Handling (Debounced & Mobile-Synced)
// ==========================================
let searchDebounceTimer = null;

function initSearch() {
  const searchInput = document.getElementById('searchInput');
  const mobileSearchInput = document.getElementById('mobileSearchInput');
  const mobileSearchClear = document.getElementById('mobileSearchClear');
  const categorySelect = document.getElementById('searchCategory');
  const searchBtn = document.getElementById('searchBtn');

  function handleSearchDebounced(val) {
    clearTimeout(searchDebounceTimer);
    searchDebounceTimer = setTimeout(() => {
      currentSearch = val.trim().toLowerCase();
      renderProducts();
    }, 100);
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      handleSearchDebounced(e.target.value);
      if (mobileSearchInput && mobileSearchInput.value !== e.target.value) {
        mobileSearchInput.value = e.target.value;
      }
    });
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        currentSearch = searchInput.value.trim().toLowerCase();
        renderProducts();
        const catalogEl = document.getElementById('catalog');
        if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  if (mobileSearchInput) {
    mobileSearchInput.addEventListener('input', (e) => {
      const val = e.target.value;
      handleSearchDebounced(val);
      if (searchInput && searchInput.value !== val) {
        searchInput.value = val;
      }
      if (mobileSearchClear) {
        mobileSearchClear.classList.toggle('hidden', val.length === 0);
      }
    });
    mobileSearchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        currentSearch = mobileSearchInput.value.trim().toLowerCase();
        renderProducts();
        const catalogEl = document.getElementById('catalog');
        if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  if (categorySelect) {
    categorySelect.addEventListener('change', (e) => {
      filterCatalog(e.target.value);
    });
  }

  if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', () => {
      currentSearch = searchInput.value.trim().toLowerCase();
      renderProducts();
      const catalogEl = document.getElementById('catalog');
      if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
    });
  }
}

function openAccountModal() {
  setBodyScrollLock(true);
  document.getElementById('accountModalBackdrop')?.classList.add('open');
}

function closeAccountModal(event) {
  if (event && event.target !== event.currentTarget) return;
  document.getElementById('accountModalBackdrop')?.classList.remove('open');
  setBodyScrollLock(false);
}

function setMobileBottomNavActive(activeId) {
  const items = ['mobNavHome', 'mobNavShop', 'mobNavSearch', 'mobNavWishlist', 'mobNavCart'];
  items.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('active', id === activeId);
  });
}

function focusMobileSearch() {
  setMobileBottomNavActive('mobNavSearch');
  const mInput = document.getElementById('mobileSearchInput');
  if (mInput) {
    mInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => {
      mInput.focus();
    }, 250);
  }
}

function filterWishlistOnly() {
  setMobileBottomNavActive('mobNavWishlist');
  if (wishlist.length === 0) {
    showToast('Your wishlist is empty. Tap the heart on any product to save items!', 'info');
    return;
  }
  currentCategory = 'all';
  currentSearch = '';
  renderProducts(true);
  const catalogEl = document.getElementById('catalog');
  if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
  showToast(`Showing ${wishlist.length} saved wishlist item(s)`, 'success');
}

function filterCatalog(category) {
  currentCategory = category;

  // Update tab buttons active state (Desktop)
  const tabs = document.querySelectorAll('#catalogFilters .filter-tab-btn');
  tabs.forEach(tab => {
    tab.classList.toggle('active', tab.getAttribute('data-cat') === category);
  });

  // Update mobile category pills active state (iOS & Android)
  const mobPills = document.querySelectorAll('.mobile-cat-pill');
  mobPills.forEach(pill => {
    pill.classList.toggle('active', pill.getAttribute('data-mobcat') === category);
  });

  // Update search category select
  const catSelect = document.getElementById('searchCategory');
  if (catSelect && catSelect.value !== category) {
    catSelect.value = category;
  }

  renderProducts();

  // Scroll smoothly to catalog
  const catalogEl = document.getElementById('catalog');
  if (catalogEl && window.scrollY > 400) {
    catalogEl.scrollIntoView({ behavior: 'smooth' });
  }
}

function searchBrand(brandName) {
  currentCategory = 'all';
  currentSearch = brandName.toLowerCase();
  
  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.value = brandName;
  const mobileSearchInput = document.getElementById('mobileSearchInput');
  if (mobileSearchInput) mobileSearchInput.value = brandName;

  // Reset category tabs
  const tabs = document.querySelectorAll('#catalogFilters .filter-tab-btn');
  tabs.forEach(tab => tab.classList.toggle('active', tab.getAttribute('data-cat') === 'all'));

  const mobPills = document.querySelectorAll('.mobile-cat-pill');
  mobPills.forEach(pill => pill.classList.toggle('active', pill.getAttribute('data-mobcat') === 'all'));

  renderProducts();
  const catalogEl = document.getElementById('catalog');
  if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
}

function applySorting() {
  const sortSelect = document.getElementById('sortBySelect');
  if (sortSelect) {
    currentSort = sortSelect.value;
    renderProducts();
  }
}

// ==========================================
// 4. Products Rendering (Fast Lazy Loading & Mobile 2-Col Support)
// ==========================================
function renderProducts(showWishlistOnly = false) {
  const grid = document.getElementById('productsGrid');
  const countEl = document.getElementById('displayedCount');
  if (!grid || typeof PRODUCTS_DATA === 'undefined') return;

  // Filter
  let list = PRODUCTS_DATA.filter(p => {
    if (showWishlistOnly) {
      return wishlist.includes(p.id);
    }
    const matchCat = currentCategory === 'all' || p.category === currentCategory;
    const matchSearch = !currentSearch ||
      p.title.toLowerCase().includes(currentSearch) ||
      p.brand.toLowerCase().includes(currentSearch) ||
      (p.subtitle && p.subtitle.toLowerCase().includes(currentSearch)) ||
      (p.category && p.category.toLowerCase().includes(currentSearch));

    let matchPrice = true;
    if (currentPriceRange === 'under-15k') {
      matchPrice = p.price < 15000;
    } else if (currentPriceRange === '15k-35k') {
      matchPrice = p.price >= 15000 && p.price <= 35000;
    } else if (currentPriceRange === 'above-35k') {
      matchPrice = p.price > 35000;
    }

    const matchGrade = !filterGradeAOnly || (p.condition && (p.condition.includes('Grade A') || p.condition.includes('Brand New') || p.condition.includes('Certified')));

    return matchCat && matchSearch && matchPrice && matchGrade;
  });

  // Sort
  if (currentSort === 'price-low') {
    list.sort((a, b) => a.price - b.price);
  } else if (currentSort === 'price-high') {
    list.sort((a, b) => b.price - a.price);
  } else if (currentSort === 'rating') {
    list.sort((a, b) => b.rating - a.rating);
  } else {
    list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
  }

  if (countEl) countEl.textContent = list.length;
  renderActiveFilterChips();

  if (list.length === 0) {
    const isWishlistEmpty = showWishlistOnly;
    grid.innerHTML = `
      <div class="col-span-full py-16 text-center">
        <div class="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4 text-2xl">
          <i class="${isWishlistEmpty ? 'far fa-heart' : 'fas fa-box-open'}"></i>
        </div>
        <h3 class="text-lg font-bold text-slate-800">${isWishlistEmpty ? 'Your Wishlist is Empty' : 'No matching products found'}</h3>
        <p class="text-sm text-slate-500 mt-1 max-w-md mx-auto">
          ${isWishlistEmpty ? 'Tap the heart icon on any chair, desk, or accessory to save items here.' : `We couldn't find items matching your criteria. Try widening your price filter or clearing your search.`}
        </p>
        <button onclick="clearFilters()" class="mt-4 btn-primary text-xs">
          ${isWishlistEmpty ? 'Explore All Products' : 'Reset All Filters'}
        </button>
      </div>
    `;
    return;
  }

  grid.innerHTML = list.map(product => {
    const isWishlisted = wishlist.includes(product.id);
    const formattedPrice = '₹' + product.price.toLocaleString('en-IN');
    const formattedOriginal = product.originalPrice ? '₹' + product.originalPrice.toLocaleString('en-IN') : '';
    const savings = product.originalPrice ? product.originalPrice - product.price : 0;
    const savingsPercentage = product.originalPrice ? Math.round((savings / product.originalPrice) * 100) : 0;

    return `
      <div class="product-card group" id="card-${product.id}">
        <!-- Top Badges & Wishlist -->
        <div style="position:absolute; top:8px; left:8px; z-index:10; display:flex; gap:4px; align-items:center;">
          ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
          ${savingsPercentage > 0 ? `<span style="background:#fef2f2; color:#dc2626; font-size:10px; font-weight:700; padding:2px 6px; border-radius:4px; border:1px solid #fee2e2;">-${savingsPercentage}%</span>` : ''}
        </div>
        
        <button onclick="addToWishlist('${product.id}')" style="position:absolute; top:8px; right:8px; z-index:10; width:32px; height:32px; border-radius:50%; background:rgba(255,255,255,0.9); border:1px solid var(--border); display:flex; align-items:center; justify-content:center; cursor:pointer; transition:var(--transition);" title="${isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}" aria-label="Wishlist">
          <i class="${isWishlisted ? 'fas fa-heart' : 'far fa-heart'}" style="color:${isWishlisted ? '#ef4444' : '#6b7280'}; font-size:13px;"></i>
        </button>

        <!-- Product Image (Click to view details) -->
        <div class="product-img-wrap" onclick="openQuickView('${product.id}')" style="cursor: pointer;">
          <img src="${product.image}" alt="${product.title}" loading="lazy" decoding="async" width="280" height="280" onerror="this.src='https://toqri.com/wp-content/uploads/2023/10/Aeron3-3-300x300.webp'">
        </div>

        <!-- Product Details -->
        <div class="product-content">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
            <span class="product-brand">${product.brand}</span>
            <div style="display:flex; align-items:center; gap:3px; font-size:11px; font-weight:700; color:#f59e0b;">
              <i class="fas fa-star" style="font-size:10px;"></i>
              <span>${product.rating.toFixed(1)}</span>
              <span style="color:#9ca3af; font-weight:400;">(${product.reviewCount})</span>
            </div>
          </div>

          <h3 class="product-title" title="${product.title}">
            <a href="javascript:void(0)" onclick="openQuickView('${product.id}')">${product.title}</a>
          </h3>

          <div class="price-container">
            <span class="current-price">${formattedPrice}</span>
            ${formattedOriginal ? `<span class="original-price">${formattedOriginal}</span>` : ''}
          </div>

          <!-- Actions: Add to Cart + WhatsApp -->
          <div style="display:flex; gap:6px; margin-top:10px; padding-top:10px; border-top:1px solid var(--border-light);">
            <button onclick="addToCart('${product.id}')" class="btn-primary" style="flex:1; justify-content:center; padding:8px 12px; font-size:12px; border-radius:6px;" aria-label="Add to Cart">
              <i class="fas fa-shopping-bag" style="font-size:11px;"></i>
              <span>Add to Cart</span>
            </button>
            <button onclick="buyViaWhatsAppItem('${product.id}')" style="background:#25d366; color:#fff; padding:8px 12px; border-radius:6px; font-size:12px; font-weight:600; display:flex; align-items:center; gap:4px; border:none; cursor:pointer; transition:var(--transition);" title="Order on WhatsApp" aria-label="WhatsApp">
              <i class="fab fa-whatsapp" style="font-size:14px;"></i>
              <span class="hidden sm:inline">WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function filterPriceRange(range) {
  currentPriceRange = range;
  document.querySelectorAll('.price-filter-pill').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-range') === range);
  });
  renderProducts();
}

function toggleGradeAFilter() {
  filterGradeAOnly = !filterGradeAOnly;
  const btn = document.getElementById('gradeAToggleBtn');
  const icon = document.getElementById('gradeACheckIcon');
  if (btn && icon) {
    if (filterGradeAOnly) {
      btn.className = 'text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-300 px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 shadow-2xs';
      icon.className = 'fas fa-check-circle text-emerald-600';
    } else {
      btn.className = 'text-xs font-semibold text-slate-700 hover:text-emerald-700 bg-white border border-slate-200 px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 shadow-2xs';
      icon.className = 'far fa-check-circle text-slate-400';
    }
  }
  renderProducts();
}

function renderActiveFilterChips() {
  const container = document.getElementById('activeFiltersContainer');
  const tagsWrap = document.getElementById('activeFilterTags');
  if (!container || !tagsWrap) return;

  const chips = [];

  if (currentCategory !== 'all') {
    const catLabels = {
      chairs: 'Ergonomic Chairs',
      desks: 'Standing Desks',
      storage: 'Storage & Drawers',
      accessories: 'Spares & Parts'
    };
    chips.push({
      label: `Category: ${catLabels[currentCategory] || currentCategory}`,
      onRemove: "filterCatalog('all')"
    });
  }

  if (currentSearch) {
    chips.push({
      label: `Search: "${currentSearch}"`,
      onRemove: "clearSearchFilter()"
    });
  }

  if (currentPriceRange !== 'all') {
    const priceLabels = {
      'under-15k': 'Under ₹15,000',
      '15k-35k': '₹15,000 – ₹35,000',
      'above-35k': 'Luxury (₹35,000+)'
    };
    chips.push({
      label: `Budget: ${priceLabels[currentPriceRange]}`,
      onRemove: "filterPriceRange('all')"
    });
  }

  if (filterGradeAOnly) {
    chips.push({
      label: 'Grade A Certified',
      onRemove: 'toggleGradeAFilter()'
    });
  }

  if (chips.length > 0) {
    container.classList.remove('hidden');
    container.classList.add('flex');
    tagsWrap.innerHTML = chips.map(chip => `
      <span class="active-filter-chip">
        ${chip.label}
        <button onclick="${chip.onRemove}" title="Remove filter" aria-label="Remove filter">
          <i class="fas fa-times-circle"></i>
        </button>
      </span>
    `).join('');
  } else {
    container.classList.add('hidden');
    container.classList.remove('flex');
    tagsWrap.innerHTML = '';
  }
}

function clearSearchFilter() {
  currentSearch = '';
  const sInput = document.getElementById('searchInput');
  if (sInput) sInput.value = '';
  const mInput = document.getElementById('mobileSearchInput');
  if (mInput) mInput.value = '';
  const mClear = document.getElementById('mobileSearchClear');
  if (mClear) mClear.classList.add('hidden');
  renderProducts();
}

function clearFilters() {
  currentCategory = 'all';
  currentPriceRange = 'all';
  filterGradeAOnly = false;
  currentSearch = '';

  const sInput = document.getElementById('searchInput');
  if (sInput) sInput.value = '';
  const mInput = document.getElementById('mobileSearchInput');
  if (mInput) mInput.value = '';
  const catSelect = document.getElementById('searchCategory');
  if (catSelect) catSelect.value = 'all';
  const mClear = document.getElementById('mobileSearchClear');
  if (mClear) mClear.classList.add('hidden');

  const tabs = document.querySelectorAll('#catalogFilters .filter-tab-btn');
  tabs.forEach(tab => tab.classList.toggle('active', tab.getAttribute('data-cat') === 'all'));

  const mobPills = document.querySelectorAll('.mobile-cat-pill');
  mobPills.forEach(pill => pill.classList.toggle('active', pill.getAttribute('data-mobcat') === 'all'));

  document.querySelectorAll('.price-filter-pill').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-range') === 'all');
  });

  const gradeABtn = document.getElementById('gradeAToggleBtn');
  const gradeAIcon = document.getElementById('gradeACheckIcon');
  if (gradeABtn && gradeAIcon) {
    gradeABtn.className = 'text-xs font-semibold text-slate-700 hover:text-emerald-700 bg-white border border-slate-200 px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 shadow-2xs';
    gradeAIcon.className = 'far fa-check-circle text-slate-400';
  }

  renderProducts();
}

// ==========================================
// 5. Cart Management & WhatsApp Order
// ==========================================
function addToCart(productId, qty = 1) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += qty;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      brand: product.brand,
      quantity: qty
    });
  }

  saveCart();
  updateCartUI();
  showToast(`Added "${product.title.slice(0, 30)}..." to your cart!`, 'success');
  openCartDrawer();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  updateCartUI();
  showToast('Item removed from cart', 'info');
}

function updateCartQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  saveCart();
  updateCartUI();
}

function saveCart() {
  localStorage.setItem('oi_cart', JSON.stringify(cart));
}

function updateCartUI() {
  const countBadge = document.getElementById('cartCountBadge');
  const countPill = document.getElementById('cartDrawerCountPill');
  const totalHeader = document.getElementById('cartTotalHeader');
  const subtotalEl = document.getElementById('cartSubtotalAmount');
  const itemsList = document.getElementById('cartItemsList');
  const shippingBar = document.getElementById('shippingProgressBar');
  const shippingText = document.getElementById('shippingProgressText');

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (countBadge) countBadge.textContent = totalItems;
  if (countPill) countPill.textContent = totalItems;
  const mobBadge = document.getElementById('mobCartBadge');
  if (mobBadge) mobBadge.textContent = totalItems;
  if (totalHeader) totalHeader.textContent = '₹' + totalPrice.toLocaleString('en-IN');
  if (subtotalEl) subtotalEl.textContent = '₹' + totalPrice.toLocaleString('en-IN');

  // Free shipping goal (₹30,000)
  const freeThreshold = 30000;
  if (shippingBar && shippingText) {
    if (totalPrice >= freeThreshold) {
      shippingBar.style.width = '100%';
      shippingText.innerHTML = '<span class="text-emerald-700 font-bold">🎉 Congratulations! You qualify for FREE shipping!</span>';
    } else {
      const pct = Math.min(100, Math.round((totalPrice / freeThreshold) * 100));
      shippingBar.style.width = `${pct}%`;
      const diff = freeThreshold - totalPrice;
      shippingText.textContent = `Add ₹${diff.toLocaleString('en-IN')} more for FREE Pan-India shipping!`;
    }
  }

  // Render items in cart
  if (itemsList) {
    if (cart.length === 0) {
      itemsList.innerHTML = `
        <div class="py-12 text-center text-slate-400">
          <div class="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 text-2xl text-slate-400">
            <i class="fas fa-shopping-bag"></i>
          </div>
          <p class="font-bold text-slate-700 text-sm">Your cart is currently empty</p>
          <p class="text-xs text-slate-400 mt-1">Discover premium refurbished ergonomic furniture at up to 70% off.</p>
          <button onclick="toggleCartDrawer(); filterCatalog('all')" class="mt-4 btn-primary text-xs">
            Start Shopping
          </button>
        </div>
      `;
      return;
    }

    itemsList.innerHTML = cart.map(item => `
      <div class="flex gap-3.5 pb-4 border-b border-slate-100 items-center">
        <img src="${item.image}" alt="${item.title}" class="w-16 h-16 object-contain rounded-lg border border-slate-200 bg-slate-50 p-1 flex-shrink-0">
        <div class="flex-grow min-w-0">
          <h4 class="text-xs font-bold text-slate-800 truncate" title="${item.title}">${item.title}</h4>
          <span class="text-[11px] text-emerald-600 font-semibold">₹${item.price.toLocaleString('en-IN')}</span>
          <div class="flex items-center gap-2 mt-2">
            <div class="flex items-center border border-slate-200 rounded-md">
              <button onclick="updateCartQty('${item.id}', -1)" class="px-2 py-0.5 text-xs text-slate-600 hover:bg-slate-100">-</button>
              <span class="px-2 text-xs font-bold text-slate-800">${item.quantity}</span>
              <button onclick="updateCartQty('${item.id}', 1)" class="px-2 py-0.5 text-xs text-slate-600 hover:bg-slate-100">+</button>
            </div>
            <button onclick="removeFromCart('${item.id}')" class="text-[11px] text-red-500 hover:underline">
              Remove
            </button>
          </div>
        </div>
        <div class="text-right flex-shrink-0">
          <span class="text-xs font-bold text-slate-900">₹${(item.price * item.quantity).toLocaleString('en-IN')}</span>
        </div>
      </div>
    `).join('');
  }
}

function openCartDrawer() {
  setBodyScrollLock(true);
  document.getElementById('wishlistBackdrop')?.classList.remove('open');
  document.getElementById('wishlistDrawer')?.classList.remove('open');
  document.getElementById('cartBackdrop')?.classList.add('open');
  document.getElementById('cartDrawer')?.classList.add('open');
}

function toggleCartDrawer() {
  const drawer = document.getElementById('cartDrawer');
  const isOpen = drawer?.classList.contains('open');
  if (isOpen) {
    document.getElementById('cartBackdrop')?.classList.remove('open');
    drawer?.classList.remove('open');
    setBodyScrollLock(false);
  } else {
    openCartDrawer();
  }
}

document.getElementById('cartDrawerBtn')?.addEventListener('click', toggleCartDrawer);

// ==========================================
// 6. WhatsApp Order Placement System (+91 77609 51238)
// ==========================================
const WHATSAPP_ORDER_PHONE = '917760951238';
const WHATSAPP_DISPLAY_PHONE = '+91 77609 51238';

let activeOrderItems = [];
let activeOrderSource = 'cart';
let activeOrderTab = 1;

function openOrderPlacementModal(singleItem = null) {
  setBodyScrollLock(true);
  if (singleItem) {
    activeOrderItems = [{ ...singleItem, quantity: singleItem.quantity || 1 }];
    activeOrderSource = 'single';
  } else {
    if (cart.length === 0) {
      showToast('Your cart is empty! Add items to checkout.', 'info');
      setBodyScrollLock(false);
      return;
    }
    activeOrderItems = [...cart];
    activeOrderSource = 'cart';
  }

  // Render items preview in Tab 3 summary
  renderOrderModalSummary();

  // Reset tab to 1
  switchOrderTab(1);

  // Hide success pane, show form
  document.getElementById('orderSuccessPane')?.classList.add('hidden');
  document.getElementById('orderPlacementForm')?.classList.remove('hidden');

  // Open backdrop
  document.getElementById('orderModalBackdrop')?.classList.add('open');

  // Close cart drawer if open
  document.getElementById('cartBackdrop')?.classList.remove('open');
  document.getElementById('cartDrawer')?.classList.remove('open');
}

function closeOrderModal(event) {
  if (event && event.target !== event.currentTarget) return;
  document.getElementById('orderModalBackdrop')?.classList.remove('open');
  setBodyScrollLock(false);
}

function renderOrderModalSummary() {
  const itemsContainer = document.getElementById('orderModalItemsPreview');
  const countEl = document.getElementById('orderSummaryItemCount');
  const grandTotalEl = document.getElementById('orderModalGrandTotal');
  if (!itemsContainer) return;

  const totalQty = activeOrderItems.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = activeOrderItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  if (countEl) countEl.textContent = totalQty;
  if (grandTotalEl) grandTotalEl.textContent = '₹' + totalPrice.toLocaleString('en-IN');

  itemsContainer.innerHTML = activeOrderItems.map(item => `
    <div class="flex items-center justify-between gap-3 py-1.5 border-b border-slate-200/70 last:border-0">
      <div class="flex items-center gap-2 min-w-0">
        <img src="${item.image}" alt="${item.title}" class="w-8 h-8 rounded-lg object-contain bg-white border border-slate-200 flex-shrink-0" onerror="this.src='https://toqri.com/wp-content/uploads/2023/10/Aeron3-3-300x300.webp'">
        <div class="min-w-0">
          <div class="font-semibold text-slate-800 truncate text-[11px]">${item.title}</div>
          <div class="text-[10px] text-slate-400">Qty: ${item.quantity} × ₹${item.price.toLocaleString('en-IN')}</div>
        </div>
      </div>
      <div class="font-bold text-slate-900 text-xs flex-shrink-0">
        ₹${(item.price * item.quantity).toLocaleString('en-IN')}
      </div>
    </div>
  `).join('');
}

function switchOrderTab(targetTab) {
  for (let i = 1; i <= 3; i++) {
    const btn = document.getElementById(`tabBtn${i}`);
    const pane = document.getElementById(`orderTabPane${i}`);
    if (btn) btn.classList.toggle('active', i === targetTab);
    if (pane) pane.classList.toggle('active', i === targetTab);
  }
  activeOrderTab = targetTab;
}

function validateAndNextTab(currentTab) {
  if (currentTab === 1) {
    const name = document.getElementById('orderFullName');
    const phone = document.getElementById('orderPhone');
    if (!name || !name.value.trim()) {
      showToast('Please enter your full name', 'info');
      name?.focus();
      return;
    }
    if (!phone || !phone.value.trim()) {
      showToast('Please enter your WhatsApp phone number', 'info');
      phone?.focus();
      return;
    }
    switchOrderTab(2);
  } else if (currentTab === 2) {
    const address = document.getElementById('orderAddress');
    const city = document.getElementById('orderCity');
    const state = document.getElementById('orderState');
    const pincode = document.getElementById('orderPincode');

    if (!address || !address.value.trim()) {
      showToast('Please enter your delivery street address', 'info');
      address?.focus();
      return;
    }
    if (!city || !city.value.trim()) {
      showToast('Please enter your delivery city', 'info');
      city?.focus();
      return;
    }
    if (!state || !state.value.trim()) {
      showToast('Please enter your delivery state', 'info');
      state?.focus();
      return;
    }
    if (!pincode || !pincode.value.trim()) {
      showToast('Please enter your 6-digit postal PIN code', 'info');
      pincode?.focus();
      return;
    }
    switchOrderTab(3);
  }
}

function handleOrderSubmit(e) {
  e.preventDefault();

  if (activeOrderItems.length === 0) {
    showToast('No items to order!', 'info');
    return;
  }

  const fullName = document.getElementById('orderFullName')?.value.trim() || '';
  const phone = document.getElementById('orderPhone')?.value.trim() || '';
  const email = document.getElementById('orderEmail')?.value.trim() || '';
  const address = document.getElementById('orderAddress')?.value.trim() || '';
  const city = document.getElementById('orderCity')?.value.trim() || '';
  const state = document.getElementById('orderState')?.value.trim() || '';
  const pincode = document.getElementById('orderPincode')?.value.trim() || '';
  const company = document.getElementById('orderCompany')?.value.trim() || '';
  const gstin = document.getElementById('orderGST')?.value.trim() || '';
  const paymentMode = document.querySelector('input[name="orderPayment"]:checked')?.value || 'UPI (GPay / PhonePe / Paytm)';
  const notes = document.getElementById('orderNotes')?.value.trim() || '';

  const orderId = `OI-${Math.floor(1000 + Math.random() * 9000)}`;
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) + ', ' + now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

  const totalPrice = activeOrderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  let message = `🛍️ *NEW ORDER - OFFICE INTERIORS*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `📋 *Order Reference ID:* #${orderId}\n`;
  message += `📅 *Order Date:* ${dateStr}\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `👤 *CUSTOMER DETAILS:*\n`;
  message += `• *Name:* ${fullName}\n`;
  message += `• *WhatsApp Number:* +91 ${phone}\n`;
  if (email) message += `• *Email:* ${email}\n`;
  if (company) message += `• *Company:* ${company} ${gstin ? `(GST: ${gstin})` : ''}\n`;
  message += `\n📍 *DELIVERY ADDRESS:*\n`;
  message += `• ${address}\n`;
  message += `• ${city}, ${state} - ${pincode}\n`;
  message += `\n💳 *PAYMENT PREFERENCE:*\n`;
  message += `• ${paymentMode}\n`;
  message += `\n📝 *ORDER ITEMS:*\n`;
  activeOrderItems.forEach((item, idx) => {
    message += `${idx + 1}. *${item.title}*\n`;
    message += `   Qty: ${item.quantity} × ₹${item.price.toLocaleString('en-IN')} = ₹${(item.quantity * item.price).toLocaleString('en-IN')}\n`;
    if (item.condition) message += `   Condition: ${item.condition}\n`;
  });
  message += `━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `💰 *Subtotal:* ₹${totalPrice.toLocaleString('en-IN')}\n`;
  message += `🚚 *Pan-India Shipping:* FREE (100% Insured Commercial Freight)\n`;
  message += `⭐️ *TOTAL PAYABLE:* ₹${totalPrice.toLocaleString('en-IN')}\n`;
  if (notes) {
    message += `\n📌 *SPECIAL INSTRUCTIONS:*\n${notes}\n`;
  }
  message += `━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `Please confirm order receipt, share payment QR/details, and schedule dispatch. Thank you!`;

  const waUrl = `https://wa.me/${WHATSAPP_ORDER_PHONE}?text=${encodeURIComponent(message)}`;

  // Direct open WhatsApp
  window.open(waUrl, '_blank');

  // If order was from cart, empty cart
  if (activeOrderSource === 'cart') {
    cart = [];
    saveCart();
    updateCartUI();
  }

  // Show Success Pane in Modal
  const successPane = document.getElementById('orderSuccessPane');
  const form = document.getElementById('orderPlacementForm');
  const idEl = document.getElementById('successOrderId');
  const totalEl = document.getElementById('successOrderTotal');
  const waLink = document.getElementById('successWhatsAppLink');

  if (idEl) idEl.textContent = `#${orderId}`;
  if (totalEl) totalEl.textContent = `₹${totalPrice.toLocaleString('en-IN')}`;
  if (waLink) waLink.href = waUrl;

  if (form) form.classList.add('hidden');
  if (successPane) successPane.classList.remove('hidden');

  showToast('Order manifest sent to WhatsApp (+91 77609 51238)!', 'success');
}

function checkoutViaWhatsAppQuick() {
  if (cart.length === 0) {
    showToast('Your cart is empty! Add products before ordering.', 'info');
    return;
  }
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  let message = `*NEW QUICK ORDER - OFFICE INTERIORS*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  cart.forEach((item, index) => {
    message += `${index + 1}. *${item.title}*\n   Qty: ${item.quantity} × ₹${item.price.toLocaleString('en-IN')} = ₹${(item.quantity * item.price).toLocaleString('en-IN')}\n`;
  });
  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `*Total Order Value:* ₹${totalPrice.toLocaleString('en-IN')}\n`;
  message += `*Pan-India Dispatch Requested*\n`;
  message += `Please confirm availability and dispatch schedule.`;

  const url = `https://wa.me/${WHATSAPP_ORDER_PHONE}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

function buyViaWhatsAppItem(productId, qty = 1) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;
  openOrderPlacementModal({ ...product, quantity: qty });
}

// ==========================================
// 7. Wishlist Handling & Dedicated Wishlist Drawer
// ==========================================
function toggleWishlistDrawer() {
  const drawer = document.getElementById('wishlistDrawer');
  const backdrop = document.getElementById('wishlistBackdrop');
  const isOpen = drawer?.classList.contains('open');

  if (isOpen) {
    backdrop?.classList.remove('open');
    drawer?.classList.remove('open');
    setBodyScrollLock(false);
  } else {
    // Close cart if open
    document.getElementById('cartBackdrop')?.classList.remove('open');
    document.getElementById('cartDrawer')?.classList.remove('open');
    renderWishlistDrawer();
    backdrop?.classList.add('open');
    drawer?.classList.add('open');
    setBodyScrollLock(true);
  }
}

function renderWishlistDrawer() {
  const itemsContainer = document.getElementById('wishlistItemsList');
  const pill = document.getElementById('wishlistDrawerCountPill');
  if (!itemsContainer) return;

  if (pill) pill.textContent = wishlist.length;

  if (wishlist.length === 0) {
    itemsContainer.innerHTML = `
      <div class="py-16 text-center text-slate-400">
        <div class="w-16 h-16 rounded-full bg-red-50 text-red-400 flex items-center justify-center mx-auto mb-3 text-2xl">
          <i class="far fa-heart"></i>
        </div>
        <p class="font-bold text-slate-800 text-sm">Your wishlist is currently empty</p>
        <p class="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
          Save your favorite Herman Miller, Steelcase, or standing desks to compare and track availability.
        </p>
        <button onclick="toggleWishlistDrawer(); filterCatalog('all');" class="mt-4 btn-primary text-xs">
          Explore Ergonomic Catalog
        </button>
      </div>
    `;
    return;
  }

  const wishlistedItems = PRODUCTS_DATA.filter(p => wishlist.includes(p.id));

  itemsContainer.innerHTML = wishlistedItems.map(item => `
    <div class="flex gap-3.5 pb-4 border-b border-slate-100 items-center">
      <img src="${item.image}" alt="${item.title}" class="w-16 h-16 object-contain rounded-lg border border-slate-200 bg-slate-50 p-1 flex-shrink-0" onerror="this.src='https://toqri.com/wp-content/uploads/2023/10/Aeron3-3-300x300.webp'">
      <div class="flex-grow min-w-0">
        <h4 class="text-xs font-bold text-slate-800 truncate" title="${item.title}">${item.title}</h4>
        <div class="flex items-baseline gap-2 mt-0.5">
          <span class="text-xs text-emerald-700 font-bold">₹${item.price.toLocaleString('en-IN')}</span>
          ${item.originalPrice ? `<span class="text-[10px] text-slate-400 line-through">₹${item.originalPrice.toLocaleString('en-IN')}</span>` : ''}
        </div>
        <div class="flex items-center gap-2 mt-2">
          <button onclick="addToCart('${item.id}'); removeFromWishlist('${item.id}');" class="text-[11px] font-bold text-slate-900 bg-slate-100 hover:bg-emerald-600 hover:text-white px-2 py-1 rounded transition flex items-center gap-1">
            <i class="fas fa-shopping-bag text-[10px]"></i> Move to Cart
          </button>
          <button onclick="buyViaWhatsAppItem('${item.id}')" class="text-[11px] font-bold text-[#25d366] hover:underline flex items-center gap-0.5">
            <i class="fab fa-whatsapp"></i> Buy
          </button>
          <button onclick="removeFromWishlist('${item.id}')" class="text-[11px] text-red-400 hover:text-red-600 ml-auto" title="Remove">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function removeFromWishlist(productId) {
  const index = wishlist.indexOf(productId);
  if (index !== -1) {
    wishlist.splice(index, 1);
    localStorage.setItem('oi_wishlist', JSON.stringify(wishlist));
    updateWishlistUI();
    renderWishlistDrawer();
    renderProducts();
    showToast('Item removed from wishlist', 'info');
  }
}

function clearWishlist() {
  if (wishlist.length === 0) return;
  wishlist = [];
  localStorage.setItem('oi_wishlist', JSON.stringify(wishlist));
  updateWishlistUI();
  renderWishlistDrawer();
  renderProducts();
  showToast('Wishlist cleared', 'info');
}

function addAllWishlistToCart() {
  if (wishlist.length === 0) {
    showToast('Your wishlist is empty!', 'info');
    return;
  }
  let addedCount = 0;
  wishlist.forEach(id => {
    const product = PRODUCTS_DATA.find(p => p.id === id);
    if (product) {
      const existing = cart.find(item => item.id === id);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          brand: product.brand,
          quantity: 1
        });
      }
      addedCount++;
    }
  });

  saveCart();
  updateCartUI();
  toggleWishlistDrawer();
  openCartDrawer();
  showToast(`Moved ${addedCount} item(s) from Wishlist to Cart!`, 'success');
}

function orderWishlistViaWhatsApp() {
  if (wishlist.length === 0) {
    showToast('Your wishlist is empty! Save chairs before inquiring.', 'info');
    return;
  }
  const wishlistedItems = PRODUCTS_DATA.filter(p => wishlist.includes(p.id));
  let message = `🔖 *WISHLIST ENQUIRY - OFFICE INTERIORS*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `Hi! I have saved the following chairs/items in my wishlist and would like to check available finishes, stock, and live condition videos:\n\n`;
  wishlistedItems.forEach((item, index) => {
    message += `${index + 1}. *${item.title}*\n`;
    message += `   Refurbished Price: ₹${item.price.toLocaleString('en-IN')}\n`;
    if (item.condition) message += `   Condition: ${item.condition}\n`;
  });
  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `Please confirm which units are available for immediate pan-India dispatch.`;

  window.open(`https://wa.me/${WHATSAPP_ORDER_PHONE}?text=${encodeURIComponent(message)}`, '_blank');
}

function addToWishlist(productId) {
  const index = wishlist.indexOf(productId);
  if (index === -1) {
    wishlist.push(productId);
    showToast('Item saved to Wishlist!', 'success');
  } else {
    wishlist.splice(index, 1);
    showToast('Item removed from Wishlist', 'info');
  }

  localStorage.setItem('oi_wishlist', JSON.stringify(wishlist));
  updateWishlistUI();
  renderProducts();
  if (document.getElementById('wishlistDrawer')?.classList.contains('open')) {
    renderWishlistDrawer();
  }
}

function updateWishlistUI() {
  const badge = document.getElementById('wishlistCountBadge');
  if (badge) badge.textContent = wishlist.length;
  const mobBadge = document.getElementById('mobWishlistBadge');
  if (mobBadge) mobBadge.textContent = wishlist.length;
  const pill = document.getElementById('wishlistDrawerCountPill');
  if (pill) pill.textContent = wishlist.length;
}

// ==========================================
// 8. Quick View Modal (With Quantity Stepper & Direct Buy)
// ==========================================
let currentQuickViewQty = 1;

function adjustQuickViewQty(delta) {
  currentQuickViewQty = Math.max(1, currentQuickViewQty + delta);
  const input = document.getElementById('quickViewQtyInput');
  if (input) input.value = currentQuickViewQty;
}

function openQuickView(productId) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  const container = document.getElementById('quickViewDetails');
  if (!container) return;

  currentQuickViewQty = 1;
  const isWishlisted = wishlist.includes(product.id);

  let specsHtml = '';
  if (product.specs) {
    specsHtml = `
      <div class="mt-4 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
        <h4 class="text-xs font-bold uppercase text-slate-700 tracking-wider mb-2">Technical Specifications</h4>
        <div class="space-y-1.5 text-xs text-slate-600">
          ${Object.entries(product.specs).map(([key, val]) => `
            <div class="flex justify-between py-1 border-b border-slate-200/60 last:border-0">
              <span class="font-semibold text-slate-800">${key}:</span>
              <span class="text-right text-slate-600">${val}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  container.innerHTML = `
    <!-- Image Gallery Col -->
    <div class="md:col-span-6 flex flex-col items-center">
      <div class="w-full aspect-square bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center p-6 relative">
        <span class="absolute top-3 left-3 bg-emerald-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
          ${product.condition || 'Refurbished'}
        </span>
        <img src="${product.image}" alt="${product.title}" class="max-h-72 object-contain" onerror="this.src='https://toqri.com/wp-content/uploads/2023/10/Aeron3-3-300x300.webp'">
      </div>
      <div class="flex items-center gap-4 text-xs text-slate-500 mt-4">
        <span><i class="fas fa-truck text-emerald-600 mr-1"></i> Pan-India Shipping</span>
        <span><i class="fas fa-shield-alt text-emerald-600 mr-1"></i> 1-Year Warranty</span>
      </div>
    </div>

    <!-- Product Info Col -->
    <div class="md:col-span-6">
      <div class="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">${product.brand}</div>
      <h3 class="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight mb-2">${product.title}</h3>
      
      <div class="flex items-center gap-2 mb-3">
        <div class="flex text-amber-400 text-xs">
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
        </div>
        <span class="text-xs text-slate-500 font-semibold">${product.rating.toFixed(1)} (${product.reviewCount} customer reviews)</span>
      </div>

      <div class="flex items-baseline gap-3 mb-4">
        <span class="text-3xl font-extrabold text-emerald-700">₹${product.price.toLocaleString('en-IN')}</span>
        ${product.originalPrice ? `<span class="text-base text-slate-400 line-through">₹${product.originalPrice.toLocaleString('en-IN')}</span>` : ''}
        ${product.badge ? `<span class="bg-red-100 text-red-700 text-xs font-bold px-2 py-0.5 rounded-full">${product.badge}</span>` : ''}
      </div>

      <p class="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
        ${product.description}
      </p>

      ${specsHtml}

      <!-- Interactive Quantity Stepper & Wishlist Action -->
      <div class="flex items-center gap-3 my-4 p-3 bg-slate-50 rounded-xl border border-slate-200">
        <span class="text-xs font-bold text-slate-700 uppercase">Quantity:</span>
        <div class="flex items-center border border-slate-300 bg-white rounded-lg overflow-hidden shadow-2xs">
          <button type="button" onclick="adjustQuickViewQty(-1)" class="px-3 py-1 text-sm font-bold text-slate-600 hover:bg-slate-100 transition">-</button>
          <input type="text" id="quickViewQtyInput" value="1" readonly class="w-10 text-center text-xs font-bold text-slate-900 border-x border-slate-200 py-1">
          <button type="button" onclick="adjustQuickViewQty(1)" class="px-3 py-1 text-sm font-bold text-slate-600 hover:bg-slate-100 transition">+</button>
        </div>
        <button onclick="addToWishlist('${product.id}')" class="ml-auto p-2 text-slate-400 hover:text-red-500 rounded-lg hover:bg-white border border-transparent hover:border-slate-200 transition" title="Toggle Wishlist" aria-label="Toggle Wishlist">
          <i class="${isWishlisted ? 'fas fa-heart text-red-500' : 'far fa-heart text-slate-600'} text-base"></i>
        </button>
      </div>

      <div class="mt-4 flex flex-wrap gap-3">
        <button onclick="addToCart('${product.id}', currentQuickViewQty); closeQuickView();" class="btn-primary flex-1 justify-center">
          <i class="fas fa-shopping-cart"></i> Add To Cart
        </button>
        <button onclick="buyViaWhatsAppItem('${product.id}', currentQuickViewQty)" class="btn-whatsapp flex-1 justify-center">
          <i class="fab fa-whatsapp"></i> Buy via WhatsApp
        </button>
      </div>
    </div>
  `;

  setBodyScrollLock(true);
  document.getElementById('quickViewBackdrop')?.classList.add('open');
}

function closeQuickView(event) {
  if (event && event.target !== event.currentTarget) return;
  document.getElementById('quickViewBackdrop')?.classList.remove('open');
  setBodyScrollLock(false);
}

// ==========================================
// 9. Resell / Liquidation Modal & Form
// ==========================================
function openResellModal() {
  setBodyScrollLock(true);
  document.getElementById('resellBackdrop')?.classList.add('open');
}

function closeResellModal(event) {
  if (event && event.target !== event.currentTarget) return;
  document.getElementById('resellBackdrop')?.classList.remove('open');
  setBodyScrollLock(false);
}

function handleResellSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('resellName')?.value || '';
  const phone = document.getElementById('resellPhone')?.value || '';
  const company = document.getElementById('resellCompany')?.value || 'N/A';
  const city = document.getElementById('resellCity')?.value || '';
  const category = document.getElementById('resellCategory')?.value || '';
  const qty = document.getElementById('resellQty')?.value || '1';
  const notes = document.getElementById('resellNotes')?.value || '';

  const message = `*OFFICE FURNITURE RESELL / LIQUIDATION REQUEST*\n` +
    `━━━━━━━━━━━━━━━━━━━━━\n` +
    `*Contact Name:* ${name}\n` +
    `*Phone:* ${phone}\n` +
    `*Company:* ${company}\n` +
    `*Location:* ${city}\n` +
    `*Asset Category:* ${category}\n` +
    `*Approx. Quantity:* ${qty} units\n` +
    `*Details:* ${notes}\n` +
    `━━━━━━━━━━━━━━━━━━━━━\n` +
    `Please provide an appraisal valuation and pickup schedule.`;

  closeResellModal();
  showToast('Liquidation request submitted! Opening WhatsApp confirmation...', 'success');

  const waPhone = WHATSAPP_ORDER_PHONE;
  window.open(`https://wa.me/${waPhone}?text=${encodeURIComponent(message)}`, '_blank');
  document.getElementById('resellForm')?.reset();
}

// ==========================================
// 10. Reviews & Blogs Rendering
// ==========================================
function renderReviews() {
  const container = document.getElementById('reviewsContainer');
  if (!container || typeof REVIEWS_DATA === 'undefined') return;

  container.innerHTML = REVIEWS_DATA.map(r => `
    <div class="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between mb-3">
          <div class="flex text-amber-400 text-xs">
            ${Array(r.stars).fill('<i class="fas fa-star"></i>').join('')}
          </div>
          <span class="text-[11px] text-slate-400 font-medium">${r.date}</span>
        </div>
        <p class="text-xs sm:text-sm text-slate-600 leading-relaxed italic mb-4">
          "${r.text}"
        </p>
      </div>
      <div class="flex items-center gap-3 pt-3 border-t border-slate-100">
        <img src="${r.avatar}" alt="${r.name}" class="w-9 h-9 rounded-full object-cover">
        <div>
          <h4 class="text-xs font-bold text-slate-900">${r.name}</h4>
          <span class="text-[10px] text-emerald-600 font-semibold block">${r.role}</span>
        </div>
      </div>
    </div>
  `).join('');
}

function renderBlogs() {
  const container = document.getElementById('blogsContainer');
  if (!container || typeof BLOG_DATA === 'undefined') return;

  container.innerHTML = BLOG_DATA.map(b => `
    <div class="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-md transition duration-200 flex flex-col">
      <div class="h-44 overflow-hidden relative">
        <img src="${b.img}" alt="${b.title}" class="w-full h-full object-cover hover:scale-105 transition duration-300">
        <span class="absolute top-3 left-3 bg-slate-900/80 backdrop-blur text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
          ${b.category}
        </span>
      </div>
      <div class="p-5 flex flex-col flex-grow">
        <div class="text-[11px] text-slate-400 mb-1.5 flex items-center justify-between">
          <span>${b.date}</span>
          <span>${b.readTime}</span>
        </div>
        <h3 class="text-sm sm:text-base font-bold text-slate-900 mb-2 leading-snug">
          ${b.title}
        </h3>
        <p class="text-xs text-slate-500 leading-relaxed mb-4 flex-grow">
          ${b.summary}
        </p>
        <a href="#hero" class="text-xs font-bold text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-1 mt-auto">
          Read Full Article <i class="fas fa-chevron-right text-[10px]"></i>
        </a>
      </div>
    </div>
  `).join('');
}

// ==========================================
// 11. Toast Notifications
// ==========================================
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast-item ${type === 'success' ? 'success' : ''}`;
  
  const icon = type === 'success' ? 'fa-check-circle text-emerald-400' : 'fa-info-circle text-amber-400';
  toast.innerHTML = `
    <i class="fas ${icon}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ==========================================
// 12. Mobile Menu & Header Scroll & Back-to-Top
// ==========================================
function toggleMobileMenu() {
  const drawer = document.getElementById('mobileDrawer');
  const isOpen = drawer?.classList.contains('open');
  document.getElementById('mobileDrawerBackdrop')?.classList.toggle('open');
  drawer?.classList.toggle('open');
  setBodyScrollLock(!isOpen);
}

document.getElementById('mobileMenuBtn')?.addEventListener('click', toggleMobileMenu);

function initHeaderScroll() {
  const header = document.getElementById('mainHeader');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });
}

function initBackToTop() {
  const btn = document.getElementById('backToTopBtn');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });
}

