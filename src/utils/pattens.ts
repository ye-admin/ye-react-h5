export function isPhone (phone: any) {
  const pReg = new RegExp(/^1[3456789]\d{9}$/g);
  return pReg.test(phone);
}

export function isEncryptPhone (phone: any) {
  const reg = new RegExp(/^1[3456789]\d{2}[*]{4}[3456789]\d{4}$/g);
  return reg.test(phone);
}