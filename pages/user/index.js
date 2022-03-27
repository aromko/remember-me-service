import { useRouter } from 'next/router'

export default function User() {
    const router = useRouter();

    const registerUser = async event => {
    event.preventDefault()

    const res = await fetch('/api/telegram/user', {
        body: JSON.stringify({
            name: event.target.name.value
        }),
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST'
    });

    const result = await res.json();
    console.log("user added" + JSON.stringify(result));
    //router.push('/');
    // result.user => 'Ada Lovelace'
    }

    return (
    <form onSubmit={registerUser}>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" autoComplete="name" required />
        <button type="submit">Register</button>
    </form>
    )
}