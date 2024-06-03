import { useNavigate } from "react-router-dom"

export const NoAuth = () => {

    let navigate = useNavigate();

    return (
        <div className="h-screen w-screen flex items-center justify-center p-5">
                <div className="border border-gray-300 rounded rounded-xl p-9 w-1/2">
                    <div className="text-3xl font-bold">You need a account to proceed</div>
                    <div className="text-sm py-2">If you have a pre-existing account then you can log in by entering the credentials or if you want to create a account then kindly email a request at : gokul.graphic@gmail.com and call on +919428670050</div>
                    
                    <div
                        onClick={() => {
                                return navigate('/signin')
                            }}  
                        className=" cursor-pointer p-3 flex justify-center border border-black rounded rounded-lg hover:text-white hover:bg-black"
                    >
                        <button >Login</button>
                    </div>
                </div>
            </div>
    )
}