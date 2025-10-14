import { useState } from "react";
import { tabItems, type TabItem } from "../data/tabItems";

type TabComponentProps = {
  defaultValue?: string;
  items: TabItem[];
};

function TabComponent({ defaultValue, items }: TabComponentProps) {
  const [activeTab, setActiveTab] = useState(
    defaultValue ? defaultValue : items[0].value
  );

  return (
    <div className="tabs">
      <div className="tabs-list">
        {items.map((tab) => (
          <button
            key={tab.value}
            className={[
              "tabs-list-item",
              tab.value === activeTab && "tabs-list-item--active",
            ]
              .filter(Boolean)
              .join(" ")}
            onClick={() => setActiveTab(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>
        {items.map((tab) => (
          <div key={tab.value}>{tab.value === activeTab && tab.panel}</div>
        ))}
      </div>
    </div>
  );
}
export default function Tabs() {
  return (
    <div className="tabs-wrapper">
      <TabComponent items={tabItems} />
    </div>
  );
}
