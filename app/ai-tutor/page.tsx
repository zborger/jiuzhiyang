'use client';

import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// DeepSeek API config - MVP: key in frontend (move to Worker for production)
const API_URL = 'https://api.deepseek.com/chat/completions';
const API_KEY = 'sk-5933126f5f6e4e4882df8dca4c955faa';
const MODEL = 'deepseek-v4-flash';

// System prompt for chemistry tutor
const SYSTEM_PROMPT = `你是南京市第九中学化学教师张俱扬的AI助教"小化"。

你的职责：
1. 只回答高中化学相关问题（必修一、必修二、选择性必修一二三）
2. 回答准确、简洁，适合高中生理解
3. 可以使用化学方程式，用文字描述即可（如：2H₂ + O₂ → 2H₂O）
4. 如果问题超出高中化学范围，礼貌告知并引导回化学话题
5. 鼓励学生思考，适当给出提示而非直接给答案
6. 语气友善、耐心

你擅长的领域：
- 原子结构与元素周期律
- 化学键与分子结构
- 氧化还原反应
- 离子反应
- 有机化学基础
- 化学反应原理（速率、平衡、热力学）
- 电化学
- 化学实验`;

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AiTutorPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('ai-tutor-history');
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch {}
    }
  }, []);

  // Save history
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('ai-tutor-history', JSON.stringify(messages.slice(-50)));
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...newMessages.slice(-10).map(m => ({ role: m.role, content: m.content })),
          ],
          stream: true,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantContent = '';

      // Add empty assistant message
      setMessages([...newMessages, { role: 'assistant', content: '' }]);

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n').filter(line => line.startsWith('data: '));

        for (const line of lines) {
          const data = line.slice(6);
          if (data === '[DONE]') break;

          try {
            const parsed = JSON.parse(data);
            const delta = parsed.choices?.[0]?.delta?.content || '';
            assistantContent += delta;
            setMessages([...newMessages, { role: 'assistant', content: assistantContent }]);
          } catch {}
        }
      }
    } catch (error) {
      console.error('AI request failed:', error);
      setMessages([
        ...newMessages,
        { role: 'assistant', content: '抱歉，AI 助教暂时无法回答。请稍后再试，或联系张老师获取帮助。' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearHistory = () => {
    setMessages([]);
    localStorage.removeItem('ai-tutor-history');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <main className="fixed inset-0 top-[64px] flex flex-col bg-white z-40">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-gray-900">🧪 AI 化学助教</h1>
          <p className="text-sm text-gray-500">有化学问题？问我就对了！</p>
        </div>
        <button
          onClick={clearHistory}
          className="text-sm text-gray-500 hover:text-red-500 px-3 py-1 rounded hover:bg-red-50 transition-colors"
        >
          清空记录
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 bg-gray-50">
        {messages.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">⚗️</div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">你好！我是小化</h2>
            <p className="text-gray-500 mb-6">张俱扬老师的 AI 化学助教，有任何高中化学问题都可以问我</p>
            <div className="flex flex-wrap justify-center gap-2">
              {['什么是氧化还原反应？', '化学平衡怎么判断移动方向？', '有机物的命名规则是什么？'].map((q) => (
                <button
                  key={q}
                  onClick={() => { setInput(q); inputRef.current?.focus(); }}
                  className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white rounded-br-md'
                  : 'bg-white text-gray-800 border border-gray-200 rounded-bl-md shadow-sm'
              }`}
            >
              {msg.role === 'user' ? (
                <span className="whitespace-pre-wrap">{msg.content}</span>
              ) : msg.content ? (
                <div className="prose prose-sm max-w-none prose-p:my-2 prose-ul:my-2 prose-ol:my-2 prose-li:my-1 prose-headings:my-2">
                  <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                    {msg.content}
                  </ReactMarkdown>
                </div>
              ) : (
                isLoading ? <span>思考中...</span> : null
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex gap-2 max-w-3xl mx-auto">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="输入化学问题... (Enter 发送，Shift+Enter 换行)"
            rows={1}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl resize-none focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base"
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {isLoading ? '...' : '发送'}
          </button>
        </div>
      </div>
    </main>
  );
}
