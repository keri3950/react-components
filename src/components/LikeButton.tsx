import { useState } from "react";
import { HeartIcon, SpinnerIcon } from "../icons";

export default function LikeButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [liked, setLiked] = useState(false);
  const [error, setError] = useState(null);

  const handleButtonClick = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const action = liked ? "unlike" : "like";

      const response = await fetch(
        "https://questions.greatfrontend.com/api/questions/like-button",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ action }),
        }
      );

      if (!response.ok) {
        const result = await response.json();
        setError(result.message);
        return;
      }

      setLiked(!liked);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        disabled={isLoading}
        className={`button-wrapper ${
          liked ? "button-wrapper--liked" : "button-wrapper--default"
        }`}
        onClick={handleButtonClick}
      >
        {isLoading ? <SpinnerIcon /> : <HeartIcon />}{" "}
        <span className="title">{liked ? "liked" : "like"}</span>
      </button>
      {error && <p className="error-message">{error} </p>}
    </div>
  );
}
