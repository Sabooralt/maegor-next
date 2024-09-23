"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "../../../actions/new-verification";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./card";
import { LoaderCircle } from "lucide-react";
import { FormSucess } from "./form/form-success";
import { FormError } from "./form/form-error";
import { Button } from "./button";
import Link from "next/link";

const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {

    
    if (success || error) return;

    if (!token) {
      setError("Missing token!");
      return;
    }

    console.log({token})

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Confirming your verification</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-center w-full">
          {!success && !error && <LoaderCircle className="animate-spin size-5" />}
          <FormSucess message={success} />
          {!success && <FormError message={error} />}
        </div>
      </CardContent>

      <CardFooter>
        <Link href="/auth/login">
          <Button className="w-full">Back to login</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default NewVerificationForm;
