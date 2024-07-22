import { UpdateTokenInfo } from "@/constants/service/type";
import getExpireDate from "./getExpireDate";

// 매 api 호출시 토큰이 업데이트 되는 형식으로 바귐 => 아래코드 현재안씀
const getUpdatedToken = async (
  refreshToken: string | null,
  accessToken: string | null
) => {
  const updatedjwt: UpdateTokenInfo = {};
  if (accessToken) {
    console.log("accessToken 만료");
    updatedjwt.accessToken = accessToken;
    updatedjwt.accessExpireDate = await getExpireDate(accessToken);
  }
  if (refreshToken) {
    console.log("refreshToken 만료");
    updatedjwt.refreshToken = refreshToken;
    updatedjwt.refreshExpireDate = await getExpireDate(refreshToken);
  }
  return updatedjwt;
};

export default getUpdatedToken;
