import React from 'react';
import styled from 'styled-components';
import { Product } from '../../domain/products';
import { Modal } from '../../layout/modal/Modal';
import { color, padding } from '../../styles/theme';
import { Button, ButtonFlavor, ButtonThemes } from '../../components/buttons/Button';
import { ClickOutside } from '../../utils/click-outside';
import { ProductModalAction } from './ProductModalAction';
import { navigateTo, openNewTab } from '../../utils/browser';
import { ProductDetails } from './ProductDetails';
import { MobilePagesPrefix, urls } from '../../domain/website';
import { LinkButton } from '../../components/buttons/LinkButton';
import { MobileApps } from '../../components/MobileApps';
import { useLocation } from '@reach/router';

const ButtonContainer = styled(Button)`
  padding: ${padding.small};
  min-width: 16rem;
  border-radius: 0;
`;

const Actions = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
`;

const AppDownload = styled.div`
  h4 {
    margin: 0;
    padding-bottom: ${padding.small};
  }

  .app {
    display: flex;
    flex-flow: row nowrap;
    gap: 0.5rem;

    .image {
      width: 3rem;
      height: 3rem;
      background-color: ${color.button.disabled};
    }
  }
`;

interface IProductModal {
  product: Product;
  onClose: () => void;
}

export const ProductModal: React.FC<IProductModal> = ({ product, onClose }) => {
  const location = useLocation();
  const isMobile = location.href.indexOf(`/${MobilePagesPrefix}/`) > -1;
  const handleReport = () => {
    onClose();
    navigateTo(urls.pola.home('contact'));
  };
  const redirectToFriends = () => {
    onClose();
    navigateTo(urls.pola.friends());
  };
  const handleDonate = () => {
    const donateUrl = new URL(product.donate.url);
    openNewTab(donateUrl);
  };

  return (
    <ClickOutside clickOutsideHandler={onClose}>
      <Modal title={`EAN: ${product.code}`} onClose={onClose}>
        <ProductDetails product={product} />
        {isMobile ? (
          <Actions>
            <a href={`https://pola-app.pl/${urls.pola.friends()}`} target="_blank">
              <ButtonContainer theme={ButtonThemes.WhiteRed}>
                <span>Zobacz przyjaciół Poli</span>
              </ButtonContainer>
            </a>
            <a href={product.donate.url} target="_blank">
              <ButtonContainer theme={ButtonThemes.Red}>
                <span>Potrzebujemy 1 ZŁ1</span>
              </ButtonContainer>
            </a>
          </Actions>
        ) : (
          <Actions>
            <LinkButton label="Zobacz przyjaciół Poli" styles={ButtonThemes.WhiteRed} onClick={redirectToFriends} />
            {product.donate.show_button && (
              <LinkButton label="Potrzebujemy 1 ZŁ1" styles={ButtonThemes.Red} onClick={handleDonate} />
            )}
          </Actions>
        )}
        {isMobile ? (
          <Actions>
            <span>Posiadasz aktualne dane na temat tego produktu?</span>
            <a href={`https://pola-app.pl/${urls.pola.home('contact')}`} target="_blank">
              <ButtonContainer theme={ButtonThemes.Red}>
                <span>{product.report.button_text}</span>
              </ButtonContainer>
            </a>
          </Actions>
        ) : (
          <ProductModalAction action={{ label: product.report.button_text, callback: handleReport }}>
            <span>Posiadasz aktualne dane na temat tego produktu?</span>
          </ProductModalAction>
        )}
        {!isMobile && (
          <ProductModalAction
            theme={{ backgroundColor: color.background.white, buttonTheme: ButtonThemes[ButtonFlavor.RED] }}>
            <AppDownload>
              <p>Zabierz Polę na zakupy! Skanuj kody w aplikacji:</p>
              <MobileApps size={64} />
            </AppDownload>
          </ProductModalAction>
        )}
      </Modal>
    </ClickOutside>
  );
};
