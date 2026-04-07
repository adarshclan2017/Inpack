import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { extractJsonFromAsmx } from "../utils/asmx";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/Login.css";

export default function Login() {
  const nav = useNavigate();
  const phoneRef = useRef(null);

  useEffect(() => {
    phoneRef.current?.focus();
  }, []);

  const [phone, setPhone] = useState("8137028080");
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <div className="desktop-page">
      <div className="split-layout">
        {/* LEFT PANEL */}
        <motion.div 
          className="left-panel"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { staggerChildren: 0.2, delayChildren: 0.2 }
            }
          }}
        >
          <motion.div 
            className="brand" 
            variants={{
              hidden: { y: 40, opacity: 0, scale: 0.9 },
              visible: { y: 0, opacity: 1, scale: 1, transition: { type: "spring", stiffness: 80, damping: 20 } }
            }}
          >
            <h1 className="logo">inpack</h1>
            <p className="subtitle">Secure and efficient branch management.</p>
          </motion.div>
          <motion.div 
            className="illustration-wrapper"
            variants={{
              hidden: { opacity: 0, x: -50, rotate: -5 },
              visible: { 
                opacity: 1, x: 0, rotate: 0,
                transition: { type: "spring", stiffness: 60, damping: 15 }
              }
            }}
          >
            <motion.img 
              src="/illustration.png" 
              alt="illustration" 
              className="desktop-illustration" 
              animate={{ y: [0, -15, 0], rotate: [0, 2, -2, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>

        {/* RIGHT PANEL - FORM */}
        <motion.div 
          className="right-panel"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 70, damping: 20, delay: 0.3 }}
        >
          <div className="form-container">
            <motion.h2 
              className="title"
              initial={{ opacity: 0, y: -30, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.6 }}
            >
              Welcome Back
            </motion.h2>
            <motion.p 
              className="instructions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              Login to continue managing your branches securely.
            </motion.p>

            <motion.form 
              className="loginForm" 
              onSubmit={handleLogin}
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { 
                  opacity: 1,
                  transition: { staggerChildren: 0.15, delayChildren: 0.9 }
                }
              }}
            >
              <motion.div 
                className="login-form-group"
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0, transition: { type: "spring" } }
                }}
              >
                <label>Phone Number</label>
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
              </motion.div>

              <AnimatePresence>
                {err && (
                  <motion.p 
                    className="errorText"
                    initial={{ opacity: 0, height: 0, scale: 0.9 }}
                    animate={{ opacity: 1, height: "auto", scale: 1 }}
                    exit={{ opacity: 0, height: 0, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  >
                    {err}
                  </motion.p>
                )}
              </AnimatePresence>

              <motion.button 
                className="loginBtn" 
                disabled={loading}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { type: "spring"} }
                }}
                whileHover={{ scale: 1.05, boxShadow: "0 10px 20px -10px rgba(0,0,0,0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                {loading ? "Please wait..." : "Continue"}
              </motion.button>
            </motion.form>
          </div>
        </motion.div>
      </div>

      {/* OTP POPUP OVERLAY */}
      <AnimatePresence>
        {showOtpPopup && (
          <motion.div 
            className="otp-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="otp-popup-card"
              initial={{ scale: 0.5, opacity: 0, y: 50, rotateX: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
              exit={{ scale: 0.5, opacity: 0, y: 50, rotateX: 20 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              style={{ perspective: 1000 }}
            >
              <div className="otp-icon-container">
                <span className="otp-icon-shield"></span>
                <div className="otp-success-glow"></div>
              </div>

              <h2 className="otp-popup-title">OTP Received</h2>
              <p className="otp-popup-msg">Your verification code is ready. Use the code below to complete your login.</p>

              <div className="otp-code-display">
                {otpData.otp.split('').map((char, index) => (
                  <motion.span 
                    key={index} 
                    className="otp-digit"
                    initial={{ opacity: 0, y: -20, scale: 0.5 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15, delay: index * 0.1 + 0.3 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>

              <motion.button 
                className="otp-proceed-btn" 
                onClick={handleProceed}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.05, boxShadow: "0 8px 15px -5px rgba(255, 96, 68, 0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                Verify & Proceed
              </motion.button>

              <p className="otp-footer-hint">Security powered by Inpack Authenticator</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}