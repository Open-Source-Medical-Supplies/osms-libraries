import detectMobile from "../../shared/utility/detect-mobile.utility";

export const CHECK_MOBILE = 'checkMobile';

export const checkMobileAction = () => ({
  type: CHECK_MOBILE,
  payload: detectMobile()
});

export type CheckMobileAction = ReturnType<typeof checkMobileAction>;