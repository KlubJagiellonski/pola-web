import * as Sentry from '@sentry/gatsby';

var sendEmails = false;

Sentry.init({
  dsn: 'https://76785631b189463b86823d54c0cffc44@o1100740.ingest.sentry.io/6126100',
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
  sampleRate: 1.0, // Adjust this value in production
  beforeSend(event) {
    if (event.user && !sendEmails) {
      // Don't send user's email address
      delete event.user.email;
    }
    return event;
  },
});
