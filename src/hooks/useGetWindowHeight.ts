import { useEffect, useRef, useState } from "react";

export const useGetWindowHeight = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    // Функция для обновления высоты контейнера
    const updateHeight = () => {
      if (containerRef.current) {
        console.log("Container height:", containerRef.current.clientHeight); // Добавляем лог
        setContainerHeight(containerRef.current.clientHeight);
      }
    };

    // Инициализация ResizeObserver
    const observer = new ResizeObserver(() => {
      updateHeight();
    });

    // Начальная установка высоты после первого рендера
    if (containerRef.current) {
      updateHeight();
    }

    // Наблюдаем за контейнером
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Очистка observer при размонтировании компонента
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []); // Пустой массив зависимостей, чтобы эффект сработал только один раз

  return { containerRef, containerHeight };
};
