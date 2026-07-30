'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  ChatBubbleLeftRightIcon, 
  XMarkIcon, 
  PaperAirplaneIcon,
  SparklesIcon,
  UserIcon
} from '@heroicons/react/24/outline';

interface Message {
  sender: 'user' | 'bot';
  message: string;
  timestamp: Date;
}

interface QuickQuestion {
  _id: string;
  question: string;
  category: string;
}

const WHATSAPP_NUMBER = '+919876543210'; // Replace with your WhatsApp number

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([]);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadData, setLeadData] = useState({
    name: '',
    email: '',
    phone: '',
    projectRequirements: ''
  });
  const [quickQuestions, setQuickQuestions] = useState<QuickQuestion[]>([]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch quick questions on mount
  useEffect(() => {
    fetchQuickQuestions();
  }, []);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const fetchQuickQuestions = async () => {
    try {
      const response = await fetch('/api/chatbot', { method: 'GET' });
      if (!response.ok) {
        return;
      }
      const data = await response.json();
      if (data.success) {
        setQuickQuestions(data.questions.slice(0, 8));
      }
    } catch (error) {
      console.error('Error fetching quick questions:', error);
    }
  };

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim()) return;

    const userMessage: Message = {
      sender: 'user',
      message: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          message: messageText,
          source: 'homepage'
        })
      });

      if (!response.ok) {
        throw new Error('Chatbot service is currently unavailable');
      }
      const data = await response.json();

      if (data.success) {
        setSessionId(data.sessionId);
        
        const botMessage: Message = {
          sender: 'bot',
          message: data.response,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, botMessage]);
        
        if (data.suggestedQuestions) {
          setSuggestedQuestions(data.suggestedQuestions);
        }
      } else {
        throw new Error(data.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        sender: 'bot',
        message: 'Sorry, I encountered an error. Please try again or contact our team directly.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickQuestion = (question: string) => {
    sendMessage(question);
  };

  const handleSubmitLeadForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/chatbot/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          leadInfo: leadData
        })
      });

      if (!response.ok) {
        throw new Error('Chatbot service is currently unavailable');
      }
      const data = await response.json();

      if (data.success) {
        const botMessage: Message = {
          sender: 'bot',
          message: data.response,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
        setShowLeadForm(false);
        setLeadData({ name: '', email: '', phone: '', projectRequirements: '' });
      } else {
        throw new Error(data.error || 'Failed to submit lead');
      }
    } catch (error) {
      console.error('Error submitting lead:', error);
      alert('Failed to submit your information. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent('Hi! I am interested in your services.');
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-5 right-5 z-50 p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 ${
          isOpen 
            ? 'bg-red-500 hover:bg-red-600' 
            : 'bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-700 hover:to-indigo-700'
        }`}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <XMarkIcon className="w-5 h-5 text-white" />
        ) : (
          <div className="relative">
            <ChatBubbleLeftRightIcon className="w-5 h-5 text-white" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          </div>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-5 z-50 w-[340px] max-w-[calc(100vw-2.5rem)] h-[480px] max-h-[calc(100vh-7rem)] bg-white rounded-xl shadow-2xl flex flex-col animate-slide-up overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-600 to-indigo-600 px-3 py-2.5 text-white rounded-t-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <SparklesIcon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">SquareServer AI</h3>
                  <p className="text-[10px] text-teal-100">Online</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <button
                  onClick={openWhatsApp}
                  className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
                  title="WhatsApp"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
                  title="Close"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50">
            {messages.length === 0 && (
              <div className="text-center py-4">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <SparklesIcon className="w-6 h-6 text-teal-600" />
                </div>
                <h4 className="text-sm font-semibold text-gray-800 mb-1">
                  Welcome! 👋
                </h4>
                <p className="text-xs text-gray-600 mb-3">
                  Ask about our services
                </p>

                {/* Quick Questions Grid */}
                <div className="grid grid-cols-1 gap-1.5 mt-3">
                  {quickQuestions.slice(0, 4).map((q) => (
                    <button
                      key={q._id}
                      onClick={() => handleQuickQuestion(q.question)}
                      className="p-2 bg-white hover:bg-teal-50 rounded-lg text-xs text-left text-gray-700 hover:text-teal-600 transition-colors border border-gray-200 hover:border-teal-300"
                    >
                      {q.question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-xl px-3 py-1.5 ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-teal-600 to-indigo-600 text-white rounded-br-none'
                      : 'bg-white text-gray-800 rounded-bl-none shadow-sm border border-gray-100'
                  }`}
                >
                  <p className="text-xs leading-relaxed whitespace-pre-line">{msg.message}</p>
                  <span className={`text-[10px] mt-0.5 block ${
                    msg.sender === 'user' ? 'text-teal-100' : 'text-gray-400'
                  }`}>
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}

            {/* Suggested Questions */}
            {suggestedQuestions.length > 0 && !isLoading && (
              <div className="space-y-1.5">
                <p className="text-[10px] text-gray-500 font-medium">Suggested:</p>
                {suggestedQuestions.slice(0, 2).map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="block w-full p-1.5 bg-white hover:bg-teal-50 rounded-lg text-[11px] text-left text-gray-600 hover:text-teal-600 transition-colors border border-gray-200 hover:border-teal-300"
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white rounded-xl rounded-bl-none px-3 py-2 shadow-sm border border-gray-100">
                  <div className="flex space-x-1.5">
                    <div className="w-1.5 h-1.5 bg-teal-600 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-teal-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-1.5 h-1.5 bg-teal-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Lead Form */}
          {showLeadForm && (
            <div className="p-3 bg-white border-t border-gray-200">
              <h4 className="text-xs font-semibold text-gray-800 mb-2">Get in Touch</h4>
              <form onSubmit={handleSubmitLeadForm} className="space-y-1.5">
                <input
                  type="text"
                  placeholder="Your Name *"
                  value={leadData.name}
                  onChange={(e) => setLeadData({ ...leadData, name: e.target.value })}
                  className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-transparent"
                  required
                />
                <input
                  type="email"
                  placeholder="Email Address *"
                  value={leadData.email}
                  onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
                  className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-transparent"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={leadData.phone}
                  onChange={(e) => setLeadData({ ...leadData, phone: e.target.value })}
                  className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-transparent"
                />
                <textarea
                  placeholder="Requirements"
                  value={leadData.projectRequirements}
                  onChange={(e) => setLeadData({ ...leadData, projectRequirements: e.target.value })}
                  className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-transparent resize-none"
                  rows={2}
                />
                <div className="flex space-x-1.5 pt-1">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-gradient-to-r from-teal-600 to-indigo-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:from-teal-700 hover:to-indigo-700 transition-all disabled:opacity-50"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowLeadForm(false)}
                    className="px-3 py-1.5 border border-gray-300 text-gray-700 rounded-lg text-xs hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Input Area */}
          {!showLeadForm && (
            <div className="p-2.5 bg-white border-t border-gray-200">
              <div className="flex items-center space-x-1.5">
                <button
                  onClick={() => setShowLeadForm(true)}
                  className="p-1.5 text-gray-500 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors flex-shrink-0"
                  title="Contact"
                >
                  <UserIcon className="w-4 h-4" />
                </button>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputMessage)}
                  placeholder="Type message..."
                  className="flex-1 px-3 py-1.5 border border-gray-300 rounded-full focus:ring-1 focus:ring-teal-500 focus:border-transparent text-xs"
                  disabled={isLoading}
                />
                <button
                  onClick={() => sendMessage(inputMessage)}
                  disabled={isLoading || !inputMessage.trim()}
                  className="p-1.5 bg-gradient-to-r from-teal-600 to-indigo-600 text-white rounded-full hover:from-teal-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                >
                  <PaperAirplaneIcon className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[9px] text-gray-400 text-center mt-1">
                AI Powered • SquareServer
              </p>
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
