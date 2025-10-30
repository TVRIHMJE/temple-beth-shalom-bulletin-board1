
import React from 'react';
import './ContactInfo.css';

const ContactInfo: React.FC = () => {
  return (
    <section id="contact" className="contact-info">
      <div className="container">
        <h2>Contact Us</h2>
        <div className="contact-grid">
          <div className="contact-card">
            <div className="contact-icon">📍</div>
            <h3>Address</h3>
            <p>123 Temple Street<br />Your City, State 12345</p>
          </div>
          
          <div className="contact-card">
            <div className="contact-icon">📞</div>
            <h3>Phone</h3>
            <p>(555) 123-4567<br />For urgent matters</p>
          </div>
          
          <div className="contact-card">
            <div className="contact-icon">✉️</div>
            <h3>Email</h3>
            <p>info@templebethshalom.org<br /> rabbi@templebethshalom.org</p>
          </div>
          
          <div className="contact-card">
            <div className="contact-icon">🕒</div>
            <h3>Service Times</h3>
            <p>
              Shabbat Morning: 9:00 AM<br />
              Mincha/Ma'ariv: Sunset<br />
              Daily Minyan: 7:00 AM & 6:00 PM
            </p>
          </div>
        </div>
        
        <div className="holiday-schedule">
          <h3>Upcoming Holiday Schedule</h3>
          <div className="schedule-grid">
            <div className="schedule-item">
              <span className="holiday-name">Purim</span>
              <span className="holiday-date">February 23, 2024</span>
            </div>
            <div className="schedule-item">
              <span className="holiday-name">Passover</span>
              <span className="holiday-date">April 23, 2024</span>
            </div>
            <div className="schedule-item">
              <span className="holiday-name">Shavuot</span>
              <span className="holiday-date">June 12, 2024</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
