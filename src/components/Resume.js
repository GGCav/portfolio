// components/Resume.js
import React, { useState } from 'react';
import { FaEye, FaDownload, FaFileAlt } from 'react-icons/fa';

const Resume = () => {
  const [pdfError, setPdfError] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(true);

  const pdfUrl = process.env.PUBLIC_URL + '/Jinfeng_He_Resume_073124.pdf';

  const handlePdfLoad = () => {
    setPdfLoading(false);
    setPdfError(false);
    console.log('PDF loaded successfully');
  };

  const handlePdfError = () => {
    setPdfLoading(false);
    setPdfError(true);
    console.error('PDF failed to load');
  };

  return (
    <div className="manga-container">
      <div className="resume-panel">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '20px',
          flexWrap: 'wrap',
          gap: '15px'
        }}>
          <h2 className="about-title" style={{ margin: 0 }}>RESUME</h2>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <a 
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: '#000',
                color: '#fff',
                padding: '10px 20px',
                textDecoration: 'none',
                fontFamily: 'Roboto Mono, monospace',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                fontSize: '0.8rem',
                border: '2px solid #000',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#fff';
                e.target.style.color = '#000';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#000';
                e.target.style.color = '#fff';
              }}
            >
              <FaEye /> VIEW PDF
            </a>
            <a 
              href={pdfUrl}
              download="Jinfeng_He_Resume.pdf"
              style={{
                background: '#000',
                color: '#fff',
                padding: '10px 20px',
                textDecoration: 'none',
                fontFamily: 'Roboto Mono, monospace',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                fontSize: '0.8rem',
                border: '2px solid #000',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#fff';
                e.target.style.color = '#000';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#000';
                e.target.style.color = '#fff';
              }}
            >
              <FaDownload /> DOWNLOAD PDF
            </a>
          </div>
        </div>
        
        <div style={{
          border: '3px solid #000',
          background: '#fff',
          height: 'calc(100vh - 200px)',
          minHeight: '600px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {pdfLoading && (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              zIndex: 10
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>
                <FaFileAlt />
              </div>
              <div style={{
                fontFamily: 'Orbitron, monospace',
                fontSize: '1.2rem',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '2px'
              }}>
                LOADING PDF...
              </div>
            </div>
          )}

          {!pdfError ? (
            <iframe
              src={pdfUrl}
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                display: 'block',
                opacity: pdfLoading ? 0 : 1,
                transition: 'opacity 0.3s ease'
              }}
              onLoad={handlePdfLoad}
              onError={handlePdfError}
              title="Resume PDF"
            />
          ) : (
            <div style={{
              padding: '40px',
              textAlign: 'center',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '20px' }}>
                <FaFileAlt />
              </div>
              <h3 style={{
                fontFamily: 'Orbitron, monospace',
                fontSize: '1.5rem',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                marginBottom: '15px'
              }}>
                PDF PREVIEW UNAVAILABLE
              </h3>
              <p style={{
                fontSize: '1rem',
                lineHeight: '1.6',
                marginBottom: '30px',
                maxWidth: '500px'
              }}>
                The PDF preview could not be loaded in the browser. This is common with some browsers and development environments. Please use the buttons above to view or download the resume.
              </p>
              
              <div style={{
                display: 'flex',
                gap: '15px',
                flexWrap: 'wrap',
                justifyContent: 'center'
              }}>
                <a 
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: '#000',
                    color: '#fff',
                    padding: '15px 30px',
                    textDecoration: 'none',
                    fontFamily: 'Roboto Mono, monospace',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    fontSize: '1rem',
                    border: '3px solid #000',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#fff';
                    e.target.style.color = '#000';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = '#000';
                    e.target.style.color = '#fff';
                  }}
                >
                  <FaEye /> OPEN IN NEW TAB
                </a>
                <a 
                  href={pdfUrl}
                  download="Jinfeng_He_Resume.pdf"
                  style={{
                    background: '#000',
                    color: '#fff',
                    padding: '15px 30px',
                    textDecoration: 'none',
                    fontFamily: 'Roboto Mono, monospace',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    fontSize: '1rem',
                    border: '3px solid #000',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#fff';
                    e.target.style.color = '#000';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = '#000';
                    e.target.style.color = '#fff';
                  }}
                >
                  <FaDownload /> DOWNLOAD RESUME
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Resume;
