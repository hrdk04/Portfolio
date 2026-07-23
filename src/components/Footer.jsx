import { profile, socialLinks } from '../data/profile';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg)]">
      <div className="container-main py-12">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          
          <div className="text-center sm:text-left">
            <Link 
              to="/" 
              onClick={() => window.scrollTo(0, 0)}
              className="text-heading font-semibold tracking-tight text-text-primary hover:opacity-70"
            >
              {profile.firstName}<span className="text-text-tertiary">.dev</span>
            </Link>
            <p className="mt-2 text-body-sm text-text-secondary">
              © {new Date().getFullYear()} {profile.name}. All rights reserved.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {socialLinks.map((link) => (
              <a 
                key={link.label} 
                href={link.href} 
                target="_blank" 
                rel="noreferrer" 
                className="text-body-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
              >
                {link.label}
              </a>
            ))}
          </div>

        </div>
      </div>
    </footer>
  );
}