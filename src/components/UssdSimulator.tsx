import { useState, useRef, useEffect } from "react";
import { Smartphone, CornerDownLeft, CircleDot, X, Play } from "lucide-react";
import { Button } from "./ui/button";

type ScreenState = "dial" | "main" | "report" | "request" | "shelter" | "helpline" | "submitting" | "done";

interface UssdSimulatorProps {
  onClose?: () => void;
}

export function UssdSimulator({ onClose }: UssdSimulatorProps) {
  const [screen, setScreen] = useState<ScreenState>("dial");
  const [inputCode, setInputCode] = useState("*483*111#");
  const [menuInput, setMenuInput] = useState("");
  const [textLog, setTextLog] = useState<string[]>([]);
  const [isDemoRunning, setIsDemoRunning] = useState(false);
  const [activeOption, setActiveOption] = useState<string | null>(null);
  
  const demoTimers = useRef<any[]>([]);

  const clearDemoTimers = () => {
    demoTimers.current.forEach(clearTimeout);
    demoTimers.current = [];
    setIsDemoRunning(false);
    setActiveOption(null);
  };

  // Clean up timers on unmount
  useEffect(() => {
    return () => clearDemoTimers();
  }, []);

  const handleDial = () => {
    if (inputCode === "*483*111#") {
      setScreen("main");
      setTextLog(["HopeBridge Emergency Portal", "1. Report Hazard", "2. Request Supplies", "3. Nearest Shelter", "4. Talk to Chief"]);
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
        setTextLog(["Request Urgent Supplies:", "1. Clean Water", "2. Relief Food", "3. Shelter / Tents"]);
      } else if (opt === "3") {
        setScreen("shelter");
        setTextLog(["Enter County Name:", "(e.g. Kisumu, Nairobi, Garissa)"]);
      } else if (opt === "4") {
        setScreen("helpline");
        setTextLog(["Connecting to Local Chief...", "Nelson (Nyando): +254 722 000 000", "Press 0 to go back"]);
        
        // Dispatch instant Chief Nelson responder SMS
        setTimeout(() => {
          window.dispatchEvent(
            new CustomEvent("demo:sms", {
              detail: {
                title: "Chief Nelson (Nyando)",
                body: "Habari. I am coordinating the emergency response. If you have an emergency, report via USSD Option 1 or evacuate to Ahero Base.",
              },
            })
          );
        }, 800);
      } else {
        setTextLog(["Invalid option!", "1. Report Hazard", "2. Request Supplies", "3. Nearest Shelter", "4. Talk to Chief"]);
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
          setTextLog(["Report Submitted Successfully!", "Local rescue team notified.", "Thank you."]);
          
          // Trigger SMS toast simulation on parent window
          window.dispatchEvent(
            new CustomEvent("demo:sms", {
              detail: {
                title: "USSD Alert Gateway",
                body: `USSD damage report (${hazardType}) processed for your location. Verification dispatch triggered.`,
              },
            })
          );
        }, 1200);
      } else {
        setTextLog(["Invalid option!", "Select Hazard Type:", "1. Flood", "2. Landslide", "3. Drought"]);
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
          setTextLog(["Supplies requested!", "Red Cross volunteers alerted.", "Keep phone active."]);
          
          window.dispatchEvent(
            new CustomEvent("demo:sms", {
              detail: {
                title: "HopeBridge Logistics",
                body: `Your request for ${supplyType} has been received. Ticket HB-${Math.floor(Math.random() * 9000) + 1000}. A volunteer will contact you shortly.`,
              },
            })
          );
        }, 1200);
      } else {
        setTextLog(["Invalid option!", "Request Urgent Supplies:", "1. Clean Water", "2. Relief Food", "3. Shelter / Tents"]);
      }
    } else if (screen === "shelter") {
      if (opt.length > 2) {
        setScreen("submitting");
        setTextLog([`Searching shelters in ${opt}...`]);
        const countyName = opt.charAt(0).toUpperCase() + opt.slice(1);
        setTimeout(() => {
          setScreen("done");
          setTextLog([`Active Shelter found:`, `Ahero Multipurpose Center`, `Call: +254 711 000 999`, `Capacity: 45 vacancies`]);
          
          window.dispatchEvent(
            new CustomEvent("demo:sms", {
              detail: {
                title: "Red Cross Shelter Info",
                body: `Shelter directory: Active shelter in ${countyName} is Ahero Multipurpose Center. Call base: +254 711 000 999. Capacity: 45 vacancies. First aid & clean water available.`,
              },
            })
          );
        }, 1200);
      } else {
        setTextLog(["Please enter a valid county name:", "(e.g. Kisumu, Nairobi, Garissa)"]);
      }
    } else if (screen === "helpline") {
      if (opt === "0") {
        setScreen("main");
        setTextLog(["HopeBridge Emergency Portal", "1. Report Hazard", "2. Request Supplies", "3. Nearest Shelter", "4. Talk to Chief"]);
      }
    } else if (screen === "done") {
      setScreen("dial");
      setInputCode("*483*111#");
    }
  };

  const runAutomatedDemo = (option: "1" | "2" | "3" | "4") => {
    clearDemoTimers();
    setIsDemoRunning(true);
    setActiveOption(option);
    setScreen("dial");
    setInputCode("*483*111#");
    setMenuInput("");

    const addTimer = (fn: () => void, delay: number) => {
      const id = setTimeout(fn, delay);
      demoTimers.current.push(id);
    };

    // Step 1: Dial code (*483*111#)
    addTimer(() => {
      setScreen("main");
      setTextLog(["HopeBridge Emergency Portal", "1. Report Hazard", "2. Request Supplies", "3. Nearest Shelter", "4. Talk to Chief"]);

      // Step 2: Show typing Option choice
      addTimer(() => {
        setMenuInput(option);

        // Step 3: Submit Option choice
        addTimer(() => {
          setMenuInput("");
          if (option === "1") {
            setScreen("report");
            setTextLog(["Select Hazard Type:", "1. Flood", "2. Landslide", "3. Drought"]);

            // Step 4: Show typing "1" (Flood)
            addTimer(() => {
              setMenuInput("1");

              // Step 5: Submit Flood Option
              addTimer(() => {
                setMenuInput("");
                setScreen("submitting");
                setTextLog(["Submitting Report via USSD..."]);

                // Step 6: Complete
                addTimer(() => {
                  setScreen("done");
                  setTextLog(["Report Submitted Successfully!", "Local rescue team notified.", "Thank you."]);
                  setIsDemoRunning(false);
                  setActiveOption(null);

                  window.dispatchEvent(
                    new CustomEvent("demo:sms", {
                      detail: {
                        title: "USSD Alert Gateway",
                        body: "USSD damage report (Flood) processed for Nyando region. Verification team dispatched.",
                      },
                    })
                  );
                }, 1500);
              }, 1200);
            }, 1500);

          } else if (option === "2") {
            setScreen("request");
            setTextLog(["Request Urgent Supplies:", "1. Clean Water", "2. Relief Food", "3. Shelter / Tents"]);

            // Step 4: Show typing "2" (Relief Food)
            addTimer(() => {
              setMenuInput("2");

              // Step 5: Submit Supplies Option
              addTimer(() => {
                setMenuInput("");
                setScreen("submitting");
                setTextLog(["Processing request..."]);

                // Step 6: Complete
                addTimer(() => {
                  setScreen("done");
                  setTextLog(["Supplies requested!", "Red Cross volunteers alerted.", "Keep phone active."]);
                  setIsDemoRunning(false);
                  setActiveOption(null);

                  window.dispatchEvent(
                    new CustomEvent("demo:sms", {
                      detail: {
                        title: "HopeBridge Logistics",
                        body: "Your request for Relief Food has been received. Ticket HB-8421. A volunteer will contact you shortly.",
                      },
                    })
                  );
                }, 1500);
              }, 1200);
            }, 1500);

          } else if (option === "3") {
            setScreen("shelter");
            setTextLog(["Enter County Name:", "(e.g. Kisumu, Nairobi, Garissa)"]);

            // Step 4: Show typing county name key-by-key
            addTimer(() => {
              setMenuInput("K");
              addTimer(() => { setMenuInput("Ki"); }, 150);
              addTimer(() => { setMenuInput("Kis"); }, 300);
              addTimer(() => { setMenuInput("Kisu"); }, 450);
              addTimer(() => { setMenuInput("Kisum"); }, 600);
              addTimer(() => {
                setMenuInput("Kisumu");

                // Step 5: Submit county search option
                addTimer(() => {
                  setMenuInput("");
                  setScreen("submitting");
                  setTextLog(["Searching shelters in Kisumu..."]);

                  // Step 6: Complete
                  addTimer(() => {
                    setScreen("done");
                    setTextLog(["Active Shelter found:", "Ahero Multipurpose Center", "Call: +254 711 000 999", "Capacity: 45 vacancies"]);
                    setIsDemoRunning(false);
                    setActiveOption(null);

                    window.dispatchEvent(
                      new CustomEvent("demo:sms", {
                        detail: {
                          title: "Red Cross Shelter Info",
                          body: "Shelter directory: Active shelter in Kisumu County is Ahero Multipurpose Center. Call base: +254 711 000 999. Capacity: 45 vacancies. First aid & clean water available.",
                        },
                      })
                    );
                  }, 1500);
                }, 1200);
              }, 750);
            }, 1200);

          } else if (option === "4") {
            setScreen("helpline");
            setTextLog(["Connecting to Local Chief...", "Nelson (Nyando): +254 722 000 000", "Press 0 to go back"]);

            // Dispatch SMS and automatically go back after 3 seconds
            addTimer(() => {
              window.dispatchEvent(
                new CustomEvent("demo:sms", {
                  detail: {
                    title: "Chief Nelson (Nyando)",
                    body: "Habari. I am coordinating the emergency response. If you have an emergency, report via USSD Option 1 or evacuate to Ahero Base.",
                  },
                })
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
        Simulate how remote communities report disasters using standard network codes (dial <strong className="text-foreground">*483*111#</strong>).
      </p>

      {/* Automated Demo Mode Options */}
      <div className="mb-2 space-y-1 rounded-xl bg-muted/40 p-2 border border-border">
        <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground block mb-0.5">
          Auto-Play USSD Demos
        </span>
        <div className="grid grid-cols-2 gap-1.5">
          <Button
            size="xs"
            variant="secondary"
            className={`text-[9px] font-bold py-1 cursor-pointer flex items-center justify-center gap-1 h-7 ${activeOption === "1" ? "bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/35" : "bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-foreground border border-border"}`}
            onClick={() => runAutomatedDemo("1")}
            disabled={isDemoRunning}
          >
            <Play className="size-2 fill-current shrink-0" />
            1. Report Damage
          </Button>
          <Button
            size="xs"
            variant="secondary"
            className={`text-[9px] font-bold py-1 cursor-pointer flex items-center justify-center gap-1 h-7 ${activeOption === "2" ? "bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/35" : "bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-foreground border border-border"}`}
            onClick={() => runAutomatedDemo("2")}
            disabled={isDemoRunning}
          >
            <Play className="size-2 fill-current shrink-0" />
            2. Get Supplies
          </Button>
          <Button
            size="xs"
            variant="secondary"
            className={`text-[9px] font-bold py-1 cursor-pointer flex items-center justify-center gap-1 h-7 ${activeOption === "3" ? "bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/35" : "bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-foreground border border-border"}`}
            onClick={() => runAutomatedDemo("3")}
            disabled={isDemoRunning}
          >
            <Play className="size-2 fill-current shrink-0" />
            3. Find Shelter
          </Button>
          <Button
            size="xs"
            variant="secondary"
            className={`text-[9px] font-bold py-1 cursor-pointer flex items-center justify-center gap-1 h-7 ${activeOption === "4" ? "bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/35" : "bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-foreground border border-border"}`}
            onClick={() => runAutomatedDemo("4")}
            disabled={isDemoRunning}
          >
            <Play className="size-2 fill-current shrink-0" />
            4. Talk to Chief
          </Button>
        </div>
      </div>

      {/* Retro Phone Body */}
      <div className="mx-auto w-54 rounded-2xl bg-neutral-800 p-2 border-2 border-neutral-700 shadow-xl flex flex-col items-center">
        {/* LCD Screen */}
        <div className="w-full h-24 bg-[#8fa48c] border-2 border-[#788e75] rounded-md p-1.5 font-mono text-neutral-900 flex flex-col justify-between shadow-inner">
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
                  <div key={i}>{line}</div>
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
                  <button type="submit" className="text-[8px] font-bold uppercase underline cursor-pointer">
                    Dismiss
                  </button>
                </div>
              )}
            </form>
          )}
        </div>

        {/* Dial Button */}
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
            className="rounded-xl px-3 py-1 bg-red-600 hover:bg-red-750 text-white text-[9px] font-bold uppercase tracking-wider cursor-pointer h-7"
            onClick={onClose}
          >
            ← Back to App
          </Button>
        </div>
      )}
    </div>
  );
}
