
// Simple wrapper for Google Analytics
// Assumes gtag is available on window

export const analytics = {
  logEvent: (eventName: string, params?: Record<string, any>) => {
    // In development, log to console so you can verify it's working
    if (process.env.NODE_ENV === 'development') {
      console.log(`📈 [Analytics] ${eventName}`, params || '');
    }

    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName, params);
    }
  },

  setUserId: (userId: string) => {
    if (process.env.NODE_ENV === 'development') {
        console.log(`👤 [Analytics] Set User ID: ${userId}`);
    }
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('config', 'G-GVV1BWZ99X', {
            'user_id': userId
        });
    }
  },

  logPageView: (page_title: string) => {
    const params = {
        page_title,
        page_location: window.location.href,
    };

    if (process.env.NODE_ENV === 'development') {
        console.log(`📈 [Analytics] page_view`, params);
    }

    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'page_view', params);
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
