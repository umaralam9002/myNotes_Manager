import { useState } from "react"
import { CalendarDays, Edit, Trash2, Image } from "lucide-react"
import * as Dialog from "@radix-ui/react-dialog"
import * as AlertDialog from "@radix-ui/react-alert-dialog"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function TaskItem({ task, onEdit, onDelete }) {
  const [editedTask, setEditedTask] = useState({ ...task })
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)

  const handleUpdate = () => {
    onEdit(editedTask)
    toast.success("Task Updated Successfully", {
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

    setIsEditModalOpen(false)
  }

  const handleDelete = () => {
    onDelete(task._id)
    toast.success("Task Deleted Successfully", {
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

    setIsDeleteModalOpen(false)
  }

  const handleChange = (e) => {
    setEditedTask({ ...editedTask, [e.target.name]: e.target.value })
  }

  // Get image URL from task object, handling different possible structures
  const getImageUrl = () => {
    if (task.image) {
      // If image is a string (direct URL)
      if (typeof task.image === "string") {
        return task.image
      }
      // If image has a url property
      if (task.image.url) {
        return task.image.url
      }
      // If image has a path property
      if (task.image.path) {
        return task.image.path
      }
    }
    return null
  }

  const imageUrl = getImageUrl()
  const hasImage = task.image 

  return (
    <div className="container mx-auto px-4 py-3 max-w-4xl">
      <ul className="space-y-4 max-w-4xl mx-auto w-full">
        <li className="border-b border-gray-200 pb-4 transition-all hover:bg-white/10 bg-white/30 backdrop-blur-lg rounded-xl p-6 w-full">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-gray-900">{task.title}</h3>
              <p className="text-gray-600">{task.description}</p>
              <div className="flex items-center text-gray-500 text-sm">
                <CalendarDays className="w-4 h-4 mr-2" />
                {new Date(task.date).toLocaleDateString("en-CA")}
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setIsImageModalOpen(true)}
                className="p-2 rounded-xl hover:bg-green-100"
                title="View Image"
              >
                <Image className="w-4 h-4 text-green-600" />
              </button>
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="p-2 rounded-xl hover:bg-blue-100"
                title="Edit Task"
              >
                <Edit className="w-4 h-4 text-blue-600" />
              </button>
              <button
                onClick={() => setIsDeleteModalOpen(true)}
                className="p-2 rounded-xl hover:bg-red-100"
                title="Delete Task"
              >
                <Trash2 className="w-4 h-4 text-red-600" />
              </button>
            </div>
          </div>
        </li>
      </ul>

      {/* Edit Task Modal */}
      <Dialog.Root open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-lg max-w-md w-full">
            <Dialog.Title className="text-lg font-semibold text-center">Edit Notes</Dialog.Title>
            <div className="mt-4 space-y-4">
              <label className="block text-sm font-medium">Title</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                name="title"
                value={editedTask.title}
                onChange={handleChange}
                minLength={5}
                required
              />
              <label className="block text-sm font-medium">Description</label>
              <textarea
                className="w-full p-2 border border-gray-300 resize-none rounded"
                name="description"
                value={editedTask.description}
                onChange={handleChange}
                minLength={5}
                required
              />
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <Dialog.Close asChild>
                <button className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
              </Dialog.Close>
              <button
                onClick={handleUpdate}
                disabled={editedTask.title.length < 5 || editedTask.description.length < 5}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Update
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Delete Confirmation Modal */}
      <AlertDialog.Root open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="fixed inset-0 bg-black/50" />
          <AlertDialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-lg max-w-md w-full">
            <AlertDialog.Title className="text-lg font-semibold">Are you sure?</AlertDialog.Title>
            <AlertDialog.Description className="mt-2 text-gray-600">
              This action cannot be undone. This will permanently delete the task.
            </AlertDialog.Description>
            <div className="mt-6 flex justify-end space-x-2">
              <AlertDialog.Cancel asChild>
                <button className="px-4 py-2 bg-gray-300 rounded">No, keep it</button>
              </AlertDialog.Cancel>
              <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded">
                Yes, delete it
              </button>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>

      {/* Image Preview Modal */}
      <Dialog.Root open={isImageModalOpen} onOpenChange={setIsImageModalOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/70" />
          <Dialog.Content className="fixed mt-6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-xl shadow-lg w-[95%] max-w-2xl max-h-[80vh] overflow-auto">
            <div className="relative">
              <Dialog.Title className="text-lg font-semibold mb-2">Image Preview</Dialog.Title>
              <Dialog.Close className="absolute top-0 right-0 p-2 rounded-full hover:bg-gray-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-x"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </Dialog.Close>
              <div className="flex justify-center items-center mt-4 mb-2">
                {hasImage ? (
                  <img
                    src={`data:image/jpeg;base64,${task.image}`} 
                    alt={`Image for ${task.title}`}
                    className="w-full max-h-[60vh] object-contain rounded-lg"
                    onError={(e) => {
                      console.error("Image failed to load:", task.image) 
                      e.target.src = "/placeholder.svg" 
                    }}
                  />
                ) : (
                  <div className="text-gray-500 py-8 text-center">
                    <Image className="mx-auto h-16 w-16 text-gray-400 mb-2" />
                    <p>No image to preview</p>
                  </div>
                )}
              </div>
              <div className="mt-4 flex justify-end">
                <Dialog.Close asChild>
                  <button className="px-4 py-2 bg-gray-300 rounded">Close</button>
                </Dialog.Close>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}

export default TaskItem

