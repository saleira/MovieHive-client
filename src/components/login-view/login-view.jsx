import React, {useState}  from "react";

export const LoginView = ({onLoggedIn}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`https://movie-hive-ee3949a892be.herokuapp.com/login?Username=${username}&Password=${password}`, {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
            });
            
            if (response.ok) {
                const data = await response.json();
                console.log("Response Data:", data);
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", data.token);
                onLoggedIn(data.user, data.token);
            } else {
                alert("Login failed");
            }
        } catch (error) {
            console.error("Error during fetch:", error);
            alert('Something went wrong. Please try again.');
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required/>
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
            </label>
            <button tupe="submit">Submit</button>
        </form>
    );
};

