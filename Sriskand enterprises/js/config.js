/**
 * Sri Skand Enterprises - Central Business Configuration
 * 
 * UPDATE YOUR BUSINESS DETAILS HERE:
 * All phone numbers, WhatsApp links, emails, and address placeholders
 * across the entire website will automatically update from this file!
 */

const BUSINESS_CONFIG = {
  // Business Identity
  name: "Sri Skand Enterprises",
  tagline: "Premium UPVC Windows & Doors, Aluminium Fabrications",
  foundedYear: "2026",

  contactPerson: "Nithin CS",

  // Contact Information
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

  // Google Maps Embed URL or Coordinates
  googleMapsEmbedUrl: "https://www.google.com/maps?q=VH44%2BQCJ+SHREEMATI+ELECTRICALS,+Anjanapura+80+Feet+Rd,+Anjanapura+5th+Block,+Anjanapura+Twp,+Bengaluru,+Karnataka+560062&output=embed",
  googleMapsDirectionsUrl: "https://maps.google.com/?q=VH44%2BQCJ+SHREEMATI+ELECTRICALS,+Anjanapura+80+Feet+Rd,+Anjanapura+5th+Block,+Anjanapura+Twp,+Bengaluru,+Karnataka+560062",

  // Default WhatsApp Inbound Message
  whatsappDefaultMessage: "Hello Sri Skand Enterprises, I am interested in UPVC windows and doors for my project. I would like to get a quotation and discuss product options.",

  // Social Media Links (Optional placeholders)
  socialLinks: {
    facebook: "#",
    instagram: "#",
    linkedin: "#",
    youtube: "#"
  }
};

// Make accessible to browser window
if (typeof window !== "undefined") {
  window.BUSINESS_CONFIG = BUSINESS_CONFIG;
}
