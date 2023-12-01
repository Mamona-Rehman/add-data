import React from "react";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { useState ,useEffect} from "react";
import NavBar from "../../components/Navbar";
import axios from"axios";
import { config } from "../../config/config";


const Dashboard = () => {

  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [editedItemId ,  setEditedItemId] = useState(null);
 
  const handleClick = (e) => {
   e.preventDefault();
  
   if (editedItemId !== null) {
    const updatedItems = [];
    for (const item of items) {
        if (item.id === editedItemId) {
            updatedItems.push({ ...item, title, author });
        } else {
            updatedItems.push(item);
        }
    }
    setItems(updatedItems);
    setEditedItemId(null);
} else {
    const newItem = {
        id: items.length + 1,
        title: title,
        author: author
    };
    items.unshift(newItem)
    items.map((val, index) => (val.id = index + 1));
    setItems([ ...items]);
}
setIsModalOpen(false);
reset();
};

useEffect(() => {
     getPostsData()

    },[])
    
    const getPostsData=async()=>{
     try{
      const response = await axios.get(`${config.apiUrl}/posts`)
      setItems(response.data)
      
     }catch(error){
      console.log("error",error)
     }
    }

  const handleEdit = (id) =>{
  
    const find = items.find(item => item.id === id)
    setTitle(find.title)
    setAuthor(find.author);
    setIsModalOpen(true);
    setEditedItemId(id);
    

  };
  const reset = () => {
    setTitle('');
    setAuthor('');
  };
  const handleModalClose = () =>{
    setIsModalOpen(false);
    reset();
  }
const handleDelete = (id) =>{
  const filter = items.filter(item => item.id !== id)
  setItems(filter);
}


  return (
    <>
      <NavBar />
      <div className="flex justify-center items-center min-h-screen">
        <div className="border border-gray-300 bg-slate-100 shadow-md rounded  px-8 pt-6 pb-8 mb-4">
          <Button
            type="submit"
            size="large"
            className="mr-3"
            onClick={() => setIsModalOpen(true)}
          >
            Add
          </Button>
          <table className="table-auto">
            <thead>
              <tr>
                  <th className="px-4 py-2  text-gray-600 "> Id</th>
                <th className="px-4 py-2  text-gray-600 "> Title</th>
              
                <th className="px-4 py-2  text-gray-600 "> Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.slice(0,10).map((item, index) => (
                <tr key={index}>
                 
                  <td className="border border-gray-500 px-4 py-2 text-gray-600 font-medium">
                    {item.id}
                  </td>
                   <td className="border border-gray-500 px-4 py-2 text-gray-600 font-medium">
                    {item.title}
                  </td>
                  <td className="border border-gray-500 px-4 py-2 text-gray-600 font-medium">
                    <div className="flex justify-center items-center mr-3">
                      <Button type="submit" size="large" className="mr-3" onClick ={() => handleEdit(item.id) }>
                        Edit
                      </Button>
                      <Button
                        type="button"
                        size="large"
                        varient="danger"
                        onClick = {()=>handleDelete(item.id)}
                        
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <CreateModal
          handleModalClose={handleModalClose}
          isModalOpen={isModalOpen}
          handleClick={handleClick}
          title = {title}
          setTitle={setTitle}
          setAuthor = {setAuthor}
          author ={author}
        />
      </div>
    </>
  );
};

export default Dashboard;

function CreateModal({ isModalOpen, handleModalClose, handleClick ,  title , setTitle, author,id,  setAuthor }) {
  return (
    <>
      <div
        id="authentication-modal"
        aria-hidden="true"
        class={`fixed flex justify-center items-center z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full ${
          isModalOpen ? "" : "hidden"
        }`}
      >
        <div class="relative w-full max-w-md max-h-full">
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              onClick={handleModalClose}
              class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="authentication-modal"
            >
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
            <div class="px-6 py-6 lg:px-8">
              <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                Sign in to our platform
              </h3>
              <form class="space-y-6" onSubmit={handleClick} >
                <div className="mb-6">
                  <Input
                    label={"Title"}
                    id={"title"}
                    value ={title}
                    type={"title"}
                    name={"title"}
                    
                    onChange = {e=>setTitle(e.target.value)}
                  />
                </div>
                <div className="mb-6">
                  <Input
                    label={"Author"}
                    id={"Author"}
                    type={"Author"}
                    name={"Author"}
                    value={author}
                    onChange = {e=>setAuthor(e.target.value)}
                   
                  />
                </div>
                <div className="flex justify-center items-center mr-3">
                  <Button type="submit" size="large" className="mr-3" >
                    Add
                  </Button>
                  <Button
                    type="button"
                    size="large"
                    varient="danger"
                    onClick={handleModalClose}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
