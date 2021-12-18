import * as Sentry from '@sentry/gatsby';

var sendEmails = false;

Sentry.init({
  dsn: 'https://examplePublicKey@o0.ingest.sentry.io/0',
  sampleRate: 1.0, // Adjust this value in production
  beforeSend(event) {
    if (event.user && !sendEmails) {
      // Don't send user's email address
      delete event.user.email;
    }
    return event;
  },
  // ...
});
