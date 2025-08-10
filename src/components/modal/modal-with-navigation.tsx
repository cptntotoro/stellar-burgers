import { useLocation, useNavigate } from 'react-router-dom';
import React, { ReactNode } from 'react';
import { Modal } from '@components';

export function ModalWithNavigation(props: {
  title: string;
  children?: ReactNode;
}) {
  let { title, children } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const onClose = () => {
    const background = location.state?.background;
    if (background) {
      navigate(background.pathname, { replace: true });
    } else {
      navigate(-1);
    }
  };
  return (
    <Modal title={title} onClose={onClose}>
      {children}
    </Modal>
  );
}
