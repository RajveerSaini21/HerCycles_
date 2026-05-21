/**
 * A utility function to conditionally join class names together.
 * @param {...(string|Object|Array)} inputs - A list of class names.
 * @returns {string} - The combined class names.
 */
export function cn(...inputs) {
    // Simple class name concatenation since we don't have clsx/tailwind-merge
    return inputs.filter(Boolean).join(' ');
  }
  
  /**
   * Creates a URL for a given page name, handling base path and potential parameters.
   * @param {string} pageName - The name of the page (e.g., "Dashboard" or "Post?id=123").
   * @returns {string} - The full, navigable URL for the page.
   */
  export function createPageUrl(pageName) {
    // Simple page URL creation - just return the page name as is for base44
    const trimmedPageName = pageName.startsWith('/') ? pageName.slice(1) : pageName;
    return `/${trimmedPageName}`;
  }