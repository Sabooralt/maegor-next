"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { LogoSvg } from "./logoSvg";
import { LoginSchema } from "../../../schemas";
import { login } from "../../../actions/login";
import { useState, useTransition } from "react";
import * as z from "zod";
import Social from "../auth/googleButton";
import { FormError } from "./form/form-error";
import { PrimaryButton } from "./primary-button";
import { FaGoogle } from "react-icons/fa";
import { OrSeparator } from "./or-separator";
import GoogleButton from "../auth/googleButton";

// Define the types for the form values

export const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with a different provider!"
      : "";
  const [isPending, startTransition] = useTransition();
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [formError, setFormError] = useState<string | undefined>("");

  const formik = useFormik<z.infer<typeof LoginSchema>>({
    initialValues: {
      email: "",
      password: "",
      code: "",
    },
    validate: (values) => {
      try {
        LoginSchema.parse(values);
        return {};
      } catch (error) {
        if (error instanceof z.ZodError) {
          const formikErrors: Record<string, string> = {};
          error.errors.forEach((err) => {
            if (err.path.length > 0) {
              formikErrors[err.path[0]] = err.message;
            }
          });
          return formikErrors;
        }
      }
    },
    onSubmit: async (values: z.infer<typeof LoginSchema>) => {
      setFormError("");
      startTransition(() => {
        login(values)
          .then((data) => {
            if (data?.success) {
              toast.success(data.success);
              formik.resetForm();
            }
            if (data?.error) {
              setFormError(data?.error);
              toast.error(data?.error);
            }
            if (data?.twoFactor) {
              formik.resetForm();
              setShowTwoFactor(true);
            }
          })
          .catch(() => {
            setFormError("An error occured!");
            toast.error("An error occured!");
          });
      });
    },
  });

  return (
    <div className="grid pt-20 pb-3 size-full px-10 lg:px-20">
      <div className="grid gap-0">
        <div className="grid gap-1">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-pink-500 to-purple-600">
            Sign in
          </h1>

          <div className="w-full">
           <GoogleButton/>

            <OrSeparator />
          </div>

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

            <FormError message={formError || urlError} />

            <div className="grid gap-4 py-5">
              <Button
                type="submit"
                disabled={
                  !formik.isValid ||
                  formik.isSubmitting ||
                  !formik.dirty ||
                  isPending
                }
                className="bg-white text-black drop-shadow-md text-base font-medium border border-black/15"
                variant="secondary"
              >
                {isPending && <LoaderCircle className="animate-spin size-5" />}
                {isPending ? "Signing in..." : "Sign in"}
              </Button>

              <div className="mx-auto font-geist flex gap-1 font-normal">
                <p>Don't have an account?</p>
                <Link
                  href="/auth/register"
                  className="underline underline-offset-4 text-indigo-800"
                >
                  Sign up
                </Link>
              </div>

              <div className="flex mt-auto mx-auto opacity-50 flex-col items-center justify-center">
                <LogoSvg />
                <small>
                  © 2024 Maegor | Developed by
                  <a
                    className="underline"
                    href="https://saboordev.netlify.app/"
                  >
                    Saboor
                  </a>
                </small>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
