import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/BranchSelect.css";

export default function BranchSelect() {
  const nav = useNavigate();
  const inputs = useRef([]);
  const selectRef = useRef(null);

  const [company, setCompany] = useState("");
  const [pin, setPin] = useState(["", "", "", ""]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    selectRef.current?.focus();
  }, []);

  const handleSelectKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      inputs.current[0]?.focus();
    }
  };

  const handlePinChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    // auto move next
    if (value && index < 3) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 3) {
      inputs.current[index + 1]?.focus();
    } else if (e.key === "Enter") {
      e.preventDefault();
      handleLogin();
    }
  };

  const handleLogin = () => {
    if (!company) {
      setMsg("Select company");
      return;
    }

    if (pin.join("").length !== 4) {
      setMsg("Enter 4 digit PIN");
      return;
    }

    localStorage.setItem(
      "branch",
      JSON.stringify({ company, pin: pin.join("") })
    );

    if (company === "HOME") {
      nav("/welcome");
    } else {
      setMsg("Login Successful!");
    }
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
            <h2 className="title">Select Branch</h2>
            <p className="instructions">Please select your company and enter your 4-digit PIN to continue.</p>

            <div className="login-form-group">
              <label>Select Company</label>
              <select
                ref={selectRef}
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                onKeyDown={handleSelectKeyDown}
                className="select"
              >
                <option value="">Select Company</option>
                <option>HOME</option>
              </select>
            </div>

            <div className="login-form-group">
              <label>Enter PIN code</label>
              <div className="pinBox">
                {pin.map((d, i) => (
                  <input
                    key={i}
                    ref={(el) => (inputs.current[i] = el)}
                    maxLength={1}
                    value={d}
                    onChange={(e) => handlePinChange(e.target.value, i)}
                    onKeyDown={(e) => handleKeyDown(e, i)}
                  />
                ))}
              </div>
            </div>

            <button className="loginBtn" onClick={handleLogin}>
              Login
            </button>

            {msg && <p className="msg">{msg}</p>}

            <p className="back" onClick={() => nav("/login")}>
              Back to Login
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}