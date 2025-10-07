import React, { useState } from "react";
import GenerateBtn from "./GenerateBtn";
import Layout from "./Layout";

export default function App() {
  const [showPreview, setShowPreview] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [emailContent, setEmailContent] = useState('');

  const handleGenerateClick = () => {
    setShowLoading(true);
    setTimeout(() => {
      const newTemp = {
        "data": [
          {
            "deal": {
              "price": 129,
              "title": "Combito Chicken Tender Sandwich",
              "reason": "Lower price than a comparable KFC chicken sandwich combo and includes a 600ml drink for better value.",
              "promoBadge": "Combo Deal",
              "description": "Honey Mustard Chicken Tender Sandwich (2 chicken tenders) + French Fries + 600ml Coca‑Cola."
            }
          },
          {
            "deal": {
              "price": 139,
              "title": "Combo Famous Star Value",
              "reason": "Budget-friendly burger combo with fries and a full 600ml drink, offering more value than a typical KFC burger/sandwich combo at a similar price.",
              "promoBadge": "Value Combo",
              "description": "Famous Star with Cheese + French Fries + 600ml Fanta."
            }
          },
          {
            "deal": {
              "price": 169,
              "title": "Combito 3 Chicken Tenders",
              "reason": "Includes 3 hand-breaded tenders plus fries and a 600ml drink, giving a better per-piece price and larger drink than many KFC tender combos.",
              "promoBadge": "Tenders Combo",
              "description": "3 Hand-Breaded Chicken Tenders + French Fries + 600ml Coca‑Cola Light."
            }
          },
          {
            "deal": {
              "price": 159,
              "title": "BOGO The Big Carl",
              "reason": "Buy one, get one free—two premium burgers for the price of one, delivering far more sandwich value than a single comparable KFC item.",
              "promoBadge": "BOGO",
              "description": "Buy 1 The Big Carl and get another free (burgers only; fries and drinks not included)."
            }
          },
          {
            "deal": {
              "price": 259,
              "title": "Duo Familiar de Pollo (Family Duo)",
              "reason": "Feeds two with sandwiches, fries, and 600ml drinks each, at a lower per-person cost than purchasing two separate KFC combos.",
              "promoBadge": "Meal for 2",
              "description": "2 Classic Chicken Sandwiches + 2 French Fries + 2 Drinks (600ml each, choice available)."
            }
          }
        ]
      };
      const html = buildEmailTemplateFromDeals(newTemp);
      setEmailContent(html);
      setShowLoading(false);
      setShowPreview(true);
    }, 3000);
  };

  function buildEmailTemplateFromDeals(newTemp: any) {
    const bgColor = '#f6f7f9';
    const cardBg = '#fffdfa';
    const cardShadow = '0 6px 32px rgba(10,77,10,0.10)';
    const headerColor = '#0a4d0a';
    const badgeBg = '#0a4d0a';
    const badgeColor = '#fff';
    const priceColor = '#0a4d0a';
    const descColor = '#333';

    const dealsHtml = newTemp.data.map(({ deal }: any) => {
      // Only show 'includes' if there are multiple ingredients (split by '+')
      let includes = [];
      if (deal.description && deal.description.includes('+')) {
        includes = deal.description.split('+').map((i: any) => i.trim());
      }
      return `
        <tr>
          <td style="padding:0 0 32px 0;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:${cardBg};border-radius:18px;box-shadow:${cardShadow};margin:0 auto;">
              <tr>
                <td style="padding:32px 32px 24px 32px;">
                  <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:18px;">
                    <div style="display:flex;align-items:center;gap:14px;">
                      <span style="font-size:22px;color:${headerColor};font-family:Arial,sans-serif;font-weight:700;line-height:1.2;">
                        <span style="position:relative;cursor:help;" title="${deal.reason}">
                          ${deal.title}
                        </span>
                        <span style="display:inline-block;background:${badgeBg};color:${badgeColor};font-size:14px;font-weight:600;padding:5px 14px;border-radius:10px;letter-spacing:1px;margin-left:12px;">${deal.promoBadge}</span>
                      </span>
                    </div>
                    <span style="font-size:19px;color:${priceColor};font-weight:700;font-family:Arial,sans-serif;">MX$${deal.price}</span>
                  </div>
                  ${includes.length > 1 ? `
                  <div style="margin-bottom:16px;">
                    <span style="font-size:16px;color:${descColor};font-family:Arial,sans-serif;">Includes:</span>
                    <ul style="margin:8px 0 0 18px;padding:0;font-size:15px;color:${descColor};font-family:Arial,sans-serif;">
                      ${includes.map((item: any) => `<li style='margin-bottom:4px;'>${item}</li>`).join('')}
                    </ul>
                  </div>
                  ` : ''}
                  <div style="font-size:15px;color:${descColor};font-family:Arial,sans-serif;line-height:1.5;">${deal.description}</div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      `;
    }).join('');

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Your lunch deals are waiting...</title>
    </head>
    <body style="margin:0;padding:0;background:${bgColor};font-family:Arial,sans-serif;color:${descColor};">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:${bgColor};padding:0;margin:0;">
        <tr>
          <td align="center">
            <table width="640" cellpadding="0" cellspacing="0" style="margin:40px auto 0 auto;background:transparent;border-radius:20px;">
              <tr>
                <td style="padding:0;text-align:left;">
                  <h1 style="margin:0 0 18px 0;font-size:32px;color:${headerColor};font-family:Arial,sans-serif;">Your lunch deals are waiting...</h1>
                  <div style="font-size:18px;color:${descColor};margin-bottom:36px;font-family:Arial,sans-serif;">Short on time? These craveable combos are built for quick pick-up and big value. Choose your flavor, we'll handle the speed.</div>
                </td>
              </tr>
              ${dealsHtml}
            </table>
          </td>
        </tr>
      </table>
      <div style="margin-top:32px;color:${descColor};font-size:13px;text-align:center;opacity:0.85;font-family:Arial,sans-serif;">
        Prices are shown for comparison and presentation purposes.
      </div>
    </body>
    </html>
    `;
  }

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
                Generate promotional content based on competitor's promotions in your area
              </p>
              {/*<button onClick={handleGenerateClick} >generate (fake) content</button>*/}
              <GenerateBtn
                onSuccess={(data) => {
                  const html = buildEmailTemplateFromDeals(data);
                  setEmailContent(html);
                  setShowPreview(true);
                  console.log({ data });
                }}
              />
            </>
          ) : (
            <div className="preview-content">
              <div className="preview-footer">
                <button className="send-btn" onClick={() => { console.log(emailContent); }}>
                  send content
                  <span style={{ display: "inline-flex", alignItems: "center" }}>
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
              <div style={{ border: '1px solid #ccc', padding: '1rem', background: '#fff', borderRadius: '8px', overflow: 'auto', minHeight: '400px' }}>
                <div dangerouslySetInnerHTML={{ __html: emailContent }} />
              </div>
            </div>
          )}
        </main>
      </div>
    </Layout>
  );
}
