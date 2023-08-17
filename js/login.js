const input = document.querySelector('.login-input');
const button = document.querySelector('.login-btn');
const form = document.querySelector('.login-form');

const validateInput = ({ target }) => {
    if(target.value.length > 2){
        button.removeAttribute(`disabled`);
        return;
    }
    button.setAttribute(`disabled`, ``);
}

const handleSubmit = (event) => {
    event.preventDefault();
    setTimeout(() => {
        window.location = '../pages/game.html'
    }, 1000)
    localStorage.setItem('player', input.value)

}
input.addEventListener(`input`, validateInput);
form.addEventListener(`submit`, handleSubmit);