import { getDictionary, Locale } from "@/lib/dictionaries";
import { DictionaryProvider } from "@/components/DictionaryProvider";

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const locale = resolvedParams.lang as Locale;
  const dictionary = await getDictionary(locale);

  return (
    <DictionaryProvider dictionary={dictionary}>
      {children}
    </DictionaryProvider>
  );
}
