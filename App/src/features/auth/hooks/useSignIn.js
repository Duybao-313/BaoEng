import { useCallback, useState } from "react";

import { login } from "../../../api";
import { validateSignIn } from "../../../utils";
import { toAuthMessage } from "../errors";

const INITIAL_VALUES = { username: "", password: "", remember: true };

/**
 * Quan ly state + nghiep vu cho man hinh dang nhap.
 * Man hinh chi lo hien thi, khong xu ly logic.
 */
export function useSignIn() {
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
    const nextErrors = validateSignIn(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return { ok: false };

    setSubmitting(true);
    setFormError(null);
    try {
      // Backend dang nhap bang username (khong dung email).
      const session = await login({
        username: values.username.trim(),
        password: values.password,
      });
      return { ok: true, session };
    } catch (error) {
      setFormError(toAuthMessage(error));
      return { ok: false, error };
    } finally {
      setSubmitting(false);
    }
  }, [values]);

  return { values, errors, formError, submitting, setField, submit };
}
