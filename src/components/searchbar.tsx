import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const SMALL_SCREEN = '(max-width: 480px)';

const Searchbar = () => {
  const [isSmall, setIsSmall] = useState(
    () => window.matchMedia(SMALL_SCREEN).matches
  );

  useEffect(() => {
    const mq = window.matchMedia(SMALL_SCREEN);
    const onChange = (e: MediaQueryListEvent) => setIsSmall(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return (
    <div className="search-wrapper">
      <form
        className="search-form"
        action="https://www.duckduckgo.com/"
        method="get"
        role="search"
        aria-label="Site search"
      >
        <input
          id="search-input"
          autoFocus
          className="search-input"
          type="text"
          name="q"
          placeholder={
            isSmall ? 'Search privately' : 'Search the web without being tracked'
          }
          aria-label="Search the web without being tracked"
        />
        <button className="search-button" type="submit" aria-label="Search">
          <FaSearch
            size={'20px'}
            style={{ alignSelf: 'center' }}
            aria-hidden="true"
          />
        </button>
      </form>
    </div>
  );
};

export { Searchbar };
