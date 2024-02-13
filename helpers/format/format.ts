// Recebe 71992882109 e retorna 71 9 9288-2109
export const formatPhone = (phone: string): string => {
  const cleanNum: string = phone.replace(/\D/g, "");

  let formated: string = phone;
  if (cleanNum.length >= 2) formated = `${cleanNum.slice(0, 2)}`;
  if (cleanNum.length >= 3) formated += ` ${cleanNum[2]}`;
  if (cleanNum.length > 3) formated += ` ${cleanNum.slice(3, 7)}`;
  if (cleanNum.length > 7) formated += `-${cleanNum.slice(7)}`;

  return formated;
};

export const formatCEP = (cep: string): string => {
  const cleanCEP: string = cep.replace(/\D/g, "");

  let formated: string = cleanCEP;
  if (cleanCEP.length >= 5) formated = `${cleanCEP.slice(0, 5)}`;
  if (cleanCEP.length > 5) formated += `-${cleanCEP.slice(5)}`;

  return formated;
};

export const formatNumber = (num: string): string => num.replace(/\D/g, "");
export const formatCity = (num: string): string =>
  num.replace(/[^a-zA-Z\s]/g, "");
