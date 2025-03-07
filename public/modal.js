// モーダルを開く関数
function openModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'block';
}

// モーダルを閉じる関数
function closeModal(reload = false) {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
  if (reload) {
    location.reload();
  }
}

// 背景クリックでモーダルを閉じる
function closeModalOnBackground(e, reload = false) {
  if (e.target.id === 'modal') {
    closeModal(reload);
  }
}
