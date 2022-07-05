import { ReactNode } from 'react';
import ReactDOM from 'react-dom';

const modalRoot = document.getElementById('modal-root') as HTMLElement;

interface Greeting {
  children: ReactNode;
}

export default function Portal (props: Greeting) {
  const { children } = props;
  return ReactDOM.createPortal(
    children,
    modalRoot
  )
}