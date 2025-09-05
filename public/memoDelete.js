async function deleteMemo(memoId) {
  if (!confirm(window.__I18N__['confirm.delete'])) {
    return;
  }
  const res = await fetch(`/memo/delete/${memoId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (res.ok) {
    location.reload();
  }
}
