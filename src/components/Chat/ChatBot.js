import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  IoChatbubblesSharp,
  IoClose,
  IoChevronForward,
  IoArrowBack,
  IoHomeOutline,
} from "react-icons/io5";
import ReactMarkdown from "react-markdown";
import "./ChatBot.css";

import {
  getKnowledgeBase,
  getWelcomeMessage,
  getChatbotHeaderTitle,
  getChatbotFooterText,
} from "./chatbotData";
const ChatBot = () => {
  const { pathname } = useLocation();
  const { auth } = useAuth();
  const [loginView, setLoginView] = useState(() => window.__loginView || 0);

  const typeLogin = auth?.typeLogin ? Number(auth.typeLogin) : 2;
  const knowledgeBase = getKnowledgeBase(typeLogin);
  const welcomeText = getWelcomeMessage(typeLogin);

  useEffect(() => {
    const handleLoginViewChange = (e) => {
      setLoginView(e.detail);
    };
    window.addEventListener("loginViewChange", handleLoginViewChange);
    return () => {
      window.removeEventListener("loginViewChange", handleLoginViewChange);
    };
  }, []);

  const windowRef = useRef(null);
  const buttonRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => [
    {
      role: "assistant",
      content: getWelcomeMessage(auth?.typeLogin ? Number(auth.typeLogin) : 2),
      isMenu: true,
    },
  ]);
  const [view, setView] = useState("main"); // 'main', 'topic'
  const [activeTopic, setActiveTopic] = useState(null);
  const [selectedSections, setSelectedSections] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setMessages([
      {
        role: "assistant",
        content: getWelcomeMessage(typeLogin),
        isMenu: true,
      },
    ]);
    setView("main");
    setActiveTopic(null);
    setSelectedSections([]);
  }, [typeLogin]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isModalMode = window.matchMedia(
        "(max-width: 576px)",
      ).matches;
      if (
        isOpen &&
        isModalMode &&
        windowRef.current &&
        !windowRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const isLoggedIn = auth && !auth.detail;
  const shouldShow = isLoggedIn && pathname.startsWith("/admin");

  if (!shouldShow) {
    return null;
  }

  const handleTopicSelect = (topicKey) => {
    const topic = knowledgeBase[topicKey];
    setActiveTopic(topicKey);

    const firstSectionId = "def";
    const hasDefinition = topic.sections.some((s) => s.id === firstSectionId);
    const initialSelected = hasDefinition ? [firstSectionId] : [];
    setSelectedSections(initialSelected);

    const firstSection = topic.sections.find((s) => s.id === firstSectionId);
    const definitionContent = hasDefinition
      ? `### ${firstSection.title}\n\n${firstSection.content}`
      : topic.description;

    const remainingSections = topic.sections
      .filter((s) => !initialSelected.includes(s.id))
      .map((s) => s.id);

    const newBotMessage = {
      role: "assistant",
      content: `Has seleccionado **${topic.title}**.\n\n${definitionContent}\n\n¿Qué más te gustaría saber?`,
      topicKey: topicKey,
      isTopicMenu: remainingSections.length > 0,
      availableSections: remainingSections,
      isSectionDetail: true,
    };

    setMessages((prev) => [
      ...prev,
      { role: "user", content: topic.title },
      newBotMessage,
    ]);
    setView("topic");
  };

  const handleSectionSelect = (section) => {
    const topic = knowledgeBase[activeTopic];
    const newSelected = [...selectedSections, section.id];
    setSelectedSections(newSelected);

    const remainingSections = topic.sections
      .filter((s) => !newSelected.includes(s.id))
      .map((s) => s.id);

    const newBotMessage = {
      role: "assistant",
      content: `### ${section.title}\n\n${section.content}`,
      isTopicMenu: remainingSections.length > 0,
      topicKey: activeTopic,
      availableSections: remainingSections,
      isSectionDetail: true,
    };

    setMessages((prev) => [
      ...prev,
      { role: "user", content: section.label },
      newBotMessage,
    ]);
  };

  const handleBack = () => {
    if (view === "topic") {
      resetToStart();
    }
  };

  const resetToStart = () => {
    setView("main");
    setActiveTopic(null);
    setSelectedSections([]);
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content:
          "¡Claro! Volvamos al inicio. ¿En qué otra categoría te gustaría profundizar? ✨",
        isMenu: true,
      },
    ]);
  };

  return (
    <div className="chatbot-container">
      <button
        ref={buttonRef}
        className={`chatbot-button ${isOpen ? "open" : ""}`}
        onClick={() => {
          if (isOpen) {
            setMessages([
              {
                role: "assistant",
                content: welcomeText,
                isMenu: true,
              },
            ]);
            setView("main");
            setActiveTopic(null);
            setSelectedSections([]);
          }
          setIsOpen(!isOpen);
        }}
        aria-label="Abrir Chat de Apoyo">
        {isOpen ? <IoClose /> : <IoChatbubblesSharp />}
      </button>

      {isOpen && (
        <div ref={windowRef} className="chatbot-window">
          <div className="chatbot-header">
            <div className="header-icon-container">
              <IoChatbubblesSharp size={24} />
            </div>
            <div className="header-text">
              <h3>{getChatbotHeaderTitle(typeLogin)}</h3>
              <div className="status-indicator">
                <span className="status-dot"></span>
                <span>En línea para apoyarte</span>
              </div>
            </div>
            {view !== "main" && (
              <button
                className="back-button"
                onClick={handleBack}
                title="Regresar">
                <IoArrowBack />
              </button>
            )}
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message-wrapper ${msg.role}`}>
                <div className={`message ${msg.role}`}>
                  <div className="message-content">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>

                  {msg.isMenu && (
                    <div className="menu-options">
                      {Object.keys(knowledgeBase).map((key) => (
                        <button
                          key={key}
                          className="menu-option-btn"
                          onClick={() => handleTopicSelect(key)}>
                          <span>{knowledgeBase[key].title}</span>
                          <IoChevronForward />
                        </button>
                      ))}
                    </div>
                  )}

                  {msg.isTopicMenu && (
                    <div className="menu-options">
                      {knowledgeBase[msg.topicKey].sections
                        .filter((section) =>
                          msg.availableSections.includes(section.id),
                        )
                        .map((section) => (
                          <button
                            key={section.id}
                            className="menu-option-btn"
                            onClick={() => handleSectionSelect(section)}>
                            <span>{section.label}</span>
                            <IoChevronForward />
                          </button>
                        ))}
                      <button
                        className="menu-option-btn home-btn"
                        onClick={resetToStart}>
                        <span>Volver al inicio</span>
                        <IoHomeOutline />
                      </button>
                    </div>
                  )}

                  {msg.isSectionDetail && !msg.isTopicMenu && (
                    <div className="menu-options">
                      <button
                        className="menu-option-btn home-btn"
                        onClick={resetToStart}>
                        <span>Volver al inicio</span>
                        <IoHomeOutline />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-footer">
            <p>{getChatbotFooterText(typeLogin)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
