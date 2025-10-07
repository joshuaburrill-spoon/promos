import React, { useState } from "react";
import GenerateBtn from "./GenerateBtn";
import Layout from "./Layout";

export default function App() {
  const [showPreview, setShowPreview] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  const temp = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Today's Best Deals</title>
  <style>
    :root {
      --bg: #0f1220;
      --card: #171a2b;
      --ink: #e9ecf1;
      --muted: #b8bfd1;
      --accent: #ffcc33;
      --accent-ink: #1b1e2f;
      --outline: #2a2f49;
      --ok: #3bd67f;
    }

    html, body {
      margin: 0;
      height: 100%;
      background: radial-gradient(1200px 800px at 80% -10%, #1a1e35 0%, var(--bg) 60%);
      color: var(--ink);
      font-family: system-ui, -apple-system, Segoe UI, Roboto, Inter, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji";
    }

    .wrap {
      max-width: 1100px;
      margin: 48px auto;
      padding: 0 20px 48px;
    }

    header {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
      margin-bottom: 18px;
    }

    h1 {
      font-size: 34px;
      line-height: 1.1;
      margin: 0;
      letter-spacing: 0.2px;
    }

    .sub {
      color: var(--muted);
      font-size: 14px;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 18px;
    }

    .card {
      background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01)), var(--card);
      border: 1px solid var(--outline);
      border-radius: 14px;
      padding: 16px;
      box-shadow: 0 10px 26px rgba(0,0,0,0.25);
    }

    .price {
      display: inline-block;
      font-weight: 700;
      color: var(--ink);
      background: linear-gradient(90deg, var(--accent), #ffd772);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 22px;
    }

    .deal-name {
      display: inline-block;
      font-weight: 750;
      font-size: 18px;
      margin: 6px 0 10px;
      color: #ffffff;
      position: relative;
      cursor: help;
      text-decoration: none;
      border-bottom: 1px dashed rgba(255,255,255,0.35);
    }

    /* Custom tooltip powered by data-reason */
    .deal-name:hover::after,
    .deal-name:focus::after {
      content: attr(data-reason);
      position: absolute;
      left: 0;
      top: calc(100% + 8px);
      width: min(320px, 80vw);
      background: #0c0f1e;
      color: #e8edf8;
      border: 1px solid #2b335a;
      padding: 10px 12px;
      border-radius: 10px;
      font-size: 13px;
      line-height: 1.35;
      box-shadow: 0 8px 24px rgba(0,0,0,0.35);
      z-index: 10;
      white-space: normal;
    }

    .pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 10px;
      font-size: 12px;
      border-radius: 999px;
      background: rgba(59, 214, 127, 0.12);
      color: #6cf0a7;
      border: 1px solid rgba(59, 214, 127, 0.4);
    }

    .meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
    }

    .items, .desc {
      color: var(--muted);
      font-size: 14px;
      margin: 8px 0 0;
    }

    .items {
      list-style: disc;
      padding-left: 18px;
    }

    footer {
      margin-top: 28px;
      color: var(--muted);
      font-size: 12px;
      text-align: center;
      opacity: 0.85;
    }
  </style>
</head>
<body>
  <div class="wrap">
    <header>
      <h1>Handpicked Value Deals</h1>
      <div class="sub">Hover a deal name to see why it outshines typical KFC offers.</div>
    </header>

    <section class="grid" aria-label="Deals list">
      <!-- Deal 1 -->
      <article class="card" aria-labelledby="deal1-name">
        <div class="meta">
          <span class="price">$159</span>
        </div>
        <a id="deal1-name" class="deal-name" href="#" title="Flame-grilled variety and a generous 600ml bottle at a sharp price." data-reason="Adds flame‑grilled beef variety you won't find in chicken‑only lineups, with fries and a full 600ml drink for an easy everyday price.">Combo Value Famous Star</a>
        <ul class="items">
          <li>Famous Star with Cheese</li>
          <li>French Fries</li>
          <li>600ml Coca‑Cola (bottle)</li>
        </ul>
        <p class="desc">Save on the classic combo at a competitive price.</p>
      </article>

      <!-- Deal 2 -->
      <article class="card" aria-labelledby="deal2-name">
        <div class="meta">
          <span class="price">$129</span>
          <span class="pill" aria-label="Buy One Get One">BOGO</span>
        </div>
        <a id="deal2-name" class="deal-name" href="#" title="True buy‑one‑get‑one on a spicy tenders sandwich for standout value." data-reason="A real buy‑one‑get‑one on a jalapeño tenders sandwich—effectively half the price per sandwich compared with single‑item chicken deals.">2x1 Jalapeño Chicken Tenders Sandwich</a>
        <p class="desc">Buy one Jalapeño Chicken Tenders Sandwich and get another free.</p>
      </article>

      <!-- Deal 3 -->
      <article class="card" aria-labelledby="deal3-name">
        <div class="meta">
          <span class="price">$199</span>
        </div>
        <a id="deal3-name" class="deal-name" href="#" title="Double‑patty flavor adventure plus a full‑size drink—value beyond basic chicken combos." data-reason="Double beef with a bold teriyaki twist, fries, and a 600ml Fanta—bigger flavor and fullness than many standard chicken combos.">Double Teriyaki Savings Combo</a>
        <ul class="items">
          <li>Double Teriyaki Burger</li>
          <li>French Fries</li>
          <li>600ml Fanta (bottle)</li>
        </ul>
        <p class="desc">Double meat with fries and a soft drink at a special price designed to compete with chicken combos.</p>
      </article>

      <!-- Deal 4 -->
      <article class="card" aria-labelledby="deal4-name">
        <div class="meta">
          <span class="price">$219</span>
        </div>
        <a id="deal4-name" class="deal-name" href="#" title="Shareable box with specialty CrissCut fries and two full 600ml drinks—great for two without the big‑box price." data-reason="Tenders you can share, CrissCut fries, cheese dip, and two 600ml drinks—more to split than typical chicken boxes at a lean price.">Tenders Box for Two</a>
        <ul class="items">
          <li>Hand‑Breaded Chicken Tenders (5 pcs)</li>
          <li>CrissCut Fries</li>
          <li>Cheese Dip</li>
          <li>600ml Coca‑Cola (bottle)</li>
          <li>600ml Sidral Apple Soda (bottle)</li>
        </ul>
        <p class="desc">A shareable box with fries, dip, and two drinks priced to rival big boxes.</p>
      </article>

      <!-- Deal 5 -->
      <article class="card" aria-labelledby="deal5-name">
        <div class="meta">
          <span class="price">$399</span>
        </div>
        <a id="deal5-name" class="deal-name" href="#" title="Premium Angus burgers for two with sides and full‑size drinks—an elevated bundle beyond basic chicken meals." data-reason="Two Original Big Angus burgers, two fries, and two 600ml drinks—premium protein and a complete meal deal for two in one bundle.">Original Big Angus Family Duo</a>
        <ul class="items">
          <li>Original Big Angus Burger</li>
          <li>Original Big Angus Burger</li>
          <li>French Fries</li>
          <li>French Fries</li>
          <li>600ml Coca‑Cola (bottle)</li>
          <li>600ml Coca‑Cola Light (bottle)</li>
        </ul>
        <p class="desc">For two: 2 Angus burgers + 2 fries + 2 drinks with a strong discount versus oversized mega bundles.</p>
      </article>
    </section>

    <footer>
      Prices are shown for comparison and presentation purposes. Hover tooltips summarize why each offer may be a better pick than typical KFC deals.
    </footer>
  </div>
