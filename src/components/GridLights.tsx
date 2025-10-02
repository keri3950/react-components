import { useState } from "react";

const config = [
  [1, 1, 1],
  [1, 0, 1],
  [1, 1, 1],
];

type CellProps = {
  filled: boolean;
  handleButtonClick: () => void;
  isDisabled: boolean;
  label?: string;
};

function Cell({ filled, handleButtonClick, isDisabled, label }: CellProps) {
  return (
    <button
      aria-label={label}
      disabled={isDisabled}
      className={filled ? "cell cell--active" : "cell"}
      onClick={handleButtonClick}
    />
  );
}

export default function GridLights() {
  const [order, setOrder] = useState<number[]>([]);
  const [isDeactivating, setIsDeactivating] = useState(false);

  const deactivateCell = () => {
    setIsDeactivating(true);

    const timer = setInterval(() => {
      setOrder((prevOrder) => {
        const newOrder = structuredClone(prevOrder);
        newOrder.pop();

        if (newOrder.length === 0) {
          clearInterval(timer);
          setIsDeactivating(false);
        }

        return newOrder;
      });
    }, 300);
  };

  const activateCells = (index: number) => {
    const newOrder = [...order, index];

    setOrder(newOrder);

    if (newOrder.length === config.flat(1).filter(Boolean).length) {
      deactivateCell();
    }
  };

  return (
    <div className="wrapper">
      <div
        className="grid"
        style={{ gridTemplateColumns: `repeat(${config[0].length}, 1fr)` }}
      >
        {config.flat(1).map((cell, index) => {
          return cell ? (
            <Cell
              key={index}
              label={`Cell-${index}`}
              filled={order.includes(index)}
              handleButtonClick={() => activateCells(index)}
              isDisabled={order.includes(index) || isDeactivating}
            />
          ) : (
            <span />
          );
        })}
      </div>
    </div>
  );
}
