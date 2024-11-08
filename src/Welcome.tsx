export default function Welcome() {
  return <>
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center p-4 h-screen w-screen">
      <h1 className="text-3xl font-bold mb-4 text-black">Welcome to the Todo App - Demo for SE347.P12</h1>
      <p className="mb-4 text-black">This is a simple todo app built with React and Tailwind CSS</p>
      <div className="text-black">
        API Demo: <a href="https://dummyjson.com/docs/todos" className="text-blue-600 hover:underline">https://dummyjson.com/docs/todos</a>
      </div>
    </div>
  </>
}
