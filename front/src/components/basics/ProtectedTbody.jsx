import { useRef, useEffect } from "react";

function ProtectedTbody({ children, ...props }) {
  const tbodyRef = useRef(null);

  useEffect(() => {
    const tbody = tbodyRef.current;
    if (!tbody) return;

    let observer;

    const timer = setTimeout(() => {
      const knownRows = new Set();
      Array.from(tbody.childNodes).forEach((node) => knownRows.add(node));

      const knownCells = new Map();
      knownRows.forEach((row) => {
        if (row.nodeType === Node.ELEMENT_NODE) {
          const cells = new Set();
          Array.from(row.childNodes).forEach((cell) => cells.add(cell));
          knownCells.set(row, cells);
        }
      });

      observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === "childList") {
            mutation.addedNodes.forEach((node) => {
              if (node.nodeType !== Node.ELEMENT_NODE) return;

              if (mutation.target === tbody && !knownRows.has(node)) {
                node.remove();
                return;
              }

              const parentCells = knownCells.get(mutation.target);
              if (parentCells && !parentCells.has(node)) {
                node.remove();
              }
            });
          }
        });
      });

      observer.observe(tbody, { childList: true, subtree: true });
    }, 0);

    return () => {
      clearTimeout(timer);
      if (observer) observer.disconnect();
    };
  }, [children]);

  return (
    <tbody ref={tbodyRef} {...props}>
      {children}
    </tbody>
  );
}

export default ProtectedTbody;
