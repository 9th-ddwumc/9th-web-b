import { useEffect, useState, type ChangeEvent } from "react";

interface UseFromProps<T> {
  initalValue: T;
  validate: (values: T) => Record<keyof T, string>;
}

type InputElement = HTMLInputElement | HTMLTextAreaElement;

function useForm<T extends Record<string, string>>({
  initalValue,
  validate,
}: UseFromProps<T>) {
  //폼 입력 값 상태
  const [values, setValues] = useState<T>(initalValue);
  const [touched, setTouched] = useState<Record<keyof T, boolean>>(
    Object.keys(initalValue).reduce(
      (acc, key) => ({
        ...acc,
        [key]: false,
      }),
      {}
    ) as Record<keyof T, boolean>
  );

  //에러 메시지 상태
  const [errors, setErrors] = useState<Record<keyof T, string>>(
    Object.keys(initalValue).reduce(
      (acc, key) => ({
        ...acc,
        [key]: "",
      }),
      {}
    ) as Record<keyof T, string>
  );

  //입력 값이 변경될 때 실행되는 함수
  const handleChange = (name: keyof T, text: string) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: text,
    }));
  };

  //포커스를 잃었을 때(blur) 실행되는 함수
  const handleBlur = (name: keyof T) => {
    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true,
    }));
  };

  //폼 필드에 필요한 속성(props)을 반환하는 함수
  const getInputProps = (name: keyof T) => {
    const value = values[name];
    const onChange = (e: ChangeEvent<InputElement>) => {
      handleChange(name, e.target.value);
    };
    const onBlur = () => {
      handleBlur(name);
    };

    return { value, onChange, onBlur };
  };

  //입력 값이 변경될 때마다 유효성 검사 로직 실행
  useEffect(() => {
    const newErrors = validate(values);
    setErrors(newErrors);
  }, [values, validate]);

  return { values, errors, touched, getInputProps };
}

export default useForm;
