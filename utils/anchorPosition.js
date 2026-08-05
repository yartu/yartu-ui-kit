export const followAnchor = (recalculate) => {
  let frame = null;

  const handler = () => {
    if (frame !== null) return;
    frame = window.requestAnimationFrame(() => {
      frame = null;
      recalculate();
    });
  };

  window.addEventListener('scroll', handler, { capture: true, passive: true });
  window.addEventListener('resize', handler);

  return () => {
    if (frame !== null) {
      window.cancelAnimationFrame(frame);
      frame = null;
    }
    window.removeEventListener('scroll', handler, { capture: true });
    window.removeEventListener('resize', handler);
  };
};

export default followAnchor;
