import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      {/* Top bar */}
      <header
        style={{
          height: 72,
          background: "#fbfbff",
          color: "white",
          display: "flex",
          alignItems: "center",
          padding: "0 20px",
          fontWeight: 700,
          boxSizing: "border-box",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          zIndex: 1,
        }}
      >
        <img
          src="/logo-main-primary.svg"
          alt="Logo"
          style={{ height: 40, marginRight: 16 }}
        />
      </header>

      <div style={{ display: "flex", flex: 1 }}>
        {/* Left sidebar */}
        <nav
          style={{
            width: 220,
            background: "#fbfbff",
            borderRight: "2px solid rgba(0,0,0,0.06)",
            padding: 20,
            boxSizing: "border-box",
          }}
        >
          <ul
            style={{
              padding: 0,
              margin: 0,
              listStyle: "none",
              color: "#6b6b6b",
            }}
          >
            {["Home", "Journeys", "Campaigns", "Audience", "Promotions"].map(
              (label) => (
                <li
                  key={label}
                  style={{
                    padding: "0.5rem 0.5rem",
                    background: label === "Promotions" ? "#e8d5ea" : "none",
                    borderRadius: 6,
                    margin: "0.75rem",
                  }}
                >
                  <button
                    style={{
                      width: "100%",
                      border: "none",
                      background: label === "Promotions" ? "#e8d5ea" : "none",
                      color: label === "Promotions" ? "#85338e" : "#6b6b6b",
                      fontSize: "16px",
                      textAlign: "left",
                      padding: 0,
                      cursor: "pointer",
                    }}
                  >
                    {label}
                  </button>
                </li>
              )
            )}
          </ul>
        </nav>

        {/* Main content area */}
        <main
          style={{
            flex: 1,
            overflow: "auto",
            padding: 24,
            boxSizing: "border-box",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
