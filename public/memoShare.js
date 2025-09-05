async function createShareLink(memoId, alreadyShared = false) {
  const confirmed = alreadyShared || confirm(window.__I18N__['confirm.shareCreate']);
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
  if (!confirm(window.__I18N__['confirm.shareStop'])) {
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
