async function deleteCompletelyMemo(memoId) {
  if (!confirm('完全に削除します。本当に削除しますか？')) {
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
