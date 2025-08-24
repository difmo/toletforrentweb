import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MessageInput = ({ onSendMessage, onSendImage, disabled = false }) => {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  const emojis = ['😊', '😂', '❤️', '👍', '👎', '😢', '😮', '😡', '🎉', '🔥', '💯', '👏'];

  const quickReplies = [
    "Thanks for your interest!",
    "The property is still available.",
    "I can schedule a viewing for you.",
    "Let me check and get back to you.",
    "What\'s your preferred move-in date?",
    "I\'ll send you more details."
  ];

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (message?.trim() && !disabled) {
      onSendMessage(message?.trim());
      setMessage('');
      setIsTyping(false);
      if (textareaRef?.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSubmit(e);
    }
  };

  const handleInputChange = (e) => {
    setMessage(e?.target?.value);
    setIsTyping(e?.target?.value?.length > 0);
    
    // Auto-resize textarea
    if (textareaRef?.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef?.current?.scrollHeight, 120) + 'px';
    }
  };

  const handleEmojiClick = (emoji) => {
    setMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
    textareaRef?.current?.focus();
  };

  const handleQuickReply = (reply) => {
    setMessage(reply);
    textareaRef?.current?.focus();
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e?.target?.files);
    if (files?.length > 0) {
      onSendImage(files, message?.trim());
      setMessage('');
      if (textareaRef?.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
    e.target.value = '';
  };

  const handleImageUpload = () => {
    fileInputRef?.current?.click();
  };

  return (
    <div className="border-t border-border bg-card">
      {/* Quick Replies */}
      <div className="p-3 border-b border-border">
        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          <Icon name="Zap" size={16} className="text-muted-foreground flex-shrink-0" />
          <div className="flex space-x-2">
            {quickReplies?.map((reply, index) => (
              <button
                key={index}
                onClick={() => handleQuickReply(reply)}
                className="flex-shrink-0 px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full hover:bg-primary hover:text-primary-foreground transition-smooth"
              >
                {reply}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Message Input */}
      <form onSubmit={handleSubmit} className="p-4">
        <div className="flex items-end space-x-3">
          {/* Attachment Button */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleImageUpload}
            disabled={disabled}
            className="flex-shrink-0"
          >
            <Icon name="Paperclip" size={20} />
          </Button>

          {/* Input Container */}
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder={disabled ? "This conversation is archived" : "Type a message..."}
              disabled={disabled}
              className="w-full px-4 py-3 pr-12 bg-muted border border-border rounded-2xl text-sm text-foreground placeholder-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              rows={1}
              style={{ minHeight: '44px', maxHeight: '120px' }}
            />
            
            {/* Emoji Button */}
            <div className="absolute right-3 bottom-3">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                disabled={disabled}
                className="w-6 h-6"
              >
                <Icon name="Smile" size={16} />
              </Button>
            </div>

            {/* Emoji Picker */}
            {showEmojiPicker && (
              <div className="absolute bottom-full right-0 mb-2 bg-popover border border-border rounded-lg shadow-elevation-2 p-3 z-50">
                <div className="grid grid-cols-6 gap-2">
                  {emojis?.map((emoji, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleEmojiClick(emoji)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-muted rounded transition-smooth"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Send Button */}
          <Button
            type="submit"
            variant="default"
            size="icon"
            disabled={!message?.trim() || disabled}
            className="flex-shrink-0"
          >
            <Icon name="Send" size={20} />
          </Button>
        </div>

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-center space-x-2 mt-2 px-4">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <span className="text-xs text-muted-foreground">You are typing...</span>
          </div>
        )}
      </form>
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};

export default MessageInput;