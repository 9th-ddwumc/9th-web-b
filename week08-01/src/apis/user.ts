import axiosInstance from "./axios";

export const patchMyProfile = async ({
  name,
  bio,
  avatar,
}: {
  name: string;
  bio: string;
  avatar?: string | null;
}) => {
  const { data } = await axiosInstance.patch(
    "/v1/users",
    { name, bio, avatar },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return data;
};

export const deleteUser = async () => {
  const { data } = await axiosInstance.delete("/v1/users");
  return data;
};
