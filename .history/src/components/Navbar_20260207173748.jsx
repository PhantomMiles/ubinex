export default function Navbar() {
  return (
    <nav className="w-full py-4 px-6 bg-green-500 shadow text-white flex items-center justify-between">
        <h1 className="text-2xl font-bold">AgroLink</h1>
        <button className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded">Cart</button>
    </nav>
  )
}