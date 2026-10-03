import { FiChevronDown } from 'react-icons/fi';
import { useRef, useState, useEffect } from 'react';
import { useThemeContext } from '../providers/theme-provider';
import '../styles/dropdown.css';
import DropdownItem from './dropdown-item';

const MENU_OPTIONS = [
  { label: 'Homepage', href: '/' },
  { label: 'About', href: '/about' },
];

const Dropdown = ({ children }: React.PropsWithChildren) => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  useThemeContext(); // still used for reactivity, but not for classes

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (
        !buttonRef.current?.contains(e.target as Node) &&
        !menuRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open]);

  useEffect(() => {
    if (open && menuRef.current) {
      const first = menuRef.current.querySelector('a');
      first?.focus();
    }
  }, [open]);

  function handleMenuKeyDown(e: React.KeyboardEvent<HTMLUListElement>) {
    const items = menuRef.current?.querySelectorAll<HTMLAnchorElement>('a');
    if (!items || items.length === 0) return;
    const current = document.activeElement;
    const idx = Array.from(items).indexOf(current as HTMLAnchorElement);
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = items[(idx + 1) % items.length];
      if (next) next.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = items[(idx - 1 + items.length) % items.length];
      if (prev) prev.focus();
    }
  }

  return (
    <div className="dropdown-root">
      <button
        ref={buttonRef}
        className="dropdown-icon"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="More options"
        title="More options"
        onClick={() => setOpen((v) => !v)}
      >
        {children}
        <FiChevronDown aria-hidden="true" />
      </button>
      {open && (
        <ul
          ref={menuRef}
          className="dropdown-menu"
          role="menu"
          aria-label="More options"
          tabIndex={-1}
          onKeyDown={handleMenuKeyDown}
        >
          {MENU_OPTIONS.map((opt) => (
            <DropdownItem
              key={opt.href}
              href={opt.href}
              onSelect={() => setOpen(false)}
            >
              {opt.label}
            </DropdownItem>
          ))}
        </ul>
      )}
    </div>
  );
};

export { Dropdown, DropdownItem };
