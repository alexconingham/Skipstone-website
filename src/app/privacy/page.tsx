import type { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import ScrollProgress from '@/components/ScrollProgress'

export const metadata: Metadata = {
  title: 'Privacy Policy — Remember to Die | Skipstone Studios',
  description: 'Privacy policy for the Remember to Die website and Skipstone Studios.',
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="text-lg font-bold text-white mb-3 tracking-wide">{title}</h2>
      <div className="text-gray-400 text-sm leading-relaxed space-y-3">{children}</div>
    </div>
  )
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-black text-white relative overflow-x-hidden">
      <ScrollProgress />
      <Navigation />

      <section className="pt-32 pb-10 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-cyan-950/5 to-black pointer-events-none" />
        <div className="max-w-3xl mx-auto relative z-10">
          <Link
            href="/"
            className="inline-block text-[0.6rem] tracking-[0.2em] text-gray-600 hover:text-cyan-400 transition-colors duration-200 uppercase mb-8"
          >
            ← Home
          </Link>
          <span className="section-tag">Legal</span>
          <h1 className="text-3xl md:text-4xl font-black text-white mt-2 mb-4 leading-tight">
            Privacy Policy
          </h1>
          <div className="section-accent-line bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto mb-6" />
          <p className="text-gray-500 text-xs tracking-widest uppercase">
            Last updated: April 2026
          </p>
        </div>
      </section>

      <article className="max-w-3xl mx-auto px-4 pb-24">
        <Section title="1. Who we are">
          <p>
            This website is operated by Skipstone Studios, a sole-trader business based in
            New Zealand. When we say &ldquo;we&rdquo;, &ldquo;us&rdquo; or &ldquo;our&rdquo;
            in this policy, we mean Skipstone Studios.
          </p>
          <p>
            If you have questions about this policy you can contact us at{' '}
            <a href="mailto:privacy@skipstone.co.nz" className="text-cyan-400 hover:text-cyan-300 transition-colors">
              privacy@skipstone.co.nz
            </a>.
          </p>
        </Section>

        <Section title="2. What information we collect">
          <p>We keep data collection to a minimum. Depending on how you interact with this site we may process:</p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li><span className="text-gray-300">Automatically collected data</span> — IP address, browser type,
              device type, operating system, referring URL, pages visited and time spent. This is
              collected by our hosting provider (Vercel) through standard server logs.</li>
            <li><span className="text-gray-300">Analytics data</span> — We may use privacy-focused,
              cookie-free analytics to understand aggregate traffic patterns. No personally
              identifiable information is stored.</li>
            <li><span className="text-gray-300">Contact information</span> — If you email us or fill out
              a form, we store the information you voluntarily provide (e.g. name, email address,
              message content) for the purpose of responding to your enquiry.</li>
          </ul>
        </Section>

        <Section title="3. Cookies and tracking">
          <p>
            This website does not use advertising cookies or third-party tracking pixels. We do
            not sell, rent, or share your personal data with advertisers or data brokers.
          </p>
          <p>
            Essential cookies may be set by our hosting infrastructure for security and
            performance purposes (e.g. load balancing, bot protection). These are strictly
            necessary and do not track you across other sites.
          </p>
        </Section>

        <Section title="4. Third-party services">
          <p>Parts of this site rely on the following third-party services, each with their own privacy policies:</p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li><span className="text-gray-300">Vercel</span> — hosting and edge delivery.</li>
            <li><span className="text-gray-300">Supabase</span> — database for blog content (no user data is stored).</li>
            <li><span className="text-gray-300">Steam (Valve Corporation)</span> — the &ldquo;Wishlist on Steam&rdquo;
              links direct you to Steam&rsquo;s platform, which is governed by Valve&rsquo;s own privacy policy.</li>
            <li><span className="text-gray-300">GitHub</span> — source code hosting.</li>
          </ul>
        </Section>

        <Section title="5. How we use your information">
          <p>We use the information described above only to:</p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>Operate, maintain and improve this website.</li>
            <li>Respond to enquiries you send us.</li>
            <li>Monitor aggregate site traffic and performance.</li>
            <li>Comply with legal obligations.</li>
          </ul>
        </Section>

        <Section title="6. Data retention">
          <p>
            Server logs are retained by our hosting provider according to their standard
            retention schedule (typically 30 days). Contact enquiries are retained for up to
            12 months after the last communication unless you ask us to delete them sooner.
          </p>
        </Section>

        <Section title="7. Your rights under NZ law">
          <p>
            Under the New Zealand Privacy Act 2020, you have the right to:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>Request access to any personal information we hold about you.</li>
            <li>Request correction of inaccurate personal information.</li>
            <li>Request deletion of your personal information.</li>
            <li>Complain to the{' '}
              <a
                href="https://www.privacy.org.nz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Office of the Privacy Commissioner
              </a>{' '}
              if you believe your privacy has been interfered with.
            </li>
          </ul>
          <p>
            To exercise any of these rights, contact us at{' '}
            <a href="mailto:privacy@skipstone.co.nz" className="text-cyan-400 hover:text-cyan-300 transition-colors">
              privacy@skipstone.co.nz
            </a>.
          </p>
        </Section>

        <Section title="8. International visitors">
          <p>
            This website is operated from New Zealand. If you are visiting from outside
            New Zealand, please be aware that your data may be transferred to and processed
            in New Zealand. By using this site you consent to this transfer. New Zealand is
            recognised by the European Commission as providing an adequate level of data
            protection.
          </p>
        </Section>

        <Section title="9. Children's privacy">
          <p>
            This website is not directed at children under 13. We do not knowingly collect
            personal information from children. If you believe a child has provided us with
            personal data, please contact us and we will delete it.
          </p>
        </Section>

        <Section title="10. Changes to this policy">
          <p>
            We may update this privacy policy from time to time. Changes will be posted on
            this page with an updated &ldquo;Last updated&rdquo; date. Your continued use of
            the site after changes are posted constitutes acceptance of the revised policy.
          </p>
        </Section>
      </article>

      <footer className="py-10 px-4 border-t border-white/[0.04] text-center">
        <Link
          href="/"
          className="text-xs tracking-[0.2em] text-gray-600 hover:text-cyan-400 transition-colors duration-200 uppercase"
        >
          ← Back to Remember to Die
        </Link>
      </footer>
    </main>
  )
}
