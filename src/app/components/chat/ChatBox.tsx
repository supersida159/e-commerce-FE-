'use client';
import { getProducts, ReqListProduct } from '@/app/actions/getProducts';
import { ResListData } from '@/lib/type/product';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CiSquareChevDown } from 'react-icons/ci';
import { MdChatBubble } from 'react-icons/md';

const ChatBox: React.FC<{ messages: string[] }> = ({ messages }) => {
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const reqData: ReqListProduct = {
    brand: 'apple'
  };
  const handleGetProducts = useCallback(async () => {
    const response = (await getProducts(reqData)) as ResListData;
    console.log(response.data);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (chatBoxRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = chatBoxRef.current;

        // Check if the user is at the bottom of the chat box
        setIsAtBottom(scrollTop + clientHeight === scrollHeight);
      }
    };

    // Attach the scroll event listener
    window.addEventListener('scroll', handleScroll);

    return () => {
      // Remove the scroll event listener when the component is unmounted
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Scroll to the bottom when messages change and the user is already at the bottom
    if (chatBoxRef.current && isAtBottom) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages, isAtBottom]);

  return (
    <div
      ref={chatBoxRef}
      className={`${
        isAtBottom ? 'fixed bottom-4 right-4 translate-y-0 transform' : ''
      } z-40 max-h-96 overflow-y-auto border-none bg-transparent p-4`}
    >
      {isChatOpen ? (
        <div className="relative flex w-72 flex-col">
          <div className="absolute right-[5px] top-[5px]">
            <CiSquareChevDown
              size={30}
              className="bg-transparent text-slate-900"
              onClick={() => setIsChatOpen(false)}
            />
          </div>
          <div className="h-[40px] w-full bg-blue-400">chat</div>
          <div
            className="h-[300px] w-full bg-white"
            onClick={handleGetProducts}
          >
            messages
          </div>
        </div>
      ) : (
        <MdChatBubble
          size={60}
          className="text-3xl"
          onClick={() => setIsChatOpen(true)}
        />
      )}
    </div>
  );
};

export default ChatBox;
