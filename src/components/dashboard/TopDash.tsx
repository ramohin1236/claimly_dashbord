
import usericon from "../../../public/user (1).svg"
import userminus from "../../../public/user-minus.svg"
import note from "../../../public/note-favorite.svg"
import { useGetMetaDataQuery } from "../../store/api/webApi"


const TopDash = () => {
  
 const {data: metaData, isLoading} = useGetMetaDataQuery()
 console.log("data",metaData?.data)
 const totalUsers = metaData?.data?.totalNormalUser
 const blockedUsers = metaData?.data?.totalBlockedUser
 const totalClaims = metaData?.data?.totalInsurer
  return (
    <div className='flex gap-4 mb-8'>
      {/* first box */}
      <div className='border border-[#2563EB] p-7 rounded-md bg-[#DBEAFE]  flex flex-col justify-start items-start gap-3 w-full'>
        <div className='bg-[#1A1A1A26] flex items-center justify-center p-2 rounded-md'>
          <img src={usericon} alt="user icon" />
        </div>

        <div className='flex flex-col gap-3'>
          <p className='text-xl font-medium'>Total Users</p>
          <p className='text-4xl font-bold text-[#2563EB]'>
            {isLoading ? (<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>) :totalUsers}
            
            </p>
        </div>
      </div>
      {/* first box */}
      <div className='border border-[#EF4444] p-7 rounded-md bg-[#FEE2E2]  flex flex-col justify-start items-start gap-3 w-full'>
        <div className='bg-[#1A1A1A26] flex items-center justify-center p-2 rounded-md'>
          <img src={userminus} alt="user icon" />
        </div>

        <div className='flex flex-col gap-3'>
          <p className='text-xl font-medium'>Blocked Users</p>
          <p className='text-4xl font-bold text-[#EF4444]'>{isLoading ? (<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#EF4444]"></div>) :blockedUsers}</p>
        </div>
      </div>
      {/* first box */}
      <div className='border border-[#16A34A] p-7 rounded-md bg-[#DCFCE7]  flex flex-col justify-start items-start gap-3 w-full'>
        <div className='bg-[#1A1A1A26] flex items-center justify-center p-2 rounded-md'>
          <img src={note} alt="user icon" />
        </div>

        <div className='flex flex-col gap-3'>
          <p className='text-xl font-medium'>Total Claims</p>
          <p className='text-4xl font-bold text-[#16A34A]'>{isLoading ? (<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#16A34A]"></div>) :totalClaims}</p>
        </div>
      </div>
    </div>
  )
}

export default TopDash