import React, { useState } from "react";
import styles from "./Messages.module.css";
import { AiOutlineSearch, AiOutlineFilter, AiOutlinePaperClip } from "react-icons/ai";
import { FiMic, FiCamera } from "react-icons/fi";

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  // If a chat is selected, show the Conversation View
  if (selectedChat) {
    return (
      <div className={styles.messagesContainer}>
        <header className={styles.chatHeader}>
          <h2>Messages</h2>
          <button className={styles.goBackButton} onClick={() => setSelectedChat(null)}>Go Back</button>
        </header>

        <div className={styles.chatArea}>
          <div className={styles.chatPartner}>
            <h3>Sarah Jekins</h3>
            <span className={styles.statusOnline}>Online</span>
          </div>

          <div className={styles.dateSeparator}>
            <span>22nd Feb, 2026</span>
          </div>

          <div className={styles.messageBubbleLeft}>
            <p>
              Good Morning.<br />
              I am interested in the 5kg of scrap aluminum.<br />
              Can you confirm the exact purity level?
            </p>
            <span className={styles.timestamp}>10:20 AM</span>
          </div>

          <div className={styles.messageBubbleRight}>
            <p>
              Certainly. I have a recent lab report. The batch is certified at 98.4%. I'll attach the document here for you to review
            </p>
          </div>

          <div className={styles.messageAttachmentRight}>
            <div className={styles.attachmentBox}>
              <div className={styles.attachmentIcon}>📄</div>
              <div className={styles.attachmentDetails}>
                <span className={styles.attachmentName}>Al Purity Analysis.docs</span>
                <span className={styles.attachmentSize}>1.4MB</span>
              </div>
            </div>
            <span className={styles.timestamp}>10:30AM</span>
          </div>

          <div className={styles.typingIndicator}>
            <span>...</span>
          </div>
        </div>

        <div className={styles.messageInputArea}>
          <button className={styles.addMediaBtn}>+</button>
          <div className={styles.inputWrapper}>
            <input type="text" placeholder="Type a message" className={styles.textInput} />
            <div className={styles.inputIcons}>
              <AiOutlinePaperClip size={20} color="#9CA3AF" />
              <FiMic size={20} color="#9CA3AF" />
              <FiCamera size={20} color="#9CA3AF" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Otherwise, show the List View (Before opening)
  return (
    <div className={styles.messagesListContainer}>
      <header className={styles.chatHeader}>
        <h2>Messages</h2>
      </header>

      <div className={styles.searchBarForm}>
        <div className={styles.searchInputWrapper}>
          <AiOutlineSearch size={20} color="#9CA3AF" />
          <input type="text" placeholder="Search..." className={styles.sidebarSearchInput} />
        </div>
        <button className={styles.filterBtn}>
          <AiOutlineFilter size={20} color="#6B7280" />
        </button>
      </div>

      <div className={styles.conversationsList}>
        {/* Active Item */}
        <div className={`${styles.conversationItem} ${styles.conversationActive}`} onClick={() => setSelectedChat("sarah1")}>
          <div className={styles.avatarWrapper}>
            <div 
              className={styles.avatarCircle} 
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1531123897727-8f129e1eb70f?auto=format&fit=crop&q=80&w=200')` }}
            ></div>
            <div className={styles.onlineDot}></div>
          </div>
          <div className={styles.conversationContent}>
            <div className={styles.convoTop}>
              <h4 className={styles.convoName}>Sarah Jekins</h4>
              <span className={styles.convoTime}>10:20 AM</span>
            </div>
            <p className={styles.convoPreview}>“Certainly, I have ...”</p>
          </div>
        </div>

        {/* Inactive Items */}
        <div className={styles.conversationItem} onClick={() => setSelectedChat("sarah2")}>
          <div className={styles.avatarWrapper}>
            <div 
              className={styles.avatarCircle} 
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200')` }}
            ></div>
            <div className={styles.onlineDot}></div>
          </div>
          <div className={styles.conversationContent}>
            <div className={styles.convoTop}>
              <h4 className={styles.convoName}>Sarah Jekins</h4>
              <span className={styles.convoTime}>10:20 AM</span>
            </div>
            <p className={styles.convoPreview}>“Certainly, I have ...”</p>
          </div>
        </div>

        <div className={styles.conversationItem} onClick={() => setSelectedChat("sarah3")}>
          <div className={styles.avatarWrapper}>
            <div 
              className={styles.avatarCircle} 
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200')` }}
            ></div>
            <div className={styles.onlineDot}></div>
          </div>
          <div className={styles.conversationContent}>
            <div className={styles.convoTop}>
              <h4 className={styles.convoName}>Sarah Jekins</h4>
              <span className={styles.convoTime}>10:20 AM</span>
            </div>
            <p className={styles.convoPreview}>“Certainly, I have ...”</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
