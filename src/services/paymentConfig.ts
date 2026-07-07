export const PAYMENT_CONFIG = {
  upiId: 'ashish.lonare999@oksbi',
  merchantId: '0000',
  merchantName: 'Ashish Lonare',
  currency: 'INR',
  whatsappNumber: '918055052128',
} as const;

export const generateOrderId = (): string => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${timestamp}-${random}`;
};

export const buildTransactionNote = (
  orderId: string,
  itemTitles: string[],
): string => {
  const prefix = `${orderId} | `;
  const maxItemsLength = 80 - prefix.length;
  let itemsStr = itemTitles.join(', ');

  if (itemsStr.length > maxItemsLength) {
    const truncated = itemsStr.substring(0, maxItemsLength - 3);
    itemsStr = truncated.replace(/[\s,]+$/, '') + '...';
  }

  return `${prefix}${itemsStr}`;
};

export const formatINRCurrency = (amount: number): string => {
  return `₹${amount.toFixed(2)}`;
};

export const buildUpiPaymentUrl = (
  amount: number,
  transactionNote: string,
): string => {
  const encodedUpiId = encodeURIComponent(PAYMENT_CONFIG.upiId);
  const encodedMerchantName = encodeURIComponent(PAYMENT_CONFIG.merchantName);
  const encodedCurrency = encodeURIComponent(PAYMENT_CONFIG.currency);
  const encodedTxnNote = encodeURIComponent(transactionNote);
  const encodedMerchantId = encodeURIComponent(PAYMENT_CONFIG.merchantId);
  const encodedAmount = amount.toFixed(2);

  return `upi://pay?pa=${encodedUpiId}&pn=${encodedMerchantName}&am=${encodedAmount}&cu=${encodedCurrency}&tn=${encodedTxnNote}&mc=${encodedMerchantId}`;
};
