const memoBody = document.getElementById('memo-body');
const deviceHeight = window.innerHeight;
memoBody.style.height = `${deviceHeight * 0.4}px`;

document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && e.ctrlKey) {
    document.getElementById('memo-form').submit();
  }
});

/**
 * cf. https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/length
 */
const getGraphemeCount = (text) => {
  const segmenter = new Intl.Segmenter('ja-JP', { granularity: 'grapheme' });
  return [...segmenter.segment(text)].length;
};

const memoTitle = document.getElementById('memo-title');
memoTitle.addEventListener('input', (e) => {
  const count = getGraphemeCount(e.target.value);
  document.getElementById('title-char-count').textContent = count;
});

memoBody.addEventListener('input', (e) => {
  const count = getGraphemeCount(e.target.value);
  document.getElementById('body-char-count').textContent = count;
});

(() => {
  memoTitle.dispatchEvent(new Event('input'));
  memoBody.dispatchEvent(new Event('input'));
})();
