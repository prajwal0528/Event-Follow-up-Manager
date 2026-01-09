# Event Follow-up Manager - Setup Instructions

## Overview
This is a frontend-only Event Follow-up Management System built with React + Vite that uses Google Sheets as a database.

## Features
- Dashboard with real-time statistics
- Interactive record filtering
- WhatsApp deep link integration
- Click-to-call functionality
- Update records directly to Google Sheets
- Mobile-responsive design

## Google Sheets Setup

### Option 1: Using Mock Data (Default)
The app comes with mock data pre-loaded. You can start using it immediately to test the interface.

### Option 2: Connect Your Google Sheets

#### Step 1: Prepare Your Google Sheet
1. Create a new Google Sheet with the following columns in this exact order:
   - Column A: Name
   - Column B: School Name
   - Column C: Phone
   - Column D: Status (values: Pending, Completed, Not Interested)
   - Column E: Remarks

2. Add your data starting from row 2 (row 1 should contain headers)

Example:
```
| Name              | School Name                  | Phone       | Status    | Remarks |
|-------------------|------------------------------|-------------|-----------|---------|
| Dr. Rajesh Kumar  | Mysore Public School         | 9876543210  | Pending   |         |
| Mrs. Priya Sharma | St. Joseph's Academy         | 9876543211  | Completed |         |
```

#### Step 2: Get Google Sheets API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Sheets API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click "Enable"
4. Create credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy your API key

#### Step 3: Make Your Sheet Public (Read-Only)
1. Open your Google Sheet
2. Click "Share" button
3. Change "Restricted" to "Anyone with the link"
4. Set permission to "Viewer"
5. Copy the Sheet ID from the URL:
   - URL format: `https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit`
   - Copy the `SHEET_ID` part

#### Step 4: Configure the Application
Open `src/config/config.js` and update:

```javascript
export const SHEET_CONFIG = {
  SHEET_URL: 'YOUR_FULL_SHEET_URL_HERE',
  SHEET_ID: 'YOUR_SHEET_ID_HERE',
  API_KEY: 'YOUR_API_KEY_HERE',
  RANGE: 'Sheet1!A2:E',
  // ... rest of config
};
```

**Note:** For security, updating records back to Google Sheets requires additional setup with OAuth2. The current implementation supports read operations via API key. For write operations, consider using Google Apps Script Web App endpoint.

## Customizing WhatsApp Message Template

Edit the message template in `src/config/config.js`:

```javascript
export const WHATSAPP_TEMPLATE = `Your custom message here
Use [NAME] for contact name
Use [SCHOOL_NAME] for school name`;
```

## Running the Application

### Development Mode
```bash
npm install
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

## Project Structure
```
src/
├── components/
│   ├── Dashboard.jsx          # Stats cards with filtering
│   ├── RecordsTable.jsx       # Table view of all records
│   ├── RecordDetails.jsx      # Modal for viewing/editing records
├── context/
│   ├── RecordsContext.jsx     # Global state management
├── services/
│   ├── sheetsService.js       # Google Sheets API integration
├── utils/
│   ├── whatsappTemplate.js    # WhatsApp link generator
├── config/
│   ├── config.js              # Configuration settings
├── App.jsx                     # Main application component
└── main.tsx                    # Application entry point
```

## Features Explained

### Dashboard Statistics
- **Total Records**: Shows all records, click to view all
- **Pending**: Records awaiting follow-up
- **Completed**: Successfully contacted records
- **Not Interested**: Records that declined

### Record Management
- Click any record to view details
- Update status and add remarks
- Changes are saved back to Google Sheets

### WhatsApp Integration
- Automatically generates WhatsApp deep links
- Pre-fills message with personalized content
- Works on mobile and desktop

### Call Functionality
- Direct click-to-call on mobile devices
- Uses `tel:` protocol for phone integration

## Troubleshooting

### Data Not Loading
- Check if SHEET_ID and API_KEY are correctly set
- Verify the sheet is set to "Anyone with the link" can view
- Check browser console for errors

### WhatsApp Links Not Working
- Ensure phone numbers are in correct format (10 digits)
- Check if WhatsApp is installed on the device

### Updates Not Saving
- Current implementation uses mock updates
- For real updates, implement Google Apps Script Web App endpoint

## Future Enhancements
- Multiple WhatsApp templates
- Bulk message sending
- Follow-up reminders
- Export functionality
- Advanced analytics

## Support
For issues or questions, check the browser console for error messages.
