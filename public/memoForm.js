// Ctrl + Enter で送信
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && e.ctrlKey) {
    memoForm.submit();
  }
});

/*
  以下文字数カウントの処理
*/

const memoForm = document.getElementById('memo-form');
const memoTitle = document.getElementById('memo-title');
const memoBody = document.getElementById('memo-body');
const titleCountSpan = document.getElementById('title-char-count');
const bodyCountSpan = document.getElementById('body-char-count');

// hidden要素から最大文字数を取得
const maxTitleLength = parseInt(document.getElementById('max-title-length').value, 10);
const maxBodyLength = parseInt(document.getElementById('max-body-length').value, 10);

/**
 * cf. https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/length
 */
const getGraphemeCount = (text) => {
  const segmenter = new Intl.Segmenter('ja-JP', { granularity: 'grapheme' });
  return [...segmenter.segment(text)].length;
};

function handleTitleInput(e) {
  const count = getGraphemeCount(e.target.value);
  titleCountSpan.textContent = count;

  if (count > maxTitleLength) {
    titleCountSpan.classList.add('char-count--over-limit');
  } else {
    titleCountSpan.classList.remove('char-count--over-limit');
  }
}

function handleBodyInput(e) {
  const count = getGraphemeCount(e.target.value);
  bodyCountSpan.textContent = count;

  if (count > maxBodyLength) {
    bodyCountSpan.classList.add('char-count--over-limit');
  } else {
    bodyCountSpan.classList.remove('char-count--over-limit');
  }
}

memoTitle.addEventListener('input', handleTitleInput);
memoBody.addEventListener('input', handleBodyInput);

memoTitle.dispatchEvent(new Event('input'));
memoBody.dispatchEvent(new Event('input'));

// メモ本文の高さをデバイスの高さの40%に設定
const deviceHeight = window.innerHeight;
memoBody.style.height = `${deviceHeight * 0.4}px`;
