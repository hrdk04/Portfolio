import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { profile, socialLinks } from '../data/profile';
import Reveal from './Reveal';
import { FiMail, FiMapPin, FiGithub, FiLinkedin, FiSend, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

const initialState = {
  name: '',
  email: '',
  message: '',
};

export default function Contact() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus({
        type: 'error',
        message: 'EmailJS is not configured in this environment.',
      });
      return;
    }

    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          name: form.name,
          email: form.email,
          title: `Portfolio Contact from ${form.name}`,
          message: form.message,
          time: new Date().toLocaleString(),
          reply_to: form.email,
        },
        publicKey,
      );

      setStatus({ type: 'success', message: "Thanks for reaching out! I'll get back to you soon." });
      setForm(initialState);
    } catch (error) {
      setStatus({ type: 'error', message: 'Unable to send the message right now. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  const socialIcons = {
    'GitHub': <FiGithub size={20} />,
    'GitHub 2': <FiGithub size={20} />,
    'Email': <FiMail size={20} />,
    'LinkedIn': <FiLinkedin size={20} />,
  };

  return (
    <section id="contact" className="section-padding py-12 lg:py-16 bg-gradient-to-b from-transparent to-[var(--surface-hover)]/20">
      <div className="container-main max-w-4xl">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left Column - Contact Info */}
          <div className="space-y-8 text-center lg:text-left">
            <Reveal>
              <h2 className="font-display text-display-lg italic text-text-primary text-center lg:text-left">
                Let's build something great together.
              </h2>
              <p className="mt-4 text-body text-text-secondary">
                Have a project in mind or want to collaborate? Feel free to reach out. I'm always open to discussing new opportunities.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="space-y-4">
                {/* Availability */}
                <div className="flex items-center justify-center gap-3 rounded-xl border border-accent/30 bg-accent/5 p-4 backdrop-blur-md lg:justify-start">
                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
                  </span>
                  <span className="text-body-sm font-medium text-accent">{profile.availability.text}</span>
                </div>

                {/* Location */}
                <div className="flex items-center justify-center gap-3 rounded-xl border border-[var(--border)]/50 bg-[var(--surface)]/30 p-4 backdrop-blur-md text-text-secondary transition-all hover:border-[var(--border)] hover:bg-[var(--surface)]/50 lg:justify-start">
                  <div className="rounded-lg bg-[var(--surface-hover)]/50 p-2">
                    <FiMapPin size={18} />
                  </div>
                  <span className="text-body-sm font-medium">{profile.location}</span>
                </div>

                {/* Email */}
                <a 
                  href={`mailto:${profile.email}`}
                  className="flex items-center justify-center gap-3 rounded-xl border border-[var(--border)]/50 bg-[var(--surface)]/30 backdrop-blur-md p-4 transition-all hover:border-accent/50 hover:bg-[var(--surface)]/50 hover:shadow-lg hover:shadow-accent/10 lg:justify-start"
                >
                  <div className="rounded-lg bg-accent/10 p-2 text-accent">
                    <FiMail size={18} />
                  </div>
                  <span className="text-body-sm font-medium text-text-primary">{profile.email}</span>
                </a>
              </div>
            </Reveal>

            {/* Social Links */}
            <Reveal delay={0.15}>
              <div className="space-y-4">
                <p className="text-caption font-medium uppercase text-text-tertiary">Connect with me</p>
                <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
                  {socialLinks.map(link => (
                    <a 
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-2 rounded-full border border-[var(--border)]/50 bg-[var(--surface)]/30 backdrop-blur-md px-5 py-2.5 text-body-sm font-medium text-text-secondary transition-all hover:border-accent/50 hover:bg-[var(--surface)]/50 hover:text-accent hover:shadow-lg hover:shadow-accent/10"
                    >
                      <span className="transition-colors group-hover:text-accent">
                        {socialIcons[link.label] || <FiMail size={18} />}
                      </span>
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column - Contact Form */}
          <Reveal delay={0.2}>
            <div className="rounded-card border border-[var(--border)]/50 bg-[var(--surface)]/30 backdrop-blur-md p-6 shadow-xl transition-all hover:border-accent/30 hover:shadow-accent/10 sm:p-8">
              <div className="mb-6 text-center lg:text-left">
                <h3 className="text-heading font-semibold text-text-primary">Send a message</h3>
                <p className="mt-2 text-body-sm text-text-secondary">Fill out the form below and I'll get back to you as soon as possible.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-caption font-medium text-text-tertiary">Name</label>
                    <input 
                      id="name"
                      name="name" 
                      value={form.name} 
                      onChange={handleChange} 
                      required 
                      placeholder="Your name" 
                      /* Added dark:bg-white/5 and dark:text-white for proper dark mode rendering */
                      className="w-full rounded-lg border border-[var(--border)]/50 bg-white/60 dark:bg-white/5 backdrop-blur-sm px-4 py-3 text-body-sm text-text-primary dark:text-white placeholder-[var(--text-tertiary)] outline-none transition-all focus:border-accent focus:bg-white/80 dark:focus:bg-white/10 focus:ring-2 focus:ring-accent/20" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-caption font-medium text-text-tertiary">Email</label>
                    <input 
                      id="email"
                      name="email" 
                      value={form.email} 
                      onChange={handleChange} 
                      required 
                      type="email" 
                      placeholder="your@email.com" 
                      className="w-full rounded-lg border border-[var(--border)]/50 bg-white/60 dark:bg-white/5 backdrop-blur-sm px-4 py-3 text-body-sm text-text-primary dark:text-white placeholder-[var(--text-tertiary)] outline-none transition-all focus:border-accent focus:bg-white/80 dark:focus:bg-white/10 focus:ring-2 focus:ring-accent/20" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-caption font-medium text-text-tertiary">Message</label>
                  <textarea 
                    id="message"
                    name="message" 
                    value={form.message} 
                    onChange={handleChange} 
                    required 
                    rows="5" 
                    placeholder="Tell me about your project..." 
                    className="w-full resize-none rounded-lg border border-[var(--border)]/50 bg-white/60 dark:bg-white/5 backdrop-blur-sm px-4 py-3 text-body-sm text-text-primary dark:text-white placeholder-[var(--text-tertiary)] outline-none transition-all focus:border-accent focus:bg-white/80 dark:focus:bg-white/10 focus:ring-2 focus:ring-accent/20" 
                  />
                </div>

                {/* Updated this container to center the button and status message */}
                <div className="flex flex-col items-center justify-center gap-4 pt-4 w-full">
                  <button 
                    disabled={loading} 
                    type="submit" 
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-3 text-body-sm font-medium text-white transition-all hover:bg-accent-hover hover:shadow-lg hover:shadow-accent/25 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <span className="animate-spin">⏳</span>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <FiSend className="transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                  
                  {status.message && (
                    <div className={`flex items-center justify-center gap-2 text-body-sm text-center ${status.type === 'success' ? 'text-emerald-500' : 'text-red-500'}`}>
                      {status.type === 'success' ? <FiCheckCircle size={16} /> : <FiAlertCircle size={16} />}
                      {status.message}
                    </div>
                  )}
                </div>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}