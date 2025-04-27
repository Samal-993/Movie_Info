
import { useNavigate } from "react-router";

const Contact = () => {
  const navigate = useNavigate();


  
    document.title = 'MovieHub || Contact'

 
  

  return (
    <div className="w-screen h-screen">
      <div className="px-[5%] w-full flex items-center justify-between">
        <h1 className="text-2xl text-zinc-400 font-semibold">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556cd] pr-2 ri-arrow-left-line"
          ></i>
          Contact
        </h1>
        

       
      </div>
</div>
  )
}
export default Contact 
