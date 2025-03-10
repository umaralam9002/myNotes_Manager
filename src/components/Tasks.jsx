import { useContext, useState } from "react"
import TaskContext from "../contextApi/TaskContext"
import { ClipboardCopy, Image } from "lucide-react"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const Tasks = (props) => {
  const context = useContext(TaskContext)
  const { addTask } = context
  const [text, setText] = useState("")
  const [count, setCount] = useState(0)
  const [task, setTask] = useState({ title: "", description: "", tag: "general", image: null })
  const [imagePreview, setImagePreview] = useState(null)

  const showSuccess = () => {
    toast.success("Task Added Successfully", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      progressStyle: {
        background: "linear-gradient(to right, #36d1dc, #5b86e5)",
      },
      style: {
        top: "70px",
        background: "#1e40af",
        color: "#fff",
        borderRadius: "8px",
        padding: "16px",
        fontSize: "14px",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
      },
    })
  }

  const handleClick = (e) => {
    e.preventDefault()
    addTask(task.title, task.description, task.tag, task.image)
    setTask({ title: "", description: "", tag: "general", image: null })
    setImagePreview(null)
    showSuccess()
  }

  const onChange = (e) => {
    const { name, value } = e.target
    setTask((prevNote) => {
      const updatedNote = { ...prevNote, [name]: value }

      if (name === "description") {
        setText(updatedNote.description)
        setCount(updatedNote.description.trim() ? updatedNote.description.trim().split(/\s+/).length : 0)
      }

      return updatedNote
    })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]

    if (file) {
      // Check file size (2MB limit)
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image size exceeds 2MB limit", {
          position: "top-right",
          style: { top: "70px" },
        })
        return
      }

      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)

      // Update task state with image
      setTask((prevTask) => ({ ...prevTask, image: file }))
    }
  }

  const removeImage = () => {
    setTask((prevTask) => ({ ...prevTask, image: null }))
    setImagePreview(null)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(task.description)
    toast.success("Successfully Copied to Clipboard", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: {
        top: "70px",
      },
    })
  }

  const handleClear = () => {
    setTask({ title: "", description: "", tag: "general", image: null })
    setCount(0)
    setImagePreview(null)
  }

  return (
    <div className="flex items-center justify-center mt-[20px] p-4 ">
      <div className="p-6 shadow-xl rounded-2xl w-full max-w-[800px] bg-white/30 backdrop-blur-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Add a Note</h2>
        <form className="space-y-3">
          <div className="flex flex-col items-start">
            <label htmlFor="title" className="text-sm font-medium text-gray-700 text-left">
              Title
            </label>
            <input
              type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              id="title"
              name="title"
              value={task.title}
              onChange={onChange}
              minLength={5}
              maxLength={500}
              required
              placeholder="Enter Task title"
            />
          </div>

          <div className="flex flex-col items-start relative">
            <label htmlFor="description" className="text-sm font-medium text-gray-700 text-left">
              Description
            </label>
            <textarea
              className="mt-1 block w-full p-2 resize-none border border-gray-300 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              id="description"
              name="description"
              value={task.description}
              onChange={onChange}
              minLength={5}
              maxLength={50000}
              required
              placeholder="Enter Task description"
              rows="3"
            />
            <button
              disabled={task.description.trim().length === 0}
              type="button"
              onClick={copyToClipboard}
              className="absolute top-8 right-2 hover:text-gray-800 bg-gray-700 invert text-white rounded-[100px] p-1"
            >
              <ClipboardCopy size={20} />
            </button>
          </div>

          <div className="flex flex-col items-start">
            <h2 className="text-lg font-medium text-gray-700 text-left">Your Notes Summary</h2>
            <p className="text-sm font-medium text-gray-500 text-left">
              {count} words , {task.description.length} characters
            </p>
            <p className="text-sm font-medium text-gray-500 text-left">
              {count > 0 ? (0.008 * count).toFixed(3) : "0"} Minutes Required to Read
            </p>
          </div>

          <div className="flex flex-col items-start relative">
            <label htmlFor="image" className="text-sm font-medium text-gray-700 text-left flex items-center gap-2">
              <Image size={20} />
              Upload Image (optional) limit 2 MB
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <div className="mt-1 flex items-center w-full">
              <label
                htmlFor="image"
                className="cursor-pointer flex items-center justify-center w-full p-2 border border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100"
              >
                {imagePreview ? (
                  <div className="relative w-full">
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Preview"
                      className="max-h-40 mx-auto rounded-lg object-contain"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <Image className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-1 text-sm text-gray-500">Click to upload an image</p>
                  </div>
                )}
              </label>
            </div>
          </div>

          <div className="flex flex-col items-start">
            <label htmlFor="tag" className="text-sm font-medium text-gray-700 text-left">
              Tag
            </label>
            <select
              className="mt-1 block w-full p-2 border border-gray-300 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              id="tag"
              name="tag"
              value={task.tag}
              onChange={onChange}
            >
              <option value="general">General</option>
              <option value="personal">Personal</option>
              <option value="educational">Educational</option>
              <option value="working">Working</option>
            </select>
          </div>

          <button
            disabled={task.title.length < 5 || task.description.length < 5}
            type="submit"
            className="w-full max-w-[200px] mx-auto md:ml-[160px] py-2 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 disabled:opacity-50"
            onClick={handleClick}
          >
            Add Note
          </button>
          <button
            disabled={task.description.trim().length === 0 && task.title.trim().length === 0 && !task.image}
            type="button"
            className="w-full max-w-[200px] mx-auto lg:ml-2 py-2 bg-yellow-500 text-white font-semibold rounded-xl shadow-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 disabled:opacity-50"
            onClick={handleClear}
          >
            Clear
          </button>
        </form>
      </div>
    </div>
  )
}

export default Tasks

