"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Swap in your own Formspree form ID: https://formspree.io/forms
const FORMSPREE_FORM_ID = "YOUR_FORM_ID";

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email address."),
  message: z.string().min(10, "Please write a bit more detail."),
});

type ContactFormValues = z.infer<typeof contactSchema>;

type SubmitStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  async function onSubmit(values: ContactFormValues) {
    setStatus("submitting");

    try {
      const response = await fetch(
        `https://formspree.io/f/${FORMSPREE_FORM_ID}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (!response.ok) {
        throw new Error("Formspree request failed");
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "rounded-xl border border-[var(--input)] bg-[var(--tile-bg)] px-4 py-3 text-sm text-[var(--text-strong)] placeholder:text-[var(--text-faint)] focus-visible:border-[var(--brand)] focus-visible:ring-0";
  const labelClass =
    "font-mono-data mb-2 block text-xs tracking-widest text-[var(--text-muted)]";

  if (status === "success") {
    return (
      <p className="border-glow rounded-xl px-4 py-3 text-sm text-[var(--text-muted)]">
        Thanks for reaching out! I&apos;ll get back to you as soon as I can.
      </p>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClass}>NAME</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your name"
                  className={inputClass}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClass}>EMAIL</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  className={inputClass}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClass}>MESSAGE</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell me about your project..."
                  className={`min-h-32 resize-none ${inputClass}`}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {status === "error" && (
          <p className="text-sm text-[var(--destructive)]">
            Something went wrong sending your message. Please try again, or
            email me directly.
          </p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full rounded-xl py-4 font-semibold text-white transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
          style={{
            background:
              "linear-gradient(135deg, var(--brand-deep), var(--brand))",
            boxShadow: "0 0 40px rgba(var(--glow-violet-rgb), 0.4)",
          }}
        >
          {status === "submitting" ? "Sending…" : "Send Message ✦"}
        </button>
      </form>
    </Form>
  );
}
