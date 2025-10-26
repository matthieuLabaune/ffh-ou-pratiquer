import { format, formatDistance, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

export const formatters = {
  date: (date: string | Date, formatStr: string = 'dd/MM/yyyy'): string => {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, formatStr, { locale: fr });
  },

  dateTime: (date: string | Date): string => {
    return formatters.date(date, 'dd/MM/yyyy HH:mm');
  },

  relativeTime: (date: string | Date): string => {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return formatDistance(dateObj, new Date(), { addSuffix: true, locale: fr });
  },

  distance: (meters: number): string => {
    if (meters < 1000) {
      return `${Math.round(meters)} m`;
    }
    return `${(meters / 1000).toFixed(1)} km`;
  },

  phone: (phone: string): string => {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/);
    if (match) {
      return match.slice(1).join(' ');
    }
    return phone;
  },

  capitalize: (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  },

  truncate: (str: string, maxLength: number): string => {
    if (str.length <= maxLength) return str;
    return str.substring(0, maxLength - 3) + '...';
  },
};

export default formatters;
