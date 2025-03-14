**1. 프로젝트 개요**

- **프로젝트명**: OZFLEX (넷플릭스 클론)
- **기술 스택**: React, Redux Toolkit, React Query, Supabase, Swiper, TailwindCSS
- **주요 기능**:
✅ 영화 검색 및 상세 조회
✅ 무한 스크롤 기반의 영화 리스트
✅ OAuth(구글, 깃허브) 로그인 및 회원가입
✅ 다크 모드 지원
✅ Swiper를 활용한 슬라이드 카드 UI
✅ React Query를 활용한 데이터 캐싱 및 상태 관리

# 2. 어려웠던 점 & 해결 과정

## **1️⃣ 회원 가입 시 프로필 이미지가 반영되지 않는 문제**

### **🛠 문제 원인**

- Supabase OAuth 로그인 후 Redux 상태를 업데이트하려 했으나,**비동기 요청(dispatch(loadUserSession()))이 Redux 상태에 즉시 반영되지 않음.**
- Redux 상태가 업데이트되기 전에 navigate("/")가 실행되어,**홈 화면에서 로그인 상태가 UI에 반영되지 않는 문제 발생.**

### **✅ 해결 방법**

- 헤더 컴포넌트에서 supabase.auth.getSession()을 통해 최신 세션 정보를 가져와 Redux 상태를 강제로 업데이트.
- await dispatch(loadUserSession());을 추가하여 **Redux 상태가 업데이트된 후** 홈으로 이동하도록 수정.
- 만약 await 없이 navigate("/")를 먼저 실행하면,**UI가 업데이트되지 않아 새로고침을 해야 정상적으로 로그인 상태가 반영됨.**

### ✍ **이유:**현재 앱의 useEffect에서 Supabase 세션을 가져와 Redux 상태를 업데이트
## 하지만 await dispatch(loadUserSession());가 없다면 다음과 같은 문제가 발생할 수 있다.

1. **세션이 존재하면 Redux 상태 업데이트 요청을 보냄** (하지만 이는 비동기 처리라 시간이 걸림)
2. **Redux 상태가 업데이트되기 전에 navigate("/")가 실행됨**
3. **홈 화면으로 이동하지만, 상태가 아직 반영되지 않아 UI가 갱신되지 않음**
4. **아 네비게이터도 뺴고 슬라이스에서 처리해야겠다. window에 href 로 홈으로 보내는게 더 좋을꺼 같다. 어떤 방식이 더 좋은지 알려주세요**

## **2️⃣ 로그아웃 후 새로고침하면 여전히 로그인 상태로 보이는 문제**

### **🛠 문제 원인**

- **JS 문법 오류였음.**
- ESLint를 사용하고 있었지만, 해당 문제를 감지하지 못했음.
- 로그아웃이 정상적으로 처리되지 않아서, 새로고침 후 세션이 유지된 것처럼 보임.

### **✅ 해결 방법**

- ESLint 설정을 보다 세밀하게 조정하여 문법 오류를 감지할 수 있도록 개선할 필요가 있음.
- **불필요한 코드들을 정리하면서 코드 구조를 더욱 최적화하는 기회가 됨.**

### **✍ 회고**

처음엔 원인을 몰라서 헤맸지만, 결과적으로 **불필요한 코드들을 정리하는 계기가 됐음.**

오히려? **좋았다.** 😎

하지만 **ESLint 설정을 좀 더 세밀하게 조정해서, 이런 문법 오류를 사전에 잡을 수 있도록 해야겠다고 느낌.**

## **4. 아쉬운 점 & 개선할 점 🤔**

❌ **Redux와 React Query의 역할이 혼재된 부분이 있음**

→ 로그인 상태 관리는 Redux, API 데이터 관리는 React Query로 **역할을 분리할 필요가 있음.**

❌ **React Query의 캐시 시간을 좀 더 정교하게 조정할 필요가 있음**

→ 캐시 전략을 개선하여 **불필요한 API 호출을 줄일 필요가 있음.**

❌ **SEO 최적화 부족 (SSR 고려)**

→ Next.js 등을 활용하여 SEO 최적화까지 고려할 필요가 있음.

## **5. 앞으로의 목표 🚀**

✅ **Redux & React Query 사용 원칙을 정리하고, 구조를 개선해보기**

✅ **Next.js를 활용하여 SSR 및 SEO 최적화 경험 쌓기**

✅ **TypeScript 적용하여 더 안정적인 코드 작성해보기**

✅ **성능 최적화를 위한 코드 리팩토링 진행하기**

📌**🔥 결론:**

🚀**"완벽한 프로젝트는 없지만, 이번 경험이 다음 프로젝트를 더 잘할 수 있는 밑거름이 되었다!"**

# 베포 주소 
# oz-movie-project-zeta.vercel.app
