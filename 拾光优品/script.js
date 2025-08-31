const products = [];
for (let i = 1; i <= 12; i++) {
    products.push({
        src: `images/product${i}.jpg`,
        title: `产品 ${i}`
    });
}

const gallery = document.getElementById('gallery');
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
    contactBtn.id = 'contactBtn';
    contactBtn.href = 'weixin://'; // 可改成你的微信/WhatsApp链接
    contactBtn.textContent = '联系我';

    item.appendChild(img);
    item.appendChild(caption);
    item.appendChild(contactBtn);

    // 点击打开预览
    item.addEventListener('click', (e) => {
        if (e.target.tagName.toLowerCase() === 'a') return; // 避免点击按钮触发
        openLightbox(index);
    });

    gallery.appendChild(item);
});

// 预览功能
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
window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        backToTop.style.display = 'block';
    } else {
        backToTop.style.display = 'none';
    }
});
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
