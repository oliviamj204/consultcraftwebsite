import React, { useState, useEffect } from "react";
import "./pp.css";

const PrivacyPolicy = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="tc-container">

      <div className="tc-updated">Privacy Policy</div>

      <div className="tc-content">
        <p><strong>1. INTRODUCTION</strong></p>
        <p>ConsultCraft Inc. (“Company”, “we”, “us”, or “our”), through its product SportsCove (“SportsCove App”), values your privacy and is committed to protecting it. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use the SportsCove App, website, and related services. Please read this Privacy Policy carefully to understand our practices regarding your information and how we handle it in compliance with U.S. state privacy laws (such as California CCPA/CPRA, Virginia VCDPA, Colorado CPA, Connecticut CTDPA, Utah UCPA) and applicable international regulations.</p>

<p><strong>2. DEFINITIONS</strong></p>
<p><strong>2.1 Personal Information:</strong> Information that identifies, relates to, describes, or is capable of being associated with a particular individual, including but not limited to name, email address, phone number, payment details, and usage data.</p>
<p><strong>2.2 Sensitive Personal Information:</strong> Includes financial account information, precise geolocation data, health information, biometric identifiers, and any other category designated as sensitive under state privacy laws.</p>
<p><strong>2.3 User:</strong> Any individual who downloads, accesses, or uses the SportsCove App and services.</p>
<p><strong>2.4 Service Provider:</strong> Sports coaches, trainers, and other fitness professionals who offer services through SportsCove.</p>
<p><strong>2.5 Client:</strong> Users who seek and receive coaching services via SportsCove.</p>

<p><strong>3. INFORMATION WE COLLECT</strong></p>
<p><u>3.1 Information You Provide Directly:</u></p>
<ul>
  <li><strong>Account Information:</strong> Name, email, phone number, DOB, username, password, profile photo, linked social accounts.</li>
  <li><strong>Profile Information:</strong> Sports interests, goals, availability, experience level, and location (city/country).</li>
  <li><strong>Optional Social Media Links:</strong> Links like Instagram, LinkedIn, YouTube, TikTok.</li>
  <li><strong>Payment Information:</strong> Credit/debit card details, billing address, transaction history.</li>
  <li><strong>Communication Data:</strong> In-app messages, support requests, reviews, and ratings.</li>
</ul>
<p><u>3.2 Information Collected Automatically:</u></p>
<ul>
  <li><strong>Device and Usage Information:</strong> Device ID, OS, version, IP, app usage, crash logs, performance data.</li>
  <li><strong>Location Information:</strong> With consent, precise geolocation; otherwise, approximate city/country.</li>
</ul>
<p><u>3.3 Information from Third Parties:</u></p>
<ul>
  <li><strong>Social Media Integration:</strong> If you connect social accounts, we may collect permitted profile data.</li>
  <li><strong>Background Checks:</strong> For Service Providers, we may collect background verification data.</li>
</ul>

<p><strong>4. COOKIES AND TRACKING TECHNOLOGIES</strong></p>
<p>SportsCove uses local storage, device identifiers, and may use cookies on its website. Third parties (analytics, ads, or embedded services) may also deploy cookies or tracking tools.</p>
<ul>
  <li><strong>Essential:</strong> Login sessions, preferences.</li>
  <li><strong>Analytics:</strong> Firebase, etc., for usage insights.</li>
  <li><strong>Embedded Services:</strong> WebViews may include external cookies.</li>
  <li><strong>Advertising IDs (planned):</strong> For personalized ads, subject to consent.</li>
</ul>
<p>You can control permissions in your device settings. Disabling tracking may affect personalization.</p>

<p><strong>5. HOW WE USE YOUR INFORMATION</strong></p>
<p>We use your information to:</p>
<ul>
  <li>Provide and manage SportsCove services.</li>
  <li>Match Clients with Service Providers.</li>
  <li>Process secure payments and transactions.</li>
  <li>Enable communication between Users.</li>
  <li>Verify identity and run provider background checks.</li>
  <li>Offer support and send service-related notifications.</li>
  <li>Improve features, personalize experiences, and conduct analytics.</li>
  <li>Detect/prevent fraud, ensure security, and comply with legal obligations.</li>
  <li>Send marketing updates (with your consent).</li>
</ul>
<p><u>Legal Bases:</u> Consent, contract fulfillment, legitimate business interests, or legal obligations.</p>

<p><strong>6. SHARING YOUR INFORMATION</strong></p>
<p>We do not sell your personal data. We may share it with:</p>
<ul>
  <li><strong>Service Providers:</strong> Coaches and trainers for bookings.</li>
  <li><strong>Third-Party Vendors:</strong> Background check providers, payment processors, analytics tools, cloud storage.</li>
  <li><strong>Legal Authorities:</strong> Where required by law, court order, or to protect rights/safety.</li>
  <li><strong>Business Transfers:</strong> In a merger, acquisition, or restructuring.</li>
  <li><strong>With Your Consent:</strong> For features like social media integrations.</li>
