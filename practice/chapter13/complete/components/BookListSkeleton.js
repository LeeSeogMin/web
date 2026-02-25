// 책 목록 스켈레톤 UI
export default function BookListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="border rounded-lg p-4 animate-pulse bg-white">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
          <div className="h-3 bg-gray-200 rounded w-1/4 mt-3" />
        </div>
      ))}
    </div>
  );
}
