import { useEffect } from "react";

export default () => {
  const tg = window.Telegram.WebApp;

  useEffect(() => tg.ready(), []);
  const user = tg.initDataUnsafe?.user;

  return { user, tg };
};
