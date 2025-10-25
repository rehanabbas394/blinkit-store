import { IoClose } from "react-icons/io5"


function ViewImage({url, close}) {
  return (
    <div 
      className='fixed top-0 bottom-0 right-0 left-0 bg-neutral-900 bg-opacity-70 flex justify-center items-center z-50 p-4'
      onClick={close}
    >
      <div className='w-full max-w-md max-h-[80vh] p-4 bg-white'>
        <IoClose size={25}/>
        <img src={url} alt="View" className='w-full h-full object-scale-down' />
      </div>
    </div>
  )
}
export default ViewImage