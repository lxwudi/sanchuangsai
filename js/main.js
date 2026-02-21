const navToggle = document.getElementById("nav-toggle");
const nav = document.getElementById("site-nav");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
    navToggle.classList.toggle("active");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      navToggle.classList.remove("active");
    });
  });
}

// Product Showcase Interaction
const mainImg = document.querySelector(".showcase-main .main-img");
const mainTitle = document.querySelector(".showcase-info h3");
const mainDesc = document.querySelector(".showcase-info p");
const galleryItems = document.querySelectorAll(".gallery-item");

if (mainImg && galleryItems.length > 0) {
  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      const img = item.querySelector("img");
      const title = item.querySelector("span").innerText;
      
      // 移除其他项的激活状态
      galleryItems.forEach(i => i.classList.remove("active"));
      item.classList.add("active");
      
      // Update Main Image with fade effect
      mainImg.style.opacity = "0";
      mainImg.style.transform = "scale(0.95)";
      setTimeout(() => {
        mainImg.src = img.src;
        mainImg.alt = img.alt;
        mainImg.style.opacity = "1";
        mainImg.style.transform = "scale(1)";
        
        // Update Text Context
        if (title.includes("纳米硒制备")) {
           mainTitle.innerText = "纳米硒制备工艺";
           mainDesc.innerHTML = "采用常温还原法制备，<span class='highlight'>粒径均一</span>，稳定性优于胶体金。";
        } else if (title.includes("粒径")) {
           mainTitle.innerText = "粒径分布与电位";
           mainDesc.innerHTML = "Zeta 电位分布集中，保证试剂盒批次间<span class='highlight'>高度一致性</span>。";
        } else if (title.includes("POCT")) {
           mainTitle.innerText = "POCT 场景应用";
           mainDesc.innerHTML = "适用于<span class='highlight'>救护车、急诊、社区</span>等多场景快速检测。";
        } else {
           mainTitle.innerText = "纳米硒心梗早检试纸条";
           mainDesc.innerHTML = "集成纳米硒标记技术与 H-FABP 早期探针，实现 <span class='highlight'>0.5h</span> 窗口期检测。";
        }
      }, 300);
    });
  });
}

// 滚动时导航栏效果
let lastScroll = 0;
const header = document.querySelector('.site-header');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.15)';
  } else {
    header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
  }
  
  lastScroll = currentScroll;
});

// 平滑滚动到锚点
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

// 视频背景：准备好后淡入，避免先显示 poster 导致的跳变
(function handleHeroVideo() {
  const heroVideo = document.querySelector('.hero-video');
  if (!heroVideo) return;

  // Try to start playback (autoplay muted should allow it); ignore errors
  heroVideo.play().catch(() => {});

  // When playback begins, add class to fade in
  function showVideo() {
    heroVideo.classList.add('visible');
  }

  // canplay 和 playing 都监听，保证兼容性
  heroVideo.addEventListener('canplay', showVideo, { once: true });
  heroVideo.addEventListener('playing', showVideo, { once: true });

  // Fallback: if the video doesn't fire in X ms, still show to avoid stuck state
  setTimeout(() => {
    if (!heroVideo.classList.contains('visible')) showVideo();
  }, 1500);
})();
