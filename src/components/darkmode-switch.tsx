import { useThemeContext } from '../providers/theme-provider';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function DarkmodeSwitch() {
  const { theme, setTheme } = useThemeContext();

  const isDark = theme === 'dark';

  return (
    <button
      className="darkmode-toggle"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label="Toggle dark mode"
      aria-pressed={isDark}
    >
      {isDark ? <FiSun strokeWidth={3} /> : <FiMoon strokeWidth={3} />}{' '}
    </button>
  );
}
