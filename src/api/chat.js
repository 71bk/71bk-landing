import http from "@/utils/http";

/**
 * Public Chat API Module
 */
export const sendChatMessage = async ({ query, locale }) => {
  return await http.post("/public/chat/messages", { query, locale });
};

export default {
  sendChatMessage,
};
