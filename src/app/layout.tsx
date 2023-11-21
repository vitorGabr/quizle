import './globals.css';
import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import { Providers } from './providers';
import { PropsWithChildren } from 'react';

export const revalidate = false;
export const metadata: Metadata = {
  title: 'Quizle',
  description: 'Sua dose diária de palavras'
};

const body = Outfit({ subsets: ['latin'], variable: '--font-fallback' });

export default async function RootLayout({ children }: PropsWithChildren) {
  // const { data } = await supabase
  //   .from('words')
  //   .select('*')
  //   .eq('date', new Date().toISOString())
  //   .single();

  const word = 'teste'; //data?.word || 'teste';

  return (
    <html lang="pt-BR">
      <body className={`${body.variable}`}>
        <Providers correctedWord={word}>{children}</Providers>
      </body>
    </html>
  );
}
