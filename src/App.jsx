import { useState, useEffect, useRef } from "react";

const C = {
  bg: "#FAFBFC", white: "#FFFFFF", navy: "#1B2141", navyLight: "#2D3561",
  text: "#1B2141", textBody: "#4A5068", textMuted: "#8B90A3",
  green: "#22C55E", greenBg: "#ECFDF5", greenBorder: "#BBF7D0",
  blue: "#3B82F6", blueBg: "#EFF6FF", blueBorder: "#BFDBFE",
  coral: "#F472B6", coralBg: "#FDF2F8", coralBorder: "#FBCFE8",
  amber: "#F59E0B", amberBg: "#FFFBEB", amberBorder: "#FDE68A",
  teal: "#14B8A6", tealBg: "#F0FDFA", tealBorder: "#99F6E4",
  purple: "#8B5CF6", purpleBg: "#F5F3FF", purpleBorder: "#DDD6FE",
  border: "#E5E7EB", borderLight: "#F3F4F6",
  shadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
  shadowMd: "0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -2px rgba(0,0,0,0.05)",
  shadowLg: "0 10px 25px -3px rgba(0,0,0,0.08), 0 4px 6px -4px rgba(0,0,0,0.04)",
};
const FONT = `'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif`;

const SPOTS_TOTAL = 20;
const SPOTS_TAKEN = 6;

