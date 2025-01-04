document.addEventListener('DOMContentLoaded', function() {
    const appointmentForm = document.querySelector('.appointment-form');
    const dateInput = document.getElementById('date');
    const timeSelect = document.getElementById('time');

    // Minimum tarih ayarı
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.min = tomorrow.toISOString().split('T')[0];

    // Form gönderimi
    appointmentForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            service: document.getElementById('service').value,
            date: dateInput.value,
            time: timeSelect.value,
            notes: document.getElementById('notes').value
        };

        try {
            // Form validasyonu
            appointmentValidation.validateForm(formData);

            // Müsaitlik kontrolü
            const isAvailable = await appointmentValidation.checkAvailability(formData.date, formData.time);
            if (!isAvailable) {
                throw new Error('Seçilen tarih ve saatte randevu dolu');
            }

            // Randevu oluşturma
            await calendar.createAppointment(formData);

            // Başarılı mesajı
            showSuccessMessage('Randevunuz başarıyla oluşturuldu!');
            appointmentForm.reset();

        } catch (error) {
            showErrorMessage(error.message);
        }
    });
}); 