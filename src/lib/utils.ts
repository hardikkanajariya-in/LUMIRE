export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatDateTime(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function generateOrderNumber(): string {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const seq = String(Math.floor(Math.random() * 999) + 1).padStart(3, '0');
  return `LUM-${date}-${seq}`;
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getDiscountPercentage(original: number, sale: number): number {
  return Math.round(((original - sale) / original) * 100);
}

export function getMetalLabel(metal: string): string {
  const labels: Record<string, string> = {
    'gold-18k': 'Gold 18K',
    'silver-925': 'Silver 925',
    'platinum': 'Platinum',
    'rose-gold': 'Rose Gold',
  };
  return labels[metal] || metal;
}

export function getStoneLabel(stone: string): string {
  const labels: Record<string, string> = {
    'diamond': 'Diamond',
    'ruby': 'Ruby',
    'sapphire': 'Sapphire',
    'emerald': 'Emerald',
    'pearl': 'Pearl',
    'no-stone': 'No Stone',
  };
  return labels[stone] || stone;
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
