import {NextRequest, NextResponse} from 'next/server'

const WEBHOOK_URL =
  'https://8450rz.webhook.office.com/webhookb2/54540ab3-8f5a-49a0-95e4-745be2f8193e@ddb7d66c-241c-488d-866b-422a9092135e/IncomingWebhook/3f5d5816a25d4ffa8113c148b88df3dd/f8c52789-2669-4b1c-a70c-fa3f2f426c17'

export async function POST(request: NextRequest) {
  const json = await request.json()

  await fetch(WEBHOOK_URL, {
    method: 'POST',
    body: JSON.stringify({
      type: 'message',
      attachments: [
        {
          contentType: 'application/vnd.microsoft.card.adaptive',
          contentUrl: null,
          content: {
            $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
            type: 'AdaptiveCard',
            version: '1.2',
            body: [
              {
                type: 'TextBlock',
                text: 'For Samples and Templates, see [https://adaptivecards.io/samples](https://adaptivecards.io/samples)',
              },
            ],
          },
        },
      ],
    }),
  })

  return NextResponse.json({data: 'hello'})
}
