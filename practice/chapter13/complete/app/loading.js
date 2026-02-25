import BookListSkeleton from "@/components/BookListSkeleton";

export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <BookListSkeleton />
    </div>
  );
}
