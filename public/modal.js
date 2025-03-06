// モーダルを開く関数
function openModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'block';
}

// モーダルを閉じる関数
function closeModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
}

// 背景クリックでモーダルを閉じる
function closeModalOnBackground(e) {
  if (e.target.id === 'modal') {
    closeModal();
  }
}
