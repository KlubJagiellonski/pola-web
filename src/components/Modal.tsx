import React from 'react';
import Modal from 'react-modal';


Modal.setAppElement('#___gatsby');

interface MyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MyModal: React.FC<MyModalProps> = ({ isOpen, onClose }) => {
  const isMobile =
    typeof window !== 'undefined' && window.innerWidth <= 600;
  const isSmallMobile =
    typeof window !== 'undefined' && window.innerWidth <= 300;

  const overlayStyle: React.CSSProperties = {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    position: 'fixed',
    inset: 0,
    zIndex: 9999,
  };


  const contentStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
    background: '#bc079a',
    borderRadius: 30,
    boxSizing: 'border-box',
    width: isMobile ? '82vw' : 720,
    maxWidth: '100%',
    maxHeight: isMobile ? '85vh' : '90vh',
    overflowY: 'auto',
    padding: isMobile ? '20px 16px' : '40px 32px',
    color: '#ffffff',
    textAlign: 'center',
  };


  const mainHeadingStyle: React.CSSProperties = {
    fontSize: isSmallMobile ? '1.1rem' : isMobile ? '1.9rem' : '2.8rem',
    fontWeight: 700,
    marginBottom: isSmallMobile ? '0.9rem' : '1.2rem',
  };

  const paragraphStyle: React.CSSProperties = {
    fontSize: isSmallMobile ? '0.9rem' : isMobile ? '0.95rem' : '1.15rem',
    lineHeight: 1.45,
    margin: '0.3rem 0',
  };

  const highlightYellow: React.CSSProperties = {
    color: '#FCFF59',
    fontWeight: 700,
  };

  const buttonWrapperStyle: React.CSSProperties = {
    marginTop: isMobile ? '1.5rem' : '2.5rem',
    marginBottom: isMobile ? '1.5rem' : '2.5rem',
    display: 'flex',
    justifyContent: 'center',
  };


  const buttonStyle: React.CSSProperties = {
    backgroundColor: '#ffffff',
    color: '#000000',
    padding: isSmallMobile ? '8px 20px' : isMobile ? '9px 28px' : '10px 64px',
    minWidth: isSmallMobile ? 210 : isMobile ? 240 : 420,
    border: 'none',
    borderRadius: 999,
    fontSize: isSmallMobile ? '1rem' : isMobile ? '1.05rem' : '1.3rem',
    fontWeight: 700,
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(0,0,0,0.25)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  };


  const bottomInfoStyle: React.CSSProperties = {
    fontSize: isMobile ? '0.95rem' : '1.05rem',
    lineHeight: 1.5,
    marginTop: '0.6rem',
  };

  const bottomHighlight: React.CSSProperties = {
    fontWeight: 700,
    textDecoration: 'underline',
  };

  const handleClick = () => {
    window.open(
      'https://www.pola-app.pl/1-5-podatku-na-aplikacje-pola',
      '_blank',
      'noopener,noreferrer'
    );
    onClose();
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


  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick
      contentLabel="Odpisz darowiznę od podatku PIT"
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
        <h2 style={mainHeadingStyle}>
          Odpisz darowiznę od podatku PIT!
        </h2>

        <p style={paragraphStyle}>
          Przy wypełnianiu PIT, pamiętaj o uwzględnianiu darowizn za 2025 r.
        </p>

        <div style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>
          <p
            style={{
              ...paragraphStyle,
              fontSize: isMobile ? '1.05rem' : '1.25rem',
              fontWeight: 600,
            }}
          >
            Nie pamiętasz, jaka kwota została przekazana na Polę?
          </p>
          <p style={paragraphStyle}>
            Napisz do nas —{' '}
            <span style={highlightYellow}>
              podamy Ci łączną sumę Twoich wpłat.
            </span>
          </p>
        </div>

        <div style={buttonWrapperStyle}>
          <button
            type="button"
            style={buttonStyle}
            onClick={handleClick}
          >
            Wspieram
          </button>
        </div>

        <div>
          <p style={bottomInfoStyle}>
            1,5% dla Poli KRS:{' '}
            <span style={highlightYellow}> 0000128315</span>
          </p>
          <p style={bottomInfoStyle}>
            Cel szczegółowy:{' '}
            <span style={highlightYellow}>Aplikacja Pola</span>
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default MyModal;
