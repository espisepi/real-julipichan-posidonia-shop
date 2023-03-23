

export const TAX_RATE = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0.15);
export const TAX_RATE_PERCENTAGE = TAX_RATE * 100;

export const CLOUDINARY_URL = process.env.CLOUDINARY_URL || '';