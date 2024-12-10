import { use, useState } from "react";

export const SignupView = () => {
    const [Name, setName] = useState("");
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [Email, setEmail] = useState("");
    const [Birthday, setBirthday] = useState("");

    const [errors, setErrors] = useState({});

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
                const errorData = await response.json();
                if (errorData.errors) {
                    const fieldErrors = {};
                    errorData.errors.forEach((err) => {
                        fieldErrors[err.param] = err.msg;
                    });
                    setErrors(fieldErrors);
                } else if (errorData.message) {
                    setErrors({ general: errorData.message });
                } else {
                    setErrors({ general: "Signup failed. Please try again." });
                }
            }
        } catch (error) {
            console.error("Error during signup:", error);
             setErrors({ general: "Something went wrong. Please try again later." });
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
            {errors.Name && <div className="error-message">{errors.Name}</div>}
            {errors.Username && <div className="error-message">{errors.Username}</div>}
            {errors.Password && <div className="error-message">{errors.Password}</div>}
            {errors.Email && <div className="error-message">{errors.Email}</div>}
            {errors.Birthday && <div className="error-message">{errors.Birthday}</div>}
            {errors.general && <div className="error-message">{errors.general}</div>}
        </form>
    );
};