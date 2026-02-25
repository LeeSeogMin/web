// 책 카드 컴포넌트
import Link from "next/link";

export default function BookCard({ book }) {
  return (
    <article className="bg-white border rounded-lg p-4 hover:shadow-md transition">
      <Link href={`/books/${book.id}`}>
        <h3 className="text-lg font-bold mb-1">{book.title}</h3>
        {book.author && (
          <p className="text-gray-500 text-sm mb-2">{book.author}</p>
        )}
        {book.memo && (
          <p className="text-gray-700 text-sm line-clamp-2">{book.memo}</p>
        )}
        <p className="text-gray-400 text-xs mt-2">
          {new Date(book.created_at).toLocaleDateString()}
        </p>
      </Link>
    </article>
  );
}
