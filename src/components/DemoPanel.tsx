import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Sparkles, Play, ShieldAlert, PhoneIncoming, Smartphone, X } from "lucide-react";
import { Button } from "./ui/button";

export function DemoPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleAutofill = (scenario: "nyando" | "turkana") => {
    // Navigate to report page first
    navigate({ to: "/report" });

    // Wait for route render to hook up listeners
    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent("demo:autofill", {
          detail: { scenario },
        })
      );
    }, 200);
  };

  const triggerChiefSms = () => {
    window.dispatchEvent(
      new CustomEvent("demo:sms", {
        detail: {
          title: "Chief Nelson (Nyando)",
          body: "EMERGENCY: River Nyando water levels have breached the danger mark. Evacuation to Ahero Center is active. Evacuate immediately.",
        },
      })
    );
  };

  const triggerMpesaStk = () => {
    window.dispatchEvent(
      new CustomEvent("demo:stk", {
        detail: {
          amount: 2500,
          account: "NYANDO-RELIEF",
        },
      })
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] pointer-events-auto select-none font-sans">
      {/* Floating Toggle Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 rounded-full bg-neutral-900 text-white hover:bg-neutral-800 border border-neutral-700 px-4 py-3 shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer font-semibold text-xs tracking-wider uppercase"
        >
          <Sparkles className="size-4 text-amber-400 animate-pulse" />
          Demo Panel
        </button>
      )}

      {/* Control Panel Window */}
      {isOpen && (
        <div className="w-80 rounded-3xl bg-neutral-900 text-white border border-neutral-800 shadow-2xl p-5 animate-in slide-in-from-bottom-5 fade-in-50 duration-300">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4">
            <h3 className="font-serif font-bold text-lg flex items-center gap-2 text-neutral-100">
              <Sparkles className="size-4 text-amber-400" /> Demo Panel
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-neutral-500 hover:text-neutral-300 cursor-pointer"
            >
              <X className="size-4" />
            </button>
          </div>

          <div className="space-y-5">
            {/* Scenarios */}
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2.5">
                Autofill Scenarios (Demo Flow)
              </h4>
              <div className="flex flex-col gap-2">
                <Button
                  size="sm"
                  className="w-full justify-start bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700/50 text-xs font-medium cursor-pointer"
                  onClick={() => handleAutofill("nyando")}
                >
                  <Play className="size-3.5 mr-2 text-amber-400 shrink-0" />
                  Autofill: Nyando Flood
                </Button>
                <Button
                  size="sm"
                  className="w-full justify-start bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700/50 text-xs font-medium cursor-pointer"
                  onClick={() => handleAutofill("turkana")}
                >
                  <Play className="size-3.5 mr-2 text-amber-400 shrink-0" />
                  Autofill: Turkana Drought
                </Button>
              </div>
            </div>

            {/* Simulated Alerts */}
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2.5">
                Simulate Mobile Interactions
              </h4>
              <div className="flex flex-col gap-2">
                <Button
                  size="sm"
                  className="w-full justify-start bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700/50 text-xs font-medium cursor-pointer"
                  onClick={() => window.dispatchEvent(new CustomEvent("demo:open-ussd"))}
                >
                  <Smartphone className="size-3.5 mr-2 text-amber-400 shrink-0" />
                  Launch USSD Simulator
                </Button>
                <Button
                  size="sm"
                  className="w-full justify-start bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700/50 text-xs font-medium cursor-pointer"
                  onClick={triggerChiefSms}
                >
                  <PhoneIncoming className="size-3.5 mr-2 text-blue-400 shrink-0" />
                  Simulate Chief's Alert SMS
                </Button>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="rounded-xl bg-neutral-950 p-3 border border-neutral-800 flex gap-2">
              <ShieldAlert className="size-4 text-neutral-400 shrink-0 mt-0.5" />
              <p className="text-[10px] text-neutral-400 leading-normal">
                Click autofill to redirect to the report page, populate coordinates, type the description, and click send. SMS simulator alerts show instant responses!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
