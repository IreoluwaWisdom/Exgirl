import React, { useState, useEffect } from "react";
import {
  getAuth,
  verifyPasswordResetCode,
  confirmPasswordReset,
} from "firebase/auth";

const ResetPassword = () => {
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Extract reset code from URL parameters
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("oobCode");
    setResetCode(code);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Verify the password reset code
      await verifyPasswordResetCode(getAuth(), resetCode);

      // Confirm password reset
      await confirmPasswordReset(getAuth(), resetCode, newPassword);

      // Password reset successful
      setSuccess(true);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  if (success) {
    return (
      <p>
        Password reset successful. You can now login with your new password.
      </p>
    );
  }

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default ResetPassword;
