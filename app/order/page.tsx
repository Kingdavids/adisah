import type { Metadata } from "next";
import { OrderBuilder } from "@/components/order-builder";

export const metadata: Metadata = {
  title: "Order African Groceries on WhatsApp",
  description:
    "Build your African grocery list and send it to Adisah African Store on WhatsApp. Doorstep delivery in Upper Marlboro, Bowie, Largo and across Prince George's County.",
  alternates: { canonical: "/order" },
};

export default function OrderPage() {
  return (
    <>
      <section className="grain relative overflow-hidden bg-ink text-cream">
        <div aria-hidden className="absolute -right-32 -top-32 size-[28rem] rounded-full bg-maroon/70 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">WhatsApp ordering</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-6xl">Build your list. Send it in one tap.</h1>
          <p className="mt-4 max-w-xl text-cream/70">
            Pick what you need, add anything we haven&apos;t listed, and we&apos;ll reply on WhatsApp with your total and delivery time.
          </p>
        </div>
      </section>
      <OrderBuilder />
    </>
  );
}
