import { useState, useEffect } from 'react';
/**
 * 拖拽元素
 * @param {*} el 目标元素
 * @returns x,y偏移量 pageX,pageY 元素左上角位置
 */
function useDraggable(el) {
  const [{ dx, dy }, setOffset] = useState({ dx: 0, dy: 0 });
  const [{ pageX, pageY }, setPageOffset] = useState({
    pageX: 0,
    pageY: 0,
  });
  useEffect(() => {
    const { top, left } = el.current.getBoundingClientRect();
    setPageOffset({ pageX: top, pageY: left });
    const handleMouseDown = event => {
      const startX = event.pageX - dx;
      const startY = event.pageY - dy;
      const handleMouseMove = e => {
        const newDx = e.pageX - startX;
        const newDy = e.pageY - startY;
        setOffset({ dx: newDx, dy: newDy });
      };
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener(
        'mouseup',
        () => {
          document.removeEventListener('mousemove', handleMouseMove);
        },
        { once: true },
      );
    };
    el.current.addEventListener('mousedown', handleMouseDown);
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      el.current.removeEventListener('mousedown', handleMouseDown);
    };
  }, [dx, dy, el]);

  useEffect(() => {
    // eslint-disable-next-line no-param-reassign
    el.current.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
  }, [dx, dy, el]);

  return { x: dx, y: dy, pageX, pageY };
}

export default useDraggable;
