import { useState } from "react";
import { items, type Item } from "../data/AccordionItems";

type AccordionItemProps = {
  items: Item[];
};

function AccordionItem({ items }: AccordionItemProps) {
  const [openIds, setOpenIds] = useState(new Set());

  const handleToggle = (id: number) => {
    const newOpenIds = new Set(openIds);

    newOpenIds.has(id) ? newOpenIds.delete(id) : newOpenIds.add(id);
    setOpenIds(newOpenIds);
  };

  if (items.length === 0) {
    return <div className="accordion"> No items available</div>;
  }

  return (
    <div className="accordion">
      {items.map((item) => (
        <div key={item.id} className="accordion-item">
          <button
            className="accordion-title"
            onClick={() => handleToggle(item.id)}
          >
            {item.title}
            <span
              className={`accordion-icon ${
                openIds.has(item.id) && "accordion-icon--rotated"
              }`}
            />
          </button>
          {openIds.has(item.id) && (
            <div className="accordion-content">{item.content}</div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function Accordion() {
  return <AccordionItem items={items} />;
}
