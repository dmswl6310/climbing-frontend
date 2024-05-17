export const CONFIRM_MESSAGE = "사용 가능";

export const EMAIL_REGREX =
  /^[A-Za-z0-9_]+[A-Za-z0-9.]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;
export const PASSWORD_REGREX =
  /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
export const NICKNAME_REGREX = /^[가-힣A-Za-z0-9_]{2,}$/;
