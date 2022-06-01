import Portal from '@reach/portal';
import { FC, useRef, useEffect, useCallback } from 'react';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import { CloseOutlined as Cross } from '@ant-design/icons';

import { FocusTrap } from '~/components/utilities';
import s from './Modal.module.css';

interface Props {
  title?: string;
  className?: string;
  children?: any;
  open?: boolean;
  onClose: () => void;
  onEnter?: () => void | null;
}

const Modal: FC<Props> = ({ children, open, onClose, title, onEnter = null }) => {
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        return onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (ref.current) {
      if (open) {
        disableBodyScroll(ref.current);
        window.addEventListener('keydown', handleKey);
      } else {
        enableBodyScroll(ref.current);
      }
    }
    return () => {
      window.removeEventListener('keydown', handleKey);
      clearAllBodyScrollLocks();
    };
  }, [open, handleKey]);

  return (
    <Portal>
      {open ? (
        <div className={s.root}>
          <div className={s.modal} role="dialog" ref={ref}>
            <div className={s.content}>
              <div className="flex justify-end items-center">
                <button
                  onClick={() => onClose()}
                  aria-label="Close modal"
                  className="transition rounded duration-150 w-8 h-8 focus:outline-none hover:bg-primary/30"
                >
                  <Cross className="h-6 w-6" style={{ color: '#FFF' }} />
                </button>
              </div>
              <FocusTrap focusFirst>{children}</FocusTrap>
            </div>
          </div>
        </div>
      ) : null}
    </Portal>
  );
};

export default Modal;
