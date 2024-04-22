import { formatPhoneNumber } from "@/lib/utils";

interface DistrictDetailsProps {
  params: {
    phone: string | null;
    mailingAddress: string | null;
    city: string | null;
    state: string | null;
    zip: string | null;
    zipPlusFour: string | null;
  };
}

export function DistrictDetails({
  params: { phone, mailingAddress, city, state, zip, zipPlusFour },
}: DistrictDetailsProps) {
  const secondLineAddress = `${city}, ${state} ${zip}`;

  const phoneNumber = phone ? formatPhoneNumber(phone) : "";

  return <div className="grid gap-1 text-muted-foreground"></div>;
}
