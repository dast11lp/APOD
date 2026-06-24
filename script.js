
const dateInput = document.getElementById('date-input');
const sendBtn = document.getElementById('send-btn');

let fecha_valida = false;

sendBtn.addEventListener('click', () => {
    fecha_valida = confirm_date();
    console.log(fecha_valida);
});











function todays_date() {
    const hoy = new Date();
    const aaaa = hoy.getFullYear();
    const mm = String(hoy.getMonth() + 1).padStart(2, '0');
    const dd = String(hoy.getDate()).padStart(2, '0');

    return `${aaaa}-${mm}-${dd}`;
}

function confirm_date() {
    const limit_day = `1995-06-20`;

    let selectedDate;
    if (dateInput) {
        selectedDate = dateInput.value;
    } else {
        selectedDate = '';
    }


    if (selectedDate === '') {
        alert('Por favor, selecciona una fecha');
        return false;
    }

    if (selectedDate < limit_day || selectedDate > todays_date()) {
        alert('Fecha invalida, APOD esta disponible desde 20/06/1995 hasta el dia de hoy.');
        return false;
    }

    return true;
}