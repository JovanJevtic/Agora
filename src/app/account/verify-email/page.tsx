"use client";

import { verifyJWT } from "@/app/libs/token";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Button } from "@/app/components/ui/button";
import Spinner from "@/app/components/Spinner/Spinner";

type Token = {
  email: string;
  tokenCode: number;
  exp: number;
};

const VerifyPage = () => {
  const { push, refresh } = useRouter();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [tokenValue, setTokenValue] = useState<Token | null>();
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [responseError, setResponseError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getValue = async () => {
    try {
      const tokenVal: Token = await verifyJWT(token as string);
      if (tokenVal) setTokenValue(tokenVal);
    } catch (error) {
      setResponseError(
        "Verifikacioni token istekao, molimo Vas pokusajte ponovo!"
      );
    }
  };

  const validate = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.BASE_URL}/api/auth/confirmEmail`,
        {
          tokenVal: tokenValue,
          token: token,
        }
      );
      setResponseMessage(res.data.message);

      if (res.data.redirect) {
        push("/login");
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setResponseError(error.response.data.error);
    }
  };

  useEffect(() => {
    if (token) getValue();
  }, []);

  useEffect(() => {
    if (tokenValue) validate();
  }, [tokenValue]);

  return (
    <div
      className="w-full h-[90vh] flex justify-center items-center flex-col"
      id="emailVerificationPage"
    >
      {!responseError && !responseMessage && (
        <h1 className="text-gray-400 mb-5">
          Provjera verifikacijskog tokena...
        </h1>
      )}
      <div className="loading-wrapp">{loading && <Spinner />}</div>
      {responseMessage && (
        <div className="flex items-center justify-center flex-col">
          {responseMessage && (
            <p className="text-green-500">Verifikacija uspjesna!</p>
          )}
          <Link className="mt-3" href={"/login"}>
            <Button>Prijavi se</Button>
          </Link>
        </div>
      )}
      {responseError && (
        <div className="flex justify-center items-center flex-col">
          <p className="text-red-600">{responseError}</p>
          <Link className="mt-3" href={"/register"}>
            <Button>Registruj se</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default VerifyPage;
