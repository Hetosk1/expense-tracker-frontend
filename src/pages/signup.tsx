export const Signup = () => {
    const styles = {
        "inputStypes": "border border-grey rounded  w-full h-8 focus:outline-none focus:ring-2 focus:ring-gray-500"
    } 
    return (
        <>
            <div className="h-screen w-screen flex items-center justify-center p-5">
                <div className="border border-gray-300 rounded rounded-xl p-9 w-1/2">
                    <div className="text-4xl font-bold">Welcome</div>
                    <div>Enter details to create a account</div>
                    <div className="py-3">
                        <div className="py-2">Username</div>
                        <input className={styles.inputStypes} type="text" name="" id="" />
                    </div>
                    <div className="py-3">
                        <div className="py-2" >Email</div>
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