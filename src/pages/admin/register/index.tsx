import { useRouter } from 'next/router';
import styled from 'styled-components';
import NewGymForm from '@/components/admin/NewGymForm';
import { GymData } from '../edit';

// 테스트용 상수값
const testEndpoint = 'http://localhost:3000/gyms/'

const GymRegistration = () => {
  const router = useRouter();

  const handleSubmit = (formData: GymData) => {
    // 서버로부터 내려받는 데이터의 형식에 따라 처리 (현재는 id만 응답받는다는 가정 하에 then에 id만 명시함)
    createData(formData).then((id) => {
      formData.id = id;
      router.push(
        {
          pathname: '/admin/edit',
          query: { newRegister: true, gymData: JSON.stringify(formData) },
        },
        '/admin/edit',
      );
    });
  };

  // CRUD: Create
  const createData = async (input: GymData) => {
    // ↓ Test용 값 세팅
    const testId = crypto.randomUUID();
    input.id = testId;
    // ↑ 백엔드 API로 교체 시 삭제

    const data = await fetch(testEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(input),
    });
    const result = await data.json(); // 서버로부터 id를 내려받으면 result에 저장
    // return result;
    return testId; // 시뮬레이팅을 위한 임의값 (서버 API가 생성되면 삭제!)
  };

  return (
    <Styled.Wrapper>
      <h1>내 암장 등록하기</h1>
      <NewGymForm handleSubmit={handleSubmit} />
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div`
    border-radius: 6px;
    border: 1px solid #e0e0e0;
    padding: 24px;
    margin-bottom: 32px;
    overflow: auto;
    display: flex;
    flex-direction: column;
    gap: 30px;
  `,
};

export default GymRegistration;
