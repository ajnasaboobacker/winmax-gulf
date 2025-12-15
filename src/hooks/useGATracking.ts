declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

type GAEventParams = {
  event_category?: string;
  event_label?: string;
  value?: number;
  [key: string]: unknown;
};

export const trackEvent = (
  eventName: string,
  params?: GAEventParams
) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
};

// Pre-defined tracking functions for common events
export const trackButtonClick = (buttonName: string, location?: string) => {
  trackEvent('button_click', {
    event_category: 'engagement',
    event_label: buttonName,
    button_location: location,
  });
};

export const trackFormSubmission = (formName: string, success: boolean) => {
  trackEvent('form_submission', {
    event_category: 'conversion',
    event_label: formName,
    form_success: success,
  });
};

export const trackCTAClick = (ctaName: string, destination?: string) => {
  trackEvent('cta_click', {
    event_category: 'conversion',
    event_label: ctaName,
    cta_destination: destination,
  });
};

export const trackNavigation = (linkName: string, section?: string) => {
  trackEvent('navigation_click', {
    event_category: 'navigation',
    event_label: linkName,
    nav_section: section,
  });
};

export const trackModalOpen = (modalName: string) => {
  trackEvent('modal_open', {
    event_category: 'engagement',
    event_label: modalName,
  });
};

export const trackScrollDepth = (percentage: number) => {
  trackEvent('scroll_depth', {
    event_category: 'engagement',
    event_label: `${percentage}%`,
    value: percentage,
  });
};

export const trackOutboundLink = (url: string) => {
  trackEvent('outbound_link', {
    event_category: 'engagement',
    event_label: url,
  });
};
