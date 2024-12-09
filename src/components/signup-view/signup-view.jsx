import { use, useState } from "react";

export const SignupView = () => {
    const [Name, setName] = useState("");
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [Email, setEmail] = useState("");
    const [Birthday, setBirthday] = useState("");

    const handleSubmit = async e => {
        e.preventDefault();

        const data = {
            Name: Name,
            Username: Username,
            Password: Password,
            Email: Email,
            Birthday: Birthday
        };

        try {
            const response = await fetch("https://movie-hive-ee3949a892be.herokuapp.com/users", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {"Content-Type": "application/json"}
            });

            if (response.ok) {
                alert("Signup successful");
                window.location.reload();
            } else {
                alert("Signup failed");
            }
        } catch {
            console.error("Error during signup:", error);
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" value={Name} onChange={(e) => setName(e.target.value)} required minLength="3"/>
            </label>
            <label>
                Username:
                <input type="text" value={Username} onChange={(e) => setUsername(e.target.value)} required minLength="3" />
            </label>
            <label>
                Password:
                <input type="password" value={Password} onChange={(e) => setPassword(e.target.value)} required />
            </label>
            <label>
                Email:
                <input type="email" value={Email} onChange={e => setEmail(e.target.value)} required />
            </label>
            <label>
                Birthday:
                <input type="date" value={Birthday} onChange={e => setBirthday(e.target.value)} required />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};