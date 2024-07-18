
import LogoutButton from "@/components/LogoutButton";
import { SessionProvider } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <>
      <main>
        wellcome
        <LogoutButton />

      </main>
    </>

  );
}
