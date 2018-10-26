export default function handleCors(whitelist: string) {
  return {
    origin: function(
      origin: any,
      callback: (err: null | Error, success?: boolean) => any
    ) {
      if (!origin) {
        callback(null, true);
        return;
      }

      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true
  };
}
