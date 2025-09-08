import React from "react";
import { DownOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const HeroBanner = () => {
  const { t } = useTranslation();

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        marginBottom: "24px",
      }}
    >
      <div
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1350&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "700px",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          padding: "0 40px",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "50px", marginBottom: 16, fontWeight: "bold" }}>
          {t("hero.title")}
        </h1>
        <p style={{ fontSize: "25px", maxWidth: 600, marginBottom: 40 }}>
          {t("hero.subtitle")}
        </p>

        <button
          onClick={() => {
            window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
          }}
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            border: "none",
            borderRadius: "50%",
            width: 50,
            height: 50,
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
            fontSize: "24px",
            transition: "background-color 0.3s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.6)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.3)")
          }
          aria-label="Scroll down"
        >
          <DownOutlined />
        </button>
      </div>
    </div>
  );
};

export default HeroBanner;
