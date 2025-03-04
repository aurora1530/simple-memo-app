const memoBody = document.getElementById('memo-body');
const deviceHeight = window.innerHeight;
memoBody.style.height = `${deviceHeight * 0.4}px`;

document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && e.ctrlKey) {
    document.getElementById('memo-form').submit();
  }
})