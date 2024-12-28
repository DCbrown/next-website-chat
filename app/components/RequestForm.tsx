import React, { useState } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { SiteContent } from "../types/SiteContent";
import { processHtmlContent } from "../utils/processHtmlContent";

type Props = {
  setSiteContent: React.Dispatch<React.SetStateAction<SiteContent>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
};

const RequestForm: React.FC<Props> = ({
  setSiteContent,
  setIsLoading,
  isLoading,
}) => {
  const [siteUrl, setSiteUrl] = useState("");
  const [error, setError] = useState("");
  const { user } = useUser();
  const { openSignUp } = useClerk();

  const scrapeSite = async (url: string) => {
    const response = await fetch(`/api/scrapper`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });
    const responseData = await response.json();
    const textContent = processHtmlContent(responseData.textContent);
    setSiteContent({ content: textContent, url });
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user) {
      openSignUp();
      return;
    }

    if (!siteUrl.trim()) {
      setError("Please enter a website URL");
      return;
    }

    try {
      new URL(siteUrl);
    } catch {
      setError("Please enter a valid URL");
      return;
    }

    setError("");
    setIsLoading(true);
    setSiteContent({ url: "", content: "" });

    try {
      await scrapeSite(siteUrl);
    } catch (error) {
      setError("There was an error reading the site. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      {!isLoading && (
        <>
          <div className="input-group">
            <input
              className="input-style"
              name="url-input"
              type="url"
              placeholder="Enter the url here"
              value={siteUrl}
              onChange={(e) => setSiteUrl(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button className="main-btn" type="submit">
            Submit
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
      {isLoading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      )}
    </form>
  );
};

export default RequestForm;
