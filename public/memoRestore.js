async function restoreMemo(memoId) {
  if (!confirm(window.__I18N__['confirm.restore'])) {
    return;
  }
  const res = await fetch(`restore/${memoId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (res.ok) {
    location.reload();
  }
}
