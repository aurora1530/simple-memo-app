async function deleteMemo(memoId) {
  if (!confirm('本当に削除しますか？')) {
    return;
  }
  const res = await fetch(`memo/delete/${memoId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (res.ok) {
    location.reload();
  }
}
