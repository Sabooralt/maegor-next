"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Check, LoaderCircle, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { checkUsername } from "../../../actions/checkUsername";
import { LogoSvg } from "./logoSvg";

interface SignupFormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const RegisterForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [usernameStatus, setUsernameStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [username, setUsername] = useState<string>("");
  const router = useRouter();

  const formik = useFormik<SignupFormValues>({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .trim()
        .required("Username is required.")
        .min(3, "Username must be at least 3 characters.")
        .max(20, "Username must not exceed 20 characters.")
        .transform((value) => (value ? value.toLowerCase() : value)),
      email: Yup.string()
        .trim()
        .email("Invalid email address")
        .required("Email is required."),
      password: Yup.string()
        .trim()
        .required("Password is required.")
        .min(6, "Password must be at least 6 characters."),
      confirmPassword: Yup.string()
        .trim()
        .oneOf([Yup.ref("password")], "Passwords must match.")
        .required("Confirm Password is required."),
    }),
    onSubmit: async (values) => {
      try {
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: values.username,
            email: values.email,
            password: values.password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          toast.success("Account Created!", {
            description: "Please log in with your new account.",
          });
          router.push("/auth/login");
        } else {
          toast.error(data.message || "An error occurred.");
        }
      } catch (error) {
        toast.error("An error occurred. Please try again later.");
      } finally {
      }
    },
  });
  useEffect(() => {
    const checkUsernameAvailability = async () => {
      if (username.length > 3) {
        setLoading(true);
        try {
          const result = await checkUsername(username);
          setUsernameStatus({
            success: result.available,
            message: result.message,
          });
          console.log(result);
        } catch (error) {
          setUsernameStatus({
            success: false,
            message: "An error occurred while checking the username",
          });
        } finally {
          setLoading(false);
        }
      } else {
        setUsernameStatus(null);
      }
    };

    const debounce = setTimeout(checkUsernameAvailability, 500);
    return () => clearTimeout(debounce);
  }, [username]);

  return (
    <div className="grid pt-20 pb-3 size-full px-10 lg:px-20 xl:px-32">
      <div className="grid gap-0">
        <div className="grid gap-2">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-pink-500 to-purple-600">
            Sign Up
          </h1>

          <form onSubmit={formik.handleSubmit} className="grid gap-2">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <div className="grid gap-1">
                <Input
                  id="username"
                  name="username"
                  value={username}
                  onBlur={formik.handleBlur}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    formik.setFieldValue("username", e.target.value);
                  }}
                  className="input-styles"
                />

                <div className="flex-row flex w-full justify-between">
                  {username && (
                    <p
                      className={`text-xs flex flex-row order-last ${
                        loading
                          ? "text-gray-500"
                          : usernameStatus
                          ? usernameStatus.success
                            ? "text-green-500"
                            : "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      {loading ? (
                        <>
                          <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                          Please wait...
                        </>
                      ) : usernameStatus ? (
                        <>
                          {usernameStatus.success ? (
                            <Check className="h-4 w-4 mr-1" />
                          ) : (
                            <X className="h-4 w-4 mr-1" />
                          )}
                          {usernameStatus.message}
                        </>
                      ) : null}
                    </p>
                  )}

                  {formik.touched.username && formik.errors.username ? (
                    <div className="text-xs text-red-500">
                      {formik.errors.username}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
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
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="grid gap-1">
                <Input
                  id="confirmPassword"
                  {...formik.getFieldProps("confirmPassword")}
                  className="input-styles"
                  type="password"
                />
                {formik.touched.confirmPassword &&
                formik.errors.confirmPassword ? (
                  <div className="text-xs text-red-500">
                    {formik.errors.confirmPassword}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="grid gap-1 py-5">
              <Button
                type="submit"
                disabled={
                  !formik.isValid ||
                  formik.isSubmitting ||
                  !formik.dirty ||
                  (usernameStatus && !usernameStatus.success) ||
                  loading
                }
                className="bg-gradient-to-r hover:to-[#BF29F0] text-base drop-shadow-md from-indigo-700 to-purple-700 text-white flex gap-1"
              >
                {formik.isSubmitting && (
                  <LoaderCircle className="animate-spin size-5" />
                )}
                Sign Up
              </Button>

              <div className="mx-auto font-geist flex gap-1 font-normal">
                <p>Already have an account?</p>
                <Link
                  href="/auth/login"
                  className="underline underline-offset-4 text-indigo-800"
                >
                  Log in
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="flex mt-auto mx-auto opacity-50 flex-col items-center justify-center">
        <LogoSvg/>
        <small>
          © 2024 Maegor | Developed by{" "}
          <a className="underline" href="https://saboordev.netlify.app/">
            Saboor
          </a>
        </small>
      </div>
    </div>
  );
};
