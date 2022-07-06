const LoginForm = ({
  handleSubmit,
  handleEmailChange,
  handlePasswordChange,
  email,
  password,
}) => {
  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
          Email
          <input value={email} onChange={handleEmailChange}></input>
        </div>
        <div>
          Password
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          ></input>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
