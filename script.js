const products = [];
for (let i = 1; i <= 12; i++) {
    products.push({
        src: `images/product${i}.jpg`,
        title: `产品 ${i}`
    });
}

const gallery = document.getElementById('gallery');
gallery.innerHTML = ''; // 清空，避免重复加载

products.forEach((p, index) => {
    let item = document.createElement('div');
    item.className = 'item';

    let img = document.createElement('img');
    img.src = p.src;
    img.loading = 'lazy';
    img.alt = p.title;

    let caption = document.createElement('div');
    caption.className = 'caption';
    caption.textContent = p.title;

    let contactBtn = document.createElement('a');
    contactBtn.className = 'contact-btn';
    contactBtn.href = 'weixin://'; // 改成你的微信/WhatsApp链接
    contactBtn.textContent = '联系我';

    item.appendChild(img);
    item.appendChild(caption);
    item.appendChild(contactBtn);

    // 只在点击图片时触发 Lightbox
    img.addEventListener('click', () => openLightbox(index));

    gallery.appendChild(item);
});

// Lightbox 功能
let currentIndex = 0;
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');

function openLightbox(index) {
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add('active');
}
function updateLightbox() {
    lightboxImg.src = products[currentIndex].src;
    lightboxCaption.textContent = products[currentIndex].title;
}

document.getElementById('lightboxClose').addEventListener('click', () => {
    lightbox.classList.remove('active');
});
document.getElementById('lightboxPrev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + products.length) % products.length;
    updateLightbox();
});
document.getElementById('lightboxNext').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % products.length;
    updateLightbox();
});
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
    }
});

// 返回顶部按钮
const backToTop = document.getElementById('backToTop');
if (backToTop) {
    window.addEventListener('scroll', () => {
        backToTop.style.display = window.scrollY > 200 ? 'block' : 'none';
    });
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// 导航栏折叠
const menuToggle = document.getElementById('menu-toggle');
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        document.getElementById('nav-links').classList.toggle('open');
    });
}
