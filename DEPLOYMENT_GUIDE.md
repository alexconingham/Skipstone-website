# Moving to RTD.skipstone.co.nz Subdomain

## Overview
This guide will help you move the Remember to Die site to `RTD.skipstone.co.nz` (or `rtd.skipstone.co.nz`) while keeping `skipstone.co.nz` as your primary site.

**Note:** The subdomain can be `RTD.skipstone.co.nz` or `rtd.skipstone.co.nz` - DNS is case-insensitive, but lowercase is standard. The code is configured for `rtd.skipstone.co.nz`.

## Step 1: Update Vercel Project Settings

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Domains**
3. Remove `skipstone.co.nz` (if it's currently connected)
4. Add `rtd.skipstone.co.nz` as a new domain (lowercase is standard)
5. Vercel will provide DNS records to add

## Step 2: Add DNS Record

Add a CNAME record in your domain DNS settings:

```
Type: CNAME
Name: rtd (or RTD - DNS is case-insensitive)
Value: [Vercel will provide this - usually cname.vercel-dns.com or similar]
```

**Important:** Use the exact DNS record that Vercel provides in the Domains section. It may be:
- A CNAME pointing to `cname.vercel-dns.com`
- Or specific Vercel DNS records

**Note:** DNS propagation can take 24-48 hours, but usually happens within minutes to a few hours.

## Step 3: Update Environment Variables in Vercel

1. Go to **Settings** → **Environment Variables**
2. Add/Update:
   ```
   NEXT_PUBLIC_SITE_URL=https://rtd.skipstone.co.nz
   ```
3. Make sure it's set for **Production**, **Preview**, and **Development** environments

## Step 4: Update Resend Domain (if using Resend)

1. Go to Resend dashboard
2. Add `rtd.skipstone.co.nz` as a verified domain (or continue using `skipstone.co.nz` for sending)
3. Update the `from` address in the API route if needed

## Step 5: Verify Deployment

After DNS propagates:
1. Visit `https://rtd.skipstone.co.nz` (or `https://RTD.skipstone.co.nz`)
2. Check that all assets load correctly
3. Test the newsletter subscription form
4. Verify SSL certificate is active (should be automatic with Vercel)
5. Check browser console for any errors
6. Verify SEO metadata is correct (view page source)

## Step 6: Update skipstone.co.nz Main Site

On your main `skipstone.co.nz` site, add a link to the Remember to Die game:
- Link text: "Remember to Die" or "RTD"
- Link URL: `https://rtd.skipstone.co.nz`

You can also add it to your main navigation or create a dedicated games/projects page.

## What's Been Updated in Code

✅ Created `src/utils/config.ts` for dynamic base URL
✅ Updated `src/app/layout.tsx` - metadata and structured data use dynamic base URL
✅ Updated `src/app/page.tsx` - structured data uses dynamic base URL
✅ Updated `next.config.js` - added `rtd.skipstone.co.nz` to allowed image domains
✅ All URLs now use `NEXT_PUBLIC_SITE_URL` environment variable or default to `rtd.skipstone.co.nz`

**Note:** Studio URLs (skipstone.co.nz) remain hardcoded as they should always point to the main site.

## Rollback Plan

If something goes wrong:
1. Re-add `skipstone.co.nz` in Vercel domains
2. Remove `RTD.skipstone.co.nz` 
3. Revert the code changes
4. Redeploy

