async function deleteCompletelyMemo(memoId) {
  if (!confirm(window.__I18N__['confirm.deleteCompletely'])) {
    return;
  }
  const res = await fetch(`/memo/deleteCompletely/${memoId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (res.ok) {
    location.reload();
  }
}
