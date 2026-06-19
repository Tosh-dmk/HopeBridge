import { useState, useEffect } from "react";
import { MessageSquare, Phone, X, ShieldAlert } from "lucide-react";
import { Button } from "./ui/button";

export function NotificationToast() {
  const [sms, setSms] = useState<{ title: string; body: string } | null>(null);
  const [stk, setStk] = useState<{ amount: number; account: string } | null>(null);
  const [pin, setPin] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const handleSms = (e: Event) => {
      const customEvent = e as CustomEvent;
      setSms({
        title: customEvent.detail.title || "Emergency Alert",
        body: customEvent.detail.body || "",
      });
    };

    const handleStk = (e: Event) => {
      const customEvent = e as CustomEvent;
      setStk({
        amount: customEvent.detail.amount || 500,
        account: customEvent.detail.account || "HOPE-RELIEF",
      });
    };

    window.addEventListener("demo:sms", handleSms);
    window.addEventListener("demo:stk", handleStk);

    return () => {
      window.removeEventListener("demo:sms", handleSms);
      window.removeEventListener("demo:stk", handleStk);
    };
  }, []);

  // Auto-dismiss SMS after 6 seconds
  useEffect(() => {
    if (sms) {
      const timer = setTimeout(() => setSms(null), 6000);
      return () => clearTimeout(timer);
    }
  }, [sms]);

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.length < 4) return;
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const amountPaid = stk.amount;
      const accountPaid = stk.account;
      setStk(null);
      setPin("");
      
      // Dispatch success back to any listeners
      window.dispatchEvent(
        new CustomEvent("demo:stk-success", {
          detail: { message: "STK push processed successfully!" },
        })
      );
    }, 1500);
  };

  return (
    <div className="fixed inset-x-0 top-4 z-[1000000] flex flex-col items-center gap-3 pointer-events-none px-4">
      {/* SMS Phone Toast */}
      {sms && (
        <div className="w-full max-w-sm rounded-3xl bg-neutral-900 text-white p-4 shadow-2xl border border-neutral-800 flex items-start gap-3 pointer-events-auto animate-in slide-in-from-top-4 duration-300">
          <div className="size-10 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0">
            <MessageSquare className="size-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-0.5">
              <span className="font-bold text-sm tracking-wide flex items-center gap-1.5 text-blue-400">
                <Phone className="size-3" /> Messages
              </span>
              <span className="text-[10px] text-neutral-400">now</span>
            </div>
            <h4 className="font-bold text-sm text-neutral-100">{sms.title}</h4>
            <p className="text-xs text-neutral-300 leading-normal mt-1">{sms.body}</p>
          </div>
          <button
            onClick={() => setSms(null)}
            className="text-neutral-500 hover:text-neutral-300 cursor-pointer shrink-0"
          >
            <X className="size-4" />
          </button>
        </div>
      )}

      {/* M-Pesa STK Mock Modal */}
      {stk && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-[999999] pointer-events-auto p-4">
          <div className="w-full max-w-xs rounded-2xl bg-neutral-100 text-neutral-900 border-4 border-neutral-300 p-5 shadow-2xl animate-in zoom-in-95 duration-200 font-mono">
            <div className="flex items-center gap-2 mb-4 justify-center border-b border-neutral-300 pb-2">
              <ShieldAlert className="size-5 text-emerald-600 animate-pulse" />
              <span className="font-bold text-lg tracking-wider text-emerald-700">M-PESA</span>
            </div>
            
            <form onSubmit={handlePinSubmit} className="space-y-4 text-center">
              <p className="text-xs leading-relaxed font-semibold">
                Pay KES {stk.amount.toLocaleString()} to {stk.account} Account?<br />
                Enter your M-Pesa PIN:
              </p>
              
              <input
                type="password"
                maxLength={4}
                required
                autoFocus
                placeholder="••••"
                className="w-full text-center bg-white border border-neutral-300 rounded px-3 py-2 text-xl font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
                disabled={isProcessing}
              />

              <div className="flex gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 bg-white hover:bg-neutral-200 border-neutral-300 text-xs h-9 cursor-pointer"
                  onClick={() => {
                    setStk(null);
                    setPin("");
                  }}
                  disabled={isProcessing}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs h-9 cursor-pointer"
                  disabled={isProcessing || pin.length < 4}
                >
                  {isProcessing ? "Processing..." : "Send"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
