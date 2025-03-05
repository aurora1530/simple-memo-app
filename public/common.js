const serverMessage = document.getElementById('server-message');
if (serverMessage) {
  serverMessage.style.opacity = 1;
  // 3秒だったら実行
  setTimeout(() => {
    const interval = setInterval(() => {
      // 0.1秒ごとにちょっとずつ透明にしていく
      serverMessage.style.opacity -= 0.1;

      // 透明度が0以下になったら非表示にする
      if (serverMessage.style.opacity <= 0) {
        // いきなり非表示にすると見栄えが悪いので、0.1秒後に非表示にする
        setTimeout(() => {
          serverMessage.style.display = 'none';
        }, 100);
        clearInterval(interval);
      }
    }, 100);
  }, 3000);
}
