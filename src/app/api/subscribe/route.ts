import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function POST(request: NextRequest) {
  try {
    // Check if Resend is configured
    if (!resend) {
      console.error('RESEND_API_KEY is not configured')
      return NextResponse.json(
        { error: 'Email service is not configured' },
        { status: 500 }
      )
    }

    const { email } = await request.json()

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Remember to Die <newsletter@skipstone.co.nz>',
      to: ['alex@skipstone.co.nz'],
      subject: 'New Newsletter Subscription',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Newsletter Subscription</h2>
          <p style="color: #666; font-size: 16px;">
            A new user has subscribed to the Remember to Die newsletter.
          </p>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #333;">
              <strong>Email:</strong> ${email}
            </p>
            <p style="margin: 10px 0 0 0; color: #666; font-size: 14px;">
              <strong>Subscribed at:</strong> ${new Date().toLocaleString()}
            </p>
          </div>
          <p style="color: #999; font-size: 12px; margin-top: 30px;">
            This email was sent from the Remember to Die website newsletter signup form.
          </p>
        </div>
      `,
      text: `New Newsletter Subscription\n\nEmail: ${email}\nSubscribed at: ${new Date().toLocaleString()}`,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, message: 'Subscription successful' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Subscription error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

