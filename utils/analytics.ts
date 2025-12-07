
// Simple wrapper for Google Analytics
// Assumes gtag is available on window

export const analytics = {
  logEvent: (eventName: string, params?: Record<string, any>) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName, params);
    }
  },

  logPageView: (page_title: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'page_view', {
        page_title,
        page_location: window.location.href,
      });
    }
  },

  logQuestionView: (questionId: string, category: string) => {
      analytics.logEvent('view_question', {
          item_id: questionId,
          item_category: category
      });
  },

  logMastery: (questionId: string, category: string) => {
      analytics.logEvent('master_question', {
          item_id: questionId,
          item_category: category
      });
  }
};
