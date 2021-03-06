import React from 'react';
import styled from 'styled-components';
import { color, Device, padding } from '../../styles/theme';
import { ModalHeader } from './ModalHeader';

const ModalLayout = styled.div`
  position: fixed;
  display: flex;
  width: 100%;
  height: 100vh;
  z-index: 100;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background-color: ${color.background.white};
  position: absolute;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  flex-flow: column;
  height: 85vh;
  z-index: 1;
  max-width: 800px;
  box-sizing: border-box;

  header {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;

    .title-container {
      flex: 1 1 100%;
    }
  }

  .content {
    flex: 1 1 100%;
  }

  @media ${Device.phone} {
    width: calc(100% - 2 * ${padding.small});
  }
  @media ${Device.desktop} {
    width: calc(100% - 2 * ${padding.big});
  }
`;

const ModalOverlay = styled.div`
  background-color: ${color.background.black};
  width: 100%;
  height: 100vh;
  opacity: 0.5;
  z-index: 0;
`;

interface IModal {
  title: string;
  onClose: () => void;
}

export const Modal: React.FC<IModal> = ({ title, onClose, children }) => (
  <ModalLayout>
    <ModalOverlay />
    <ModalContainer>
      <ModalHeader title={title} onClose={onClose} />
      <div className="content">{children}</div>
    </ModalContainer>
  </ModalLayout>
);
