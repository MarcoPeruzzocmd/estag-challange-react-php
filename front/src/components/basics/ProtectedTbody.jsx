import { useRef, useEffect } from "react";


function ProtectedTbody({ children, ...props }) {
  const tbodyRef = useRef(null);

  useEffect(() => {
    const tbody = tbodyRef.current;
    if (!tbody) return;

    let observer;

    const timer = setTimeout(() => {
      const knownNodes = new Set();
      Array.from(tbody.childNodes).forEach((node) => knownNodes.add(node));

      observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === "childList") {
            mutation.addedNodes.forEach((node) => {
              if (
                node.nodeType === Node.ELEMENT_NODE &&
                !knownNodes.has(node)
              ) {
                node.remove();
              }
            });
          }
        });
      });

      observer.observe(tbody, { childList: true });
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
