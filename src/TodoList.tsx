import { useCallback, useEffect, useState } from 'react'
import { Trash } from 'lucide-react'

interface Todo {
  id: number;
  todo: string;
  completed: boolean;
}

const useMountEffect = (fun) => useEffect(fun, []);

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newTodo, setNewTodo] = useState("")

  async function getTodos(): Promise<void> {
    const todos = await fetch('https://dummyjson.com/todos')
      .then(res => res.json());
    const todosData: Todo[] = todos.todos.map((todo: any) => {
      return {
        id: todo.id,
        todo: todo.todo,
        completed: todo.completed
      } as Todo;
    });
    setTodos(todosData);
    console.log(todosData);
  }

  useMountEffect(() => {
    console.log('useMountEffect');
    getTodos();
  })

  const addTodo = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    if (!newTodo) {
      return;
    }
    newTodo.trim();
    try {
      fetch('https://dummyjson.com/todos/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          todo: newTodo,
          completed: false,
          userId: 5,
        })
      })
        .then(res => res.json())
        .then(console.log);
      alert('Todo added successfully');
      setTodos([...todos, { id: Date.now(), todo: newTodo, completed: false }])
    } catch (e) {
      alert('Failed to add todo');
    }
    finally {
      setNewTodo("")
      setIsModalOpen(false)
    }
  }

  const toggleTodo = (id: number) => {
    const currentTodo = todos.find(todo => todo.id === id);
    if (!currentTodo) return;
    try {
      if (!id) return;
      fetch(`https://dummyjson.com/todos/${id}`, {
        method: 'PUT', /* or PATCH */
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          completed: !currentTodo.completed,
        })
      })
        .then(res => res.json())
        .then(console.log);

      setTodos(todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ))

    } catch (e: any) {
      alert(`failed to toggle todo: ${e.message}`)
    }
  }

  const deleteTodo = (id: number) => {
    try {
      fetch(`https://dummyjson.com/todos/${id}`, {
        method: 'DELETE',
      })
        .then(res => res.json())
        .then(console.log);
      setTodos(todos.filter(todo => todo.id !== id))
    } catch (e: any) {
      alert(`Failed to delete todo: ${e.message}`);
    }
  }

  return (

    <div>
      {/* Page content */}
      <div className="pt-16">

        <div className="flex justify-center h-screen w-screen">

          <div className="p-4 bg-white min-h-screen">
            <div className="max-w-4xl mx-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">Title</th>
                    <th className="w-32 p-4">Completed</th>
                    <th className="w-24 p-4">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {todos.map(todo => (
                    <tr key={todo.id} className="border-b">
                      <td className="p-4">{todo.todo}</td>
                      <td className="p-4 text-center">
                        <input
                          type="checkbox"
                          checked={todo.completed}
                          onChange={() => toggleTodo(todo.id)}
                          className="h-5 w-5"
                        />
                      </td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => deleteTodo(todo.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Add Todo Button */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="fixed bottom-8 right-8 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Add More Todo
              </button>
            </div>
          </div>

        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-96">
              <h2 className="text-xl font-bold mb-4">Add Todo</h2>
              <form onSubmit={addTodo}>
                <div className="mb-4">
                  <label htmlFor="todo" className="block text-sm font-medium text-gray-700 mb-2">
                    Todo:
                  </label>
                  <input
                    type="text"
                    id="todo"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Add Todo
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>

  )
}

export default TodoList

