import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { extractJsonFromAsmx } from "../utils/asmx";
import "../styles/Login.css";

export default function Login() {
  const nav = useNavigate();
  const phoneRef = useRef(null);

  useEffect(() => {
    phoneRef.current?.focus();
  }, []);

  const [phone, setPhone] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [otpData, setOtpData] = useState({ otp: "", imei: "", phone: "" });

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading) return;

    setErr("");

    const p = phone.replace(/\D/g, "").slice(0, 10);

    if (p.length !== 10) {
      setErr("Enter valid 10-digit phone number");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `/asmx/InPackService.asmx/validatePhoneno?Phoneno=${p}`
      );

      const text = await res.text();
      const data = extractJsonFromAsmx(text);

      const otp = String(data?.OTP ?? "").trim();
      const imei = String(data?.IMEI ?? "").trim();

      if (!otp) {
        setErr("OTP not received");
        return;
      }

      setOtpData({ otp, imei, phone: p });
      setShowOtpPopup(true);
    } catch {
      setErr("API error");
    } finally {
      setLoading(false);
    }
  };

  const handleProceed = () => {
    localStorage.setItem("phone", otpData.phone);
    localStorage.setItem("otp", otpData.otp);
    localStorage.setItem("imei", otpData.imei);
    nav("/otp");
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
            <h2 className="title">Welcome Back</h2>
            <p className="instructions">Login to continue managing your branches securely.</p>

            <form className="loginForm" onSubmit={handleLogin}>
              <div className="input-group">
                <label>Phone Number 8137028080</label>
                <div className="phoneInputWrapper">
                  <span className="prefix">+91</span>
                  <input
                    ref={phoneRef}
                    className="loginInput"
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value.replace(/\D/g, ""))
                    }
                    placeholder="Enter phone number"
                  />
                </div>
              </div>

              {err && <p className="errorText">{err}</p>}

              <button className="loginBtn" disabled={loading}>
                {loading ? "Please wait..." : "Continue"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* OTP POPUP OVERLAY */}
      {showOtpPopup && (
        <div className="otp-modal-overlay">
          <div className="otp-popup-card">
            <div className="otp-icon-container">
              <span className="otp-icon-shield"></span>
              <div className="otp-success-glow"></div>
            </div>
            
            <h2 className="otp-popup-title">OTP Received</h2>
            <p className="otp-popup-msg">Your verification code is ready. Use the code below to complete your login.</p>
            
            <div className="otp-code-display">
              {otpData.otp.split('').map((char, index) => (
                <span key={index} className="otp-digit">{char}</span>
              ))}
            </div>

            <button className="otp-proceed-btn" onClick={handleProceed}>
              Verify & Proceed
            </button>
            
            <p className="otp-footer-hint">Security powered by Inpack Authenticator</p>
          </div>
        </div>
      )}
    </div>
  );
}