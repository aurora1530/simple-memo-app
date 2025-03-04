/**
 * cf. https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/length
 */
export const getGraphemeCount = (s: string) => {
  const segmenter = new Intl.Segmenter('ja-JP', { granularity: 'grapheme' });
  return [...segmenter.segment(s)].length;
};
