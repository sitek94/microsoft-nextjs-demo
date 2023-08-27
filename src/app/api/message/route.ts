import {NextRequest, NextResponse} from 'next/server'

export async function POST(request: NextRequest) {
  const json = await request.json()

  await fetch(process.env.WEBHOOK_URL!, {
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
