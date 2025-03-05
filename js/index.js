document.addEventListener('DOMContentLoaded', () => {
  const toggleButtons = document.querySelectorAll('.toggle-btn');

  toggleButtons.forEach((button) => {
    button.addEventListener('click', () => {
      // aria-controls 속성에서 정확한 ID 가져오기
      const listId = button.getAttribute('aria-controls');
      const list = document.getElementById(listId);

      if (!list) return; // 리스트가 없으면 실행 안 함

      const isExpanded = button.getAttribute('aria-expanded') === 'true';

      // 현재 요소만 토글 (다른 div는 유지)
      button.setAttribute('aria-expanded', !isExpanded);
      list.classList.toggle('open', !isExpanded);
    });
  });
});

window.onload = () => {};

$(function () {}); 
