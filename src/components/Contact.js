// components/Contact.js
import React from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGraduationCap, FaLinkedin, FaGithub } from 'react-icons/fa';

const Contact = () => {
  const contactInfo = [
    {
      icon: <FaEnvelope />,
      label: "Email",
      value: "jeffreyhe406@gmail.com",
      link: "mailto:jeffreyhe406@gmail.com"
    },
    {
      icon: <FaPhone />,
      label: "Phone",
      value: "(+1) 607-280-7880",
      link: "tel:+16072807880"
    },
    {
      icon: <FaMapMarkerAlt />,
      label: "Location",
      value: "Ithaca, USA",
      link: null
    },
    {
      icon: <FaGraduationCap />,
      label: "Education",
      value: "Cornell University",
      link: null
    }
  ];

  const socialLinks = [
    {
      icon: <FaLinkedin />,
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/jinfeng-he-142080302"
    },
    {
      icon: <FaGithub />,
      label: "GitHub",
      url: "https://github.com"
    },
    {
      icon: <FaEnvelope />,
      label: "Email",
      url: "mailto:jeffreyhe406@gmail.com"
    }
  ];

  return (
    <div className="manga-container">
      <div className="contact-panel" style={{ gridColumn: '1 / -1', gridRow: '1 / 3' }}>
        <div className="contact-content">
          <h2 className="contact-title">GET IN TOUCH</h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '30px',
            marginTop: '40px'
          }}>
            {/* Contact Information */}
            <div style={{ textAlign: 'left' }}>
              <h3 style={{
                fontFamily: 'Orbitron, monospace',
                fontSize: '1.5rem',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                marginBottom: '30px',
                color: '#fff'
              }}>
                CONTACT INFO
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {contactInfo.map((info, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ 
                      fontSize: '2rem',
                      width: '50px',
                      textAlign: 'center'
                    }}>
                      {info.icon}
                    </div>
                    <div>
                      <div style={{
                        fontSize: '0.8rem',
                        fontFamily: 'Orbitron, monospace',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        color: '#ccc',
                        marginBottom: '5px'
                      }}>
                        {info.label}
                      </div>
                      {info.link ? (
                        <a 
                          href={info.link}
                          style={{
                            color: '#fff',
                            textDecoration: 'none',
                            fontSize: '1rem',
                            fontFamily: 'Roboto Mono, monospace',
                            fontWeight: '700'
                          }}
                        >
                          {info.value}
                        </a>
                      ) : (
                        <div style={{
                          color: '#fff',
                          fontSize: '1rem',
                          fontFamily: 'Roboto Mono, monospace',
                          fontWeight: '700'
                        }}>
                          {info.value}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div style={{ textAlign: 'center' }}>
              <h3 style={{
                fontFamily: 'Orbitron, monospace',
                fontSize: '1.5rem',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                marginBottom: '30px',
                color: '#fff'
              }}>
                SOCIAL LINKS
              </h3>
              <div className="social-icons" style={{ justifyContent: 'center', gap: '20px' }}>
                {socialLinks.map((social, index) => (
                  <a 
                    key={index}
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="social-icon"
                    style={{
                      width: '80px',
                      height: '80px',
                      fontSize: '2rem'
                    }}
                    title={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
