import { createIntl, createIntlCache } from 'react-intl';
/* eslint @typescript-eslint/no-var-requires: "off" */

export const locale = 'vi-VN';
const cache = createIntlCache();
const loadInt = () => {
  const messagesImport = require(`../../locales/${locale}`);
  const messages = messagesImport && messagesImport.default;
  return createIntl({ locale, messages }, cache);
};

const intl = loadInt();
export default intl;
