document.addEventListener('DOMContentLoaded', function () {
  // 모든 토글 버튼과 초기화 버튼 선택
  const toggleButtons = document.querySelectorAll('.toggle-animation');
  const resetButtons = document.querySelectorAll('.reset-animation');

  // 토글 버튼에 이벤트 리스너 추가
  toggleButtons.forEach((button) => {
    button.addEventListener('click', function () {
      // 버튼이 속한 case 요소 찾기
      const caseElement = button.closest('.case');

      // case 요소 내의 애니메이션 타겟 찾기
      const targetAnimation = caseElement.querySelector('.target-animation');

      // 현재 애니메이션 상태 확인
      const currentState = getComputedStyle(targetAnimation).animationPlayState;

      if (currentState === 'running') {
        // 애니메이션이 실행 중이면 일시정지
        targetAnimation.style.animationPlayState = 'paused';

        // 가상 요소 애니메이션도 일시정지하기 위한 스타일 추가
        const styleElement = getOrCreateStyleElement(caseElement);
        styleElement.textContent = `
                    .${caseElement.className.split(' ').join('.')} .target-animation::before,
                    .${caseElement.className.split(' ').join('.')} .target-animation::after {
                        animation-play-state: paused !important;
                    }
                `;

        button.textContent = '재생';
        button.classList.remove('paused');
      } else {
        // 애니메이션이 일시정지 상태면 실행
        targetAnimation.style.animationPlayState = 'running';

        // 가상 요소 애니메이션도 실행하기 위한 스타일 추가
        const styleElement = getOrCreateStyleElement(caseElement);
        styleElement.textContent = `
                    .${caseElement.className.split(' ').join('.')} .target-animation::before,
                    .${caseElement.className.split(' ').join('.')} .target-animation::after {
                        animation-play-state: running !important;
                    }
                `;

        button.textContent = '일시정지';
        button.classList.add('paused');
      }
    });
  });

  // 초기화 버튼에 이벤트 리스너 추가
  resetButtons.forEach((button) => {
    button.addEventListener('click', function () {
      // 버튼이 속한 case 요소 찾기
      const caseElement = button.closest('.case');

      // case 요소 내의 애니메이션 타겟과 토글 버튼 찾기
      const targetAnimation = caseElement.querySelector('.target-animation');
      const toggleButton = caseElement.querySelector('.toggle-animation');

      // 애니메이션 재설정을 위해 일시적으로 제거
      const originalAnimation = targetAnimation.style.animation;
      targetAnimation.style.animation = 'none';

      // 가상 요소 애니메이션도 재설정하기 위한 스타일 추가
      const styleElement = getOrCreateStyleElement(caseElement);
      styleElement.textContent = `
                .${caseElement.className.split(' ').join('.')} .target-animation::before,
                .${caseElement.className.split(' ').join('.')} .target-animation::after {
                    animation: none !important;
                }
            `;

      // 강제로 리플로우 발생시켜 애니메이션 재설정
      void targetAnimation.offsetWidth;

      // 원래 애니메이션 스타일 복원하고 일시정지 상태로 설정
      targetAnimation.style.animation = '';
      targetAnimation.style.animationPlayState = 'paused';

      // 가상 요소 애니메이션도 원래대로 복원하고 일시정지 상태로 설정
      setTimeout(() => {
        styleElement.textContent = `
                    .${caseElement.className.split(' ').join('.')} .target-animation::before,
                    .${caseElement.className.split(' ').join('.')} .target-animation::after {
                        animation-play-state: paused !important;
                    }
                `;
      }, 10); // 약간의 지연을 주어 애니메이션이 적용될 시간 확보

      // 토글 버튼 상태 초기화
      toggleButton.textContent = '재생';
      toggleButton.classList.remove('paused');
    });
  });

  // 케이스별 스타일 요소를 가져오거나 생성하는 함수
  function getOrCreateStyleElement(caseElement) {
    // 고유 ID 생성
    const styleId = `style-${caseElement.className.replace(/\s+/g, '-')}`;

    // 이미 존재하는지 확인
    let styleElement = document.getElementById(styleId);

    // 없으면 새로 생성
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }

    return styleElement;
  }
});
