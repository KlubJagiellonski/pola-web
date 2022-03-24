import styled from 'styled-components';
import { color, fontSize, lineHeight, padding } from '../../styles/theme';

interface IToastMessage {
  styles?: { marginHorizontal?: string };
}

export const ToastMessage = styled.div<IToastMessage>`
  background-color: ${color.background.transparencyGrey};
  color: ${color.text.primary};
  border-radius: 0.2em;
  font-size: ${fontSize.small};
  line-height: ${lineHeight.normal};
  margin: 0 ${({ marginHorizontal }) => marginHorizontal || 0};
  padding: ${padding.tiny} ${padding.small};
`;

export const SuccessMessage = styled(ToastMessage)`
  color: ${color.text.secondary};
`;

export const ErrorMessage = styled(ToastMessage)`
  color: ${color.text.red};
`;
