import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#___gatsby');

interface MyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MyModal: React.FC<MyModalProps> = ({ isOpen, onClose }) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 600;
  const isSmallMobile = typeof window !== 'undefined' && window.innerWidth <= 300;

  const overlayStyle: React.CSSProperties = {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    position: 'fixed',
    inset: 0,
    zIndex: 9999,
  };

  const contentStyle: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    margin: 0,
    border: 'none',
    padding: 0,
    background: 'transparent',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const boxStyle: React.CSSProperties = {
    position: 'relative',
    background: 'linear-gradient(180deg,#111,#1d1d1d)',
    borderRadius: 30,
    boxSizing: 'border-box',
    width: isMobile ? '94vw' : 520,
    maxWidth: '94vw',
    maxHeight: '88vh',
    overflow: 'hidden',
    padding: isMobile ? '16px 14px' : '20px',
    color: '#ffffff',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const closeButtonStyle: React.CSSProperties = {
    position: 'absolute',
    top: isMobile ? 10 : 14,
    right: isMobile ? 10 : 18,
    width: 32,
    height: 32,
    borderRadius: '50%',
    border: 'none',
    background: 'rgba(255, 255, 255, 0.2)',
    color: '#ffffff',
    fontSize: 20,
    lineHeight: 1,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
  };

  const headingStyle: React.CSSProperties = {
    fontSize: isSmallMobile ? '1.1rem' : isMobile ? '1.2rem' : '1.8rem',
    fontWeight: 700,
    margin: '0 0 1rem',
    color: '#ffffff',
  };

  const videoStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: isMobile ? '100%' : 360,
    height: isMobile ? '54vh' : '48vh',
    objectFit: 'cover',
    borderRadius: 18,
    background: '#000000',
    display: 'block',
    margin: '0 auto',
  };

  const descriptionStyle: React.CSSProperties = {
    marginTop: '1rem',
    marginBottom: 0,
    fontSize: isMobile ? '0.95rem' : '1.05rem',
    color: '#ffffff',
  };

  const buttonWrapperStyle: React.CSSProperties = {
    marginTop: isMobile ? '1rem' : '1.4rem',
    marginBottom: 0,
    display: 'flex',
    justifyContent: 'center',
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: '#ffffff',
    color: '#000000',
    padding: isSmallMobile ? '8px 20px' : isMobile ? '9px 28px' : '10px 48px',
    minWidth: isSmallMobile ? 210 : isMobile ? 240 : 360,
    border: 'none',
    borderRadius: 999,
    fontSize: isSmallMobile ? '1rem' : isMobile ? '1.05rem' : '1.2rem',
    fontWeight: 700,
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(0,0,0,0.25)',
  };

  const handlePodcastClick = () => {
    window.open(
      'https://open.spotify.com/show/033nnpwQwlbTkT5DLMzG0c?si=RFwX2B2GQEC7V0hWj4HuzA&nd=1&dlsi=b0395e2a33e74b7a',
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick
      contentLabel="Zwiastun podcastu Pola"
      style={{ overlay: overlayStyle, content: contentStyle }}
    >
      <div style={boxStyle}>
        <button
          type="button"
          aria-label="Zamknij"
          style={closeButtonStyle}
          onClick={onClose}
        >
          ×
        </button>

        <h2 style={headingStyle}>Rusza podcast Poli 🎙️</h2>

        <video
          controls
          playsInline
          preload="metadata"
          poster="/images/podcast-cover.jpg"
          style={videoStyle}
        >
          <source src="/videos/IntroPola.mp4" type="video/mp4" />
        </video>

        <p style={descriptionStyle}>Zobacz zwiastun pierwszego sezonu.</p>

        <div style={buttonWrapperStyle}>
          <button type="button" style={buttonStyle} onClick={handlePodcastClick}>
            Obejrzyj cały podcast
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default MyModal;