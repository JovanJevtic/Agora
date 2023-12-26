import { useEffect } from "react";
import { TSPostSearchForm, TSPostWritingSchema } from "./validation/form";
import { FieldError } from "react-hook-form";

type Props = {
    value: TSPostWritingSchema | TSPostSearchForm;
    localStorageKey: string;
}

export const usePersistForm = ({
    value,
    localStorageKey,
  }: Props) => {
    useEffect(() => {
      localStorage.setItem(localStorageKey, JSON.stringify(value));
    }, [value, localStorageKey]);
  
    return;
};