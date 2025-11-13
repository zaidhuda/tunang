// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optional: Unobserve after animation to improve performance
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Phone numbers stored in obfuscated format to avoid bot scraping
// Numbers are reversed and base64 encoded
const encodedNumbers = {
    muna: 'NTI1ODM4OTQxMDYr'
};

// Decode phone number
function decodePhone(encoded) {
    try {
        // Decode: base64 decode, then reverse
        const decoded = atob(encoded);
        return decoded.split('').reverse().join('');
    } catch (e) {
        return '';
    }
}

// Initialize contact links with phone numbers
function initContactLinks() {
    const contactLinks = document.querySelectorAll('.contact-link[data-contact]');
    contactLinks.forEach(link => {
        const contactType = link.getAttribute('data-contact');
        const encoded = encodedNumbers[contactType];
        if (encoded) {
            const phoneNumber = decodePhone(encoded);
            link.href = `tel:${phoneNumber}`;
            const numberSpan = link.querySelector('.contact-number');
            if (numberSpan) {
                numberSpan.textContent = phoneNumber;
            }
        }
    });
}

// Observe all elements with fade-in class
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // Initialize contact links
    initContactLinks();
});

// Function to generate and download calendar file
function downloadCalendar() {
    // Event details
    const eventTitle = 'Majlis Merisik & Pertunangan - Muna & Zaid';
    const eventDate = '20251129'; // November 29, 2025
    const startTime = '140000'; // 2:00 PM
    const endTime = '180000'; // 6:00 PM
    const location = 'No 44, Jalan BS 13, Taman Bertam Setia, Melaka';

    const description = `Majlis Merisik & Pertunangan

Dengan penuh kesyukuran ke hadrat Ilahi, kami sekeluarga menjemput anda untuk bersama-sama meraikan majlis merisik dan pertunangan sebagai permulaan perjalanan menuju alam perkahwinan.

Normunawwarah Sanaludin & Zaid Huda

Aturcara:
2:00 PM - Ketibaan rombongan keluarga pihak lelaki
2:30 PM - Pembuka bicara dan bacaan doa
2:45 PM - Perbincangan antara dua keluarga
3:15 PM - Sesi sarung cincin dan fotografi
3:30 PM - Jamuan makan

Hubungi: Muna - +60149838525

#MunaLiZaid`;

    // Format dates for ICS (YYYYMMDDTHHMMSS)
    const dtStart = `${eventDate}T${startTime}`;
    const dtEnd = `${eventDate}T${endTime}`;
    const dtStamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    // Create ICS file content
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Muna & Zaid//Engagement Event//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
UID:${Date.now()}@munalizaid
DTSTAMP:${dtStamp}
DTSTART:${dtStart}
DTEND:${dtEnd}
SUMMARY:${eventTitle}
DESCRIPTION:${description.replace(/\n/g, '\\n')}
LOCATION:${location}
STATUS:CONFIRMED
SEQUENCE:0
END:VEVENT
END:VCALENDAR`;

    // Create blob and download
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Majlis_Merisik_Pertunangan_Muna_Zaid.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
}
