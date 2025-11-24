import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MessageBubble = ({ message }) => {
  const isUser = message.sender === 'user';
  const time = new Date(message.timestamp).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  const renderContent = () => {
    switch (message.type) {
      case 'text':
      case 'markdown':
        return (
          <div className="text-[14px] leading-[1.4]">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                p: ({ node, ...props }) => <p className="mb-1.5 last:mb-0" {...props} />,
                strong: ({ node, ...props }) => <strong className="font-semibold" {...props} />,
                a: ({ node, ...props }) => <a className="text-blue-600 underline" target="_blank" rel="noreferrer noopener" {...props} />,
                code: ({ inline, className, children, ...props }) => (
                  <code className={`${className || ''} ${inline ? 'bg-black/10 px-1 rounded' : 'block bg-black/10 p-2 rounded'} text-[12px]`} {...props}>{children}</code>
                ),
                ul: ({ node, ...props }) => <ul className="list-disc pl-5 mb-2" {...props} />,
                ol: ({ node, ...props }) => <ol className="list-decimal pl-5 mb-2" {...props} />,
                table: ({ node, ...props }) => <div className="overflow-x-auto"><table className="min-w-full text-sm" {...props} /></div>,
                th: ({ node, ...props }) => <th className="border px-2 py-1 bg-black/5" {...props} />,
                td: ({ node, ...props }) => <td className="border px-2 py-1" {...props} />,
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        );
      case 'image':
        return (
          <div className="rounded-xl overflow-hidden max-w-[68%]">
            <img src={message.content} alt="Shared" className="w-full h-auto" />
          </div>
        );
      case 'audio':
        return (
          <div className="min-w-[140px] h-10 rounded-[12px] bg-gradient-to-b from-[#D3C1A6] to-[#C5AF93] flex items-center px-3 justify-between shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
            <div className="flex-1 flex items-end gap-[3px] pr-2">
              {Array.from({ length: 22 }).map((_, i) => (
                <div key={i} className="w-[2px] rounded bg-white/60" style={{ height: `${6 + (i % 5) * 3}px` }} />
              ))}
            </div>
            <div className="flex items-center gap-2 text-white">
              {message.duration ? (
                <span className="text-[11px] text-white/70">{message.duration}</span>
              ) : null}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        );
      case 'video':
        return (
          <div className="rounded-xl overflow-hidden max-w-sm">
            <video src={message.content} controls className="w-full h-auto" />
          </div>
        );
      case 'file':
        return (
          <a href={message.content} download className="text-blue-600 underline text-sm font-medium">Download File</a>
        );
      default:
        return <p className="text-[14px] leading-[1.4]">{message.content}</p>;
    }
  };

  const userStyles = 'bg-[#151515] text-white rounded-[12px] shadow-[0_2px_4px_rgba(0,0,0,0.06)]';
  const asstStyles = 'bg-[#FFF7E9] bg-gradient-to-b from-[#FFF7E9] to-[#FDEDD6] text-black rounded-[12px] shadow-[0_2px_4px_rgba(0,0,0,0.06)]';

  return (
    <div className={`w-full flex ${isUser ? 'justify-end' : 'justify-start'} mb-2.5`}>
      <div className="relative">
        <div className={`max-w-[68vw] px-3 py-2 ${isUser ? userStyles : asstStyles}`}>
          {renderContent()}
          <div className={`text-[10px] mt-1 flex items-center gap-2 ${isUser ? 'text-white/60' : 'text-black/45'}`}>
            <span>{time}</span>
            {message.status && <span className="opacity-70">• {message.status}</span>}
          </div>
        </div>
        {/* Tail */}
        <div className={`absolute bottom-0 ${isUser ? 'right-[-6px]' : 'left-[-6px]'} w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[10px] ${isUser ? 'border-t-[#151515]' : 'border-t-[#FFF7E9]'} `} />
      </div>
    </div>
  );
};

export default MessageBubble;
