import { useRouter } from 'next/router';
import styled from 'styled-components';
import NewGymForm from '@/components/admin/NewGymForm';
import { GymData } from '@/constants/gyms/types';
import { GYM_API } from '@/constants/constants';

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
    const res = await fetch(GYM_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(input),
    });
    const newGym = await res.json();
    return newGym.id; // 추후 서버에서 response로 오는 데이터의 구조에 맞게 수정
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
