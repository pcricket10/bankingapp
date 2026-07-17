import { useState } from 'react';

function LoginForm({ onLoginSuccess }) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	async function handleLogin(e) {
		e.preventDefault();
		setError('');

		try {
			const response = await fetch('http://localhost:8080/api/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username, password }),
			});

			const data = await response.json();
			if (!response.ok) {
				throw new Error(data?.error || `HTTP ${response.status}`);
			}

			onLoginSuccess(data.token, data.account.acctNumber);
		} catch (err) {
			setError(err.message);
		}
	}

	return (
		<>
			<form onSubmit={handleLogin}>
				<input
					type="text"
					placeholder="Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button type="submit">Login</button>
			</form>
			{error && <p>Error: {error}</p>}
		</>
	);
}

export default LoginForm;
