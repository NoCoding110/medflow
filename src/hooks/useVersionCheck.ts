import { useEffect } from 'react';

export function useVersionCheck() {
  useEffect(() => {
    const checkVersion = async () => {
      try {
        const res = await fetch('/version.json', { cache: 'no-store' });
        const { version } = await res.json();
        const current = localStorage.getItem('app_version');
        if (current && current !== version) {
          window.location.reload();
        }
        localStorage.setItem('app_version', version);
      } catch (e) {
        // fail silently
      }
    };
    checkVersion();
    // Optionally, check every 60 seconds for new version
    // const interval = setInterval(checkVersion, 60000);
    // return () => clearInterval(interval);
  }, []);
} 