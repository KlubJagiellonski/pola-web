import styled from 'styled-components';
import { color, fontSize, lineHeight, padding } from '../../styles/theme';

interface IToastMessage {
  styles?: { marginHorizontal?: string };
}

export const ToastMessage = styled.div<IToastMessage>`
  background-color: ${color.background.white};
  box-sizing: border-box;
  color: ${color.text.primary};
  border-radius: 0.2em;
  font-size: ${fontSize.small};
  line-height: ${lineHeight.normal};
  margin: 0 ${({ styles }) => styles?.marginHorizontal || 0};
  padding: ${padding.small} ${padding.normal};
  text-align: center;

  &:not(:last-child) {
    margin-bottom: ${padding.normal};
  }
`;

export const SuccessMessage = styled(ToastMessage)`
  color: ${color.text.success};
  border-bottom: 6px solid ${color.text.success};
`;

export const ErrorMessage = styled(ToastMessage)`
  color: ${color.text.fail};
  border-bottom: 6px solid ${color.text.fail};
`;
