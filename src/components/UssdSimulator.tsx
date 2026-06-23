import { useState, useRef, useEffect } from "react";
import { Smartphone, CornerDownLeft, CircleDot, X, Play } from "lucide-react";
import { Button } from "./ui/button";

type ScreenState =
  | "dial"
  | "main"
  | "report"
  | "request"
  | "grants"
  | "grants-select"
  | "grants-county"
  | "grants-confirm"
  | "shelter"
  | "helpline"
  | "submitting"
  | "done";

interface UssdSimulatorProps {
  onClose?: () => void;
}

const GRANT_OPTIONS = [
  { key: "1", name: "HSNP Cash (KES 5,400)", amount: "5,400", provider: "NDMA" },
  { key: "2", name: "MSME Rebuild Grant", amount: "100,000", provider: "Safaricom Foundation" },
  { key: "3", name: "Seed Recovery Kit", amount: "8,000-18,000", provider: "KENAFF" },
];

export function UssdSimulator({ onClose }: UssdSimulatorProps) {
  const [screen, setScreen] = useState<ScreenState>("dial");
  const [inputCode, setInputCode] = useState("*483*111#");
  const [menuInput, setMenuInput] = useState("");
  const [textLog, setTextLog] = useState<string[]>([]);
  const [isDemoRunning, setIsDemoRunning] = useState(false);
  const [activeOption, setActiveOption] = useState<string | null>(null);
  const [selectedGrant, setSelectedGrant] = useState<(typeof GRANT_OPTIONS)[0] | null>(null);
  const [grantCounty, setGrantCounty] = useState("");

  const demoTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const MAIN_MENU = [
    "HopeBridge Portal",
    "1. Report Hazard",
    "2. Request Supplies",
    "3. Climate Grants",
    "4. Nearest Shelter",
    "5. Talk to Chief",
  ];

  const clearDemoTimers = () => {
    demoTimers.current.forEach(clearTimeout);
    demoTimers.current = [];
    setIsDemoRunning(false);
    setActiveOption(null);
  };

  useEffect(() => {
    return () => clearDemoTimers();
  }, []);

  const handleDial = () => {
    if (inputCode === "*483*111#") {
      setScreen("main");
      setTextLog(MAIN_MENU);
    } else {
      alert("Invalid code! Try dialing *483*111#");
    }
  };

  const handleMenuSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const opt = menuInput.trim();
    setMenuInput("");

    if (screen === "main") {
      if (opt === "1") {
        setScreen("report");
        setTextLog(["Select Hazard Type:", "1. Flood", "2. Landslide", "3. Drought"]);
      } else if (opt === "2") {
        setScreen("request");
        setTextLog([
          "Request Urgent Supplies:",
          "1. Clean Water",
          "2. Relief Food",
          "3. Shelter / Tents",
        ]);
      } else if (opt === "3") {
        setScreen("grants");
        setTextLog([
          "Climate Finance Grants:",
          "1. HSNP Cash (KES 5,400)",
          "2. MSME Rebuild Grant",
          "3. Seed Recovery Kit",
          "0. Back",
        ]);
      } else if (opt === "4") {
        setScreen("shelter");
        setTextLog(["Enter County Name:", "(e.g. Kisumu, Nairobi, Garissa)"]);
      } else if (opt === "5") {
        setScreen("helpline");
        setTextLog([
          "Connecting to Local Chief...",
          "Nelson (Nyando): +254 722 000 000",
          "Press 0 to go back",
        ]);
        setTimeout(() => {
          window.dispatchEvent(
            new CustomEvent("demo:sms", {
              detail: {
                title: "Chief Nelson (Nyando)",
                body: "Habari. I am coordinating the emergency response. If you have an emergency, report via USSD Option 1 or evacuate to Ahero Base.",
              },
            }),
          );
        }, 800);
      } else {
        setTextLog(["Invalid option!", ...MAIN_MENU]);
      }
    } else if (screen === "grants") {
      const grant = GRANT_OPTIONS.find((g) => g.key === opt);
      if (grant) {
        setSelectedGrant(grant);
        setScreen("grants-county");
        setTextLog([
          `${grant.name}`,
          `Provider: ${grant.provider}`,
          "",
          "Enter your County to",
          "verify eligibility:",
        ]);
      } else if (opt === "0") {
        setScreen("main");
        setTextLog(MAIN_MENU);
      } else {
        setTextLog([
          "Invalid option!",
          "Climate Finance Grants:",
          "1. HSNP Cash (KES 5,400)",
          "2. MSME Rebuild Grant",
          "3. Seed Recovery Kit",
          "0. Back",
        ]);
      }
    } else if (screen === "grants-county") {
      if (opt.length > 2) {
        setGrantCounty(opt);
        const countyName = opt.charAt(0).toUpperCase() + opt.slice(1).toLowerCase();
        setScreen("grants-confirm");
        setTextLog([
          `County: ${countyName}`,
          `Grant: ${selectedGrant?.name}`,
          `Amount: KES ${selectedGrant?.amount}`,
          "",
          "1. Confirm Application",
          "2. Cancel",
        ]);
      } else {
        setTextLog(["Please enter valid county:", "(e.g. Kisumu, Turkana)"]);
      }
    } else if (screen === "grants-confirm") {
      if (opt === "1") {
        setScreen("submitting");
        setTextLog(["Submitting grant application...", "Please wait..."]);

        const countyName = grantCounty.charAt(0).toUpperCase() + grantCounty.slice(1).toLowerCase();
        setTimeout(() => {
          setScreen("done");
          setTextLog([
            "Application Submitted!",
            `Grant: ${selectedGrant?.name}`,
            `Ref: HB-${Math.floor(Math.random() * 90000) + 10000}`,
            "Verification: 5-7 days",
            "SMS confirmation sent.",
          ]);

          window.dispatchEvent(
            new CustomEvent("demo:sms", {
              detail: {
                title: selectedGrant?.provider ?? "HopeBridge Finance",
                body: `Grant application for "${selectedGrant?.name}" received for ${countyName} County. Ref: HB-${Math.floor(Math.random() * 90000) + 10000}. Verification within 5-7 business days. Funds via M-Pesa on approval.`,
              },
            }),
          );
        }, 1500);
      } else if (opt === "2") {
        setScreen("main");
        setTextLog(MAIN_MENU);
        setSelectedGrant(null);
      } else {
        setTextLog(["Press 1 to Confirm", "Press 2 to Cancel"]);
      }
    } else if (screen === "report") {
      if (["1", "2", "3"].includes(opt)) {
        setScreen("submitting");
        setTextLog(["Submitting Report via USSD..."]);

        let hazardType = "Hazard";
        if (opt === "1") hazardType = "Flood";
        if (opt === "2") hazardType = "Landslide";
        if (opt === "3") hazardType = "Drought";

        setTimeout(() => {
          setScreen("done");
          setTextLog(["Report Submitted!", "Local rescue team notified.", "Thank you."]);

          window.dispatchEvent(
            new CustomEvent("demo:sms", {
              detail: {
                title: "USSD Alert Gateway",
                body: `USSD damage report (${hazardType}) processed for your location. Verification dispatch triggered.`,
              },
            }),
          );
        }, 1200);
      } else {
        setTextLog([
          "Invalid option!",
          "Select Hazard Type:",
          "1. Flood",
          "2. Landslide",
          "3. Drought",
        ]);
      }
    } else if (screen === "request") {
      if (["1", "2", "3"].includes(opt)) {
        setScreen("submitting");
        setTextLog(["Processing request..."]);

        let supplyType = "Supplies";
        if (opt === "1") supplyType = "Clean Water";
        if (opt === "2") supplyType = "Relief Food";
        if (opt === "3") supplyType = "Shelter / Tents";

        setTimeout(() => {
          setScreen("done");
          setTextLog([
            "Supplies requested!",
            "Red Cross volunteers alerted.",
            "Keep phone active.",
          ]);

          window.dispatchEvent(
            new CustomEvent("demo:sms", {
              detail: {
                title: "HopeBridge Logistics",
                body: `Your request for ${supplyType} has been received. Ticket HB-${Math.floor(Math.random() * 9000) + 1000}. A volunteer will contact you shortly.`,
              },
            }),
          );
        }, 1200);
      } else {
        setTextLog([
          "Invalid option!",
          "Request Urgent Supplies:",
          "1. Clean Water",
          "2. Relief Food",
          "3. Shelter / Tents",
        ]);
      }
    } else if (screen === "shelter") {
      if (opt.length > 2) {
        setScreen("submitting");
        setTextLog([`Searching shelters in ${opt}...`]);
        const countyName = opt.charAt(0).toUpperCase() + opt.slice(1);
        setTimeout(() => {
          setScreen("done");
          setTextLog([
            "Active Shelter found:",
            "Ahero Multipurpose Center",
            "Call: +254 711 000 999",
            "Capacity: 45 vacancies",
          ]);

          window.dispatchEvent(
            new CustomEvent("demo:sms", {
              detail: {
                title: "Red Cross Shelter Info",
                body: `Shelter directory: Active shelter in ${countyName} County is Ahero Multipurpose Center. Call base: +254 711 000 999. Capacity: 45 vacancies. First aid & clean water available.`,
              },
            }),
          );
        }, 1200);
      } else {
        setTextLog(["Please enter a valid county name:", "(e.g. Kisumu, Nairobi, Garissa)"]);
      }
    } else if (screen === "helpline") {
      if (opt === "0") {
        setScreen("main");
        setTextLog(MAIN_MENU);
      }
    } else if (screen === "done") {
      setScreen("dial");
      setInputCode("*483*111#");
      setSelectedGrant(null);
      setGrantCounty("");
    }
  };

  const runAutomatedDemo = (option: "1" | "2" | "3" | "4" | "5") => {
    clearDemoTimers();
    setIsDemoRunning(true);
    setActiveOption(option);
    setScreen("dial");
    setInputCode("*483*111#");
    setMenuInput("");
    setSelectedGrant(null);
    setGrantCounty("");

    const addTimer = (fn: () => void, delay: number) => {
      const id = setTimeout(fn, delay);
      demoTimers.current.push(id);
    };

    // Step 1: Dial
    addTimer(() => {
      setScreen("main");
      setTextLog(MAIN_MENU);

      addTimer(() => {
        setMenuInput(option);

        addTimer(() => {
          setMenuInput("");

          if (option === "1") {
            setScreen("report");
            setTextLog(["Select Hazard Type:", "1. Flood", "2. Landslide", "3. Drought"]);

            addTimer(() => {
              setMenuInput("1");
              addTimer(() => {
                setMenuInput("");
                setScreen("submitting");
                setTextLog(["Submitting Report via USSD..."]);
                addTimer(() => {
                  setScreen("done");
                  setTextLog(["Report Submitted!", "Local rescue team notified.", "Thank you."]);
                  setIsDemoRunning(false);
                  setActiveOption(null);
                  window.dispatchEvent(
                    new CustomEvent("demo:sms", {
                      detail: {
                        title: "USSD Alert Gateway",
                        body: "USSD damage report (Flood) processed for Nyando region. Verification team dispatched.",
                      },
                    }),
                  );
                }, 1500);
              }, 1200);
            }, 1500);
          } else if (option === "2") {
            setScreen("request");
            setTextLog([
              "Request Urgent Supplies:",
              "1. Clean Water",
              "2. Relief Food",
              "3. Shelter / Tents",
            ]);

            addTimer(() => {
              setMenuInput("2");
              addTimer(() => {
                setMenuInput("");
                setScreen("submitting");
                setTextLog(["Processing request..."]);
                addTimer(() => {
                  setScreen("done");
                  setTextLog([
                    "Supplies requested!",
                    "Red Cross volunteers alerted.",
                    "Keep phone active.",
                  ]);
                  setIsDemoRunning(false);
                  setActiveOption(null);
                  window.dispatchEvent(
                    new CustomEvent("demo:sms", {
                      detail: {
                        title: "HopeBridge Logistics",
                        body: "Your request for Relief Food has been received. Ticket HB-8421. A volunteer will contact you shortly.",
                      },
                    }),
                  );
                }, 1500);
              }, 1200);
            }, 1500);
          } else if (option === "3") {
            // Climate Grants demo flow
            const grant = GRANT_OPTIONS[0]; // HSNP Cash
            setSelectedGrant(grant);
            setScreen("grants");
            setTextLog([
              "Climate Finance Grants:",
              "1. HSNP Cash (KES 5,400)",
              "2. MSME Rebuild Grant",
              "3. Seed Recovery Kit",
              "0. Back",
            ]);

            addTimer(() => {
              setMenuInput("1");
              addTimer(() => {
                setMenuInput("");
                setScreen("grants-county");
                setTextLog([
                  `${grant.name}`,
                  `Provider: ${grant.provider}`,
                  "",
                  "Enter County to",
                  "verify eligibility:",
                ]);

                // Type "Turkana" key by key
                addTimer(() => {
                  setMenuInput("T");
                  addTimer(() => {
                    setMenuInput("Tu");
                  }, 150);
                  addTimer(() => {
                    setMenuInput("Tur");
                  }, 300);
                  addTimer(() => {
                    setMenuInput("Turk");
                  }, 450);
                  addTimer(() => {
                    setMenuInput("Turka");
                  }, 600);
                  addTimer(() => {
                    setMenuInput("Turkan");
                  }, 750);
                  addTimer(() => {
                    setMenuInput("Turkana");
                    addTimer(() => {
                      setMenuInput("");
                      setGrantCounty("Turkana");
                      setScreen("grants-confirm");
                      setTextLog([
                        "County: Turkana",
                        `Grant: ${grant.name}`,
                        `Amount: KES ${grant.amount}`,
                        "",
                        "1. Confirm Application",
                        "2. Cancel",
                      ]);

                      addTimer(() => {
                        setMenuInput("1");
                        addTimer(() => {
                          setMenuInput("");
                          setScreen("submitting");
                          setTextLog(["Submitting grant application...", "Please wait..."]);
                          addTimer(() => {
                            setScreen("done");
                            setTextLog([
                              "Application Submitted!",
                              `Grant: ${grant.name}`,
                              "Ref: HB-72841",
                              "Verification: 5-7 days",
                              "SMS confirmation sent.",
                            ]);
                            setIsDemoRunning(false);
                            setActiveOption(null);
                            window.dispatchEvent(
                              new CustomEvent("demo:sms", {
                                detail: {
                                  title: "NDMA HSNP",
                                  body: `Grant application for "HSNP Cash (KES 5,400)" received for Turkana County. Ref: HB-72841. Verification within 5-7 business days. Funds via M-Pesa on approval.`,
                                },
                              }),
                            );
                          }, 1500);
                        }, 1200);
                      }, 1800);
                    }, 1200);
                  }, 900);
                }, 1200);
              }, 1200);
            }, 1500);
          } else if (option === "4") {
            setScreen("shelter");
            setTextLog(["Enter County Name:", "(e.g. Kisumu, Nairobi, Garissa)"]);

            addTimer(() => {
              setMenuInput("K");
              addTimer(() => {
                setMenuInput("Ki");
              }, 150);
              addTimer(() => {
                setMenuInput("Kis");
              }, 300);
              addTimer(() => {
                setMenuInput("Kisu");
              }, 450);
              addTimer(() => {
                setMenuInput("Kisum");
              }, 600);
              addTimer(() => {
                setMenuInput("Kisumu");
                addTimer(() => {
                  setMenuInput("");
                  setScreen("submitting");
                  setTextLog(["Searching shelters in Kisumu..."]);
                  addTimer(() => {
                    setScreen("done");
                    setTextLog([
                      "Active Shelter found:",
                      "Ahero Multipurpose Center",
                      "Call: +254 711 000 999",
                      "Capacity: 45 vacancies",
                    ]);
                    setIsDemoRunning(false);
                    setActiveOption(null);
                    window.dispatchEvent(
                      new CustomEvent("demo:sms", {
                        detail: {
                          title: "Red Cross Shelter Info",
                          body: "Shelter directory: Active shelter in Kisumu County is Ahero Multipurpose Center. Call base: +254 711 000 999. Capacity: 45 vacancies. First aid & clean water available.",
                        },
                      }),
                    );
                  }, 1500);
                }, 1200);
              }, 750);
            }, 1200);
          } else if (option === "5") {
            setScreen("helpline");
            setTextLog([
              "Connecting to Local Chief...",
              "Nelson (Nyando): +254 722 000 000",
              "Press 0 to go back",
            ]);

            addTimer(() => {
              window.dispatchEvent(
                new CustomEvent("demo:sms", {
                  detail: {
                    title: "Chief Nelson (Nyando)",
                    body: "Habari. I am coordinating the emergency response. If you have an emergency, report via USSD Option 1 or evacuate to Ahero Base.",
                  },
                }),
              );
              addTimer(() => {
                setScreen("dial");
                setIsDemoRunning(false);
                setActiveOption(null);
              }, 3000);
            }, 800);
          }
        }, 1200);
      }, 1500);
    }, 1200);
  };

  const pressKey = (key: string) => {
    if (isDemoRunning) return;
    if (screen === "dial") {
      setInputCode((prev) => prev + key);
    } else {
      setMenuInput((prev) => prev + key);
    }
  };

  const handleBackspace = () => {
    if (isDemoRunning) return;
    if (screen === "dial") {
      setInputCode((prev) => prev.slice(0, -1));
    } else {
      setMenuInput((prev) => prev.slice(0, -1));
    }
  };

  const demoButtons = [
    { key: "1" as const, label: "1. Report Damage" },
    { key: "2" as const, label: "2. Get Supplies" },
    { key: "3" as const, label: "3. Climate Grants ✓" },
    { key: "4" as const, label: "4. Find Shelter" },
    { key: "5" as const, label: "5. Talk to Chief" },
  ];

  return (
    <div className="w-full max-w-sm rounded-2xl border border-border bg-card py-3 px-4 shadow-soft select-none font-sans">
      <div className="mb-2 flex items-center justify-between border-b border-border pb-1.5">
        <h3 className="font-serif text-lg font-semibold text-foreground flex items-center gap-2">
          <Smartphone className="size-4.5 text-accent" /> USSD Feature Phone
        </h3>
        <span className="rounded-full bg-emerald-50 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          Dialer Active
        </span>
      </div>

      <p className="text-[11px] text-muted-foreground mb-2 leading-relaxed">
        Simulate offline climate-finance access via standard network codes (dial{" "}
        <strong className="text-foreground">*483*111#</strong>). No internet required.
      </p>

      {/* Automated Demo Mode Options */}
      <div className="mb-2 space-y-1 rounded-xl bg-muted/40 p-2 border border-border">
        <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground block mb-0.5">
          Auto-Play USSD Demos
        </span>
        <div className="grid grid-cols-2 gap-1 sm:grid-cols-3">
          {demoButtons.map((btn) => (
            <Button
              key={btn.key}
              size="xs"
              variant="secondary"
              className={`text-[9px] font-bold py-1 cursor-pointer flex items-center justify-center gap-1 h-7 ${
                activeOption === btn.key
                  ? "bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/35"
                  : btn.key === "3"
                    ? "bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-900/40 dark:hover:bg-emerald-800/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                    : "bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-foreground border border-border"
              }`}
              onClick={() => runAutomatedDemo(btn.key)}
              disabled={isDemoRunning}
            >
              <Play className="size-2 fill-current shrink-0" />
              {btn.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Retro Phone Body */}
      <div className="mx-auto w-54 rounded-2xl bg-neutral-800 p-2 border-2 border-neutral-700 shadow-xl flex flex-col items-center">
        {/* LCD Screen */}
        <div className="w-full h-28 bg-[#8fa48c] border-2 border-[#788e75] rounded-md p-1.5 font-mono text-neutral-900 flex flex-col justify-between shadow-inner">
          {screen === "dial" ? (
            <div className="flex flex-col justify-between h-full">
              <div className="text-right text-[9px] opacity-75">Safaricom</div>
              <div className="text-center text-base font-bold tracking-widest py-0.5">
                {inputCode || "Dial Code..."}
              </div>
              <div className="text-[9px] opacity-75">Press Dial Below</div>
            </div>
          ) : (
            <form onSubmit={handleMenuSubmit} className="flex flex-col h-full justify-between">
              <div className="text-[9px] leading-tight flex-1 overflow-y-auto space-y-0.5">
                {textLog.map((line, i) => (
                  <div
                    key={i}
                    className={
                      line.includes("Climate") || line.includes("Grant")
                        ? "font-bold text-emerald-900"
                        : ""
                    }
                  >
                    {line}
                  </div>
                ))}
              </div>

              {screen !== "submitting" && screen !== "done" && (
                <div className="flex items-center border-t border-neutral-700/30 pt-1 mt-1">
                  <span className="text-[9px] font-bold mr-1">Input:</span>
                  <input
                    type="text"
                    className="flex-1 min-w-0 bg-transparent outline-none border-b border-neutral-800 text-[11px] font-bold font-mono text-neutral-900 h-4"
                    value={menuInput}
                    onChange={(e) => setMenuInput(e.target.value)}
                    autoFocus
                    disabled={isDemoRunning}
                  />
                  <button type="submit" className="ml-1 cursor-pointer" disabled={isDemoRunning}>
                    <CornerDownLeft className="size-2.5" />
                  </button>
                </div>
              )}

              {screen === "done" && (
                <div className="text-center border-t border-neutral-700/30 pt-1 mt-1">
                  <button
                    type="submit"
                    className="text-[8px] font-bold uppercase underline cursor-pointer"
                  >
                    Dismiss
                  </button>
                </div>
              )}
            </form>
          )}
        </div>

        {/* Dial / Hang-up Button */}
        <div className="w-full flex justify-between px-1 py-1.5 border-b border-neutral-700">
          <Button
            size="xs"
            variant="outline"
            className="bg-neutral-700 text-neutral-300 hover:bg-neutral-600 border-neutral-600 text-[9px] px-1.5 h-6.5 cursor-pointer"
            onClick={handleBackspace}
            disabled={isDemoRunning}
          >
            Clear
          </Button>

          {screen === "dial" ? (
            <button
              onClick={handleDial}
              className="size-7 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 cursor-pointer"
              title="Dial Code"
            >
              <CircleDot className="size-3.5" />
            </button>
          ) : (
            <button
              onClick={() => {
                clearDemoTimers();
                setScreen("dial");
                setInputCode("*483*111#");
                setMenuInput("");
                setSelectedGrant(null);
                setGrantCounty("");
              }}
              className="size-7 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 cursor-pointer"
              title="Hang Up"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>

        {/* T9 Keypad */}
        <div className="grid grid-cols-3 gap-1 mt-2 w-full px-1">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"].map((key) => (
            <button
              key={key}
              onClick={() => pressKey(key)}
              disabled={isDemoRunning}
              className="h-7 rounded bg-neutral-700 hover:bg-neutral-600 text-neutral-100 font-bold border border-neutral-650 flex flex-col items-center justify-center text-xs transition-colors active:bg-neutral-550 cursor-pointer disabled:opacity-50"
            >
              <span>{key}</span>
            </button>
          ))}
        </div>
      </div>

      {onClose && (
        <div className="mt-2.5 pt-2 border-t border-border flex justify-start">
          <Button
            size="xs"
            className="rounded-xl px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-[9px] font-bold uppercase tracking-wider cursor-pointer h-7"
            onClick={onClose}
          >
            ← Back to App
          </Button>
        </div>
      )}
    </div>
  );
}
