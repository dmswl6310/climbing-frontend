import { jwtVerify } from "jose";

const getExpireDate = async (token: string) => {
  const textEncoder = new TextEncoder();
  const secret = textEncoder.encode(process.env.JWT_SECRET);
  const { payload } = await jwtVerify(token, secret);
  const expireDate = payload.exp! * 1000;
  return expireDate;
};

export default getExpireDate;
