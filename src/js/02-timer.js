import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const date = document.querySelector('#datetime-picker');
const button = document.querySelector('[data-start]');
const day = document.querySelector('[data-days]');
const hour = document.querySelector('[data-hours]');
const minute = document.querySelector('[data-minutes]');
const second = document.querySelector('[data-seconds]');

let timerId = 0;

button.disabled = true;

flatpickr(date, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      window.alert('Please choose a date in the future');
      button.disabled = true;
    } else {
      button.disabled = false;
    }
    console.log(selectedDates[0]);
  },
});

button.addEventListener('click', btnStart);

function btnStart() {
  timerId = setInterval(() => {
    const takenDate = new Date(date.value);
    const endTime = takenDate - Date.now();

    let { days, hours, minutes, seconds } = convertMs(endTime);

    button.disabled = true;

    day.textContent = days < 10 ? '0' + days : days;
    hour.textContent = hours < 10 ? '0' + hours : hours;
    minute.textContent = minutes < 10 ? '0' + minutes : minutes;
    second.textContent = seconds < 10 ? '0' + seconds : seconds;

    if (endTime < 1000) {
      clearInterval(timerId);
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
