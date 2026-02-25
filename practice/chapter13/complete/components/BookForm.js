// 책 등록/수정 폼 — 유효성 검증 포함
"use client";

import { useState } from "react";

export default function BookForm({ onSubmit, initialData }) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [author, setAuthor] = useState(initialData?.author || "");
  const [memo, setMemo] = useState(initialData?.memo || "");
  const [errors, setErrors] = useState({});

  function validate() {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "제목을 입력해주세요.";
    else if (title.trim().length > 200)
      newErrors.title = "제목은 200자 이하여야 합니다.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      title: title.trim(),
      author: author.trim() || null,
      memo: memo.trim() || null,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-1">
          제목 *
        </label>
        <input
          id="title"
          type="text"
          placeholder="책 제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`w-full p-3 border rounded-lg ${
            errors.title ? "border-red-500" : ""
          }`}
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title}</p>
        )}
      </div>
      <div>
        <label htmlFor="author" className="block text-sm font-medium mb-1">
          저자
        </label>
        <input
          id="author"
          type="text"
          placeholder="저자명"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full p-3 border rounded-lg"
        />
      </div>
      <div>
        <label htmlFor="memo" className="block text-sm font-medium mb-1">
          메모
        </label>
        <textarea
          id="memo"
          placeholder="독서 메모, 감상 등"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          className="w-full p-3 border rounded-lg h-32"
        />
      </div>
      <button
        type="submit"
        className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
      >
        {initialData ? "수정" : "등록"}
      </button>
    </form>
  );
}
