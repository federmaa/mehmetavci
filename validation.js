const appointmentValidation = {
    validateForm: function(formData) {
        // Boş alan kontrolü
        if (!formData.name || !formData.phone || !formData.service || !formData.date || !formData.time) {
            throw new Error('Lütfen tüm alanları doldurun');
        }

        // Telefon format kontrolü
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
            throw new Error('Geçerli bir telefon numarası girin');
        }

        // Tarih kontrolü
        const selectedDate = new Date(formData.date);
        const today = new Date();
        if (selectedDate < today) {
            throw new Error('Geçmiş bir tarih seçemezsiniz');
        }

        return true;
    },

    checkAvailability: async function(date, time) {
        // Seçilen tarih ve saatte randevu kontrolü
        try {
            const response = await fetch('/api/check-availability', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ date, time })
            });
            const data = await response.json();
            return data.available;
        } catch (error) {
            console.error('Availability check failed:', error);
            throw error;
        }
    }
}; 