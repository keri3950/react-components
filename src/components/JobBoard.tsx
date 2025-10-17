import { useState, useEffect } from "react";

const ITEMS_PER_PAGE = 6;
const API_ENDPOINT = "https://hacker-news.firebaseio.com/v0";

type Item = {
  by: string;
  id: number;
  score: number;
  time: number;
  title: string;
  type: string;
  url?: string;
};

type JobPostingProps = {
  url?: string;
  title: string;
  by: string;
  time: number;
};

function JobPosting({ url, title, by, time }: JobPostingProps) {
  const formattedTime = new Date(time).toLocaleString();

  return (
    <div className="job-post" role="listitem">
      <h2 className="job-post__title">
        <a
          className={url ? "" : "inactiveLink"}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {title}
        </a>
      </h2>
      <span className="job-post__metadata">
        By {by} · {formattedTime}
      </span>
    </div>
  );
}
export default function JobBoard() {
  const [items, setItems] = useState<Item[]>([]);
  const [itemIds, setItemIds] = useState<number[]>([]);
  const [loadingMoreItems, setLoadingMoreItems] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchItems = async (currPage: number) => {
    setCurrentPage(currPage);
    setLoadingMoreItems(true);

    let itemsList = itemIds;
    if (itemsList.length === 0) {
      const response = await fetch(`${API_ENDPOINT}/jobstories.json`);
      itemsList = await response.json();
      setItemIds(itemsList);
    }

    const itemIdsForPage = itemsList.slice(
      currPage * ITEMS_PER_PAGE,
      currPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );

    const itemsForPage = await Promise.all(
      itemIdsForPage.map((itemId) =>
        fetch(`${API_ENDPOINT}/item/${itemId}.json`).then((res) => res.json())
      )
    );

    setItems((prevItems) => [...prevItems, ...itemsForPage]);

    setLoadingMoreItems(false);
  };

  useEffect(() => {
    if (currentPage === 0) fetchItems(currentPage);
  }, [currentPage]);

  return (
    <div className="job-board">
      <h2 className="job-title">Hacker News Jobs Board</h2>
      {itemIds.length === 0 || items.length < 1 ? (
        <p className="jobs-loading">Loading...</p>
      ) : (
        <div>
          <div className="job-items" role="list">
            {items.map((item) => (
              <JobPosting key={item.id} {...item} />
            ))}
          </div>
          {items.length < itemIds.length && (
            <button
              className="load-more-button"
              disabled={loadingMoreItems}
              onClick={() => fetchItems(currentPage + 1)}
            >
              {loadingMoreItems ? "Loading..." : "Load more jobs"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
