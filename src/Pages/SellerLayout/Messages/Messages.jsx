import React, { useState } from "react";
import styles from "./Messages.module.css";
import { AiOutlineSearch, AiOutlineFilter, AiOutlinePaperClip } from "react-icons/ai";
import { FiMic, FiCamera } from "react-icons/fi";

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState("amaka");

  return (
    <div className={styles.messagesLayout}>
      {/* Left Pane: Conversations List */}
      <div className={styles.sidebarPane}>
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
          <div 
            className={`${styles.conversationItem} ${selectedChat === 'amaka' ? styles.conversationActive : ''}`} 
            onClick={() => setSelectedChat("amaka")}
          >
            <div className={styles.avatarWrapper}>
              <div 
                className={styles.avatarCircle} 
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1531123897727-8f129e1eb70f?auto=format&fit=crop&q=80&w=200')` }}
              ></div>
              <div className={styles.onlineDot}></div>
            </div>
            <div className={styles.conversationContent}>
              <div className={styles.convoTop}>
                <h4 className={styles.convoName}>Amaka Martins</h4>
                <span className={styles.convoTime}>10:20 AM</span>
              </div>
              <p className={styles.convoPreview}>“Good Morning ...”</p>
            </div>
          </div>

          {/* Inactive Items */}
          <div className={styles.conversationItem} onClick={() => setSelectedChat("eco2")}>
            <div className={styles.avatarWrapper}>
              <div className={styles.avatarPlaceholder}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={styles.avatarIcon}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </div>
            </div>
            <div className={styles.conversationContent}>
              <div className={styles.convoTop}>
                <h4 className={styles.convoName}>EcoLogistics</h4>
                <span className={styles.convoTime}>Wednesday</span>
              </div>
              <p className={styles.convoPreviewFaded}>“Offer Sent”</p>
            </div>
          </div>

          <div className={styles.conversationItem} onClick={() => setSelectedChat("eco3")}>
            <div className={styles.avatarWrapper}>
              <div className={styles.avatarPlaceholder}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={styles.avatarIcon}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </div>
            </div>
            <div className={styles.conversationContent}>
              <div className={styles.convoTop}>
                <h4 className={styles.convoName}>EcoLogistics</h4>
                <span className={styles.convoTime}>Wednesday</span>
              </div>
              <p className={styles.convoPreviewFaded}>“Offer Sent”</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Pane: Active Chat Area */}
      <div className={styles.chatPane}>
        {selectedChat === "amaka" ? (
          <div className={styles.activeChatWrapper}>
            <div className={styles.chatPartnerHeader}>
              <h3>Amaka Martins</h3>
              <span className={styles.statusOnlineText}>Online</span>
            </div>

            <div className={styles.chatAreaScroll}>
              <div className={styles.dateSeparator}>
                <span>22nd Feb, 2026</span>
              </div>

              <div className={styles.messageRowLeft}>
                <div className={styles.messageBubbleLeft}>
                  <p>
                    Good Morning.<br />
                    I am interested in the 5kg of scrap aluminum.<br />
                    Can you confirm the exact purity level?
                  </p>
                </div>
                <span className={styles.timestampLeft}>10:20 AM</span>
              </div>

              <div className={styles.messageRowRight}>
                <div className={styles.messageBubbleRight}>
                  <p>
                    Certainly. I have a recent lab report. The batch is certified at 98.4%. I'll attach the document here for you to review
                  </p>
                </div>
              </div>

              <div className={styles.messageRowRight}>
                <div className={styles.messageAttachmentRight}>
                  <div className={styles.attachmentBox}>
                    <div className={styles.attachmentIconWrapper}>
                      <AiOutlinePaperClip size={20} color="#9CA3AF" />
                    </div>
                    <div className={styles.attachmentDetails}>
                      <span className={styles.attachmentName}>AI Purity Analysis.docs</span>
                      <span className={styles.attachmentSize}>1.4MB</span>
                    </div>
                  </div>
                </div>
                <span className={styles.timestampRight}>10:30AM</span>
              </div>

              <div className={styles.messageRowLeft}>
                <div className={styles.typingIndicator}>
                  <span>...</span>
                </div>
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
        ) : (
          <div className={styles.emptyChatState}>
            <p>Select a conversation to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
