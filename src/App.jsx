import { useState, useRef } from "react";
import { Analytics } from "@vercel/analytics/react";
import "./App.css";

const messages = [
  "Hey beautiful, I'm right here with you ❤️",
  "You don't have to be productive today. Just rest 🫂",
  "If I were there, you'd be getting a very long hug right now 🥺",
  "You're still the cutest person in the world to me 🌸",
  "Today is officially a day for being spoiled 👑",
  "Take it easy, drink something warm and relax ☕❤️",
  "Everything feels a little easier with a hug. So here's one 🫂",
  "Remember to breathe deeply, relax your shoulders, and smile 😊",
];

function App() {
  const [message, setMessage] = useState(
    "Click a button below whenever you need a little love ❤️"
  );
  const [hearts, setHearts] = useState([]);
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [sealPopped, setSealPopped] = useState(false);
  const [letterHearts, setLetterHearts] = useState([]);
  const [activePrescription, setActivePrescription] = useState(null);
  const letterSectionRef = useRef(null);

  const triggerGlobalHearts = (count = 10) => {
    const newHearts = Array.from({ length: count }, (_, i) => ({
      id: Date.now() + i + Math.random(),
      left: Math.random() * 95 + 2.5,
      size: Math.random() * 16 + 18,
      duration: Math.random() * 1.5 + 2,
      icon: ["❤️", "💖", "🌸", "✨", "💕", "🧸"][Math.floor(Math.random() * 6)],
    }));

    setHearts((prev) => [...prev, ...newHearts]);

    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => !newHearts.some((nh) => nh.id === h.id)));
    }, 3500);
  };

  const showMessage = (text) => {
    setMessage(text);
    triggerGlobalHearts(8);
  };

  const randomMessage = () => {
    const random = messages[Math.floor(Math.random() * messages.length)];
    showMessage(random);
  };

  const handleOpenLetter = () => {
    if (isLetterOpen) return;

    setSealPopped(true);

    // Spawn letter burst particles
    const bursts = Array.from({ length: 18 }, (_, i) => {
      const angle = (i / 18) * 360;
      const dist = Math.random() * 140 + 80;
      const rad = (angle * Math.PI) / 180;
      return {
        id: Date.now() + i,
        dx: Math.cos(rad) * dist,
        dy: Math.sin(rad) * dist,
        icon: ["❤️", "💖", "✨", "💌", "🌸", "✨"][Math.floor(Math.random() * 6)],
        scale: Math.random() * 0.6 + 0.8,
      };
    });
    setLetterHearts(bursts);

    setTimeout(() => {
      setIsLetterOpen(true);
      triggerGlobalHearts(12);
    }, 450);

    setTimeout(() => {
      setLetterHearts([]);
    }, 2000);
  };

  const handleCloseLetter = (e) => {
    e.stopPropagation();
    setIsLetterOpen(false);
    setTimeout(() => {
      setSealPopped(false);
    }, 600);
  };

  const handleShowerLove = (e) => {
    e.stopPropagation();
    triggerGlobalHearts(20);
  };

  return (
    <div className="app">
      {/* Floating Hearts Container */}
      <div className="heart-container" aria-hidden="true">
        {hearts.map((heart) => (
          <span
            key={heart.id}
            className="floating-heart"
            style={{
              left: `${heart.left}%`,
              fontSize: `${heart.size}px`,
              animationDuration: `${heart.duration}s`,
            }}
          >
            {heart.icon}
          </span>
        ))}
      </div>

      {/* Center-Screen Prescription Animation Overlay */}
      {activePrescription && (
        <div className="prescription-overlay-backdrop" aria-live="polite">
          <div className="prescription-center-modal">
            {/* Blankets Animation */}
            {activePrescription === "blankets" && (
              <div className="anim-card blankets-anim">
                <div className="anim-visual blanket-scene">
                  <div className="night-moon">🌙</div>
                  <div className="floating-zzz z1">Z</div>
                  <div className="floating-zzz z2">z</div>
                  <div className="floating-zzz z3">z</div>
                  <div className="pillow-bed">
                    <div className="pillow"></div>
                    <div className="cozy-blanket">
                      <div className="blanket-fold"></div>
                      <div className="blanket-heart">💖</div>
                    </div>
                  </div>
                  <div className="sparkle s1">✨</div>
                  <div className="sparkle s2">🌸</div>
                </div>
                <h3>Rest & Cozy Blankets 🛌</h3>
                <p>Wrap yourself in warm fluffy blankets and rest peacefully. You deserve all the cozy comfort today!</p>
              </div>
            )}

            {/* Chocolate Animation */}
            {activePrescription === "chocolate" && (
              <div className="anim-card chocolate-anim">
                <div className="anim-visual chocolate-scene">
                  <div className="choco-bar">
                    <div className="choco-foil">
                      <div className="foil-shine"></div>
                    </div>
                    <div className="choco-grid">
                      <div className="choco-piece p1">🍫</div>
                      <div className="choco-piece p2">🍫</div>
                      <div className="choco-piece p3">🍫</div>
                      <div className="choco-piece p4">🍫</div>
                    </div>
                  </div>
                  <div className="choco-drop d1">✨</div>
                  <div className="choco-drop d2">💖</div>
                  <div className="choco-drop d3">🍫</div>
                </div>
                <h3>Delicious Chocolate 🍫</h3>
                <p>Emergency chocolate delivery! Because sweet treats make any difficult day so much sweeter.</p>
              </div>
            )}

            {/* Warm Drink / Coffee Animation */}
            {activePrescription === "coffee" && (
              <div className="anim-card coffee-anim">
                <div className="anim-visual coffee-scene">
                  <div className="steam-container">
                    <div className="steam-line st1"></div>
                    <div className="steam-line st2"></div>
                    <div className="steam-line st3"></div>
                  </div>
                  <div className="coffee-cup">
                    <div className="cup-rim">
                      <div className="latte-art">❤️</div>
                    </div>
                    <div className="cup-handle"></div>
                  </div>
                  <div className="coffee-saucer"></div>
                  <div className="sparkle s1">✨</div>
                  <div className="sparkle s2">☕</div>
                </div>
                <h3>Something Warm to Drink ☕</h3>
                <p>A comforting warm cup brewed with love to warm your hands and soothe your heart.</p>
              </div>
            )}

            {/* Minions Movie Animation */}
            {activePrescription === "movie" && (
              <div className="anim-card movie-anim">
                <div className="anim-visual movie-scene">
                  <div className="projector-light"></div>
                  <div className="minion-character">
                    <div className="minion-hair">
                      <span></span><span></span><span></span>
                    </div>
                    <div className="minion-body">
                      <div className="goggle-strap"></div>
                      <div className="goggle-frame">
                        <div className="minion-eye">
                          <div className="pupil"></div>
                        </div>
                      </div>
                      <div className="minion-mouth"></div>
                      <div className="minion-overalls">
                        <div className="overall-pocket">G</div>
                      </div>
                    </div>
                    <div className="minion-hand">🍌</div>
                  </div>
                  <div className="popcorn-box">
                    <div className="popcorn-kernel k1">🍿</div>
                    <div className="popcorn-kernel k2">🍿</div>
                    <div className="popcorn-kernel k3">🍿</div>
                    <div className="popcorn-label">MOVIE</div>
                  </div>
                  <div className="clapper-icon">🎬</div>
                </div>
                <h3>Minions Movie Time! 🍌🍿</h3>
                <p>Grab a big tub of warm popcorn! It&apos;s time to laugh out loud and enjoy your favorite movie.</p>
              </div>
            )}

            {/* Unlimited Hugs Animation */}
            {activePrescription === "hugs" && (
              <div className="anim-card hugs-anim">
                <div className="anim-visual hugs-scene">
                  <div className="hug-pulse-ring r1"></div>
                  <div className="hug-pulse-ring r2"></div>
                  <div className="bears-container">
                    <div className="bear bear-left">🧸</div>
                    <div className="hug-heart">💖</div>
                    <div className="bear bear-right">🐻</div>
                  </div>
                  <div className="floating-hug-heart h1">❤️</div>
                  <div className="floating-hug-heart h2">💕</div>
                  <div className="floating-hug-heart h3">🫂</div>
                </div>
                <h3>Unlimited Hugs 🫂</h3>
                <p>Sending you the tightest, warmest virtual cuddle. Holding you close until everything feels better!</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="hero">
        <div className="small-title">🌸 A tiny website made just for Versha 🌸</div>

        <h1>
          Hey Beautiful
        </h1>

        <p>
          I know today might not be the easiest day...
          <br />
          So I made this little corner of the internet just to make you smile.
        </p>
      </section>

      {/* Dynamic Message Box */}
      <section className="message-card">
        <h2>A little reminder...</h2>
        <p className="message-text">{message}</p>
        {/*<button className="random-btn" onClick={randomMessage}>
          Give me another sweet message ✨
        </button>*/}
      </section>

      {/* Interactive Action Cards */}
      <section className="cards">
        <div
          className="card"
          onClick={() =>
            showMessage("🫂 giving you the biggest warmest hug ever.")
          }
          role="button"
          tabIndex={0}
        >
          <div className="card-icon">🫂</div>
          <h3>Need a Hug?</h3>
          <p>Click me for a warm virtual cuddle.</p>
        </div>

        <div
          className="card"
          onClick={() =>
            showMessage("Emergency chocolate activated! 🍫 You deserve ALL the sweets today.")
          }
          role="button"
          tabIndex={0}
        >
          <div className="card-icon">🍫</div>
          <h3>Emergency Chocolate</h3>
          <p>Because chocolate makes everything better.</p>
        </div>

        <div
          className="card"
          onClick={() =>
            showMessage(
              "If I were there right now, I'd make you comfortable, get you something warm and stay right beside you ❤️"
            )
          }
          role="button"
          tabIndex={0}
        >
          <div className="card-icon">☕</div>
          <h3>Something Warm</h3>
          <p>Take a deep breath and sip some tea.</p>
        </div>

        <div
          className="card"
          onClick={() =>
            showMessage(
              "You're allowed to rest. You're allowed to do nothing. Just take care of yourself today 🌸"
            )
          }
          role="button"
          tabIndex={0}
        >
          <div className="card-icon">🧸</div>
          <h3>Rest Mode</h3>
          <p>No responsibilities for a little while.</p>
        </div>
      </section>

      {/* Prescription List with Center Screen Hover Animations */}
      <section className="prescription">
        <h2>Today&apos;s Prescription 💊</h2>
        <div className="prescription-list">
          <div
            className={`prescription-item ${activePrescription === "blankets" ? "active-item" : ""}`}
            onMouseEnter={() => setActivePrescription("blankets")}
            onMouseLeave={() => setActivePrescription(null)}
            onClick={() =>
              setActivePrescription((prev) => (prev === "blankets" ? null : "blankets"))
            }
          >
            🛌 <span>Rest and cozy blankets</span>
          </div>

          <div
            className={`prescription-item ${activePrescription === "chocolate" ? "active-item" : ""}`}
            onMouseEnter={() => setActivePrescription("chocolate")}
            onMouseLeave={() => setActivePrescription(null)}
            onClick={() =>
              setActivePrescription((prev) => (prev === "chocolate" ? null : "chocolate"))
            }
          >
            🍫 <span>Delicious chocolate</span>
          </div>

          <div
            className={`prescription-item ${activePrescription === "coffee" ? "active-item" : ""}`}
            onMouseEnter={() => setActivePrescription("coffee")}
            onMouseLeave={() => setActivePrescription(null)}
            onClick={() =>
              setActivePrescription((prev) => (prev === "coffee" ? null : "coffee"))
            }
          >
            ☕ <span>Something warm to drink</span>
          </div>

          <div
            className={`prescription-item ${activePrescription === "movie" ? "active-item" : ""}`}
            onMouseEnter={() => setActivePrescription("movie")}
            onMouseLeave={() => setActivePrescription(null)}
            onClick={() =>
              setActivePrescription((prev) => (prev === "movie" ? null : "movie"))
            }
          >
            🎬 <span>Your favorite comforting movie</span>
          </div>

          {/* <div
            className={`prescription-item ${activePrescription === "hugs" ? "active-item" : ""}`}
            onMouseEnter={() => setActivePrescription("hugs")}
            onMouseLeave={() => setActivePrescription(null)}
            onClick={() =>
              setActivePrescription((prev) => (prev === "hugs" ? null : "hugs"))
            }
          >
            🫂 <span>Unlimited hugs</span>
          </div> */}
        </div>
      </section>

      {/* Love Letter Section with Interactive 3D Envelope Animation */}
      <section className="love-letter-section" ref={letterSectionRef}>
        <div className="section-header">
          <span className="badge">Special Delivery 💌</span>
          <h2>A Sealed Letter for You</h2>
          <p>
            {isLetterOpen
              ? "Read it slowly, whenever you need a reminder ❤️"
              : "Click on the wax seal or envelope below to open your letter ✨"}
          </p>
        </div>

        <div className={`envelope-scene ${isLetterOpen ? "envelope-is-open" : "envelope-is-closed"}`}>
          {/* Confetti & Hearts Burst Effect upon Opening */}
          <div className="burst-container" aria-hidden="true">
            {letterHearts.map((item) => (
              <span
                key={item.id}
                className="burst-particle"
                style={{
                  "--dx": `${item.dx}px`,
                  "--dy": `${item.dy}px`,
                  transform: `scale(${item.scale})`,
                }}
              >
                {item.icon}
              </span>
            ))}
          </div>

          {/* The 3D Envelope Component */}
          <div
            className={`envelope-container ${sealPopped ? "seal-popped" : ""} ${isLetterOpen ? "letter-revealed" : ""
              }`}
            onClick={!isLetterOpen ? handleOpenLetter : undefined}
            role="region"
            aria-label="Interactive Love Letter Envelope"
          >
            {/* Envelope Back Layer */}
            <div className="envelope-back"></div>

            {/* The Letter Paper (slides out of envelope) */}
            <div className={`letter-paper ${isLetterOpen ? "letter-paper-open" : "letter-paper-hidden"}`}>
              <div className="letter-header-decor">
                <span className="decor-flower">🌸</span>
                <span className="decor-tag">Special Delivery • Open When Needed</span>
                <span className="decor-flower">🌸</span>
              </div>

              {/* <div className="letter-stamp-mini">
                <span>💌 LOVE</span>
                <small>FOREVER</small>
              </div>*/}

              <div className="letter-inner">
                <h3 className="letter-greeting">Hey Versha,</h3>

                <p className="letter-paragraph">
                  I know I can&apos;t magically make everything feel better, but I hope this little website
                  reminds you that you never have to go through a difficult day alone.
                </p>

                <p className="letter-paragraph">
                  Rest as much as you want, eat whatever makes you happy, watch something comforting,
                  and don&apos;t worry about anything else today.
                </p>

                {/* <p className="letter-subtext">And most importantly, always remember...</p>*/}

                {/*<div className="letter-quote-box">
                  <div className="quote-sparkle">✨</div>
                  <p className="quote-text">
                    You are so deeply loved. You are breathtakingly beautiful. And you are never, ever a burden. ❤️
                  </p>
                  <div className="quote-sparkle">✨</div>
                </div>*/}

                <div className="letter-signature-block">
                  {/*<div className="signature-date">With all my love & care,</div>*/}
                  <div className="signature-name">— adi</div>
                </div>

                {/* Letter Actions */}
                <div className="letter-actions">
                  <button
                    className="action-btn fold-btn"
                    onClick={handleCloseLetter}
                    title="Fold the letter and put it back in the envelope"
                  >
                    ✉️ Fold & Seal Back
                  </button>
                  {/*<button
                    className="action-btn love-btn"
                    onClick={handleShowerLove}
                    title="Send a shower of hearts"
                  >
                    💖 Shower with Love
                  </button>*/}
                </div>
              </div>
            </div>

            {/* Envelope Pocket Flaps (Left, Right, Bottom) */}
            <div className="envelope-pocket">
              <div className="flap-left"></div>
              <div className="flap-right"></div>
              <div className="flap-bottom"></div>
            </div>

            {/* Envelope Top Flap (Animated 3D Flip) */}
            <div className="envelope-flap-top"></div>

            {/* Addressing and Postage Details on Closed Envelope */}
            <div className="envelope-front-details">
              <div className="postage-stamp">
                <div className="stamp-inner">
                  <span className="stamp-icon">🕊️</span>
                  <span className="stamp-text">AIR MAIL</span>
                  {/*<span className="stamp-val">100% LOVE</span>*/}
                </div>
                {/*<div className="postmark-circle">
                  <span>FOR VERSHA</span>
                </div>*/}
              </div>

              <div className="envelope-address">
                <div className="address-line recipient">To: Versha 🌸</div>
                {/*<div className="address-subline">The most wonderful person in my world</div>*/}
                {/* <div className="address-line sender">From: adi</div>*/}
              </div>
            </div>

            {/* 3D Wax Seal with Tap Trigger */}
            <div
              className={`wax-seal ${sealPopped ? "popped" : ""}`}
              onClick={handleOpenLetter}
              title="Click to open letter"
              tabIndex={0}
              role="button"
              aria-label="Open Love Letter"
            >
              <div className="seal-outer-rim">
                <div className="seal-heart">💖</div>
                <div className="seal-text">OPEN ME</div>
              </div>
              {!isLetterOpen && (
                <div className="seal-hint-badge">
                  <span className="pulse-dot"></span> Click to open
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>Made especially for Versha</p>
        <span className="footer-sub">Take care of yourself today 🌸</span>
      </footer>

      {/* Vercel Analytics */}
      <Analytics />
    </div>
  );
}

export default App;