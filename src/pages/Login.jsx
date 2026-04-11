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
      console.log("LOGIN API RESPONSE DATA:", data);

      const otp = String(data?.OTP || data?.otp || "").trim();
      const imei = String(data?.IMEI || data?.imei || "").trim();

      if (!otp) {
        setErr("OTP not received");
        return;
      }

      localStorage.setItem("phone", p);
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
      transition: { 
        staggerChildren: 0.12, 
        delayChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 25, opacity: 0, scale: 0.95 },
    visible: { 
      y: 0, 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 25 }
    }
  };

  const formElementVariants = {
    hidden: { opacity: 0, x: -15 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { type: "spring", stiffness: 400, damping: 30 }
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
              transition: { staggerChildren: 0.25, delayChildren: 0.3 }
            }
          }}
        >
          <motion.div 
            className="brand" 
            variants={{
              hidden: { y: 30, opacity: 0, scale: 0.8 },
              visible: { 
                y: 0, 
                opacity: 1, 
                scale: 1, 
                transition: { type: "spring", stiffness: 100, damping: 15 } 
              }
            }}
          >
            <h1 className="logo">inpack</h1>
            <motion.p 
              className="subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
            >
              Secure and efficient branch management.
            </motion.p>
          </motion.div>
          <motion.div 
            className="illustration-wrapper"
            variants={{
              hidden: { opacity: 0, x: -40, rotate: -3, scale: 0.9 },
              visible: { 
                opacity: 1, x: 0, rotate: 0, scale: 1,
                transition: { type: "spring", stiffness: 50, damping: 12 }
              }
            }}
          >
            <motion.img 
              src="/illustration.png" 
              alt="illustration" 
              className="desktop-illustration" 
              animate={{ 
                y: [0, -18, 0],
                rotate: [0, 1.5, -1.5, 0],
                scale: [1, 1.02, 1]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 7, 
                ease: "easeInOut" 
              }}
            />
          </motion.div>
        </motion.div>

        {/* RIGHT PANEL - FORM */}
        <motion.div 
          className="right-panel"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.4 }}
        >
          <div className="form-container">
            <motion.h2 
              className="title"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.7 }}
            >
              Welcome Back
            </motion.h2>
            <motion.p 
              className="instructions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 1 }}
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
                  transition: { staggerChildren: 0.1, delayChildren: 1.1 }
                }
              }}
            >
              <motion.div 
                className="login-form-group"
                variants={formElementVariants}
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

              <AnimatePresence mode="wait">
                {err && (
                  <motion.p 
                    className="errorText"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    {err}
                  </motion.p>
                )}
              </AnimatePresence>

              <motion.button 
                className="loginBtn" 
                disabled={loading}
                variants={formElementVariants}
                whileHover={{ 
                  scale: 1.03, 
                  boxShadow: "0 12px 24px -8px rgba(0,0,0,0.25)",
                  backgroundColor: "#ff5035"
                }}
                whileTap={{ scale: 0.97 }}
              >
                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.span
                      key="loading"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <i className="fa-solid fa-circle-notch fa-spin"></i> Please wait...
                    </motion.span>
                  ) : (
                    <motion.span
                      key="continue"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      Continue
                    </motion.span>
                  )}
                </AnimatePresence>
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
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="otp-popup-card"
              initial={{ scale: 0.7, opacity: 0, y: 40, rotateX: -15 }}
              animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
              exit={{ scale: 0.7, opacity: 0, y: 40, rotateX: 15 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 25, 
                mass: 1.2
              }}
              style={{ perspective: 1200 }}
            >
              <motion.div 
                className="otp-icon-container"
                initial={{ rotate: -45, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              >
                <span className="otp-icon-shield"></span>
                <div className="otp-success-glow"></div>
              </motion.div>

              <h2 className="otp-popup-title">OTP Received</h2>
              <p className="otp-popup-msg">Your verification code is ready. Use the code below to complete your login.</p>

              <div className="otp-code-display">
                {otpData.otp.split('').map((char, index) => (
                  <motion.span 
                    key={index} 
                    className="otp-digit"
                    initial={{ opacity: 0, y: 20, scale: 0.5 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 400, 
                      damping: 18, 
                      delay: index * 0.08 + 0.45 
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>

              <motion.button 
                className="otp-proceed-btn" 
                onClick={handleProceed}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 10px 20px -8px rgba(255, 96, 68, 0.5)" 
                }}
                whileTap={{ scale: 0.95 }}
              >
                Verify & Proceed
              </motion.button>

              <motion.p 
                className="otp-footer-hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                Security powered by Inpack Authenticator
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}