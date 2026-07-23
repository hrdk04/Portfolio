# Hardik Patel Portfolio

Premium React + Vite + Tailwind CSS portfolio built from your resume and public GitHub profiles.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file:

```bash
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_LINKEDIN_URL=https://linkedin.com/in/your-profile
```

3. Start the dev server:

```bash
npm run dev
```

## Deployment on Vercel

1. Push the project to GitHub.
2. Import the repo into Vercel.
3. Set the environment variables in Vercel.
4. Keep the build command as `npm run build` and output directory as `dist`.
5. Replace the placeholder profile image and resume download asset when ready.

## Notes

- The project section is driven by structured GitHub data from your public repositories.
- The resume data is centralized in `src/data/profile.js`.
- The contact form uses EmailJS and will work after adding the env values.