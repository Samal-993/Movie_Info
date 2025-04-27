import loader from '../assets/Black And White Loop GIF by Pi-Slices (1).gif'

function Loading() {
  return (
    <div className='w-screen h-screen flex justify-center items-center bg-black'>
      <img className='h-[60%] object-cover' src={loader} alt="" />
    </div>
  )
}

export default Loading
