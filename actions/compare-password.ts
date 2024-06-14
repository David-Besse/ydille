"use server";

import bcrypt from "bcrypt";

interface ComparePasswordProps {
  password: string;
  userPassword: string;
}

export const comparePassword = async ({
  password,
  userPassword,
}: ComparePasswordProps) => {
  return bcrypt.compare(password, userPassword);
};
