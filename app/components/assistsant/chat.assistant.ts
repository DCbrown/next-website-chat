import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";
import { SiteContent } from "../../types/SiteContent";

export const createChatAssistant = (
  siteContent: SiteContent
): CreateAssistantDTO => ({
  name: "Site Reader",
  model: {
    provider: "openai",
    model: "gpt-3.5-turbo",
    temperature: 0.7,
    messages: [
      {
        role: "system",
        content: `ROLE: You are an assistant who allows users to chat with the content of a site.
        ------
        OBJECTIVE: The user gave you the text from a site. Your role is to answer to the user questions about the site based on the data given.
        ------
        SITE DATA:\n\n ${siteContent.content}
        ------
        OUTPUT FORMAT: Reply to the user questions in a concise way.`,
      },
    ],
  },
  voice: {
    provider: "11labs",
    voiceId: "lffvMuaDQVN69szL6sFm",
  },
  firstMessage: `Thank you for providing the website, I'm ready to answer your questions, what would you like to know?`,
});
