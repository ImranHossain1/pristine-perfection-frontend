export const getBaseURL = (): string => {
  return (
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://pristine-perfection-backend.vercel.app/api/v1"
  );
};
