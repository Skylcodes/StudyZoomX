import { WebhookTrigger } from '@prisma/client';

import { prisma } from '@/lib/db/prisma';
import { sendPayload } from '@/lib/webhooks/send-payload';
import { SortDirection } from '@/types/sort-direction';

// In the beginning, just call this method whenever an event occurs, but
// ideally you want to call webhooks in a separate worker process, for example:
//
// Event occured -> Send event to message queue -> Worker takes message from queue and calls webhooks.
// - Webhook call attempt succeeded -> Remove message from queue
// - All webhook call attempts failed -> Put message in dead-letter queue

export async function callWebhooks<T>(
  organizationId: string,
  trigger: WebhookTrigger,
  payload: T
) {
  const webhooks = await prisma.webhook.findMany({
    where: {
      organizationId,
      triggers: {
        has: trigger
      }
    },
    select: {
      id: true,
      url: true,
      triggers: true,
      secret: true
    },
    orderBy: {
      createdAt: SortDirection.Asc
    }
  });
  for (const webhook of webhooks) {
    let retryCount = 0;
    const MAX_RETRY_COUNT = 3;
    while (retryCount < MAX_RETRY_COUNT) {
      retryCount++;
      try {
        console.log('SENDING webhook payload');
        const response = await sendPayload<T>(webhook, trigger, payload);
        console.log('SENT webhook payload');
        if (response.ok) {
          console.log('SUCCESS webhook payload');
          break;
        }
        console.log('FAILED webhook payload');
      } catch (e) {
        console.error(
          `Error executing webhook ${webhook.id} for event: ${trigger}, URL: ${webhook.url}`,
          e
        );
      }
    }
  }
}
