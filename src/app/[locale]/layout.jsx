import '../globals.css';
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

import {NextIntlClientProvider} from 'next-intl';
import {notFound} from 'next/navigation';
 
// test with and without this
// export function generateStaticParams() {
//   return [{locale: 'en'}];
// }
 
export const metadata = {
  title: 'MVR',
  description: 'Test Serverless Fn Timeouts',
}


export default async function LocaleLayout({children, params: {locale}}) {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
 
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}