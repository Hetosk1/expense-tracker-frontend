import {useState } from "react";
import { api } from "../assets/url";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string|null>(null);

    const styles = {
        "inputStypes": "p-4 border border-grey rounded  w-full h-8 focus:outline-none focus:ring-2 focus:ring-gray-500"
    } 

    const handleSubmit = async (event: React.FormEvent) => {
        try{
            event.preventDefault();

      

            const response = await fetch(`${api}/user/signin`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Sign in successful:', data);

                const token = data.Token.token;
                console.log(`token: ${token}`);

                localStorage.setItem('token-expense-tracker', token);

                if(localStorage.getItem('token-expense-tracker')){
                    navigate('/')
                } else {
                    setError('Invalid credentials')
                }


            } else {
                setError('Invalid email or password');
            }
        
        } catch(e){
            setError('Invalid email or password');
        }

    };

    
    return (
        <>
            <div className="h-screen w-screen flex items-center justify-center p-5 max-sm:w-screen ">
                <div className="border border-gray-300 rounded rounded-xl p-9 w-1/2 max-sm:w-screen max-sm:p-2 max-sm:border-0">
                    <div className="text-4xl font-bold max-sm:text-center">Welcome</div>
                    <div className="max-sm:text-center">Enter credentials to sign in</div>
                    <form onSubmit={handleSubmit}>
                        <div className="py-3">
                            <div className="py-2" >Email</div>
                            <input 
                                className={styles.inputStypes}  
                                type="text" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="py-3">
                            <div className="py-2">Password</div>
                            <input 
                                className={styles.inputStypes} 
                                type="Password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {!error ? 
                            <div className="p-3 flex justify-center">
                                <button type="submit">Login</button>
                            </div>
                            : 
                            <>                            
                                <div className="p-3 flex justify-center">
                                    <button type="submit">Login</button>
                                </div>
                                <div className="text-red-600">{error}</div>
                            </>
                        }


                    </form>
                </div>
            </div>
        </>
    );
}