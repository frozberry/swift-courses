import { UserProfile } from "../../lib/types"
import { prisma } from "../../prisma/client"

export const getProfiles = async (): Promise<UserProfile[]> => {
  const users = await prisma.user.findMany({
    select: {
      firstName: true,
      lastName: true,
      dob: true,
      gender: true,
      profilePicture: true,
      score: true,
    },
  })

  return users
}

export const findProfileById = async (
  id: string
): Promise<UserProfile | null> => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      firstName: true,
      lastName: true,
      dob: true,
      gender: true,
      profilePicture: true,
      score: true,
    },
  })

  return user
}

export const editProfile = async (
  userId: string,
  firstName: string,
  lastName: string,
  dob: string,
  gender: string
) => {
  const updatedData = {
    firstName,
    lastName,
    dob,
    gender,
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      ...updatedData,
    },
  })

  return updatedUser
}
