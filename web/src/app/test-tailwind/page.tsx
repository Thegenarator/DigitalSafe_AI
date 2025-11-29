export default function TestTailwind() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto space-y-4">
        <h1 className="text-4xl font-bold text-blue-600">Tailwind Test</h1>
        <div className="bg-red-500 text-white p-4 rounded-lg">
          If you see this with red background, Tailwind is working!
        </div>
        <div className="bg-green-500 text-white p-4 rounded-lg">
          If you see this with green background, Tailwind is working!
        </div>
        <div className="bg-purple-500 text-white p-4 rounded-lg">
          If you see this with purple background, Tailwind is working!
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-blue-500">
          <p className="text-gray-800 text-lg">
            This should have white background, shadow, and blue border.
          </p>
        </div>
      </div>
    </div>
  );
}

