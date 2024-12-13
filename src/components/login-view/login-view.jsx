import React, {useState}  from "react";
import { Button, Form } from "react-bootstrap";

export const LoginView = ({onLoggedIn}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors= {};

        if (!username.trim()) {
            newErrors.username = "Username is required."
        }
        if (!password) {
            newErrors.password = "Password is required."
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0){
            return;
        }

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
                const errorData = await response.json();
                if (errorData.message.includes("username")) {
                    setErrors({ username: errorData.message });
                } else if (errorData.message.includes("password")) {
                    setErrors({ password: errorData.message });
                } else {
                    setErrors({ general: errorData.message || "Login failed. Please try again." });
                }
            }
        } catch (error) {
            console.error("Error during fetch:", error);
            setErrors({ general: "Something went wrong. Please try again later." });
        }
    }
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} required minLength="3"/>
            </Form.Group>
            <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
            </Form.Group>
            <Button variant="primary" type="submit">Login</Button>
            {errors.username && <div className="error-message">{errors.username}</div>}
            {errors.password && <div className="error-message">{errors.password}</div>}
            {errors.general && <div className="error-message">{errors.general}</div>}
        </Form>
        
    );
};

