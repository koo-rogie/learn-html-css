window.onload = () => {
  //   선생님꺼
  document.querySelector('.flip-button').addEventListener('click', () => {
    document.querySelector('.card').classList.toggle('is-flipped');
  });

  // 내꺼
  // DOM 선택 부분
  //   const flipButton = document.querySelector('.flip-button');
  //   const card = document.querySelector('.card');

  //   // 함수 구현 부분
  //   const flipCard = () => {
  //     card.classList.toggle('is-flipped');
  //   };

  //   // 이벤트 바인딩 부분
  //   flipButton.addEventListener('click', flipCard);
};
