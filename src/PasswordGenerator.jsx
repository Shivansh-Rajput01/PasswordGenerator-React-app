import { useState, useCallback, useEffect, useRef } from "react";

export default function PasswordGenerator() {
    const [length,setLength] = useState(8);
    const [numberAllowed, setNumberAllowed] = useState(false);
    const [charAllowed, setCharAllowed] = useState(false);
    const [password, setPassword] = useState("");

    const passwordGenerator = useCallback(() => {
        let pass = "";
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        if (numberAllowed) str += "0123456789";
        if (charAllowed) str += "!@#$%^&*+=(){}";
        for (let i = 1; i <= length; i++){
            pass += str.charAt(Math.floor(Math.random() * str.length + 1));
        }
        setPassword(pass);
    }, [length, numberAllowed, charAllowed, setPassword]);

    useEffect(() => {
        passwordGenerator();
    }, [length, numberAllowed, charAllowed, passwordGenerator]);
        
    const passwordRef = useRef(null);

    const copyPasswordToClipboard = useCallback(() => {
        passwordRef.current?.select();
        window.navigator.clipboard.writeText(password)
    },[password])

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
        <h1 className="text-white text-center text-4xl my-3">Password Generator App</h1>
            <div className="flex shadow rounded-lg overflow-hidden mb-4">
                <input 
                type="text"
                value={password}
                className="outline-none w-full py-1 px-3"
                placeholder="password" 
                readOnly
                ref={passwordRef}
                />
                <button 
                className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:bg-sky-700" onClick={copyPasswordToClipboard}>Copy</button>
            </div>
            <div className="flex text-sm gap-x-2">
                <div className="flex items-center gap-x-1">
                    <input 
                    type="range" 
                    className="cursor-pointer"
                    min={8}
                    max={50}
                    value={length}
                    onChange={(event) =>setLength(parseInt(event.target.value))}
                    />
                    <label>Length : {length}</label>
                </div>
                <div className="flex items-center gap-x-1">
                    <input
                    type="checkbox"
                    defaultChecked={numberAllowed}
                    onChange={() => {
                        setNumberAllowed((prev) => !prev)
                    }}
                    />
                    <label htmlFor="InputNumber">Number</label>
                </div>
                <div className="flex items-center gap-x-1">
                    <input
                    type="checkbox"
                    defaultChecked={charAllowed}
                    id="characterInput"
                    onChange={() => {
                        setCharAllowed((prev) => !prev)
                    }}
                    />
                    <label htmlFor="characterInput">Characters</label>
                </div>
            </div>
    </div>
  )
}
