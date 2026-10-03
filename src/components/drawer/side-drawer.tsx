import {
  type KeyboardEvent,
  type PropsWithChildren,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

type SideDrawerProps = PropsWithChildren<{
  open: boolean;
  onClose: () => void;
  title?: string;
}>;

export default function SideDrawer({
  open,
  onClose,
  title = 'Navigation menu',
  children,
}: SideDrawerProps) {
  // Track if the drawer should be mounted for animation
  const [shouldRender, setShouldRender] = useState(open);
  // Track if the open class should be applied for animation
  const [animateOpen, setAnimateOpen] = useState(false);
  const drawerRef = useRef<HTMLElement | null>(null);
  const titleId = useId();

  useEffect(() => {
    if (open) {
      // Mount first, then add the open class on the next tick so the CSS
      // transition runs. Intentionally sequenced through state in an effect.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShouldRender(true);
      const timeout = setTimeout(() => setAnimateOpen(true), 10);
      return () => clearTimeout(timeout);
    } else {
      setAnimateOpen(false);
      // Wait for the transition to finish before unmounting
      const timeout = setTimeout(() => setShouldRender(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const previousActiveElement = document.activeElement as HTMLElement | null;
    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    const focusTimer = window.setTimeout(() => {
      drawerRef.current?.focus();
    }, 0);

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      previousActiveElement?.focus();
    };
  }, [open, onClose]);

  const handlePanelKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== 'Tab' || !drawerRef.current) return;

    const focusableElements = drawerRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length === 0) {
      event.preventDefault();
      return;
    }

    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];
    const active = document.activeElement;

    if (event.shiftKey) {
      if (active === first || active === drawerRef.current) {
        event.preventDefault();
        last?.focus();
      }
      return;
    }

    if (active === last) {
      event.preventDefault();
      first?.focus();
    }
  };

  if (!shouldRender) return null;

  return createPortal(
    <div className="drawer-root" aria-hidden={!open}>
      <div className="drawer-backdrop" onClick={onClose} />

      <aside
        ref={drawerRef}
        className={`drawer-panel${animateOpen ? ' open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onKeyDown={handlePanelKeyDown}
      >
        <div className="drawer-header">
          <h2 id={titleId} className="drawer-heading">
            {title}
          </h2>

          <button
            type="button"
            className="drawer-close"
            onClick={onClose}
            aria-label="Close menu"
          >
            ×
          </button>
        </div>

        <div className="drawer-content">{children}</div>
      </aside>
    </div>,
    document.body
  );
}
