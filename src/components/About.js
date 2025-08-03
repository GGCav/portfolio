// components/About.js
import React from 'react';
import { FaGraduationCap, FaMapMarkerAlt, FaCode, FaBrain, FaHeart, FaGamepad, FaBasketballBall, FaPlane, FaDumbbell, FaFilm, FaTv } from 'react-icons/fa';

const About = () => {
  const interests = [
    { icon: <FaDumbbell />, name: "Working Out", description: "Fitness enthusiast focused on strength training and maintaining a healthy lifestyle" },
    { icon: <FaBasketballBall />, name: "Basketball", description: "Passionate basketball player and fan, inspired my startup Montaura.tech" },
    { icon: <FaFilm />, name: "Movies", description: "Avid movie watcher, especially sci-fi, action, and thought-provoking films" },
    { icon: <FaGamepad />, name: "Games", description: "Gaming enthusiast, particularly strategic and competitive games" },
    { icon: <FaTv />, name: "Anime", description: "Anime fan, appreciating storytelling and artistic expression" },
    { icon: <FaPlane />, name: "Travel", description: "Love exploring new cultures, cuisines, and experiences around the world" },
    { icon: <FaHeart />, name: "Jubensha", description: "Enthusiast of Chinese mystery role-playing games and interactive storytelling" }
  ];

  return (
    <div className="manga-container">
      <div className="about-panel" style={{ gridColumn: '1 / -1', gridRow: '1 / 3' }}>
        <div className="about-content">
          <h2 className="about-title">ABOUT ME</h2>
          
          {/* Main Content */}
          <div style={{ display: 'flex', gap: '30px', alignItems: 'flex-start', marginBottom: '40px' }}>
            <div style={{ flex: '1' }}>
              <div className="about-text">
                <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '20px' }}>
                  I'm <strong>Jinfeng He</strong>, a passionate full-stack developer and researcher currently pursuing my Master of Engineering at Cornell University. Based in Ithaca, USA, I specialize in building innovative solutions that bridge the gap between cutting-edge technology and real-world applications.
                </p>
                
                <p style={{ fontSize: '1rem', lineHeight: '1.7', marginBottom: '20px' }}>
                  My expertise spans across <strong>biomedical AI research</strong>, <strong>distributed systems architecture</strong>, and <strong>cross-platform development</strong>. I've led the development of advanced systems including a multi-modal clinical RAG system for healthcare decision support, enhanced transformer-based chemical-disease relation extraction, and high-performance warehouse management systems serving thousands of concurrent users.
                </p>
                
                <p style={{ fontSize: '1rem', lineHeight: '1.7', marginBottom: '20px' }}>
                  As a <strong>startup co-founder</strong> and <strong>technical leader</strong>, I've demonstrated the ability to architect scalable solutions from concept to deployment. My experience includes founding Montaura.tech, a basketball-focused cross-platform application serving 10,000+ daily users, and co-founding USoustenir, a sustainable fashion platform connecting users with eco-friendly brands.
                </p>
                
                <p style={{ fontSize: '1rem', lineHeight: '1.7', marginBottom: '20px' }}>
                  I believe that exceptional software development combines <strong>technical excellence</strong> with <strong>creative problem-solving</strong>. My approach emphasizes understanding business requirements while introducing innovative technical solutions that not only meet expectations but exceed them. I'm passionate about creating systems that provide real value and positive impact through well-architected, scalable solutions.
                </p>
              </div>
            </div>
            
            <div style={{ flex: '0 0 300px' }}>
              <img 
                src={process.env.PUBLIC_URL + '/profile.jpg'} 
                alt="Jinfeng He" 
                style={{
                  width: '100%',
                  border: '3px solid #000',
                  borderRadius: '10px',
                  boxShadow: '5px 5px 0px rgba(0,0,0,0.3)'
                }}
              />
            </div>
          </div>

          {/* Education & Location */}
          <div style={{ 
            display: 'flex', 
            gap: '20px', 
            marginBottom: '40px',
            flexWrap: 'wrap'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: '#f8f8f8',
              padding: '15px 20px',
              border: '2px solid #000',
              borderRadius: '5px'
            }}>
              <FaGraduationCap style={{ fontSize: '1.5rem', color: '#000' }} />
              <div>
                <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>EDUCATION</div>
                <div style={{ fontSize: '0.9rem' }}>Cornell University</div>
              </div>
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: '#f8f8f8',
              padding: '15px 20px',
              border: '2px solid #000',
              borderRadius: '5px'
            }}>
              <FaMapMarkerAlt style={{ fontSize: '1.5rem', color: '#000' }} />
              <div>
                <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>LOCATION</div>
                <div style={{ fontSize: '0.9rem' }}>Ithaca, USA</div>
              </div>
            </div>
          </div>

          {/* Personal Interests */}
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{
              fontFamily: 'Orbitron, monospace',
              fontSize: '1.3rem',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              marginBottom: '20px',
              borderBottom: '2px solid #000',
              paddingBottom: '10px'
            }}>
              PERSONAL INTERESTS
            </h3>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '15px'
            }}>
              {interests.map((interest, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  background: '#f8f8f8',
                  padding: '15px',
                  border: '2px solid #000',
                  borderRadius: '5px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}>
                  <div style={{ 
                    fontSize: '2rem',
                    color: '#000',
                    flexShrink: 0
                  }}>
                    {interest.icon}
                  </div>
                  <div>
                    <div style={{ 
                      fontWeight: '700', 
                      fontSize: '0.9rem',
                      marginBottom: '5px'
                    }}>
                      {interest.name}
                    </div>
                    <div style={{ 
                      fontSize: '0.8rem',
                      lineHeight: '1.4',
                      color: '#666'
                    }}>
                      {interest.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
