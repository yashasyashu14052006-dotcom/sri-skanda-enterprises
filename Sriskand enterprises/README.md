# Sri Skand Enterprises - Premium Business Website

A modern, responsive, high-converting business website created for **Sri Skand Enterprises**, specialists in UPVC Windows, UPVC Doors, and Aluminium Fabrications.

---

## 🌟 Key Features

- **Architectural Aesthetic**: Clean luxury styling with deep navy (`#0B1B3D`), charcoal slate, off-white, and metallic grey accents.
- **Lead Generation & Quotation System**:
  - Request a Free Quote form with validation for Name, Phone, Email, Location, Products, and Quantities.
  - After submission, leads can be instantly forwarded directly to the company's WhatsApp with full specifications pre-formatted.
  - Product cards feature **“Enquire Now”** buttons that automatically smooth-scroll and pre-select the product in the quote form.
- **Interactive Projects / Gallery**: Filterable portfolio (All, Sliding Windows, Casement Windows, Balcony Doors, Modern Homes) with zoom preview and high-resolution Lightbox modal.
- **10-Item FAQ Accordion**: Clear, factual questions and answers explaining UPVC benefits, customization, durability in Indian weather, and after-sales service.
- **WhatsApp Integration**:
  - Floating WhatsApp button with notification pulse.
  - Pre-filled message: *"Hello Sriskand Enterprises, I am interested in UPVC windows/doors. I would like to get a quotation."*
- **Mobile Optimized**:
  - Clean slide-out hamburger navigation menu.
  - Mobile bottom sticky quick contact bar (Call / WhatsApp / Free Quote).
- **SEO & Local Search Optimized**:
  - OpenGraph social cards, clean semantic H1-H3 hierarchy, and schema.org `HomeAndConstructionBusiness` JSON-LD structured data.

---

## 🚀 How to Run and Preview

1. **Immediate Local Preview**:
   - Simply double-click `index.html` to open it in Google Chrome, Microsoft Edge, Mozilla Firefox, or Safari.
   - No installation, servers, or terminal commands are required!

2. **Web Server (Optional)**:
   - You can also serve it using any local static web server or VS Code "Live Server" extension.

3. **Deploy to Production**:
   - Simply upload all the files (`index.html`, `css/`, `js/`) to any hosting platform:
     - GitHub Pages
     - Netlify (Drag & Drop folder)
     - Vercel
     - Hostinger / cPanel / Bluehost (File Manager or FTP)

---

## ⚙️ How to Update Business Contact Information

All phone numbers, WhatsApp numbers, email addresses, business hours, and office locations are centralized in a single configuration file:

📁 **`js/config.js`**

Open `js/config.js` in any text editor (Notepad, VS Code, etc.) and replace the placeholders:

```javascript
const BUSINESS_CONFIG = {
  // Contact Person & Information
  contactPerson: "Nithin CS",
  phone: "+91 82962 00628",
  phoneRaw: "918296200628",
  
  whatsapp: "+91 82962 00628",
  whatsappRaw: "918296200628",
  
  email: "Sriskandenterprises@gmail.com",
  
  address: {
    line1: "VH44+QCJ SHREEMATI ELECTRICALS, Anjanapura 80 Feet Rd, Anjanapura 5th Block",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560062",
    full: "VH44+QCJ SHREEMATI ELECTRICALS, Anjanapura 80 Feet Rd, Anjanapura 5th Block, Anjanapura Twp, Bengaluru, Karnataka 560062"
  },

  workingHours: "9:00 AM - 6:00 PM (Mon - Sat)",

  // Google Maps
  googleMapsEmbedUrl: "https://www.google.com/maps?q=VH44%2BQCJ+SHREEMATI+ELECTRICALS,+Anjanapura+80+Feet+Rd,+Anjanapura+5th+Block,+Anjanapura+Twp,+Bengaluru,+Karnataka+560062&output=embed",
  googleMapsDirectionsUrl: "https://maps.google.com/?q=VH44%2BQCJ+SHREEMATI+ELECTRICALS,+Anjanapura+80+Feet+Rd,+Anjanapura+5th+Block,+Anjanapura+Twp,+Bengaluru,+Karnataka+560062"
};
```

Every button, phone link, WhatsApp link, and footer detail across the entire website will automatically update!

---

## 📁 File Structure

```
Sriskand enterprises/
├── index.html         # Main website structure, schema markup & SEO
├── assets/
│   └── images/        # Official logo and high-resolution UPVC product & gallery photos
├── css/
│   └── styles.css     # Premium architectural design, luxury colors, cards & lightbox
├── js/
│   ├── config.js      # Central business configuration (Nithin CS, phone, address, WhatsApp)
│   └── main.js        # Dynamic interactive features, form validation, gallery & accordions
└── README.md          # Documentation & setup guide
```

---

© 2026 Sri Skand Enterprises. All Rights Reserved.
