QuantRisk.AI Website
A modern, interactive website for QuantRisk.AI - an AI-driven risk management and financial analytics company.
🚀 Quick Start

Download all files and maintain the folder structure
Open index.html in a web browser
No build process required - works out of the box!

📁 Folder Structure
quantrisk-website/
├── index.html                 # Main website file
├── assets/
│   ├── css/
│   │   ├── styles.css        # Main stylesheet
│   │   └── responsive.css    # Mobile responsiveness
│   └── js/
│       ├── main.js          # Core functionality
│       ├── interactive.js   # Interactive features
│       └── animations.js    # Animation controllers
└── README.md               # This file
🎨 Features
Interactive Elements

Real-time Risk Meter: Interactive risk assessment tool with sliders
Smooth Animations: Fade-in effects, hover animations, and transitions
Particle Background: Dynamic floating particles in hero section
Typing Effect: Animated hero title
Mobile Menu: Responsive navigation for mobile devices

Design Elements

Modern Gradient Design: Professional blue/purple gradient theme
Glassmorphism Effects: Frosted glass navigation and form elements
Responsive Grid Layouts: Adapts to all screen sizes
Professional Typography: Inter font for clean, modern look
Interactive Hover States: Enhanced user engagement

Content Sections

Hero Section: Compelling introduction with call-to-action
Services: 6 core service offerings with detailed descriptions
Interactive Demo: Live risk assessment calculator
Features: Company values and differentiators
About: Mission, vision, and company information
Contact: Contact form with industry selection

🛠️ Customization Guide
Updating Colors
Edit the CSS variables in assets/css/styles.css:
css:root {
    --primary-color: #0052cc;     /* Main brand color */
    --secondary-color: #1e3a8a;   /* Secondary brand color */
    --accent-color: #3b82f6;      /* Accent/link color */
    --text-dark: #1f2937;         /* Dark text */
    --text-light: #6b7280;        /* Light text */
}
Adding New Services
In index.html, add a new service card to the .services-grid:
html<div class="service-card fade-in">
    <div class="service-icon">🔧</div>
    <h3>New Service</h3>
    <p>Description of your new service offering.</p>
</div>
Modifying Contact Information
Update contact details in the contact section of index.html:
html<div class="contact-item">
    <strong>Email:</strong> your-email@quantrisk.ai
</div>
<div class="contact-item">
    <strong>Phone:</strong> +91 123456789
</div>
Customizing Risk Calculator
Modify the risk calculation formula in assets/js/interactive.js:
javascriptfunction updateRiskScore() {
    // Adjust weights as needed
    const totalRisk = Math.round((market * 0.4 + liquidity * 0.3 + credit * 0.3));
    // Add your custom risk logic here
}
📱 Mobile Responsiveness
The website is fully responsive with:

Mobile-first design approach
Collapsible navigation menu
Optimized touch targets
Readable typography on small screens
Efficient use of screen space

🔧 Browser Support

Chrome (recommended)
Firefox
Safari
Edge
Mobile browsers (iOS Safari, Chrome Mobile)

📋 Form Handling
The contact form includes:

Client-side validation
Industry selection dropdown
Success/error notifications
Responsive layout

Note: Form submissions are currently handled client-side only. To process real submissions, integrate with:

Email services (EmailJS, Formspree)
Backend APIs
CRM systems (HubSpot, Salesforce)

🎯 Performance Features

Optimized animations with CSS transforms
Debounced scroll events
Efficient particle system
Lazy loading for fade-in effects
Minimal external dependencies

🔄 Future Enhancements
Ready-to-implement features:

Blog section integration
Case studies pages
Client testimonials
Advanced analytics dashboard
Multi-language support
Dark mode toggle
Advanced form validation
Email integration
SEO optimization

🛡️ Security Considerations

No sensitive data stored client-side
Form validation prevents XSS
External dependencies from trusted CDNs only
Clean, semantic HTML structure

📞 Support
For customization help or questions about implementing additional features, the codebase is well-documented and modular for easy modifications.

Built with: HTML5, CSS3, Vanilla JavaScript
Dependencies: Inter Font (Google Fonts)

License: Customizable for QuantRisk.AI use
