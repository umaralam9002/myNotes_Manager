import React, { useContext, useState, useEffect } from 'react';
import { IoMenu, IoClose } from 'react-icons/io5';
import { Link, useNavigate } from "react-router-dom";
import * as AlertDialog from "@radix-ui/react-alert-dialog";  
import taskContext from "../contextApi/TaskContext";
import Loader from "./Loader"; 
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const context = useContext(taskContext);
  const { users, getUserDetails } = context;
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false); 
  const [loggingOut, setLoggingOut] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/auth");
    }
    getUserDetails();
  }, [navigate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    setIsLogoutModalOpen(false); 
    setLoggingOut(true); 

    setTimeout(() => {
      localStorage.removeItem('token');
      navigate("/auth");
      toast.success("Logged out Successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        progressStyle: { background: "linear-gradient(to right, #36d1dc, #5b86e5)" },
        style: {
          top: "70px",
          background: "#1e40af",
          color: "#fff",
          borderRadius: "8px",
          padding: "16px",
          fontSize: "14px",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
        },
      });
    }, 2000); // Delay to show logging out overlay
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {/* Navbar */}
      <header className="bg-blue-500 shadow-2xl w-full fixed top-0 left-0 z-10 rounded-full mt-1 mx-auto transition-shadow duration-300">
        <nav className="flex justify-between items-center w-full max-w-7xl mx-auto py-3 px-5 h-[60px]">
          {/* Logo */}
          <div className="flex items-center bg-white rounded-xl p-1 w-[50px] shadow-md">
            <img className="w-10 h-10 mr-2" src="./logo2.png" alt="Logo" />
            <Link className="text-white text-lg font-bold ml-2" to="/">myNotes</Link>
          </div>

          {/* Nav Links */}
          <div className={`nav-links md:flex ${menuOpen ? 'max-h-96 opacity-100 scale-100 mt-1' : 'max-h-0 opacity-0 scale-95 md:max-h-full md:opacity-100 md:scale-100'}
          md:static absolute bg-blue-500 md:bg-transparent top-16 md:top-auto left-0 w-full md:w-auto text-center md:text-left rounded-xl  
          overflow-hidden transition-all duration-500 ease-in-out shadow-lg md:shadow-none`}>
            <ul className="flex md:flex-row md:ml-[160px] flex-col md:items-center gap-6 md:gap-8 py-4 md:py-0">
              <li><Link className="text-white hover:text-blue-200" to="/">Home</Link></li>
              <li><Link className="text-white hover:text-blue-200" to="/personal">Personal</Link></li>
              <li><Link className="text-white hover:text-blue-200" to="/educational">Educational</Link></li>
              <li><Link className="text-white hover:text-blue-200" to="/working">Working</Link></li>
              <li><Link className="text-white hover:text-blue-200" to="/General">General</Link></li>
            </ul>
          </div>

          {/* User Info & Logout */}
          <div className="flex items-center gap-4">
            <p className="hidden md:block text-white font-semibold text-lg bg-blue-600 px-3 py-1 rounded-xl shadow-md">
              Hello {users?.name || "Guest"}
            </p>
            <button className="bg-white text-blue-500 px-5 py-2 rounded-full hover:bg-blue-100 shadow-md" 
              onClick={() => setIsLogoutModalOpen(true)}>
              Log Out
            </button>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              {menuOpen ? (
                <IoClose className="text-3xl text-white cursor-pointer" onClick={toggleMenu} />
              ) : (
                <IoMenu className="text-3xl text-white cursor-pointer" onClick={toggleMenu} />
              )}
            </div>
          </div>
        </nav>
      </header>

      {/* Logout Confirmation Modal */}
      <AlertDialog.Root open={isLogoutModalOpen} onOpenChange={setIsLogoutModalOpen}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="fixed inset-0 bg-black/50" />
          <AlertDialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-lg max-w-md w-full">
            <AlertDialog.Title className="text-lg font-semibold">Confirm Logout</AlertDialog.Title>
            <AlertDialog.Description className="mt-2 text-gray-600">
              Are you sure you want to log out? You will need to log in again to access your tasks.
            </AlertDialog.Description>
            <div className="mt-6 flex justify-end space-x-2">
              <AlertDialog.Cancel asChild>
                <button className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
              </AlertDialog.Cancel>
              <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded">
                Yes, Logout
              </button>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>

      {/* Logging Out Overlay */}
      {loggingOut && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white text-blue-500 px-6 py-4 rounded-xl shadow-xl text-lg font-semibold">
            Logging Out...
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
