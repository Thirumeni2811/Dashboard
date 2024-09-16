import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  orderBy,
  query,
  addDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { FadeLoader } from "react-spinners";

const Replies = () => {
  const [replies, setReplies] = useState([]);
  const [keywordQueue, setKeywordQueue] = useState([]);
  const [existingContent, setExistingContent] = useState({});

  const fetchKeywords = async () => {
    try {
      const q = query(collection(db, "Keyword"), orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
      const keywordsList = querySnapshot.docs.map((doc) => doc.data().Keywords);

      // Add new keywords to the queue if they are not already present
      setKeywordQueue((prevQueue) => {
        const newQueue = [...prevQueue];
        const existingKeywords = new Set(prevQueue);
        keywordsList.forEach((keyword) => {
          if (!existingKeywords.has(keyword)) {
            newQueue.push(keyword);
          }
        });
        return newQueue;
      });
    } catch (error) {
      console.error("Error fetching keywords: ", error);
    }
  };

  const fetchExistingContent = async () => {
    try {
      const q = query(collection(db, "Content"));
      const querySnapshot = await getDocs(q);
      const contentMap = {};
      querySnapshot.docs.forEach((doc) => {
        const data = doc.data();
        contentMap[data.keyword] = data.message;
      });
      setExistingContent(contentMap);
    } catch (error) {
      console.error("Error fetching existing content: ", error);
    }
  };

  const saveContentToFirestore = async (keyword, message) => {
    try {
      await addDoc(collection(db, "Content"), {
        keyword: keyword,
        message: message,
        timestamp: new Date(),
      });
    } catch (error) {
      console.error("Error saving content to Firestore: ", error);
    }
  };

  const formatReplyMessage = (message) => {
    // Remove unwanted newlines or extra spaces
    return message.replace(/\n+/g, '\n').trim();
  };

  const processQueue = async () => {
    if (keywordQueue.length === 0) return; // No more keywords to process

    const keyword = keywordQueue[0]; // Get the first keyword in the queue
    try {
      if (existingContent[keyword]) {
        // Use existing content
        setReplies(prevReplies => [
          ...prevReplies,
          { keyword, message: existingContent[keyword] }
        ]);
        // Remove the processed keyword from the queue
        setKeywordQueue(prevQueue => prevQueue.slice(1));
      } else {
        // Generate new content
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
          model: 'gpt-3.5-turbo',
          messages: [{
            role: 'system',
            content: `Generate an auto-reply message for an anonymous user. Use the keyword ${keyword} provided by the user to craft a message that includes the URL <a href="https://itboomi.com/" style="color: #d63384; font-size: semibold">IT Boomi Innovation</a>. The response should be engaging and informative, with Hashtags and emojis and limited to 3 lines.`
          }],
          max_tokens: 150
        }, {
          headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
          }
        });

        // Extract and format the reply message
        const replyMessage = response.data.choices[0].message.content;
        setReplies(prevReplies => [
          ...prevReplies,
          { keyword, message: replyMessage }
        ]);

        // Save the keyword and message to Firestore
        await saveContentToFirestore(keyword, replyMessage);

        // Remove the processed keyword from the queue
        setKeywordQueue(prevQueue => prevQueue.slice(1));
      }
    } catch (error) {
      console.error("Error generating reply: ", error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    fetchKeywords();
    fetchExistingContent();
  }, []);

  useEffect(() => {
    if (keywordQueue.length > 0) {
      processQueue();
    }
  }, [keywordQueue]);

  return (
    <>
      <section className="m-3">
        <div>
          <h1 className="font-extrabold mb-2 text-4xl">Replies</h1>
          {replies.length > 0 ? (
            <div className="grid lg:grid-cols-2 gap-4">
              {replies.map((reply, index) => (
                <div
                  key={index}
                  className="mb-4 p-4 border border-gray-200 rounded"
                >
                  <h2 className="font-bold text-xl">
                    Keyword: {reply.keyword}
                  </h2>
                  <div className='mt-2' dangerouslySetInnerHTML={{ __html: reply.message }}></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center mt-32">
              <FadeLoader />
            </div>

          )}
        </div>
      </section>
    </>
  );
};

export default Replies;
