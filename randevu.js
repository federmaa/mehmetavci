// Google Calendar API entegrasyonu
const calendar = {
    init: function() {
        gapi.client.init({
            apiKey: 'YOUR_API_KEY',
            clientId: 'YOUR_CLIENT_ID',
            discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
            scope: "https://www.googleapis.com/auth/calendar.events"
        });
    },
    
    createAppointment: async function(appointmentData) {
        const event = {
            'summary': 'Kuaför Randevusu - ' + appointmentData.name,
            'description': `Hizmet: ${appointmentData.service}\nNotlar: ${appointmentData.notes}`,
            'start': {
                'dateTime': appointmentData.date + 'T' + appointmentData.time + ':00',
                'timeZone': 'Europe/Istanbul'
            },
            'end': {
                'dateTime': appointmentData.date + 'T' + appointmentData.endTime + ':00',
                'timeZone': 'Europe/Istanbul'
            }
        };

        try {
            const response = await gapi.client.calendar.events.insert({
                'calendarId': 'primary',
                'resource': event
            });
            return response;
        } catch (error) {
            console.error('Error creating event:', error);
            throw error;
        }
    }
}; 