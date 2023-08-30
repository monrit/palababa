const isValidUkrainianPhoneNumber = phone => {
    const regex = /^(?:\+380|380)?\d{9}$/;
    return regex.test(phone);
};

const TELEGRAM_URL = `https://api.telegram.org/bot6549658711:AAGspGUgHR8g4VxroOAQeRXgunx3GCJVuyI/sendMessage`;

const sendMessage = text => {
    const payload = {
        chat_id: 335038668,
        text: text,
        parse_mode: "HTML"
    };

    fetch(TELEGRAM_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
        .then(response => response.json())
        .then(data => (window.location.href = window.location.origin + "/palababa/thankyou.html"))
        .catch(error => alert("Сталася якась помилка, спробуйте ще раз)"));
};

const submitForm = () => {
    const form = document.getElementById("form");
    const name = document.getElementById("name");
    const phone = document.getElementById("phone");

    const onSubmit = e => {
        e.preventDefault();
        if (!isValidUkrainianPhoneNumber(phone.value)) {
            alert("Введіть валідний номер!");
        } else {
            const escapedName = name.value;
            const escapedPhone = phone.value;

            const message = `Хлопчина з ім'ям: <b>${escapedName}</b>\nта номером: <b>${escapedPhone}</b> хоче замовити палабабу!`;
            sendMessage(message);
        }
    };

    const onInput = e => {
        if (!e.target.value.startsWith("+38")) {
            e.target.value = "+38";
        }
    };

    form.addEventListener("submit", onSubmit);
    phone.addEventListener("input", onInput);
};

export default submitForm;
