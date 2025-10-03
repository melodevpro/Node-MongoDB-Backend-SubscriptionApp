import dayjs from 'dayjs';
import Subscription from '../models/Subscription.model.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const { serve } = require('@upstash/workflow/express');

const REMINDERS = [7, 5, 2, 1];

export const sendReminders = serve( async(context) => {
    const { subscriptionId } = context.requestPayload;
    const subscription = await fetchSubscription(context, subscriptionId);
});

if (!subscription || subscription.status !== 'active') return;

const renewalDate = dayjs(subscription.renewalDate);
const today = dayjs();

if(renewalDate.isBefore(dayjs())) {
    console.log(`Enviando recordatorio de renovacion de ${subscriptionId}`);
    return;
}

for (const daysBefore of REMINDERS) {
    const reminderDate = renewalDate.subtract(daysBefore, 'day');
    if (reminderDate.isAfter(dayjs())) {
        await sleepUntilReminder(context, `reminder-${daysBefore}`, reminderDate);
    }

    await triggerReminder(context, `reminder-${daysBefore}`);
}

const fetchSubscription = async (context, subscriptionId) => {
    return await context.run('get subscription', () => {
        return Subscription.findById(subscriptionId).populate('user', 'name email');
    });
};

const sleepUntilReminder = async (context, label, date) => {
    console.log(`Esperando ${label} recordar el ${date}`);
    await context.sleepUntil(label, date.tpDate());
}

const triggerReminder = async (context, label) => {
    return await context.run(label, () => {
        console.log(`Triggering ${label} reminder`);
        return;
    });
}

export default sendReminders;