import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Register() {
  const [felhasznaloNev, setFelhasznaloNev] = useState("");
  const [jelszo, setJelszo] = useState("");
  const [hiba, setHiba] = useState("");
  const [toltes, setToltes] = useState(false); 

  const navigate = useNavigate();

  const regisztracio = async () => {
    if (!felhasznaloNev || !jelszo) {
      setHiba("You must fill all fields");
      return;
    }

    setHiba("");
    setToltes(true);

    try {

      const response = await fetch("/api/Auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ felhasznaloNev, jelszo }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/", {
          state: { uzenet: "Successful registration" }
        });
      } else {
        setHiba(data.message || "There was an error during registtration");
      }
    } catch (error) {
      setHiba("Could not connect to server");
    } finally {
      setToltes(false);
    }
  };

  return (
    <div className="register">
      <h2>Regisztráció</h2>

      {hiba && <p className="hiba" style={{color: "red", textAlign:"center"}}>{hiba}</p>}

      <input
        type="text"
        placeholder="Username"
        value={felhasznaloNev}
        onChange={(e) => setFelhasznaloNev(e.target.value)}
        disabled={toltes}
      />

      <input
        type="password"
        placeholder="Password"
        value={jelszo}
        onChange={(e) => setJelszo(e.target.value)}
        disabled={toltes}
      />

      <button 
        onClick={regisztracio} 
        style={{marginTop:"10px"}}
        disabled={toltes}
      >
        {toltes ? "In progress" : "Registration"}
      </button>
    </div>
  );
}

export default Register;