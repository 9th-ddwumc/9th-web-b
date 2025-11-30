// 에라토스테네스의 체로 소수 목록 생성
export const findPrimeNumbers = (max: number): number[] => {
  if (max < 2) return [];

  // true = 소수 가능성 있음
  const sieve = new Array(max + 1).fill(true);
  sieve[0] = sieve[1] = false; // 0과 1은 소수 아님

  // √max 까지만 검사하면 충분
  for (let i = 2; i * i <= max; i++) {
    if (sieve[i]) {
      // i의 배수들을 모두 소수가 아니라고 체크
      for (let j = i * i; j <= max; j += i) {
        sieve[j] = false;
      }
    }
  }

  // true인 index만 소수로 반환
  const primes: number[] = [];
  for (let i = 2; i <= max; i++) {
    if (sieve[i]) primes.push(i);
  }

  return primes;
};
