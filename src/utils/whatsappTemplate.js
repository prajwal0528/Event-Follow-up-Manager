import { WHATSAPP_TEMPLATE } from '../config/config';

/**
 * Formats phone number to include +91 country code
 */
export const formatPhoneNumber = (phone) => {
  if (!phone) return '';
  
  // Remove all non-digit characters
  let cleaned = phone.replace(/\D/g, '');
  
  // Remove leading 91 if present
  if (cleaned.startsWith('91') && cleaned.length > 10) {
    cleaned = cleaned.substring(2);
  }
  
  // Remove leading 0 if present
  if (cleaned.startsWith('0')) {
    cleaned = cleaned.substring(1);
  }
  
  // Return with +91 prefix
  return `+91${cleaned}`;
};

/**
 * Generates WhatsApp link with formatted message
 */
export const generateWhatsAppLink = (phone, name, schoolName) => {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  
  // Remove leading 91 if already present, then add it
  let formattedPhone = cleanPhone;
  if (formattedPhone.startsWith('91') && formattedPhone.length > 10) {
    formattedPhone = formattedPhone.substring(2);
  }
  
  // Remove leading 0 if present
  if (formattedPhone.startsWith('0')) {
    formattedPhone = formattedPhone.substring(1);
  }
  
  const phoneNumber = `91${formattedPhone}`;

  let message = WHATSAPP_TEMPLATE
    .replace('[NAME]', name || 'Sir/Madam')
    .replace('[SCHOOL_NAME]', schoolName || 'Your school');

  const encodedMessage = encodeURIComponent(message);

  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};

/**
 * Generates phone call link with +91 prefix
 */
export const generateCallLink = (phone) => {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  
  // Remove leading 91 if already present
  let formattedPhone = cleanPhone;
  if (formattedPhone.startsWith('91') && formattedPhone.length > 10) {
    formattedPhone = formattedPhone.substring(2);
  }
  
  // Remove leading 0 if present
  if (formattedPhone.startsWith('0')) {
    formattedPhone = formattedPhone.substring(1);
  }
  
  return `tel:+91${formattedPhone}`;
};

/**
 * Formats phone number for display (with spaces for readability)
 */
export const displayPhoneNumber = (phone) => {
  const formatted = formatPhoneNumber(phone);
  // Format as +91 XXXXX XXXXX
  if (formatted.length === 13) {
    return `${formatted.slice(0, 3)} ${formatted.slice(3, 8)} ${formatted.slice(8)}`;
  }
  return formatted;
};