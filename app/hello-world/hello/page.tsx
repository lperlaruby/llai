

/*export default function HelloPage() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-blue-100 p-6 text-center pt-20">
      <h2 className="text-4xl font-bold text-blue-600">"Hello"</h2>
      <p className="mt-4 text-lg text-gray-700 max-w-2xl">
        This is a sample text that includes the word hello.
      </p>
    </div>
  );
}

*/

import Link from "next/link";

export default function HelloPage() {
  return (
    <div className="min-h-screen bg-blue-100 text-center">
      {/* Header Section */}
      <header className="flex justify-between items-center px-6 py-4 bg-blue-600 text-white">
        <span className="text-2xl font-bold">=</span>
        <nav className="flex space-x-6">
          <Link href="/" className="hover:text-gray-300">Home</Link>
          <Link href="/list" className="hover:text-gray-300">List</Link>
          <Link href="/user" className="hover:text-gray-300">User</Link>
        </nav>
      </header>

      {/* Main Content Section */}
      <div className="flex flex-col items-center justify-start pt-20">
        <h2 className="text-4xl font-bold text-blue-600">"Hello"</h2>
        <p className="mt-4 text-lg text-gray-700 max-w-2xl">
          This is a sample text with with the word hello. 
        </p>
      </div>
    </div>
  );
}


