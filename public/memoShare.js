async function createShareLink(memoId, alreadyShared = false) {
  const confirmed = alreadyShared || confirm('共有リンクを新たに作成しますか？');
  if (!confirmed) return;

  const res = await fetch(`/memo/share/${memoId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (res.ok) {
    const { shareLink } = await res.json();
    document.getElementById('shareLink').value = shareLink;
    openModal();
  }
}

async function deleteShareLink(memoId) {
  if (!confirm('共有を停止しますか？共有リンクが無効化されます。')) {
    return;
  }
  const res = await fetch(`/memo/share/${memoId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (res.ok) {
    location.reload();
  }
}
