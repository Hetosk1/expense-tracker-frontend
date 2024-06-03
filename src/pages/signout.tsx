export const Signout = () => {
    const styles = {
        "description": "text-gray-500",
        "inputStypes": "border border-grey rounded  w-full h-8 focus:outline-none focus:ring-2 focus:ring-gray-500"
    } 
    return (
        <>
            <div className="h-screen w-screen flex items-center justify-center p-5">
                <div className="border border-gray-300 rounded rounded-xl p-9 w-1/2">
                    <div className="text-3xl font-bold">Are you sure you want to logout?</div>
                    <div>Logging out will end your current session and you'll need to login again to access your account.</div>
                    <div className="py-3">
                        <div className="py-2">Email</div>
                        <input className={styles.inputStypes}  type="text" name="" id="" />
                    </div>
                    <div className="py-3">
                        <div className="py-2">Password</div>
                        <input className={styles.inputStypes} type="Password" name="" id="" />
                    </div>
                    <div className="p-3 flex justify-center">
                        <button>Login</button>
                    </div>
                </div>
            </div>
        </>
    );
}