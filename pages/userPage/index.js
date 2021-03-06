import { useRouter } from 'next/router'
import React, { useState } from 'react';

export default function User() {
    const initialState = {userTelegramId: 0, errorMessage: ''};
    const router = useRouter();
    const [response, setResponse] = useState(initialState);
    const resetStatus = () => {
        setResponse(initialState);
    }

    const registerUser = event => {
        event.preventDefault()

        fetch('/api/telegram', {
            body: JSON.stringify({
                name: event.target.name.value
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
        .then((result) => result.json())
        .then((result) => {
            if(result.errorMessage.length > 0) {
                setResponse(result);
                window.open(`https://t.me/react_remember_me_service_bot?start=${event.target.name.value}`, '_blank');
            } else {
                 fetch('/api/user', {
                    method: 'POST',
                    body: JSON.stringify({
                        name: event.target.name.value,
                        userTelegramId: result.userTelegramId
                    })
                });  
                
                router.push({
                    pathname: '/',
                    query: { message: `User ${event.target.name.value} successful added.` }
                });       
            }
        });        
    }

    return (
        <div>
            <form onSubmit={registerUser}>
                <label htmlFor="name">Name</label>
                <input id="name" name="name" type="text" autoComplete="name" required onChange={resetStatus}/>
                <button type="submit">Register</button>
            </form>
            { response.errorMessage.length > 0 ? <div style={{ color: 'red'}}>{response.errorMessage}</div> : null }
        </div>
    )
}