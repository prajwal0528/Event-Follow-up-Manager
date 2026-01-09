export const SHEET_CONFIG = {
  SHEET_URL: 'https://docs.google.com/spreadsheets/d/1-2zdKvzIPznrC7DGa_QHmy1esrCOCVHrkAFtAj7iEoU/edit',
  SHEET_ID: '1-2zdKvzIPznrC7DGa_QHmy1esrCOCVHrkAFtAj7iEoU',

  COLUMNS: {
    NAME: 0,
    DESIGNATION: 1,
    SCHOOL_NAME: 2,
    PHONE: 3,
    WHATSAPP: 4,
    STATUS: 5,
    REMARKS: 6,
    LAST_UPDATED: 7
  }
};

export const STATUS_OPTIONS = [
  'Pending',
  'Completed',
  'Not Interested'
];

export const WHATSAPP_TEMPLATE = `🎉 Congratulations!

Dear [NAME],

[SCHOOL_NAME] has been selected as one of 100 exceptional institutions for our exclusive School Leaders' Evening on January 26th.

📅 Date: January 26, 2026
⏰ Time: 6:00 PM onwards
📍 Venue: Grand Hotel, Mysuru

👉 Please confirm: https://forms.google.com/your-form-link

Looking forward to your presence!`;