import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const DonateInput = z.object({
  phone: z.string().trim().min(9, "Phone number is too short"),
  amount: z.union([z.string(), z.number()]).transform((val) => Number(val)),
  paybill: z.string().optional(),
  account: z.string().optional(),
});

export const donateMpesa = createServerFn({ method: "POST" })
  .validator((d: unknown) => DonateInput.parse(d))
  .handler(async ({ data }) => {
    // Simulate M-Pesa STK Push processing delay of 1.5 seconds
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return {
      success: true,
      message: `Successfully initiated M-Pesa STK push for KES ${data.amount.toLocaleString()} to ${data.phone}. Thank you for donating to ${data.account || "HopeBridge"}!`,
      receipt: `RCPT${Math.floor(Math.random() * 1000000)}`,
    };
  });
