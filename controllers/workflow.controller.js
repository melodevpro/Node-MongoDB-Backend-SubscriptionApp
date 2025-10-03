
const { serve } = require('@upstash/workflow/express');

export const sendReminders = serve();

export const getReminders = serve();