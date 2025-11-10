// form 입력 값, 검증 상태 관리용 Hook
import { useEffect, useState } from "react";
import type { ChangeEvent} from "react";


interface UseFormProps<T> {
  initialValue: T; // {email: '', passwork: '' }
  validate: (values: T) => Record<keyof T, string>; // validate: 폼 값에 대한 유효성 검사 함수. 반환값은 오류 메시지를 담은 객체
}

// 제네릭 넘겨주고 받음
function useForm<T>({ initialValue, validate }: UseFormProps<T>) {
  const [values, setValues] = useState(initialValue);
  const [touched, setTouched] = useState<Record<string, boolean>>(); // 각 필드가 사용자에 의해 건드려졌는지 여부 (onBlur 시 true)
  const [errors, setErrors] = useState<Record<string, string>>();

  // 특정 필드(name)의 값을 text로 갱신
  const handleChange = (name: keyof T, text: string) => {
    setValues({
      ...values, //불변성 유지 (기존 값 유지)
      [name]: text,
    });
  };

  // 해당 필드가 blur(포커스 아웃)되면 touched로 표시
  const handleBlur = (name: keyof T) => {
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  // 이메일 인풋, 패스워드 인풋, 속성들을 가져오는 것
  // 인풋 필드에 쉽게 바인딩할 수 있도록 props 모음 반환
  const getInputProps = (name: keyof T) => {
    const value: T[keyof T] = values[name];

    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      handleChange(name, e.target.value);

    const onBlur = () => handleBlur(name);

    return { value, onChange, onBlur };
  };

  // values가 바뀔때마다 실행 -> useEffect 오류 메시지 상태 갱신
  useEffect(() => {
    const newErrors = validate(values);
    setErrors(newErrors);
  }, [validate, values]);

  return { values, errors, touched, getInputProps }; // 컴포넌트에서 사용할 데이터들 반환
}

export default useForm;