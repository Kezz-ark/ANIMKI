// Photo gallery functionality
class KawaiiGallery {
    constructor() {
        this.photoFolder = 'photos'; // Folder name in your repo
        this.supportedFormats = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
        this.gallery = document.getElementById('gallery');
        this.loading = document.getElementById('loading');
        this.error = document.getElementById('error');
        
        this.init();
    }
    
    async init() {
        try {
            await this.loadPhotos();
        } catch (error) {
            console.error('Error loading photos:', error);
            this.showError();
        }
    }
    
    async loadPhotos() {
        // For GitHub Pages, we'll try to load a predefined list of photos
        // You'll need to update this array with your actual photo filenames
        const photoList = await this.getPhotoList();
        
        if (photoList.length === 0) {
            this.showError();
            return;
        }
        
        this.hideLoading();
        this.displayPhotos(photoList);
    }
    
    async getPhotoList() {
        // Method 1: Try to load from a photos.json file (recommended)
        try {
            const response = await fetch('photos.json');
            if (response.ok) {
                const data = await response.json();
                return data.photos || [];
            }
        } catch (error) {
            console.log('No photos.json found, trying alternative method...');
        }
        
'image4.png', 'image5.png',
            'pic1.jpeg', 'pic2.jpeg', 'pic3.jpeg', 'pic4.jpeg', 'pic5.jpeg',
            'anime1.jpg', 'anime2.jpg', 'anime3.jpg', 'kawaii1.png', 'kawaii2.png'
        ];
        
        // Check which photos actually exist
        const existingPhotos = [];
        for (const photoName of commonPhotoNames) {
            try {
                const response = await fetch(`${this.photoFolder}/${photoName}`, { method: 'HEAD' });
                if (response.ok) {
                    existingPhotos.push(photoName);
                }
            } catch (error) {
                // Photo doesn't exist, continue checking others
                continue;
            }
        }
        
        return existingPhotos;
    }
    
    displayPhotos(photoList) {
        this.gallery.innerHTML = '';
        
        photoList.forEach((photoName, index) => {
            const photoCard = this.createPhotoCard(photoName, index);
            this.gallery.appendChild(photoCard);
        });
        
        // Add some kawaii animations
        this.addKawaiiEffects();
    }
    
    createPhotoCard(photoName, index) {
        const card = document.createElement('div');
        card.className = 'photo-card';
        card.style.animationDelay = `${index * 0.1}s`;
        
        const img = document.createElement('img');
        img.src = `${this.photoFolder}/${photoName}`;
        img.alt = photoName;
        img.loading = 'lazy';
        
        const name = document.createElement('div');
        name.className = 'photo-name';
        name.textContent = this.formatPhotoName(photoName);
        
        // Add error handling for images
        img.onerror = () => {
            card.style.display = 'none';
        };
        
        // Add click event for full-size view
        img.addEventListener('click', () => this.showFullImage(img.src, photoName));
        
        card.appendChild(img);
        card.appendChild(name);
        
        return card;
    }
    
    formatPhotoName(filename) {
        // Remove extension and format nicely
        return filename
            .replace(/\.[^/.]+$/, '')
            .replace(/[-_]/g, ' ')
            .replace(/\b\w/g, l => l.toUpperCase());
    }
    
    showFullImage(src, name) {
        // Create modal for full-size image view
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <img src="${src}" alt="${name}" class="modal-image">
                <div class="modal-caption">${this.formatPhotoName(name)} ✨</div>
            </div>
        `;
        
        // Add modal styles
        modal.style.cssText = `
            display: flex;
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.8);
            align-items: center;
            justify-content: center;
        `;
        
        const modalContent = modal.querySelector('.modal-content');
        modalContent.style.cssText = `
            position: relative;
            max-width: 90%;
            max-height: 90%;
            text-align: center;
        `;
        
        const modalImage = modal.querySelector('.modal-image');
        modalImage.style.cssText = `
            max-width: 100%;
            max-height: 80vh;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(255, 107, 157, 0.5);
        `;
        
        const closeBtn = modal.querySelector('.close');
        closeBtn.style.cssText = `
            position: absolute;
            top: -40px;
            right: 0;
            color: #fff;
            font-size: 35px;
            font-weight: bold;
            cursor: pointer;
            z-index: 1001;
        `;
        
        const caption = modal.querySelector('.modal-caption');
        caption.style.cssText = `
            color: #fff;
            padding: 15px;
            font-size: 1.2rem;
            font-weight: 600;
        `;
        
        // Close modal events
        closeBtn.onclick = () => document.body.removeChild(modal);
        modal.onclick = (e) => {
            if (e.target === modal) document.body.removeChild(modal);
        };
        
        document.body.appendChild(modal);
    }
    
    addKawaiiEffects() {
        // Add entrance animation to photo cards
        const cards = document.querySelectorAll('.photo-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.animation = `fadeInUp 0.6s ease forwards ${index * 0.1}s`;
        });
        
        // Add the fadeInUp animation to CSS dynamically
        if (!document.querySelector('#kawaii-animations')) {
            const style = document.createElement('style');
            style.id = 'kawaii-animations';
            style.textContent = `
                @keyframes fadeInUp {
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    hideLoading() {
        this.loading.style.display = 'none';
    }
    
    showError() {
        this.loading.style.display = 'none';
        this.error.style.display = 'block';
    }
}

// Initialize the gallery when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new KawaiiGallery();
});

// Add some extra kawaii interactions
document.addEventListener('DOMContentLoaded', () => {
    // Add floating hearts on click
    document.addEventListener('click', (e) => {
        if (e.target.closest('.photo-card')) {
            createFloatingHeart(e.pageX, e.pageY);
        }
    });
});

function createFloatingHeart(x, y) {
    const heart = document.createElement('div');
    heart.innerHTML = '💖';
    heart.style.cssText = `
        position: absolute;
        left: ${x - 10}px;
        top: ${y - 10}px;
        font-size: 20px;
        pointer-events: none;
        z-index: 1000;
        animation: floatHeart 2s ease-out forwards;
    `;
    
    // Add floating animation
    if (!document.querySelector('#heart-animation')) {
        const style = document.createElement('style');
        style.id = 'heart-animation';
        style.textContent = `
            @keyframes floatHeart {
                0% {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
                100% {
                    opacity: 0;
                    transform: translateY(-100px) scale(0.5);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(heart);
    
    // Remove heart after animation
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, 2000);
}
