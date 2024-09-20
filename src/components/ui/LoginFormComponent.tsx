"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogoSvg } from "./logoSvg";
import { signIn } from "next-auth/react";

interface SigninFormValues {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const router = useRouter();

  const formik = useFormik<SigninFormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .trim()
        .email("Invalid email address")
        .required("Email is required."),
      password: Yup.string().trim().required("Password is required."),
    }),
    onSubmit: async (values) => {
      try {
        const res = await signIn("credentials", {
          redirect: false, // Prevents auto redirection
          email: values.email,
          password: values.password,
        });

        if (res?.error) {
          toast.error(res.error);
        } else {
          router.push("/");
          toast.success("Log in successfull.");
        }
      } catch (error) {
        toast.error("An error occurred. Please try again later.");
      } 
    },
  });

  return (
    <div className="grid pt-20 pb-3 size-full px-10 lg:px-20 xl:px-32">
      <div className="grid gap-0">
        <div className="grid gap-2">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-pink-500 to-purple-600">
            Sign in
          </h1>

          <form onSubmit={formik.handleSubmit} className="grid gap-2">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <div className="grid gap-1">
                <Input
                  id="email"
                  {...formik.getFieldProps("email")}
                  className="input-styles"
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-xs text-red-500">
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <div className="grid gap-1">
                <Input
                  id="password"
                  {...formik.getFieldProps("password")}
                  className="input-styles"
                  type="password"
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-xs text-red-500">
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="grid gap-1 py-5">
              <Button
                type="submit"
                disabled={
                  !formik.isValid || formik.isSubmitting || !formik.dirty
                }
                className="bg-gradient-to-r hover:to-[#BF29F0] text-base drop-shadow-md from-indigo-700 to-purple-700 text-white flex gap-1"
              >
                {formik.isSubmitting && (
                  <LoaderCircle className="animate-spin size-5" />
                )}
                Sign Up
              </Button>

              <div className="mx-auto font-geist flex gap-1 font-normal">
                <p>Don't have an account?</p>
                <Link
                  href="/auth/signin"
                  className="underline underline-offset-4 text-indigo-800"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="flex mt-auto mx-auto opacity-50 flex-col items-center justify-center">
        <LogoSvg />
        <small>
          © 2024 Maegor | Developed by
          <a className="underline" href="https://saboordev.netlify.app/">
            Saboor
          </a>
        </small>
      </div>
    </div>
  );
};