export default function App() {
  const [form, setForm] = useState({ email: "", agences: "", secretariat: "", erp: "", probleme: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [visible, setVisible] = useState({});
  const refs = useRef({});

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) setVisible((v) => ({ ...v, [e.target.id]: true }));
      }),
      { threshold: 0.1 }
    );
    Object.values(refs.current).forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const setRef = (id) => (el) => { refs.current[id] = el; };
  const anim = (id, delay = 0) => ({
    opacity: visible[id] ? 1 : 0,
    transform: visible[id] ? "translateY(0)" : "translateY(24px)",
    transition: `all 0.65s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
  });

  const canSubmit = form.email.includes("@") && form.agences && form.secretariat && form.erp && !sending;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setSending(true);
    try {
      const formData = new URLSearchParams({
        "form-name": "candidature-fondateur",
        email: form.email,
        agences: form.agences,
        secretariat: form.secretariat,
        erp: form.erp,
        outil_actuel: form.probleme,
      });
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Erreur:", err);
      setSubmitted(true);
    }
    setSending(false);
  };

  const upd = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const inputStyle = {
    width: "100%", padding: "12px 14px", borderRadius: 8,
    background: C.white, border: `1.5px solid ${C.border}`,
    color: C.navy, fontSize: 14, fontFamily: FONT,
    outline: "none", transition: "all 0.2s",
  };
  const labelStyle = { display: "block", fontSize: 13, fontWeight: 600, color: C.navy, marginBottom: 6 };
  const selectStyle = { ...inputStyle, appearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%238B90A3' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10z'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center" };

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: FONT, minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::selection { background: ${C.navy}; color: #fff; }
        input::placeholder, textarea::placeholder { color: ${C.textMuted}; }
        select { color: ${C.navy}; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .4; } }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(250,251,252,0.88)", backdropFilter: "blur(16px)",
        borderBottom: `1px solid ${C.border}`,
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "12px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 22, fontWeight: 800, color: C.navy, fontStyle: "italic", letterSpacing: "-0.04em" }}>Drivepool</span>
          <a href="#candidature" style={{
            background: C.navy, color: "#fff", padding: "9px 20px", borderRadius: 8,
            textDecoration: "none", fontWeight: 600, fontSize: 14, transition: "all 0.2s",
          }}
          onMouseEnter={(e) => { e.target.style.background = C.navyLight; }}
          onMouseLeave={(e) => { e.target.style.background = C.navy; }}
          >Postuler</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "100px 24px 60px", maxWidth: 1100, margin: "0 auto",
      }}>
        <div style={{ maxWidth: 660 }}>
          <h1 style={{
            fontSize: "clamp(38px, 5.5vw, 64px)", fontWeight: 800,
            lineHeight: 1.06, letterSpacing: "-0.035em", color: C.navy,
            marginBottom: 24, animation: "fadeUp 0.6s ease-out",
          }}>
            Le premier CRM<br />
            <span style={{ color: C.teal }}>pour auto-écoles.</span>
          </h1>

          <p style={{
            fontSize: "clamp(17px, 1.9vw, 20px)", lineHeight: 1.65, color: C.textBody,
            maxWidth: 480, marginBottom: 32,
            animation: "fadeUp 0.6s ease-out 0.1s both",
          }}>
            Vous le savez : des prospects se perdent. Des relances s'oublient.
            Du CA s'envole. Pas par manque de travail — par manque d'outil.
          </p>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", animation: "fadeUp 0.6s ease-out 0.2s both" }}>
            <a href="#candidature" style={{
              background: C.navy, color: "#fff", padding: "14px 28px", borderRadius: 10,
              textDecoration: "none", fontWeight: 700, fontSize: 15, transition: "all 0.2s",
              boxShadow: C.shadow, display: "inline-block",
            }}
            onMouseEnter={(e) => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = C.shadowLg; }}
            onMouseLeave={(e) => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = C.shadow; }}
            >Rejoindre le Club Fondateur →</a>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{
                background: C.amberBg, border: `1px solid ${C.amberBorder}`,
                borderRadius: 8, padding: "6px 12px", fontSize: 13, fontWeight: 700, color: "#b45309",
              }}>
                {SPOTS_TAKEN} / {SPOTS_TOTAL}
              </div>
              <span style={{ fontSize: 13, color: C.textMuted }}>places prises</span>
            </div>
          </div>
        </div>

        {/* Dashboard preview */}
        <div style={{
          marginTop: 56, background: C.white, borderRadius: 16,
          border: `1px solid ${C.border}`, boxShadow: C.shadowLg,
          padding: "20px 24px", maxWidth: 660,
          animation: "fadeUp 0.7s ease-out 0.35s both",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#EF4444" }} />
            <div style={{ width: 9, height: 9, borderRadius: "50%", background: C.amber }} />
            <div style={{ width: 9, height: 9, borderRadius: "50%", background: C.green }} />
            <span style={{ marginLeft: "auto", fontSize: 11, color: C.textMuted, fontWeight: 500 }}>drivepool</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 10 }}>
            {[
              { label: "Pipeline", value: "8 786 €", bg: C.greenBg, bd: C.greenBorder, c: "#16a34a" },
              { label: "Objectif", value: "4 / 15", bg: C.amberBg, bd: C.amberBorder, c: "#d97706" },
              { label: "Tâches du jour", value: "7", bg: C.blueBg, bd: C.blueBorder, c: "#2563eb" },
              { label: "En retard", value: "0", bg: C.coralBg, bd: C.coralBorder, c: "#db2777" },
              { label: "Prospects", value: "14", bg: C.purpleBg, bd: C.purpleBorder, c: "#7c3aed" },
            ].map((d, i) => (
              <div key={i} style={{ background: d.bg, border: `1px solid ${d.bd}`, borderRadius: 9, padding: "11px 13px" }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: C.textMuted, marginBottom: 4 }}>{d.label}</div>
                <div style={{ fontSize: 19, fontWeight: 800, color: d.c }}>{d.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LE COÛT */}
      <section id="cost" ref={setRef("cost")} style={{ padding: "80px 24px 40px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{
          ...anim("cost"),
          background: C.navy, borderRadius: 20, padding: "clamp(32px, 5vw, 48px)",
          textAlign: "center",
        }}>
          <div>
            <h2 style={{ fontSize: "clamp(22px, 2.5vw, 30px)", fontWeight: 800, color: "#fff", lineHeight: 1.2, letterSpacing: "-0.02em", marginBottom: 12 }}>
              1 prospect non suivi<br />= <span style={{ color: C.amber }}>1 200€ minimum.</span>
            </h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.65)", lineHeight: 1.65 }}>
              Et sans outil, vous ne savez même pas combien vous en perdez.
            </p>
          </div>
        </div>
      </section>

      {/* ERP + CRM */}
      <section id="erp" ref={setRef("erp")} style={{ padding: "80px 24px 40px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{
          ...anim("erp"),
          background: C.white, borderRadius: 20, border: `1px solid ${C.border}`,
          boxShadow: C.shadow, padding: "clamp(28px, 4vw, 44px)",
          maxWidth: 680,
        }}>
          <div style={{ display: "flex", gap: 14, marginBottom: 20, flexWrap: "wrap" }}>
            <div style={{
              background: C.blueBg, border: `1px solid ${C.blueBorder}`,
              borderRadius: 8, padding: "6px 14px", fontSize: 13, fontWeight: 700, color: "#2563eb",
            }}>ERP</div>
            <div style={{ fontSize: 20, color: C.textMuted, fontWeight: 300 }}>+</div>
            <div style={{
              background: C.tealBg, border: `1px solid ${C.tealBorder}`,
              borderRadius: 8, padding: "6px 14px", fontSize: 13, fontWeight: 700, color: C.teal,
            }}>CRM</div>
          </div>
          <h3 style={{
            fontSize: "clamp(20px, 2.5vw, 26px)", fontWeight: 800, color: C.navy,
            lineHeight: 1.25, marginBottom: 16, letterSpacing: "-0.02em",
          }}>
            Votre ERP gère vos élèves, votre planning, votre facturation.
            <br />C'est essentiel. Mais ce n'est que la moitié du tableau.
          </h3>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: C.textBody, marginBottom: 12 }}>
            Vos prospects, vos relances, vos tâches quotidiennes, le suivi de chaque dossier — aucun ERP ne gère ça. Dans tous les secteurs, un ERP et un CRM vont de pair. L'auto-école ne fait pas exception.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: C.textBody }}>
            Drivepool est le CRM qui manquait. Il ne remplace pas votre Klaxo, votre Rapido ou votre AGX — il complète ce qu'ils ne font pas.
          </p>
        </div>
      </section>

      {/* CE QUE DRIVEPOOL CHANGE */}
      <section id="what" ref={setRef("what")} style={{ padding: "40px 24px 80px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={anim("what")}>
          <h2 style={{
            fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 800,
            lineHeight: 1.15, color: C.navy, maxWidth: 550, marginBottom: 48, letterSpacing: "-0.02em",
          }}>Ce que Drivepool change concrètement.</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
          {[
            {
              icon: "💶", title: "Zéro prospect perdu",
              desc: "Du premier appel à l'inscription, chaque prospect est suivi. Chaque relance faite. Chaque oubli éliminé. Votre secrétaire sait exactement qui contacter et pourquoi.",
              bg: C.greenBg, border: C.greenBorder,
            },
            {
              icon: "✅", title: "Zéro tâche oubliée",
              desc: "Fini les carnets. Chaque tâche assignée, tracée, avec son compte rendu. Dossiers ANTS, examens, relances post-examen — vous savez ce qui a été fait et ce qui reste.",
              bg: C.blueBg, border: C.blueBorder,
            },
            {
              icon: "📊", title: "Zéro angle mort",
              desc: "Depuis votre téléphone, entre deux leçons : qui est où dans son parcours, quel dossier traîne, quel chiffre monte ou descend. Par agence, en temps réel.",
              bg: C.amberBg, border: C.amberBorder,
            },
          ].map((item, i) => (
            <div key={i} style={{
              ...anim("what", 0.08 + i * 0.1),
              background: C.white, borderRadius: 14, border: `1px solid ${C.border}`,
              padding: "30px 28px", boxShadow: C.shadow, transition: "all 0.25s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = item.border; e.currentTarget.style.boxShadow = C.shadowMd; e.currentTarget.style.transform = "translateY(-3px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.boxShadow = C.shadow; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{
                width: 46, height: 46, borderRadius: 11, background: item.bg,
                border: `1px solid ${item.border}`, display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: 24, marginBottom: 20,
              }}>{item.icon}</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: C.navy, marginBottom: 10 }}>{item.title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.75, color: C.textBody }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ORIGIN STORY */}
      <section id="story" ref={setRef("story")} style={{ padding: "60px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{
          ...anim("story"),
          background: C.white, borderRadius: 20, border: `1px solid ${C.border}`,
          boxShadow: C.shadow, padding: "clamp(32px, 4vw, 48px)", maxWidth: 680,
        }}>
          <div style={{ fontSize: 32, marginBottom: 20 }}>👋</div>
          <h3 style={{ fontSize: 22, fontWeight: 800, color: C.navy, marginBottom: 16, letterSpacing: "-0.02em" }}>
            3 auto-écoles familiales.
          </h3>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: C.textBody, marginBottom: 12 }}>
            J'ai vu de l'intérieur ce que coûte un secrétariat sans outil : des prospects perdus, des tâches oubliées, du CA qui s'évapore — et une secrétaire dont tout dépend.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: C.textBody }}>
            J'ai construit un système pour nos propres agences. Ça a tout changé. Alors j'en ai fait un outil pour le métier.
          </p>
        </div>
      </section>

      {/* CLUB FONDATEUR */}
      <section id="fondateur" ref={setRef("fondateur")} style={{ padding: "80px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={anim("fondateur")}>
          <div style={{
            display: "inline-block", fontSize: 12, fontWeight: 700, color: C.amber,
            background: C.amberBg, border: `1px solid ${C.amberBorder}`,
            borderRadius: 6, padding: "4px 12px", marginBottom: 16,
            letterSpacing: "0.04em", textTransform: "uppercase",
          }}>Club fondateur</div>
          <h2 style={{
            fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 800,
            lineHeight: 1.15, color: C.navy, maxWidth: 550, marginBottom: 16, letterSpacing: "-0.02em",
          }}>20 auto-écoles. Pas une de plus.</h2>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: C.textBody, maxWidth: 500, marginBottom: 40 }}>
            J'accompagne chaque auto-école personnellement. C'est pour ça que c'est limité.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14, maxWidth: 740 }}>
          {[
            { icon: "🔒", title: "Tarif fondateur à vie", desc: "Le prix augmentera. Pas le vôtre. Jamais.", bg: C.greenBg, border: C.greenBorder },
            { icon: "🤝", title: "Onboarding par le fondateur", desc: "Moi, avec votre secrétaire. En personne en Île-de-France, en visio partout ailleurs. Pas un tuto vidéo.", bg: C.blueBg, border: C.blueBorder },
            { icon: "🔧", title: "Vous façonnez le produit", desc: "Accès direct pour remonter vos besoins. Vos priorités deviennent les miennes.", bg: C.amberBg, border: C.amberBorder },
          ].map((item, i) => (
            <div key={i} style={{
              ...anim("fondateur", 0.1 + i * 0.08),
              background: C.white, borderRadius: 14, border: `1px solid ${C.border}`,
              padding: "24px 22px", boxShadow: C.shadow,
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10, background: item.bg,
                border: `1px solid ${item.border}`, display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: 20, marginBottom: 14,
              }}>{item.icon}</div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: C.navy, marginBottom: 6 }}>{item.title}</h3>
              <p style={{ fontSize: 13, lineHeight: 1.65, color: C.textBody }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CANDIDATURE FORM */}
      <section id="candidature" ref={setRef("candidature")} style={{ padding: "80px 24px 120px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{
          ...anim("candidature"),
          maxWidth: 540, margin: "0 auto",
        }}>
          {!submitted ? (
            <>
              <div style={{ textAlign: "center", marginBottom: 36 }}>
                <h2 style={{
                  fontSize: "clamp(24px, 3vw, 34px)", fontWeight: 800,
                  color: C.navy, marginBottom: 12, letterSpacing: "-0.02em",
                }}>Postuler au Club Fondateur</h2>
                <p style={{ fontSize: 15, color: C.textBody, lineHeight: 1.6 }}>
                  Drivepool donne ses meilleurs résultats dans un certain type d'auto-école.
                  <br />Ces quelques questions nous aident à vérifier que c'est le bon fit.
                </p>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 8, marginTop: 16,
                  background: C.amberBg, border: `1px solid ${C.amberBorder}`,
                  borderRadius: 8, padding: "8px 16px",
                }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "#b45309" }}>{SPOTS_TAKEN} / {SPOTS_TOTAL}</span>
                  <span style={{ fontSize: 13, color: C.textMuted }}>places prises</span>
                </div>
              </div>

              <div style={{
                background: C.white, borderRadius: 16, border: `1px solid ${C.border}`,
                boxShadow: C.shadowMd, padding: "32px 28px",
              }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <div>
                    <label style={labelStyle}>Votre email *</label>
                    <input type="email" placeholder="nom@auto-ecole.fr" value={form.email}
                      onChange={upd("email")} style={inputStyle}
                      onFocus={(e) => { e.target.style.borderColor = C.teal; e.target.style.boxShadow = `0 0 0 3px ${C.tealBg}`; }}
                      onBlur={(e) => { e.target.style.borderColor = C.border; e.target.style.boxShadow = "none"; }}
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <div>
                      <label style={labelStyle}>Nombre d'agences *</label>
                      <select value={form.agences} onChange={upd("agences")} style={selectStyle}>
                        <option value="">Sélectionner</option>
                        <option value="1">1 agence</option>
                        <option value="2">2 agences</option>
                        <option value="3">3 agences</option>
                        <option value="4+">4 ou plus</option>
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>Personnes au secrétariat *</label>
                      <select value={form.secretariat} onChange={upd("secretariat")} style={selectStyle}>
                        <option value="">Sélectionner</option>
                        <option value="1">1 personne</option>
                        <option value="2">2 personnes</option>
                        <option value="3">3 personnes</option>
                        <option value="4+">4 ou plus</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>Quel logiciel / ERP utilisez-vous ? *</label>
                    <select value={form.erp} onChange={upd("erp")} style={selectStyle}>
                      <option value="">Sélectionner</option>
                      <option value="klaxo">Klaxo</option>
                      <option value="rapido">Rapido</option>
                      <option value="agx">AGX</option>
                      <option value="ediser">Ediser / Packweb</option>
                      <option value="autre">Autre</option>
                      <option value="aucun">Aucun</option>
                    </select>
                  </div>

                  <div>
                    <label style={labelStyle}>Utilisez-vous un outil pour suivre vos prospects et vos tâches au secrétariat ? Si oui, lequel ?</label>
                    <textarea placeholder="Ex : un cahier, un Excel, Monday, rien..." value={form.probleme}
                      onChange={upd("probleme")}
                      rows={2}
                      style={{ ...inputStyle, resize: "vertical", minHeight: 60 }}
                      onFocus={(e) => { e.target.style.borderColor = C.teal; e.target.style.boxShadow = `0 0 0 3px ${C.tealBg}`; }}
                      onBlur={(e) => { e.target.style.borderColor = C.border; e.target.style.boxShadow = "none"; }}
                    />
                  </div>

                  <button onClick={handleSubmit} disabled={!canSubmit} style={{
                    width: "100%", padding: "15px", borderRadius: 10, border: "none",
                    background: canSubmit ? C.navy : C.borderLight,
                    color: canSubmit ? "#fff" : C.textMuted,
                    fontSize: 15, fontWeight: 700, fontFamily: FONT,
                    cursor: canSubmit ? "pointer" : "default",
                    transition: "all 0.2s", boxShadow: canSubmit ? C.shadow : "none",
                  }}
                  onMouseEnter={(e) => { if (canSubmit) { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = C.shadowLg; } }}
                  onMouseLeave={(e) => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = canSubmit ? C.shadow : "none"; }}
                  >
                    Envoyer ma candidature{sending ? "..." : " →"}
                  </button>
                </div>

                <p style={{ marginTop: 16, fontSize: 12, color: C.textMuted, textAlign: "center" }}>
                  On revient vers vous sous 48h pour caler un échange.
                </p>
              </div>
            </>
          ) : (
            <div style={{ textAlign: "center" }}>
              <div style={{
                background: C.greenBg, border: `1px solid ${C.greenBorder}`,
                borderRadius: 16, padding: "40px 32px", boxShadow: C.shadow,
              }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>🎉</div>
                <h3 style={{ fontSize: 22, fontWeight: 800, color: C.navy, marginBottom: 10 }}>
                  Bienvenue parmi les candidats fondateurs.
                </h3>
                <p style={{ fontSize: 15, color: C.textBody, lineHeight: 1.7 }}>
                  Je regarde votre profil et je reviens vers vous personnellement sous 48h pour planifier un échange.
                </p>
                <p style={{ fontSize: 14, fontWeight: 600, color: C.teal, marginTop: 16 }}>
                  — Ludovic, fondateur de Drivepool
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        borderTop: `1px solid ${C.border}`, padding: "32px 24px",
        textAlign: "center", background: C.white,
      }}>
        <span style={{ fontSize: 18, fontWeight: 800, color: C.navy, fontStyle: "italic", letterSpacing: "-0.04em" }}>Drivepool</span>
        <p style={{ fontSize: 12, color: C.textMuted, marginTop: 8 }}>© 2026 Drivepool — Le CRM pour auto-écoles</p>
      </footer>
    </div>
  );
}
