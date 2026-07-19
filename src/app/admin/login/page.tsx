import Image from "next/image";
import { LoginForm } from "@/components/admin/LoginForm";

const stripes = {
  background:
    "repeating-linear-gradient(45deg,#1a1a1a 0 18px,#151515 18px 36px)",
};

export default function LoginPage() {
  return (
    <div className="grid min-h-screen grid-cols-[1fr_480px_1fr] items-center">
      <div className="h-full border-r-2 border-line" style={stripes} />
      <div className="py-12">
        <div className="mb-9 flex items-center gap-4">
          <Image
            src="/images/wilken-logo.jpg"
            alt="Wilken logo"
            width={52}
            height={52}
            className="block h-[52px] w-[52px] object-cover"
          />
          <div>
            <div className="font-display text-[28px] leading-none uppercase">
              Wilken CMS
            </div>
            <div className="mt-1 text-[12px] tracking-[0.26em] text-gray2 uppercase">
              Admin access only
            </div>
          </div>
        </div>
        <LoginForm />
      </div>
      <div className="h-full border-l-2 border-line" style={stripes} />
    </div>
  );
}
