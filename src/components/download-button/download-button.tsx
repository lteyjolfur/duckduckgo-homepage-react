import { getDownloadText } from '../../lib/download';
import DownloadIcon from './download-icon';

const DownloadButton = () => (
  <a
    className="download-button"
    href="https://duckduckgo.com/app"
    target="_blank"
    rel="noreferrer"
  >
    <DownloadIcon />
    Download DuckDuckGo for {getDownloadText() ?? 'your device'}
  </a>
);

export default DownloadButton;