</ul>
<p><u>International Transfers:</u> Your data may be transferred outside your country; we apply appropriate safeguards (e.g., contractual clauses).</p>

<p><strong>7. YOUR PRIVACY RIGHTS</strong></p>
<p><u>General Rights:</u> You may request access, correction, deletion, portability, or object to processing. You may withdraw consent at any time.</p>
<p><u>State-Specific Rights:</u></p>
<ul>
  <li><strong>California (CCPA/CPRA):</strong> Right to know, delete, correct, opt-out of sale/sharing, limit sensitive info use, non-discrimination.</li>
  <li><strong>Virginia, Colorado, Connecticut, Utah:</strong> Rights to access, delete, correct, portability, opt-out of targeted ads/sale. Appeal rights also apply.</li>
</ul>
<p><u>How to Exercise:</u> Contact us at <strong>info@consultcraftinc.com</strong>, use in-app privacy tools, or (California only) our toll-free hotline/portal at <em>[1-800-XXX-XXXX]</em> / <em>www.consultcraftinc.com/privacy</em>.</p>

<p><strong>8. DATA RETENTION</strong></p>
<p>We retain data only as long as necessary, or as required by law.</p>
<ul>
  <li><strong>Account Data:</strong> Until deletion + 30 days buffer.</li>
  <li><strong>Transactions:</strong> 7 years (tax/accounting).</li>
  <li><strong>Communications:</strong> Up to 3 years post-account closure.</li>
  <li><strong>Marketing Data:</strong> Until opt-out or 3 years after last interaction.</li>
</ul>
<p>Some data may be stored longer if legally required or for dispute resolution.</p>

<p><strong>9. SECURITY MEASURES</strong></p>
<p>We apply industry-standard safeguards to protect your data:</p>
<ul>
  <li>Encryption (SSL/TLS for transit, AES at rest).</li>
  <li>Firewalls, access controls, and secure authentication.</li>
  <li>Routine vulnerability scans and system updates.</li>
  <li>Staff training on privacy/security practices.</li>
</ul>
<p>No system is fully secure; users share data at their own risk.</p>
<p><strong>10. CHILDREN’S PRIVACY</strong></p>
<p>The SportsCove App is not directed to or intended for children under 13 years of age (or under 16 where applicable under local law, such as GDPR jurisdictions). We do not knowingly collect personal information from children. If we discover that we have inadvertently collected such information, we will delete it immediately. Parents or guardians who believe their child has provided us with personal data may contact us at <strong>info@consultcraftinc.com</strong> to request removal.</p>

<p><strong>11. THIRD-PARTY LINKS AND SERVICES</strong></p>
<p>The SportsCove App and website may contain links to third-party websites or embedded services, such as payment processors, social media platforms, or analytics providers. We are not responsible for the privacy practices or content of these third parties. Please review their privacy policies before engaging with them.</p>
<p><u>11.1 Social Media Plugins:</u> If you choose to connect or share content via Instagram, YouTube, TikTok, LinkedIn, or other platforms, data may be shared with those services in accordance with their policies.</p>
<p><u>11.2 External Booking/Payment Services:</u> Some transactions may be facilitated through trusted third-party providers, who may collect and process information directly.</p>

<p><strong>12. INTERNATIONAL USERS</strong></p>
<p>If you are accessing SportsCove from outside the United States, please be aware that your data may be transferred to and processed in the United States, where data protection laws may differ. We implement safeguards (such as contractual clauses) to ensure compliance with GDPR and other international requirements.</p>

<p><strong>13. CHANGES TO THIS PRIVACY POLICY</strong></p>
<p>We may update this Privacy Policy periodically to reflect changes in our practices, technology, or legal requirements. Updates will be posted in the app and on our website with a revised “Last Updated” date. In the case of significant changes, we may notify you through email or in-app alerts. Continued use of the SportsCove App after changes indicates acceptance of the revised Privacy Policy.</p>

<p><strong>14. CONTACT INFORMATION</strong></p>
<p>If you have any questions, requests, or complaints regarding this Privacy Policy or our data practices, please contact us:</p>
<ul>
  <li>Email: <strong>info@consultcraftinc.com</strong></li>
  <li>Mailing Address: ConsultCraft Inc., [Insert Office Address]</li>
  <li>California Residents (CCPA/CPRA): Toll-Free Hotline: <em>1-800-XXX-XXXX</em></li>
</ul>

<p><strong>15. GOVERNING LAW</strong></p>
<p>This Privacy Policy shall be governed by and construed under the laws of the United States and the State of Delaware, without regard to conflict of law principles. Users agree that disputes relating to privacy or data protection will be resolved under applicable U.S. and state laws.</p>

<p><strong>16. CONSENT</strong></p>
<p>By creating an account, accessing, or using the SportsCove App and related services, you acknowledge that you have read, understood, and agreed to this Privacy Policy. Where required by law, we will seek your explicit consent before processing sensitive personal data.</p>
</div>

      {showButton && (
        <button onClick={scrollToTop} aria-label="Scroll to top">↑</button>
      )}

      <footer>
        <p>© {new Date().getFullYear()} ConsultCraft LLC. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
