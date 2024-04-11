import { db } from "../src/lib/db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};

export const deleteUserByEmail = async (email: string) => {
  try {
    await db.user.delete({
      where: {
        email,
      },
    });
  } catch (error) {
    return null;
  }
};

export const deleteUserById = async (id: string) => {
  try {
    await db.user.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    return null;
  }
};

export const updateUserByEmail = async (email: string, data: any) => {
  try {
    const user = await db.user.update({
      where: {
        email,
      },
      data,
    });
    return user;
  } catch (error) {
    return null;
  }
};

export const updateUserById = async (id: string, data: any) => {
  try {
    const user = await db.user.update({
      where: {
        id,
      },
      data,
    });
    return user;
  } catch (error) {
    return null;
  }
};

export const createUser = async (
  name: string,
  email: string,
  hashedPassword: string
) => {
  try {
    const user = await db.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};
