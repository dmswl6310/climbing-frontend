import { signOut } from "next-auth/react";
import { requestData } from ".";

const handleSignOut = () => {
  console.log("로그아웃");
  return requestData({
    option: "GET",
    url: "/members/logout",
    onSuccess: () => signOut({ callbackUrl: "/" }),
    hasBody: false,
  });
};

export default handleSignOut;
