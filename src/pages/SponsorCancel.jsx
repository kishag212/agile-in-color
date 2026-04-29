import { Link } from 'react-router-dom';

export default function SponsorCancel() {
  return (
    <div className="bg-bg py-20 px-9 text-center min-h-[60vh] flex items-center justify-center">
      <div className="max-w-2xl mx-auto">
        <p className="text-xs uppercase tracking-[0.3em] text-walnut mb-3">Cancelled</p>
        <h1 className="font-serif text-4xl md:text-5xl font-normal tracking-tight leading-tight text-ink">
          No worries — <em className="text-walnut font-medium">we'll be here</em>.
        </h1>
        <p className="mt-6 text-base md:text-lg leading-relaxed text-ink-soft">
          Your card was not charged. Whenever you're ready to support our work, the door is open.
        </p>
        <div className="mt-9 flex flex-wrap gap-3 justify-center">
          <Link to="/sponsor" className="inline-flex items-center gap-2 rounded-full bg-walnut text-bg px-6 py-3 font-medium text-sm hover:bg-walnut-deep transition-colors">
            Try again
          </Link>
          <Link to="/" className="inline-flex items-center gap-2 rounded-full border-2 border-walnut text-walnut px-6 py-3 font-medium text-sm hover:bg-walnut hover:text-bg transition-colors">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
