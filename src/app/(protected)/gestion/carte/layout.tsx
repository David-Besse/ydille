import { DishStoreProvider } from "@/store/dish-store-provider";

export default async function CarteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DishStoreProvider>{children}</DishStoreProvider>;
}
