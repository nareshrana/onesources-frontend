if (typeof window !== 'undefined') { // Only in browser environments
  if (!window.crypto) {
    window.crypto = {};
  }

  if (typeof window.crypto.randomUUID !== 'function') {
    window.crypto.randomUUID = function() {
      if (typeof crypto.randomUUID === 'function') {
        return crypto.randomUUID();// Use the browser's native function if available
      } else {
        return crypto.randomUUID();
      }
    };
  }
}