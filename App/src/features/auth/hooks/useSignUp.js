import { useCallback, useState } from "react";

import { register } from "../../../api";
import { validateSignUp } from "../../../utils";
import { toAuthMessage } from "../errors";

const INITIAL_VALUES = { name: "", email: "", password: "" };

/** Quan ly state + nghiep vu cho man hinh dang ky. */
export function useSignUp() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const setField = useCallback((field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
    setFormError(null);
  }, []);

  const submit = useCallback(async () => {
    const nextErrors = validateSignUp(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return { ok: false };

    setSubmitting(true);
    setFormError(null);
    try {
      const account = await register({
        name: values.name.trim(),
        email: values.email.trim(),
        password: values.password,
      });
      return { ok: true, account };
    } catch (error) {
      setFormError(toAuthMessage(error));
      return { ok: false, error };
    } finally {
      setSubmitting(false);
    }
  }, [values]);

  return { values, errors, formError, submitting, setField, submit };
}
