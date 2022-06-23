import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', onSub);
form.addEventListener('input', onInput);

function onSub(evt) {
  evt.preventDefault();

  const { delay, step, amount } = evt.target.elements;
  // console.log(delay, step, amount);
  for (let i = 0; i < amount.value; i += 1) {
    let position = i + 1;

    let passed = Number(delay.value) + Number(step.value) * i;

    createPromise(position, passed)
      .then(object => {
        const { position, delay } = object;
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(object => {
        const { position, delay } = object;
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}
