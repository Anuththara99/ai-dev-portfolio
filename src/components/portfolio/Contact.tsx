'use client';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(5),
});

type FormData = z.infer<typeof schema>;

export function Contact() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit() {
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 1000)); // Simulate API
      // Replace with actual API call
      toast.success("Message sent!");
      reset();
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="w-full max-w-xl mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">Contact</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white dark:bg-gray-900 p-8 rounded-xl shadow-md">
        <div>
          <label className="block mb-1 font-medium text-gray-800 dark:text-gray-200">Name</label>
          <input
            {...register("name")}
            className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
            disabled={loading}
          />
          {errors.name && <span className="text-red-500 text-sm">{errors.name.message as string}</span>}
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-800 dark:text-gray-200">Email</label>
          <input
            {...register("email")}
            type="email"
            className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
            disabled={loading}
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email.message as string}</span>}
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-800 dark:text-gray-200">Message</label>
          <textarea
            {...register("message")}
            rows={5}
            className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
            disabled={loading}
          />
          {errors.message && <span className="text-red-500 text-sm">{errors.message.message as string}</span>}
        </div>
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-primary text-white font-semibold shadow-lg hover:bg-primary/90 transition-colors text-lg disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </section>
  );
}

export default Contact; 