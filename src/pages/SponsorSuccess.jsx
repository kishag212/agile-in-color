import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export default function SponsorSuccess() {
  return (
    <div className="bg-bg py-20 px-9 text-center min-h-[60vh] flex items-center justify-center">
      <div className="max-w-2xl mx-auto">
        <CheckCircle size={64} className="text-walnut mx-auto mb-6" />
        <p className="text-xs uppercase tracking-[0.3em] text-walnut mb-3">Gift received</p>
        <h1 className="font-serif text-4xl md:text-5xl font-normal tracking-tight leading-tight text-ink">
          Thank you for your <em className="text-walnut font-medium">support</em>.
        </h1>
        <p className="mt-6 text-base md:text-lg leading-relaxed text-ink-soft">
          Your gift directly funds programming that develops, connects, and elevates professionals of color in agile, innovation, and modern work. A receipt will arrive in your email shortly.
        </p>
        <p className="mt-3 text-sm text-ink-soft">
          Agile in Color is a registered 501(c)(3) nonprofit. Your contribution is tax-deductible.
        </p>
        <Link to="/" className="mt-9 inline-flex items-center gap-2 rounded-full bg-walnut text-bg px-7 py-4 font-medium text-sm hover:bg-walnut-deep transition-colors">
          Back to home
        </Link>
      </div>
    </div>
  );
}
