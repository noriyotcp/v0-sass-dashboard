"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
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
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";
import { Post } from "@prisma/client";
import { Switch } from "@/components/ui/switch";

const formSchema = z.object({
  title: z
    .string()
    .nonempty({
      message: "Title is required.",
    })
    .refine((val) => val.trim().length > 0, {
      message: "Title must not be white spaces only.",
    }),
  content: z.string(),
  published: z.boolean(),
});

export function NewPostForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [willPublished, setWillPublished] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      published: false,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title..." {...field} autoFocus />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea placeholder="Content..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="published"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center space-x-2">
                  <Switch
                    onClick={(_e) => {
                      setWillPublished(!willPublished);
                    }}
                  />
                  <FormLabel>Publish</FormLabel>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          Submit
        </Button>
        <Button variant="outline" className="ml-2">
          <a className="back" href="#" onClick={() => router.replace("/posts")}>
            or Cancel
          </a>
        </Button>
      </form>
    </Form>
  );

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    try {
      const body = {
        title: values.title,
        content: values.content,
        published: willPublished,
      };
      console.log(`body`, body);

      await fetch("/api/posts/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }).then(async (res) => {
        if (res.status === 201) {
          const data = await res.json();
          console.log(`response data`, data);
          console.log("redirecting");
          router.push(`/posts/${data.id}`);
          router.refresh();
        }
      });
    } catch (error) {
      console.error(error);
    } finally {
      startTransition(() => {
        setIsSubmitting(false);
      });
    }
  }
}

export function EditPostForm({ post }: { post: Post }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [willPublished, setWillPublished] = useState(post.published);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: post.title,
      content: post.content ?? "",
      published: willPublished,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Edit Title..." {...field} autoFocus />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea placeholder="Edit Content..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="published"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={willPublished}
                    onClick={(_e) => {
                      setWillPublished(!willPublished);
                    }}
                  />
                  <FormLabel>Publish</FormLabel>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          Submit
        </Button>
        <Button variant="outline" className="ml-2">
          <a
            className="back"
            href="#"
            onClick={() => router.replace(`/posts/${post.id}`)}
          >
            or Cancel
          </a>
        </Button>
      </form>
    </Form>
  );

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    try {
      const body = {
        title: values.title,
        content: values.content,
        published: willPublished,
      };
      console.log(`body`, body);

      await fetch(`/api/posts/${post.id}/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }).then(async (res) => {
        if (res.status === 200) {
          const data = await res.json();
          console.log(`response data`, data);
          console.log("redirecting");
          router.push(`/posts/${data.id}`);
          router.refresh();
        }
      });
    } catch (error) {
      console.error(error);
    } finally {
      startTransition(() => {
        setIsSubmitting(false);
      });
    }
  }
}
