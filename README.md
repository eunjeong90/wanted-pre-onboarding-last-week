# wanted-pre-onboarding-last-week

## 🌈 클릭하면 배포된 주소로 이동해요 **[원티드 프리온보딩 인턴십 개인과제](https://wanted-pre-onboarding-last-week-mlch.vercel.app/)** 🌈

### Introduction 👩🏻‍💻 
해당 레파지토리는 원티드 프리온보딩 인턴십 마지막 과제로, **[한국임상정보](https://clinicaltrialskorea.com/)** 사이트의 검색 영역을 클론코딩한 프로젝트입니다.

프로젝트에서 중점적으로 다룬 것들은 질환명을 검색시 API를 호출하여 검색어 추천 기능을 구현하고 검색 내용에 기반하여 검색어 추천시 검색어에 대한 API 호출 데이터를 캐싱하는 것입니다. 
캐싱된 데이터는 프론트 단에서 expire time을 설정해주고 검색창에 검색어를 입력시, 입력마다 API가 호출되지 않도록 debounce를 적용하여 구현하였습니다. 
또한 키보드로 추천 검색어로 이동할 수 있습니다.


### Dependencies
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black" /> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"/>  
<img src="https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white" /> <img src="https://img.shields.io/badge/StyledComponents-DB7093?style=for-the-badge&logo=StyledComponents&logoColor=white" /> 

### Getting Started
#### 해당 저장소의 server는 https://github.com/walking-sunset/assignment-api 의 내용을 clone한 것입니다.

1.깃 레파지토리 클론 : 

    git clone https://github.com/eunjeong90/wanted-pre-onboarding-last-week.git

2.설치 경로로 이동 :

    cd wanted-pre-onboarding-last-week
3.server 경로로 이동 후 설치 실행 :

    cd server
    npm install
    npm start

4.client 경로로 이동 후 설치 실행 : 

    cd client
    npm install
    npm start




### Main Feature 👀

### **In-Memory Cashing**
`src/Redux/Slice/searchSlice.ts`
```
export const getSearchQuery = createAsyncThunk(
  'search/getSearchQuery',
  async (query: string, { getState }): Promise<ISearchItem[]> => {
    const state = getState() as RootState;
    const cachedData = state.search.data.find((item) => item.query === query);
    if (cachedData && cachedData.expireTime > new Date().toISOString()) return cachedData.list.slice(0, 7);
    else {
      const response = await apiService.getSearchQuery(query);
      console.info('calling api');
      const expireTime = new Date();
      expireTime.setMinutes(expireTime.getMinutes() + 5);
      return response.slice(0, 7);
    }
  },
);
```
react에서는 컴포넌트가 재렌더링 될 때마다 state값이 초기화 되므로 검색에 필요한 데이터는 전역 상태 관리 도구인 redux-tookit로 관리했습니다. 
react의 기본 내장 API인 contextAPI를 통해서도 가능하지만, redux를 통한 전역관리에 대한 경험이 필요하다고 생각하여 규모가 작은 해당 프로젝트에 적용했습니다.

getSearchQuery 함수는 특정 검색 쿼리에 대한 캐시된 검색 결과를 검색하는 데 사용됩니다. 해당 캐싱 방법은 '인 메모리 캐싱(In-Memory Cashing'으로 데이터를 메모리에 저장하여 빠르게 처리할 수 있습니다.

만약 캐시에 검색 쿼리가 있고 그 캐시의 유효 기간이 아직 지나지 않았다면, 
함수는 해당되는 캐시된 검색 결과를 반환합니다. 해당 쿼리에 대한 캐시가 없거나 캐시의 유효 기간이 만료된 경우에는, 실제 API 서비스를 호출하여 검색 결과를 가져오도록 분기 처리 됩니다. 
API를 통해 가져온 데이터는 캐시에 추가되며 이후에 같은 검색 요청이 있을 때 이를 재사용할 수 있습니다. 해당 캐시는 테스트를 위해 5분 간의 유효 시간이 설정되어 있습니다. 

### **debouncing**
`src/Hooks/useDebounce.tsx`
```
import { useRef } from 'react';

const useDebounce = (callback: () => void, delay: number) => {
  const debounceTimer = useRef<ReturnType<typeof setTimeout>>();

  const dispatchDebounce = () => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    const newTimer = setTimeout(() => {
      callback();
    }, delay);
    debounceTimer.current = newTimer;
  };
  return dispatchDebounce;
};
export default useDebounce;
```
디바운싱(Debouncing)은 특정 코드가 과도하게 실행되는 것을 방지하기 위해 사용하는 프로그래밍 기법 중 하나입니다. 
디바운싱은 연속된 호출을 그룹화하고, 특정 시간 간격이 지난 후에만 단일 작업을 수행합니다.

해당 프로젝트에서는 검색 기능에 디바운싱을 적용하여 사용자가 타이핑하는 동안 검색 요청이 과도하게 발생하는 것을 방지하고, 
최종적으로 사용자가 원하는 검색어에 대해서만 검색 요청을 수행하여 불필요한 네트워크 트래픽과 서버 부하를 줄여줍니다.

검색 영역 이외에도 사용할 수 있도록 디바운스 기능을 custom hook으로 분리했습니다. 해당 hook은
함수와 해당 함수를 지연시킬 값을 받아 디바운스를 적용합니다.

### **keyboard navigation**
`src/Hooks/useKeyboardNavigate.tsx`
```
function useKeyboardNavigation({
  maxIndex,
  getKeyword,
}: KeyboardNavigationParams): KeyboardNavigationReturn {
  const [focusIndex, setFocusIndex] = useState<number>(-2);
  const [isAutoSearch, setIsAutoSearch] = useState<boolean>(false);
  const [autoSearchKeyword, setAutoSearchKeyword] = useState<string>('');

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowDown':
          setIsAutoSearch(true);
          setFocusIndex((prevIndex) => (prevIndex < maxIndex ? prevIndex + 1 : prevIndex));
          setAutoSearchKeyword(getKeyword(focusIndex + 1));
          break;
        case 'ArrowUp':
          setFocusIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
          setAutoSearchKeyword(getKeyword(focusIndex - 1));
          break;
        case 'Escape':
          setAutoSearchKeyword('');
          setIsAutoSearch(false);
          break;
        default:
          break;
      }
    },
    [maxIndex, getKeyword, focusIndex],
  );

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyDown]);

  return { focusIndex, isAutoSearch, autoSearchKeyword, setFocusIndex, setIsAutoSearch };
}
```
추천검색어 영역으로 키보드를 이용하여 이동할 수 있는 custom hook입니다. 추천검색어를 이동하기 때문에 arrow key로 이동하는 로직입니다.
매개변수로 받는 maxIndex는 keyboard navigation을 적용할 리스트의 최대 크기를 받아 해당 리스트의 index 값이 이보다
크거나 작아질 때 해당 키를 사용할 수 없도록 제어합니다. 

