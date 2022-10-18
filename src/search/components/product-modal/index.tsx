import React from 'react';
import styled from 'styled-components';

import { Product } from '@Domain/products';
import { urls } from '@Domain/website';

import { MobileApps } from '@Components/MobileApps';
import { ButtonFlavor, ButtonThemes } from '@Components/buttons/Button';
import { LinkButton } from '@Components/buttons/LinkButton';
import { Modal } from '@Layout/modal/Modal';
import { navigateTo, openNewTab } from '@Utils/browser';
import { ClickOutside } from '@Utils/click-outside';

import { ProductDetails } from './ProductDetails';
import { ProductModalAction } from './ProductModalAction';

import { color, padding } from '@Styles/theme';

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
        <Actions>
          <LinkButton label="Zobacz przyjaciół Poli" styles={ButtonThemes.WhiteRed} onClick={redirectToFriends} />
          {product.donate.show_button && (
            <LinkButton label="Potrzebujemy 1 ZŁ" styles={ButtonThemes.Red} onClick={handleDonate} />
          )}
        </Actions>
        <ProductModalAction action={{ label: product.report.button_text, callback: handleReport }}>
          <span>Posiadasz aktualne dane na temat tego produktu?</span>
        </ProductModalAction>
        <ProductModalAction
          theme={{ backgroundColor: color.background.white, buttonTheme: ButtonThemes[ButtonFlavor.RED] }}
        >
          <AppDownload>
            <p>Zabierz Polę na zakupy! Skanuj kody w aplikacji:</p>
            <MobileApps size={64} />
          </AppDownload>
        </ProductModalAction>
      </Modal>
    </ClickOutside>
  );
};
