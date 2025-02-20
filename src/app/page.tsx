import Link from 'next/link';
export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <p className="text-4xl font-bold text-center sm:text-left">Welcome to your PAGE in SRC</p>
        <ul className="list-disc pl-8">
          <li>
            Add Auth
          </li>
          <li>
            Add New Views
          </li>
          </ul>
          
        <Link href="/payments" className="text-blue-600 hover:text-blue-800 underline">
          Go to Payments
        </Link>
      </main>
      
    </div>
  );
}
