import { useRef, useEffect } from "react";

/**
 * Select protegido contra manipulação via DevTools.
 *
 * Usa MutationObserver para detectar inserção de novos <option>
 * diretamente no DOM. Ignora a renderização do React usando
 * setTimeout para ativar a proteção após o mount.
 *

 */
function ProtectedSelect({ children, ...props }) {
  const selectRef = useRef(null);

  useEffect(() => {
    const select = selectRef.current;
    if (!select) return;

    let observer;

    const timer = setTimeout(() => {
      const knownNodes = new Set();
      Array.from(select.childNodes).forEach((node) => knownNodes.add(node));

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

      observer.observe(select, { childList: true });
    }, 0);

    return () => {
      clearTimeout(timer);
      if (observer) observer.disconnect();
    };
  }, [children]);

  return (
    <select ref={selectRef} {...props}>
      {children}
    </select>
  );
}

export default ProtectedSelect;
