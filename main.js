// Инициализируем файл JS c HTML через id присвоенный в разметке, чтобы вывести то, что будет написано нмже в этом файле
const game = document.getElementById('game')


function startGame(game, cardsCount) {
  // Создаем кнопку
  const button = document.createElement('button');
  button.setAttribute('type', 'button');
  button.classList.add('btn');
  button.textContent = 'Сыграть ещё раз';


  // создаем переменную количества пар в игре и переводим в массив ниже

  const cardsNumberArray = [];


  // Присвоение переменных для карточек
  let firstCard = null
  let secondCard = null

  // Создаем условие для кол-ва карточек
  function getCountNumber(cardsCount) {

    if (cardsCount % 2 === 1 || cardsCount > 10) {           //если кол-во карточек больше 10, то вернется по умолчанию 6
      alert('Введите чётное число от 2 до 10')
      return cardsCount = 6
    }
    else (cardsCount % 2 === 0 || cardsCount < 10)    //а тут кол-во карточек меньше 10, то вернется по умолчанию указанное в cardsCount значение
    return cardsCount
  }

  cardsCount = getCountNumber(cardsCount);


  // создание массива чисел
  for (let i = 1; i <= cardsCount; i++) {
    cardsNumberArray.push(i, i)
  }

  // Делаем перемешивание массива чисел
  for (let i = 0; i < cardsNumberArray.length; i++) {
    let randomIndex = Math.floor(Math.random() * cardsNumberArray.length)

    let temp = cardsNumberArray[i]
    cardsNumberArray[i] = cardsNumberArray[randomIndex]
    cardsNumberArray[randomIndex] = temp
  }

  // Создание карточек
  for (const cardNumber of cardsNumberArray) {
    let card = document.createElement('div')
    card.textContent = cardNumber
    card.classList.add('card')

    // Клик по карточке
    card.addEventListener('click', function () {
      if (card.classList.contains('open') || card.classList.contains('success')) {
        alert('Эта карточка уже открыта')
        return
      }


      if (firstCard !== null && secondCard !== null) {
        firstCard.classList.remove('open')
        secondCard.classList.remove('open')
        firstCard = null
        secondCard = null
      }

      card.classList.add('open')

      if (firstCard === null) {
        firstCard = card
      }
      else {
        secondCard = card
      }


      if (firstCard !== null && secondCard !== null) {
        let firstCardNumber = firstCard.textContent
        let secondCardNumber = secondCard.textContent

        if (firstCardNumber === secondCardNumber) {
          firstCard.classList.add('success')
          secondCard.classList.add('success')
        }
      }
      if (cardsNumberArray.length === document.querySelectorAll('.success').length) {
        setTimeout(function () {
          alert('ПОБЕДА!, Вы нашли все пары')
          document.body.append(button);  //кнопка появится когда условие найденных карточек выполнено
        }, 400)

      }
      button.addEventListener('click', function () {
        if (cardsNumberArray.length === document.querySelectorAll('.success').length) {
          game.innerHTML = ''
          let cardsCount = Number(prompt("Введите количесто пар", 6));
          startGame(game, cardsCount)
        }
      })
    })
    // button.addEventListener('click', function () {
    //   // game.innerHTML = ''
    //   location.reload()    //Применил такой вот вариант, н перезгружает страницу и соответственно игра начинается заново
    // })
    game.append(card)
  }
}

let cardsCount = Number(prompt("Введите количесто пар", 6));
startGame(game, cardsCount)
