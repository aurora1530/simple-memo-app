async function restoreMemo(memoId) {
  if (!confirm('本当に復元しますか？')) {
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