</body>
</html>`;

  const newTemp = {
    data: [
      {
        deal: {
          price: 129,
          title: "Combito Chicken Tender Sandwich",
          reason:
            "Lower price than a comparable KFC chicken sandwich combo and includes a 600ml drink for better value.",
          promoBadge: "Combo Deal",
          description:
            "Honey Mustard Chicken Tender Sandwich (2 chicken tenders) + French Fries + 600ml Coca‑Cola.",
        },
      },
      {
        deal: {
          price: 139,
          title: "Combo Famous Star Value",
          reason:
            "Budget-friendly burger combo with fries and a full 600ml drink, offering more value than a typical KFC burger/sandwich combo at a similar price.",
          promoBadge: "Value Combo",
          description: "Famous Star with Cheese + French Fries + 600ml Fanta.",
        },
      },
      {
        deal: {
          price: 169,
          title: "Combito 3 Chicken Tenders",
          reason:
            "Includes 3 hand-breaded tenders plus fries and a 600ml drink, giving a better per-piece price and larger drink than many KFC tender combos.",
          promoBadge: "Tenders Combo",
          description:
            "3 Hand-Breaded Chicken Tenders + French Fries + 600ml Coca‑Cola Light.",
        },
      },
      {
        deal: {
          price: 159,
          title: "BOGO The Big Carl",
          reason:
            "Buy one, get one free—two premium burgers for the price of one, delivering far more sandwich value than a single comparable KFC item.",
          promoBadge: "BOGO",
          description:
            "Buy 1 The Big Carl and get another free (burgers only; fries and drinks not included).",
        },
      },
      {
        deal: {
          price: 259,
          title: "Duo Familiar de Pollo (Family Duo)",
          reason:
            "Feeds two with sandwiches, fries, and 600ml drinks each, at a lower per-person cost than purchasing two separate KFC combos.",
          promoBadge: "Meal for 2",
          description:
            "2 Classic Chicken Sandwiches + 2 French Fries + 2 Drinks (600ml each, choice available).",
        },
      },
    ],
  };

  const handleGenerateClick = () => {
    setShowLoading(true);
    setTimeout(() => {
      setShowLoading(false);
      setShowPreview(true);
    }, 10000);
  };

  return (
    <Layout>
      <div className="app" style={{ backgroundColor: "#fbfbff" }}>
        <main className="main-section" style={{ backgroundColor: "#fbfbff" }}>
          {showLoading ? (
            <div className="loading-container">
              <div className="spinner" />
              <div className="loading-text">thinking...</div>
            </div>
          ) : !showPreview ? (
            <>
              <h1>Generate a competitive campaign</h1>
              <p className="page-description">
                Generate promotional content based on competitor's promotions in
                your area
              </p>
              <GenerateBtn
                onSuccess={(data) => {
                  console.log({ data });
                }}
              />
            </>
          ) : (
            <div className="preview-content">
              <div className="preview-footer">
                <button className="send-btn">
                  send content
                  <span
                    style={{ display: "inline-flex", alignItems: "center" }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 10L18 10"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M12 4L18 10L12 16"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>
              </div>
              <div className="preview-header">Preview email content</div>
              <div
                style={{
                  overflow: "auto",
                  background: "#f7f7f9",
                  borderRadius: 12,
                  padding: 16,
                  marginBottom: 24,
                }}
              >
                <div dangerouslySetInnerHTML={{ __html: temp }} />
              </div>
            </div>
          )}
        </main>
      </div>
    </Layout>
  );
}
