import scrollIntoView from 'compute-scroll-into-view';

export function scrollNodeIntoView(node, boundaryNode) {
  if (!node || !boundaryNode) {
    return;
  }
  scrollIntoView(node, {
    boundary: boundaryNode,
    block: 'nearest',
    scrollMode: 'if-needed'
  }).forEach(({ el, top, left }) => {
    el.scrollTop = top;
    el.scrollLeft = left;
  });
}
