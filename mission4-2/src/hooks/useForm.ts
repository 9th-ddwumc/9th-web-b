import { useState, useRef, useEffect } from "react";

// 폼 값의 타입을 제네릭으로 받음
type FormValues = Record<string, string>;

// 유효성 검사 함수 타입
type ValidateFunction<T extends FormValues> = (values: T) => Partial<Record<keyof T, string>>;

// 반환 타입 정의
interface UseFormReturn<T extends FormValues> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (onValid: (values: T) => void) => (e: React.FormEvent) => void;
  resetForm: () => void;
}

export function useForm<T extends FormValues>(initialValues: T, validate: ValidateFunction<T>): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const valuesRef = useRef<T>(initialValues);
  valuesRef.current = values;

  useEffect(() => {
    const validationErrors = validate(values);
    setErrors(validationErrors);
  }, [values, validate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (onValid: (values: T) => void) => (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(valuesRef.current);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      onValid(valuesRef.current);
    }
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  return { values, errors, handleChange, handleSubmit, resetForm };
}
