import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Otp.css";

export default function Otp() {
  const nav = useNavigate();

  const savedOtp = localStorage.getItem("otp") || "";
  const phone = localStorage.getItem("phone") || "";
  const imei = localStorage.getItem("imei") || "";

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [err, setErr] = useState("");
  const inputs = useRef([]);

  useEffect(() => {
    inputs.current[0]?.focus();
  }, []);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // auto move next
    if (value && index < 3) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 3) {
      inputs.current[index + 1]?.focus();
    } else if (e.key === "Enter") {
      e.preventDefault();
      verifyOtp(e);
    }
  };

  const verifyOtp = (e) => {
    e.preventDefault();
    setErr("");

    const enteredOtp = otp.join("").trim();

    if (enteredOtp.length !== 4) {
      setErr("Enter 4 digit OTP");
      return;
    }

    if (enteredOtp !== savedOtp) {
      setErr("Invalid OTP");
      return;
    }

    // ✅ store user data
    const userData = {
      phone,
      imei,
      loginAt: new Date().toISOString(),
      isLoggedIn: true,
    };

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.removeItem("otp");

    nav("/branchselect");
  };

  return (
    <div className="desktop-page">
      <div className="split-layout">
        {/* LEFT PANEL */}
        <div className="left-panel">
          <div className="brand">
            <h1 className="logo">inpack</h1>
            <p className="subtitle">Secure and efficient branch management.</p>
          </div>
          <div className="illustration-wrapper">
            <img src="/illustration.png" alt="illustration" className="desktop-illustration" />
          </div>
        </div>

        {/* RIGHT PANEL - FORM */}
        <div className="right-panel">
          <div className="form-container">
            <h2 className="title">Verify OTP</h2>
            <p className="instructions">Enter the 4-digit code sent to your phone.</p>

            <form onSubmit={verifyOtp}>
              <div className="input-group">
                <label>Verification Code</label>
                <div className="otpBoxes">
                  {otp.map((d, i) => (
                    <input
                      key={i}
                      ref={(el) => (inputs.current[i] = el)}
                      maxLength={1}
                      value={d}
                      onChange={(e) => handleChange(e.target.value, i)}
                      onKeyDown={(e) => handleKeyDown(e, i)}
                      className="otpInput"
                    />
                  ))}
                </div>
              </div>

              {err && <p className="otpError">{err}</p>}

              <button className="otpBtn">Verify</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}