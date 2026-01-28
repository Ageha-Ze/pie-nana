// Pie Nana Website Configuration
// File ini untuk memudahkan kustomisasi tanpa edit kode utama

// Informasi Kontak
const CONFIG = {
    whatsappNumber: '628993071991', // Format: 62 + nomor tanpa 0
    displayPhone: '0899-3071-991', // Format display
    email: 'info@pienana.com',

    // Informasi Bisnis
    businessName: 'Pie Nana',
    tagline: 'Sweet & Fresh',
    businessHours: 'Senin - Sabtu: 08.00 - 20.00',

    // Harga Produk (dalam Rupiah)
    priceKacang: 4000,
    priceMarble: 3500,
    priceAlmond: 4000,

    // Minimum Order
    minOrder: 6, // pieces
    orderNotice: 'H-1', // waktu minimal pemesanan

    // Social Media (opsional)
    // instagram: '@pienana',
    // facebook: 'PieNana',
    // tiktok: '@pienana',

    // SEO Settings
    metaTitle: 'Pie Nana - Pie Brownies Dark Chocolate Premium',
    metaDescription: 'Pie Brownies premium dengan dark chocolate berkualitas. Tersedia varian topping kacang, kacang almond, dan coklat marbles. Homemade, fresh, dan higienis.',
    metaKeywords: 'pie brownies, dark chocolate, kue brownies, pie coklat, kacang almond, homemade, premium',

    // Google Analytics (opsional)
    // gaTrackingId: 'UA-XXXXXXXXX-X',

    // Website Settings
    enableAnimations: true,
    enableWhatsappFloat: true
};

// Ekspor konfigurasi
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}