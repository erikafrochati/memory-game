const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer')



const characters = [
  'bulma',
  'dragon',

]

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;

}

/* variavel let pq elá vai ser alterada constantemente; criei duas variaveis como primeira carta e segunda carta ambas definidas como vazias; */
let firstCard = '';
let secondCard = '';

const resetFirstAndSecondCard = ()=>{
    firstCard = '';
    secondCard = '';
}

const checkEndGame = ()=> {
    const disabledCards = document.querySelectorAll('.disable-card');

    if(disabledCards.length ===4){
       setTimeout(()=>{
        clearInterval(this.loop);
        alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi: ${timer.innerHTML}`);
       }, 500)
    }
}

/* variavel que recebe função para verificar se as cartas são iguais */
const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if(firstCharacter === secondCharacter){
        firstCard.firstChild.classList.add('disable-card');
        secondCard.firstChild.classList.add('disable-card');
        resetFirstAndSecondCard();
        checkEndGame();
    }else{
        setTimeout(()=>{
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            resetFirstAndSecondCard();
        }, 500)
    }
}

const revealCard = ({target}) =>{
    /* Verifica se a carta ja foi virada */
    if (target.parentNode.className.includes('reveal-card')) {
        return; 
    }

    /* verifica se a primeira carta não foi selecionada/vazia */
    if (firstCard === '') {
        target.parentNode.classList.add('reveal-card');
        /* agora coloca que a primeira carta possui uma face */
        firstCard = target.parentNode;
    } else if(secondCard === ''){
        target.parentNode.classList.add('reveal-card');
        /* agora coloca que a segunda carta possui uma face */
        secondCard = target.parentNode;

        checkCards();
    }

    
}

const createCard = (character)=>{
    const card = createElement('div','card');
    const front = createElement('div','face front');
    const back = createElement('div','face back');

    
    front.style.backgroundImage = `url('../imagens/${character}.png')`
    
    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', character)

    return card;
}
createCard();

const loadGame = () =>{
    /*array duplicado; os 3pontos são para entrar no array que já foi criado lá no topo */
    const duplicateCharacters = [...characters,...characters];

    /* variavel que embaralha o array duplicado; usando o sort() para embaralhar e o match.random  */
    const shuffdleArray = duplicateCharacters.sort(()=> Math.random() - 0.5);
    
    shuffdleArray.forEach((character) =>{
        const card = createCard(character);
        grid.appendChild(card)
    } )
}
    const startTimer = () => {
        this.loop = setInterval(() => {
            const currentTime = +timer.innerHTML;
            timer.innerHTML = currentTime + 1;
        }, 1000);
    }
    window.onload = ()=>{
        const playerName = localStorage.getItem('player');
        spanPlayer.innerHTML = playerName;
        startTimer();
        loadGame();
    }

    
// Selecionar o botão pelo atributo data-restart-Button
const restartButton = document.querySelector('[data-restart-Button]');

// Adicionar um evento de clique ao botão
restartButton.addEventListener('click', function() {
    // Recarregar a página
    location.reload();
});