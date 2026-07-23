export function downloadResume() {
  const anchor = document.createElement('a');
  anchor.href = '/Resume.pdf';
  anchor.download = 'Hardik_Patel_Resume.pdf';
  anchor.target = '_blank';
  anchor.rel = 'noopener noreferrer';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}