const SETTINGS = {
  layout: {
    pagesStartAtTop: ['index'],
    headerExact: [
      'add-a-lesson-success',
      'lessons-slug',
      'lessons-slug-enroll-success',
      'onboarding-subscribe',
      'onboarding-subscribe-slug',
      'onboarding-become-a-master'
    ],
    noPaddingAtBottom: ['index', 'search']
  },
  search: {
    intervalPerSearch: 600
  },
  currency: {
    label: 'AUD',
    sign: '$'
  },
  pagination: {
    itemsPerPage: 8,
    itemsPerScroll: 20,
    itemsPerCarousel: 10,
    totalVisiblePageNumber: 6
  },
  notification: {
    // Delay in seconds
    rateLimit: 60
  },
  cookie: {
    forgotPasswordCode: 'forgotPasswordCodeTimer',
    verifyCode: 'verifyCodeTimer'
  },
  snackbar: {
    timeout: 5000
  }
}

export default SETTINGS
