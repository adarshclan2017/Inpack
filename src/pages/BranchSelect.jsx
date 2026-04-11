import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { extractJsonFromAsmx } from "../utils/asmx";
import "../styles/BranchSelect.css";

export default function BranchSelect() {
  const nav = useNavigate();
  const inputs = useRef([]);
  const selectRef = useRef(null);

  const [selectedBranchId, setSelectedBranchId] = useState("");
  const [pin, setPin] = useState(["", "", "", ""]);
  const [msg, setMsg] = useState("");

  const [companies, setCompanies] = useState([]);
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    selectRef.current?.focus();

    // Fetch dynamic companies and branch data
    const fetchCompanies = async () => {
      const imei = localStorage.getItem("imei") || "";
      if (!imei) return;

      try {
        const res = await fetch(`/asmx/InPackService.asmx/validatePhone?IMEI=${imei}`);
        const text = await res.text();
        const data = extractJsonFromAsmx(text);

        if (data?.success && data?.companies) {
          setCompanies(data.companies);
        }
        if (data?.success && data?.Branches) {
          setBranches(data.Branches);
        }
      } catch (error) {
        console.error("Failed to load companies", error);
      }
    };

    fetchCompanies();
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
    if (!selectedBranchId) {
      setMsg("Please select a branch");
      return;
    }

    const enteredPin = pin.join("");
    if (enteredPin.length !== 4) {
      setMsg("Enter 4-digit PIN");
      return;
    }

    // Find the branch data
    const selectedBranch = branches.find(b => b.branch_id === selectedBranchId);

    if (!selectedBranch) {
      setMsg("Branch details not found.");
      return;
    }

    if (enteredPin !== selectedBranch.pin) {
      setMsg("Incorrect PIN");
      return;
    }

    // Persist all branch details to localStorage as requested ("balance stored in local storage")
    localStorage.setItem("selectedBranch", JSON.stringify(selectedBranch));
    localStorage.setItem("branchId", selectedBranch.branch_id);
    localStorage.setItem("branchName", selectedBranch.branch_name);
    localStorage.setItem("licenseKey", selectedBranch.license_key);
    localStorage.setItem("internalCompanyId", selectedBranch.internal_company_id);
    localStorage.setItem("pin", enteredPin);

    // Update user object in localStorage
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    user.pin = enteredPin;
    user.licenseKey = selectedBranch.license_key;
    user.branchId = selectedBranch.branch_id;
    user.branchName = selectedBranch.branch_name;
    localStorage.setItem("user", JSON.stringify(user));

    nav("/welcome");
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
              <label>Select Branch</label>
              <select
                ref={selectRef}
                value={selectedBranchId}
                onChange={(e) => setSelectedBranchId(e.target.value)}
                onKeyDown={handleSelectKeyDown}
                className="select"
              >
                <option value="">Select Branch</option>
                {branches.map((br, idx) => (
                  <option key={idx} value={br.branch_id}>
                    {br.branch_name}
                  </option>
                ))}
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
