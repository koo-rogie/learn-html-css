window.onload = () => {
  const headers = document.querySelectorAll('body > div > h2');

  headers.forEach((header) => {
    header.addEventListener('click', () => {
      const div = header.nextElementSibling;
      if (div && div.tagName === 'DIV') {
        div.classList.toggle('open');
      }
    });
  });
};
