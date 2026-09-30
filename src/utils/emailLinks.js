/**
 * Utility per la generazione di link email universali:
 * Supporta Gmail Web, Outlook Web, Mailto standard e WhatsApp
 */

export const EMILIA_EMAIL = 'emliarao10@gmail.com';
export const EMILIA_PHONE = '+393408585052';
export const EMILIA_PHONE_DISPLAY = '+39 340 858 5052';

export function getGmailComposeUrl(to, subject, body) {
  const params = new URLSearchParams({
    view: 'cm',
    fs: '1',
    to: to || EMILIA_EMAIL,
    su: subject || '',
    body: body || '',
  });
  return `https://mail.google.com/mail/?${params.toString()}`;
}

export function getOutlookComposeUrl(to, subject, body) {
  const params = new URLSearchParams({
    to: to || EMILIA_EMAIL,
    subject: subject || '',
    body: body || '',
  });
  return `https://outlook.live.com/mail/0/deeplink/compose?${params.toString()}`;
}

export function getMailtoUrl(to, subject, body) {
  const encSubject = encodeURIComponent(subject || '');
  const encBody = encodeURIComponent(body || '');
  return `mailto:${to || EMILIA_EMAIL}?subject=${encSubject}&body=${encBody}`;
}

export function getWhatsAppUrl(phone, text) {
  const cleanPhone = (phone || EMILIA_PHONE).replace(/[^0-9]/g, '');
  const encText = encodeURIComponent(text || '');
  return `https://wa.me/${cleanPhone}?text=${encText}`;
}
