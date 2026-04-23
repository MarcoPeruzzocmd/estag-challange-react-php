import { useRef, useEffect } from "react";


function ProtectedInput({ type, ...props }) {
  const inputRef = useRef(null);

  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "type" && input.type !== type) {
          input.type = type;
          input.value = "";
        }
      });
    });

    observer.observe(input, { attributes: true });

    return () => observer.disconnect();
  }, [type]);

  return <input ref={inputRef} type={type} {...props} />;
}

export default ProtectedInput;
